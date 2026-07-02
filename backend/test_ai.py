from app.services.ai_service import generate_questions

resume_text = """
Python, FastAPI, PostgreSQL, Machine Learning
"""

questions = generate_questions(resume_text)

print(questions)