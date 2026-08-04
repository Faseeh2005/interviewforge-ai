import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { uploadResume } from "../services/resumeService";
import { generateInterview } from "../services/interviewService";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

function ResumeUpload() {

    const [generating, setGenerating] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [resumeId, setResumeId] = useState(null);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleUpload = async () => {

        if (!file) {
            alert("Please choose a PDF.");
            return;
        }

        try {

            setLoading(true);

            const response = await uploadResume(file);

            setResumeId(response.resume_id);

            setMessage(response.message);

        } catch (err) {

            console.log(err);

            alert("Upload failed.");

        } finally {

            setLoading(false);

        }

    };

    const handleGenerateInterview = async () => {

        try {

            setGenerating(true);

            const response = await generateInterview(resumeId);

            navigate(
                `/interview?interview_id=${response.interview_id}`
            );

        } catch (err) {

            console.log(err);

            alert("Failed to generate interview.");

        } finally {

            setGenerating(false);

        }

    };

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                padding: "6px",
                alignItems: "flex-start",
            }}
        >

            <div
                style={{
                    width: "100%",
                    maxWidth: "700px"
                }}
            >

                <Card>

                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "30px"
                        }}
                    >

                        <h1
                            style={{
                                fontSize: "36px",
                                marginBottom: "10px",
                                color: "#1f2937"
                            }}
                        >
                            Upload Your Resume
                        </h1>

                        <p
                            style={{
                                color: "#6b7280",
                                fontSize: "16px",
                                lineHeight: "1.7"
                            }}
                        >
                            Upload your latest resume and let InterviewForge AI
                            generate a personalized interview based on your
                            experience, skills, and projects.
                        </p>

                    </div>


                    <div
                        style={{
                            border: "2px dashed #2563eb",
                            borderRadius: "16px",
                            padding: "30px",
                            textAlign: "center",
                            background: "#f9fbff",
                            marginBottom: "15px"
                        }}
                    >

                        <div
                            style={{
                                fontSize: "36px",
                                marginBottom: "15px"
                            }}
                        >
                            📄
                        </div>

                        <h3
                            style={{
                                marginBottom: "10px",
                                color: "#1f2937"
                            }}
                        >
                            Drag & Drop Resume
                        </h3>

                        <p
                            style={{
                                color: "#6b7280",
                                marginBottom: "20px"
                            }}
                        >
                            or click below to browse your files
                        </p>

                        <input
                            id="resume-upload"
                            type="file"
                            accept=".pdf"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />

                        <label
                            htmlFor="resume-upload"
                            style={{
                                display: "block",
                                width: "100%",
                                padding: "40px",
                                border: "2px dashed #3b82f6",
                                borderRadius: "16px",
                                textAlign: "center",
                                cursor: "pointer",
                                background: "#0f172a",
                                color: "white",
                                marginBottom: "20px",
                            }}
                        >
                            <h3 style={{ margin: 0 }}>📄 Upload Resume</h3>

                            <p style={{ color: "#94a3b8", marginTop: "12px" }}>
                                Click here to choose your PDF
                            </p>

                            {file && (
                                <p
                                    style={{
                                        color: "#22c55e",
                                        fontWeight: "bold",
                                        marginTop: "15px",
                                    }}
                                >
                                    ✅ {file.name}
                                </p>
                            )}
                        </label>

                        <p
                            style={{
                                fontSize: "13px",
                                color: "#816565",
                                marginTop: "15px"
                            }}
                        >
                            PDF files only
                        </p>

                    </div>


                    {file && (

                        <div
                            style={{
                                background: "#0a3320",
                                border: "1px solid #10b981",
                                borderRadius: "12px",
                                padding: "15px",
                                marginBottom: "20px"
                            }}
                        >

                            <strong>📄 {file.name}</strong>

                            <div
                                style={{
                                    color: "#62867a",
                                    marginTop: "5px"
                                }}
                            >
                                Ready to upload
                            </div>

                        </div>

                    )}


                    <div
                        style={{
                            textAlign: "center"
                        }}
                    >

                        <Button
                            onClick={handleUpload}
                            disabled={loading}
                        >
                            {loading ? "Uploading..." : "Upload Resume"}
                        </Button>

                    </div>


                    {message && (

                        <>

                            <div
                                style={{
                                    marginTop: "25px",
                                    padding: "18px",
                                    borderRadius: "12px",
                                    background: "#eff6ff",
                                    border: "1px solid #2563eb",
                                    textAlign: "center"
                                }}
                            >

                                <h3
                                    style={{
                                        color: "#2563eb",
                                        marginBottom: "8px"
                                    }}
                                >
                                    ✅ Resume Uploaded Successfully
                                </h3>

                                <p
                                    style={{
                                        color: "#374151"
                                    }}
                                >
                                    {message}
                                </p>

                            </div>

                            <div
                                style={{
                                    textAlign: "center",
                                    marginTop: "25px"
                                }}
                            >

                                <Button
                                    onClick={handleGenerateInterview}
                                    disabled={generating}
                                >
                                    {generating
                                        ? "Generating Interview..."
                                        : "Generate AI Interview →"}
                                </Button>

                                {generating && (

                                    <div
                                        style={{
                                            marginTop: "30px",
                                            textAlign: "center"
                                        }}
                                    >

                                        <div
                                            style={{
                                                width: "45px",
                                                height: "45px",
                                                margin: "0 auto 20px",
                                                border: "5px solid #334155",
                                                borderTop: "5px solid #3b82f6",
                                                borderRadius: "50%",
                                                animation: "spin 1s linear infinite"
                                            }}
                                        />

                                        <h3>Generating Your Interview...</h3>

                                        <p
                                            style={{
                                                color: "#94a3b8"
                                            }}
                                        >
                                            AI is analyzing your resume and preparing personalized questions.
                                        </p>

                                    </div>

                                )}

                            </div>

                        </>

                    )}

                </Card>

            </div>

        </div>

    );

}

export default ResumeUpload;