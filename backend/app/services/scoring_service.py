import os
import json
import requests
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from app.models.score import InterviewScore

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def score_interview(questions, answers):
    interview_text = ""

    for i, (q,a) in enumerate(zip(questions,answers), start=1):
        interview_text += f"""
Question{i}:
{q}
Answer:
{a}
"""
        prompt = f"""
You are a senior software engineering interviewer.

Evaluate the following interview.

Score the candidate on:

- Overall
- Technical
- Communication
- Confidence

Each score must be between 0 and 100.

Also provide:

- strengths
- weaknesses
- feedback

Return ONLY valid JSON.

Example:

{{
    "overall_score": 82,
    "technical_score": 85,
    "communication_score": 80,
    "confidence_score": 83,
    "strengths": "Good understanding of REST APIs.",
    "weaknesses": "Need deeper knowledge of databases.",
    "feedback": "Practice SQL and system design."
}}
Interview:
{interview_text}
"""
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}"
            },
            json={
                "model": "openai/gpt-4o-mini",
                "messages":[
                    {
                        "role":"user",
                        "content": prompt
                    }
                ]
            }
        )
        data = response.json()

        if "choices" not in data:
            raise Exception(f"OpenRouter Error: {data}")
        
        
        content = data["choices"][0]["message"]["content"]

        content = (
           content
            .replace("```json", "")
            .replace("```", "")
            .strip() 
        )

        return json.loads(content)

def get_score(db: Session, session_id: int):
    return (
        db.query(InterviewScore)
        .filter(InterviewScore.session_id == session_id)
        .first()
    )