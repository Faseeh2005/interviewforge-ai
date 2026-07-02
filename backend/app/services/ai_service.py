import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")


def generate_questions(resume_text: str):

    prompt = f"""
You are a strict JSON generator.

Return ONLY a JSON array of 15 interview questions, majority of them being technically related to the resume.

No markdown. No text. No explanation.

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
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
    )

    data = response.json()

    
    if "choices" not in data:
        print("OPENROUTER ERROR:", data)
        return []

    content = data["choices"][0]["message"]["content"]

    try:
        return json.loads(content)
    except:
        return []