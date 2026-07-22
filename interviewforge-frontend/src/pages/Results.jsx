import { useLocation, useNavigate } from "react-router-dom";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";


function Results() {

    const location = useLocation();

    const navigate = useNavigate();

    const score = location.state?.score;


    if (!score) {

        return (

            <div
                style={{
                    padding: "40px"
                }}
            >

                <h2>
                    No results found
                </h2>


                <Button
                    onClick={() => navigate("/dashboard")}
                >
                    Go Dashboard
                </Button>

            </div>

        );

    }


    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#f4f7fb",
                padding: "50px 20px",
            }}
        >

            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                }}
            >

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "40px",
                    }}
                >

                    <h1
                        style={{
                            fontSize: "42px",
                            marginBottom: "10px",
                            color: "#111827",
                            fontWeight: "700",
                        }}
                    >
                        🎉 Interview Results
                    </h1>


                    <p
                        style={{
                            color: "#666",
                            fontSize: "18px",
                        }}
                    >
                        Here's how you performed.
                    </p>

                </div>



                <Card>

                    <div
                        style={{
                            textAlign: "center"
                        }}
                    >

                        <h2>
                            Overall Score
                        </h2>


                        <h1
                            style={{
                                fontSize: "72px",
                                color: "#2563eb"
                            }}
                        >
                            {score.overall_score}%
                        </h1>

                    </div>

                </Card>



                <br />


                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(220px,1fr))",
                        gap: "20px"
                    }}
                >


                    <Card>

                        <h3>
                            💻 Technical
                        </h3>

                        <h1
                            style={{
                                color: "#2563eb"
                            }}
                        >
                            {score.technical_score}%
                        </h1>

                    </Card>



                    <Card>

                        <h3>
                            🗣 Communication
                        </h3>

                        <h1
                            style={{
                                color: "#2563eb"
                            }}
                        >
                            {score.communication_score}%
                        </h1>

                    </Card>




                    <Card>

                        <h3>
                            🔥 Confidence
                        </h3>

                        <h1
                            style={{
                                color: "#2563eb"
                            }}
                        >
                            {score.confidence_score}%
                        </h1>

                    </Card>


                </div>



                <br />


                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(300px,1fr))",
                        gap: "25px"
                    }}
                >


                    <Card>

                        <h2
                            style={{
                                color: "#16a34a"
                            }}
                        >
                            💪 Strengths
                        </h2>


                        <p>
                            {score.strengths}
                        </p>


                    </Card>



                    <Card>

                        <h2
                            style={{
                                color: "#dc2626"
                            }}
                        >
                            📈 Areas to Improve
                        </h2>


                        <p>
                            {score.weaknesses}
                        </p>


                    </Card>


                </div>



                <br />


                <Card>

                    <h2>
                        🤖 AI Feedback
                    </h2>


                    <p>
                        {score.feedback}
                    </p>


                </Card>



                <br />


                <div
                    style={{
                        textAlign: "center"
                    }}
                >

                    <Button
                        onClick={() => navigate("/dashboard")}
                    >
                        ← Back to Dashboard
                    </Button>

                </div>


            </div>


        </div>

    );

}


export default Results;