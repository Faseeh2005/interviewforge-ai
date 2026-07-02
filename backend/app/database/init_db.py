from app.database.base import Base
from app.database.database import engine  

from app.models.user import User
from app.models.resume import Resume
from app.models.interview import Interview
from app.models.session import InterviewSession
from app.models.answer import InterviewAnswer
from app.models.score import InterviewScore


def init_db():
    Base.metadata.create_all(bind=engine)