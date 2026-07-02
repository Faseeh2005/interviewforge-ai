from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    Text
)

from app.database.base import Base


class InterviewAnswer(Base):

    __tablename__ = "answers"

    id = Column(Integer, primary_key=True)

    session_id = Column(
        Integer,
        ForeignKey("sessions.id")
    )

    question = Column(Text)

    answer = Column(Text)