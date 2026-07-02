from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.api.dependencies.auth import get_current_user
from app.models.user import User
from app.services.history_service import get_history

router = APIRouter(
    prefix = "/history",
    tags= ["History"]
)

@router.get("/")
def interview_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_history(
        db,
        current_user.id
    )