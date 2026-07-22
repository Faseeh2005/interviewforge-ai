import os
from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.api.dependencies.auth import get_current_user
from app.models.resume import Resume
from app.services.resume_service import extract_text_from_pdf

router = APIRouter(prefix="/resume", tags=["Resume"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as f:
        f.write(file.file.read())
    text = extract_text_from_pdf(file_path)

    resume = Resume(
    user_id=user.id,
    filename=file.filename,
    extracted_text=text
)

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "message": "resume uploaded successfully",
        "resume_id": resume.id
    }