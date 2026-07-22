import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { uploadResume } from "../services/resumeService";
import { generateInterview } from "../services/interviewService";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

function ResumeUpload() {

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

            const response = await generateInterview(resumeId);

            navigate(
                `/interview?interview_id=${response.interview_id}`
            );

        } catch (err) {

            console.log(err);

            alert("Failed to generate interview.");

        }

    };

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}
        >

            <Card>

                <h2>Upload Resume</h2>

                <br />

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <br /><br />

                <Button
                    onClick={handleUpload}
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Upload Resume"}
                </Button>

                {message && (
                    <>
                        <br /><br />

                        <p
                            style={{
                                color: "green"
                            }}
                        >
                            {message}
                        </p>

                        <Button
                            onClick={handleGenerateInterview}
                        >
                            Generate Interview
                        </Button>
                    </>
                )}

            </Card>

        </div>

    );

}

export default ResumeUpload;