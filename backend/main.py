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

app = FastAPI()

app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(interview_router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return{"Message": "Api running"}