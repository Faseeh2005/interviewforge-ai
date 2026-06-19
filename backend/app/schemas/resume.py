from pydantic import BaseModel

class ResumeResponse(BaseModel):
    id: int
    filename: str
    context: str

    class config:
        from_attributes: True