from app.models.interview import Interview


def create_interview(db, user_id: int, resume_id: int, questions: str):

    interview = Interview(
        user_id=user_id,
        resume_id=resume_id,
        questions=questions
    )

    db.add(interview)
    db.commit()
    db.refresh(interview)

    return interview