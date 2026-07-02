from sqlalchemy import Column, Integer, ForeignKey, JSON

from app.database.base import Base


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)

    questions = Column(JSON)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id")
    )