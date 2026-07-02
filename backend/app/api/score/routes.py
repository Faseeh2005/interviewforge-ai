from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.api.dependencies.auth import get_current_user
from app.models.user import User
from app.services.scoring_service import get_score

router = APIRouter(
    prefix="/score",
    tags= ["Score"]
)

@router.get("/{session_id}")
def read_score(
   session_id: int,
   db: Session = Depends(get_db),
   current_user: User = Depends(get_current_user) 
):
    score = get_score(db, session_id)

    if not score:
        raise HTTPException(
            status_code=404,
            detail="Score not found"
        )
    
    return {
        "overall_score": score.overall_score,
        "technical_score": score.technical_score,
        "communication_score": score.communication_score,
        "confidence_score": score.confidence_score,
        "strengths": score.strengths,
        "weaknesses": score.weakness,
        "feedback": score.feedback
    }