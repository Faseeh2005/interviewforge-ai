from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.session import InterviewSession
from app.models.score import InterviewScore


def get_dashboard(db: Session, user_id: int):

    total_interviews = (
        db.query(InterviewSession)
        .filter(
            InterviewSession.user_id == user_id
        )
        .count()
    )

    completed_interviews = (
        db.query(InterviewSession)
        .filter(
            InterviewSession.user_id == user_id,
            InterviewSession.status == "completed"
        )
        .count()
    )

    active_interviews = (
        db.query(InterviewSession)
        .filter(
            InterviewSession.user_id == user_id,
            InterviewSession.status == "active"
        )
        .count()
    )

    scores = (
        db.query(InterviewScore)
        .join(
            InterviewSession,
            InterviewScore.session_id == InterviewSession.id
        )
        .filter(
            InterviewSession.user_id == user_id
        )
    )

    average_score = scores.with_entities(
        func.avg(InterviewScore.overall_score)
    ).scalar()

    highest_score = scores.with_entities(
        func.max(InterviewScore.overall_score)
    ).scalar()

    latest = scores.order_by(
        InterviewScore.id.desc()
    ).first()

    latest_score = (
        latest.overall_score
        if latest
        else None
    )

    return {
        "total_interviews": total_interviews,
        "completed_interviews": completed_interviews,
        "active_interviews": active_interviews,
        "average_score": round(average_score, 2) if average_score else 0,
        "highest_score": highest_score,
        "latest_score": latest_score
    }