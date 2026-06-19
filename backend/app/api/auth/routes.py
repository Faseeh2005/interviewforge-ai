from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import create_user
from app.schemas.user import UserCreate, UserResponse, LoginRequest, TokenResponse
from app.services.auth_service import authenticate_user
from app.core.auth import create_access_token
from app.api.dependencies.auth import get_current_user
from app.models.user import User


router = APIRouter (
    prefix = "/auth",
    tags = ["Authentication"]
)

@router.post(
        "/register",
        response_model = UserResponse
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    created_user = create_user(db, user)

    if created_user is None:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    return created_user

@router.post(
        "/login",
        response_model = TokenResponse
)
def login(
    credentials: LoginRequest,
    db: Session = Depends(get_db)
):
    user = authenticate_user(
        db,
        credentials.email,
        credentials.password
    )

    if not user:
        raise HTTPException(
            status_code = 401,
            detail = "Invalid credentials"
        )
    token = create_access_token(
        {"sub": str(user.id)}
    )

    return {
        "access_token": token,
        "token_type": "Bearer"
    }

@router.get(
        "/me",
        response_model = UserResponse
)
def get_me(
    current_user: User = Depends(get_current_user)
):
    return current_user


@router.get("/test")
def test():
    return{"message": "Auth route working"}