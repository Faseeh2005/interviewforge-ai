import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
    startInterviewSession,
    nextQuestion,
} from "../services/interviewService";

function Interview() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const interviewId = searchParams.get("interview_id");

    const [sessionId, setSessionId] = useState(null);

    const [question, setQuestion] = useState("");

    const [answer, setAnswer] = useState("");

    const [questionNumber, setQuestionNumber] = useState(1);

    const [completed, setCompleted] = useState(false);

    const [score, setScore] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function startInterview() {

            try {

                const data = await startInterviewSession(interviewId);

                console.log(data);

                setSessionId(data.session_id);

                setQuestion(data.question);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        }

        if (interviewId) {

            startInterview();

        }

    }, [interviewId]);

    async function submitAnswer() {

        try {

            const data = await nextQuestion(
                sessionId,
                answer.trim()
            );

            if (data.completed) {

                setCompleted(true);

                setScore(data.score);

                setTimeout(() => {

                    navigate("/results", {
                        state: {
                            score: data.score,
                        },
                    });

                }, 1500);

                return;

            }

            setQuestion(data.question);

            setQuestionNumber(data.question_number);

            setAnswer("");

        } catch (error) {

            console.log(error);

        }

    }

    if (loading) {

        return (

            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#0f172a",
                    color: "white",
                    fontSize: "28px",
                    fontWeight: "600",
                }}
            >
                Starting Interview...
            </div>

        );

    }

    if (completed) {

        return (

            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#0f172a",
                }}
            >

                <div
                    style={{
                        width: "600px",
                        background: "#1e293b",
                        padding: "50px",
                        borderRadius: "20px",
                        textAlign: "center",
                        border: "1px solid #334155",
                    }}
                >

                    <h1
                        style={{
                            color: "white",
                            marginBottom: "20px",
                        }}
                    >
                        🎉 Interview Completed
                    </h1>

                    <h2
                        style={{
                            color: "#3b82f6",
                            fontSize: "48px",
                            marginBottom: "10px",
                        }}
                    >
                        {score.overall_score}%
                    </h2>

                    <p
                        style={{
                            color: "#94a3b8",
                        }}
                    >
                        Preparing your detailed results...
                    </p>

                </div>

            </div>

        );

    }

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#0f172a",
                padding: "50px 20px",
            }}
        >

            <div
                style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                }}
            >

                <h1
                    style={{
                        color: "white",
                        fontSize: "42px",
                        marginBottom: "10px",
                    }}
                >
                    Technical Interview
                </h1>

                <p
                    style={{
                        color: "#94a3b8",
                        fontSize: "18px",
                        marginBottom: "25px",
                    }}
                >
                    Question {questionNumber}
                </p>

                <div
                    style={{
                        height: "10px",
                        background: "#334155",
                        borderRadius: "20px",
                        overflow: "hidden",
                        marginBottom: "35px",
                    }}
                >

                    <div
                        style={{
                            width: `${(questionNumber / 15) * 100}%`,
                            height: "100%",
                            background: "#2563eb",
                            transition: "0.3s",
                        }}
                    />

                </div>

                <div
                    style={{
                        background: "#1e293b",
                        borderRadius: "18px",
                        padding: "35px",
                        border: "1px solid #334155",
                        marginBottom: "30px",
                    }}
                >

                    <h2
                        style={{
                            color: "white",
                            lineHeight: "1.7",
                            margin: 0,
                        }}
                    >
                        {question}
                    </h2>

                </div>

                <textarea

                    value={answer}

                    onChange={(e) =>
                        setAnswer(e.target.value)
                    }

                    placeholder="Type your answer here..."

                    rows={10}

                    style={{
                        width: "100%",
                        background: "#1e293b",
                        color: "white",
                        border: "1px solid #334155",
                        borderRadius: "16px",
                        padding: "20px",
                        fontSize: "16px",
                        resize: "vertical",
                        outline: "none",
                        boxSizing: "border-box",
                    }}

                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "20px",
                    }}
                >

                    <span
                        style={{
                            color: "#94a3b8",
                        }}
                    >
                        {answer.length} characters
                    </span>

                    <button

                        onClick={submitAnswer}

                        disabled={!answer.trim()}

                        style={{
                            background: answer.trim()
                                ? "#2563eb"
                                : "#475569",
                            color: "white",
                            border: "none",
                            padding: "14px 28px",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: answer.trim()
                                ? "pointer"
                                : "not-allowed",
                        }}

                    >
                        Next Question →
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Interview;