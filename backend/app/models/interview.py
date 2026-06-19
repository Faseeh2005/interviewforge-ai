from sqlalchemy import Column, Integer, ForeignKey, Text

from app.database.base import Base


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)

    questions = Column(Text)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id")
    )