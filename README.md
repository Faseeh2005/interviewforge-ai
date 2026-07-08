# interviewforge-ai

InterviewForge AI is an AI-powered mock interview platform that helps users prepare for technical interviews using personalized interview sessions generated from their resumes.

The backend is built with FastAPI and PostgreSQL, providing a secure RESTful API architecture with JWT authentication. Users can register, log in, upload resumes, generate AI-based interview questions, complete mock interviews, and receive AI-generated performance scores.

## Features

* User authentication using JWT
* Resume upload and text extraction
* AI-generated interview questions based on resume content
* Automatic interview session management
* Sequential question flow with answer storage
* AI-powered interview scoring
* Interview history
* Dashboard analytics and performance statistics
* PostgreSQL database integration
* OpenAPI (Swagger) documentation for testing APIs

## REST APIs

* POST /auth/register – Register a new user
* POST /auth/login – User authentication
* POST /resume/upload – Upload and parse a resume
* POST /interview/generate – Generate interview questions using AI
* POST /session/start – Start a new interview session
* POST /session/next – Submit an answer and receive the next question
* GET /score/{session_id} – Retrieve AI-generated interview score
* GET /history – View previous interview sessions
* GET /dashboard/stats – Retrieve interview analytics and statistics

## Tech Stack

* Python
* FastAPI
* PostgreSQL
* SQLAlchemy ORM
* Pydantic
* JWT Authentication
* OpenRouter API (OpenAI GPT-4o Mini)
* Uvicorn

The project follows a modular backend architecture with separate folders for models, schemas, services, routes, authentication, and database configuration, making it easy to extend with additional AI features and a frontend application.

