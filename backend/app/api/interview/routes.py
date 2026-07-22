from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.resume import Resume
from app.services.ai_service import generate_questions
from app.models.user import User
from app.api.dependencies.auth import get_current_user
from app.services.interview_service import create_interview


router = APIRouter(
    prefix="/interview",
    tags=["Interview"]
)


@router.post("/generate")
def generate_interview(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == current_user.id
        )
        .first()
    )


    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )


    if not resume.extracted_text:
        raise HTTPException(
            status_code=400,
            detail="Resume text extraction failed"
        )


    print("RESUME TEXT LENGTH:")
    print(len(resume.extracted_text))


    questions = generate_questions(
        resume.extracted_text
    )


    print("FINAL QUESTIONS:")
    print(questions)


    if not questions:
        raise HTTPException(
            status_code=400,
            detail="AI failed to generate questions"
        )


    interview = create_interview(
        db=db,
        user_id=current_user.id,
        resume_id=resume_id,
        questions=questions
    )


    return {
        "interview_id": interview.id,
        "questions": questions
    }