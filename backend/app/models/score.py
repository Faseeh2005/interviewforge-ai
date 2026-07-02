from sqlalchemy import Column, Integer, ForeignKey, Text
from app.database.base import Base

class InterviewScore(Base):
    __tablename__ = "scores"

    id = Column(Integer, primary_key=True)

    session_id = Column(
        Integer,
        ForeignKey("sessions.id"),
        unique = True
    )
    
    overall_score = Column(Integer)
    technical_score = Column(Integer)
    communication_score = Column(Integer)
    confidence_score = Column(Integer)
    strengths = Column(Text)
    weakness = Column(Text)
    feedback = Column(Text)