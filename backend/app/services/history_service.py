from sqlalchemy.orm import Session
from app.models.session import InterviewSession
from app.models.score import InterviewScore


def get_history(db: Session, user_id: int):

    sessions = (
        db.query(InterviewSession)
        .filter(
            InterviewSession.user_id == user_id
        )
        .all()
    )

    history = []

    for session in sessions:

        score = (
            db.query(InterviewScore)
            .filter(
                InterviewScore.session_id == session.id
            )
            .first()
        )

        history.append({
            "session_id": session.id,
            "interview_id": session.interview_id,
            "status": session.status,
            "overall_score": score.overall_score if score else None
        })

    return history