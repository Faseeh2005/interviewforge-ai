from sqlalchemy import Column, Integer, String, ForeignKey, Text
from app.database.base import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    content = Column(Text)

    user_id = Column(Integer, ForeignKey("users.id"))