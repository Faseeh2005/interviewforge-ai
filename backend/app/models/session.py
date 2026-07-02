from sqlalchemy import Column, Integer, ForeignKey, Text, JSON
from app.database.base import Base

class InterviewSession(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)

    interview_id = Column(Integer, ForeignKey("interviews.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    current_index = Column(Integer, default=0)
    status= Column(Text, default="active") #completed