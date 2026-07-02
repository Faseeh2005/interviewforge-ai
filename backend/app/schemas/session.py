from pydantic import BaseModel
from typing import Optional

class NextQuestionRequest(BaseModel):
    session_id: int
    answer: Optional[str] = None

class AnswerRequest(BaseModel):
    session_id: int
    answer: str



