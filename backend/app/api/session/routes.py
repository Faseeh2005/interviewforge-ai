from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.dependencies import get_db
from app.api.dependencies.auth import get_current_user
from app.models.user import User
from app.models.interview import Interview
from app.models.session import InterviewSession
from app.schemas.session import NextQuestionRequest
from app.services.session_service import create_session, submit_answer
from app.models.answer import InterviewAnswer
from app.models.score import InterviewScore
from app.services.scoring_service import score_interview
import json

router = APIRouter(
    prefix="/session",
    tags=["Session"]
)


@router.post("/start")
def start_session(
    interview_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    interview = (
        db.query(Interview)
        .filter(
            Interview.id == interview_id,
            Interview.user_id == current_user.id
        )
        .first()
    )

    if not interview:
        raise HTTPException(
            status_code=404,
            detail="Interview not found"
        )

    session = create_session(
        db,
        interview_id,
        current_user.id
    )

    return {
        "session_id": session.id,
        "message": "Interview session started"
    }


@router.post("/next")
def next_question(
    data: NextQuestionRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    session = (
        db.query(InterviewSession)
        .filter(
            InterviewSession.id == data.session_id,
            InterviewSession.user_id == current_user.id
        )
        .first()
    )

    if not session:
        raise HTTPException(
            status_code=404,
            detail="Session not found"
        )

    interview = (
        db.query(Interview)
        .filter(
            Interview.id == session.interview_id
        )
        .first()
    )

    if not interview:
        raise HTTPException(
            status_code=404,
            detail="Interview not found"
        )

    questions = interview.questions

    if isinstance(questions, str):
        try:
            questions = json.loads(questions)
        except:
            questions = [
                q.strip()
                for q in questions.split("\n")
                if q.strip()
            ]

    
    if data.answer is not None:

        current_question = questions[session.current_index]

        submit_answer(
            db,
            session,
            questions[session.current_index],
            data.answer
        )

        db.refresh(session)

    
    if session.current_index >= len(questions):
        session.status = "completed"
        db.commit()

        saved_answer = (
            db.query(InterviewAnswer)
            .filter(InterviewAnswer.session_id == session.id)
            .all()
        )

        answers = [a.answer for a in saved_answer]
        result = score_interview(
            questions,
            answers
        )

        score = InterviewScore(
           session_id=session.id,
            overall_score=result["overall_score"],
            technical_score=result["technical_score"],
            communication_score=result["communication_score"],
            confidence_score=result["confidence_score"],
            strengths=result["strengths"],
            weakness=result["weaknesses"],
            feedback=result["feedback"] 
        )

        db.add(score)
        db.commit()

        return{
            "completed": True,
            "score": result
        }
    return {
        "completed": False,
        "question_number": session.current_index + 1,
        "question": questions[session.current_index]
    }