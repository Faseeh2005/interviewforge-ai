import os
import requests


OPENROUTER_API_KEY = os.getenv(
    "OPENROUTER_API_KEY"
)

def generate_questions(
    resume_text: str
):

    prompt = f"""
    You are a senior technical interviewer.

    Based on this resume:

    {resume_text}

    Generate:

    - 10 technical questions
    - 5 behavioral questions

    Return plain text.
    """

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization":
                f"Bearer {OPENROUTER_API_KEY}"
        },
        json={
            "model": "openai/gpt-4o-mini",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }
    )

    data = response.json()

    return (
        data["choices"][0]
        ["message"]
        ["content"]
    )