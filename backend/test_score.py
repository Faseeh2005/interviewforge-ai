from app.services.scoring_service import score_interview

questions = [
    "Explain REST APIs.",
    "What is polymorphism?"
]

answers = [
    "REST uses HTTP methods like GET and POST.",
    "Polymorphism allows one interface with many implementations."
]

result = score_interview(
    questions,
    answers
)

print(result)