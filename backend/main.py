from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

from fastapi import FastAPI
from app.database.database import engine
from app.database.base import Base
from app.models import user
from app.api.auth.routes import router as auth_router
from app.api.resume.routes import router as resume_router
from app.api.interview.routes import router as interview_router
from app.api.session.routes import router as session_router
from app.database.init_db import init_db
from app.api.score.routes import router as score_router
from app.api.history.routes import router as history_router
from app.api.dashboard.routes import router as dashboard_router

app = FastAPI()

init_db()

app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(interview_router)
app.include_router(session_router)
app.include_router(score_router)
app.include_router(history_router)
app.include_router(dashboard_router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return{"Message": "Api running"}