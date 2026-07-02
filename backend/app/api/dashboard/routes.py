from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.api.dependencies.auth import get_current_user
from app.models.user import User

from app.services.dashboard_service import get_dashboard

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_dashboard(
        db,
        current_user.id
    )