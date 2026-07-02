from app.models.answer import InterviewAnswer
from app.models.session import InterviewSession


def create_session(db, interview_id: int, user_id: int):

    session = InterviewSession(
        interview_id=interview_id,
        user_id=user_id,
        current_index=0,
        status="active"
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return session


def submit_answer(
    db,
    session,
    question: str,
    answer: str
):

    interview_answer = InterviewAnswer(
        session_id=session.id,
        question=question,
        answer=answer
    )

    db.add(interview_answer)

    session.current_index += 1

    db.commit()
    db.refresh(session)

    return session