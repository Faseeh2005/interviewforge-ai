import api from "./api";

export const generateInterview = async (resumeId) => {

    const response = await api.post(
        `/interview/generate?resume_id=${resumeId}`
    );

    return response.data;

};

export const startInterviewSession = async (interviewId) => {

    const response = await api.post(
        `/session/start?interview_id=${interviewId}`
    );

    return response.data;

};

export const nextQuestion = async (sessionId, answer = null) => {

    const response = await api.post(
        "/session/next",
        {
            session_id: sessionId,
            answer
        }
    );

    return response.data;

};