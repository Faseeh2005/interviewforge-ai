import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")


def generate_questions(resume_text: str):

    prompt = f"""
You are an experienced senior software engineering interviewer.

Generate 15 UNIQUE interview questions based on the candidate's resume.

Requirements:
- Majority should be technical.
- Include 2-3 behavioral questions.
- Include a few project-specific questions.
- Mix easy, medium, and hard questions.
- Avoid repeating common interview questions.
- Every interview should be different, even for the same resume.

Return ONLY a valid JSON array of strings.

No markdown.
No explanations.
No extra text.

Resume:
{resume_text}
"""

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost",
            "X-Title": "InterviewForge"
        },
        json={
            "model": "openai/gpt-4o-mini",
            "temperature": 0.9,
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
    )

    data = response.json()

    
    if "choices" not in data:
        print("OPENROUTER ERROR:")
        print(data)
        return []

    content = data["choices"][0]["message"]["content"]

    print("AI RESPONSE:")
    print(content)

    try:
        questions = json.loads(content)
        return questions

    except Exception as e:
        print("JSON ERROR:", e)
        print("RAW CONTENT:")
        print(content)

        return []