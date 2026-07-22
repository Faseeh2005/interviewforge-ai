import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import Navbar from "../components/layout/Navbar";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatCard from "../components/dashboard/StatCard";

function Dashboard() {

    const navigate = useNavigate();
    const { user } = useAuth();

    const [stats, setStats] = useState({
        total_interviews: 0,
        average_score: 0,
        highest_score: 0,
        latest_score: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadDashboard() {

            try {

                const response = await api.get("/dashboard/");

                setStats(response.data);

            } catch (error) {

                console.log(error.response?.data);

            } finally {

                setLoading(false);

            }

        }

        loadDashboard();

    }, []);

    if (loading) {

        return (
            <>
                <Navbar />

                <div
                    style={{
                        padding: "50px",
                        color: "white",
                    }}
                >
                    <h2>Loading Dashboard...</h2>
                </div>
            </>
        );

    }

    return (
        <>
            <Navbar />

            <div
                style={{
                    maxWidth: "1200px",
                    margin: "40px auto",
                    padding: "0 30px",
                }}
            >

                <WelcomeBanner
                    name={user?.name || user?.email || "User"}
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "25px",
                        marginTop: "40px",
                    }}
                >

                    <StatCard
                        title="Total Interviews"
                        value={stats.total_interviews}
                    />

                    <StatCard
                        title="Average Score"
                        value={`${stats.average_score}%`}
                    />

                    <StatCard
                        title="Highest Score"
                        value={`${stats.highest_score}%`}
                    />

                    <StatCard
                        title="Latest Score"
                        value={`${stats.latest_score}%`}
                    />

                </div>

                <div
                    style={{
                        marginTop: "50px",
                        padding: "35px",
                        borderRadius: "18px",
                        background: "#1e293b",
                        border: "1px solid #334155",
                    }}
                >

                    <h2
                        style={{
                            color: "white",
                            marginBottom: "10px",
                        }}
                    >
                        Ready for another interview?
                    </h2>

                    <p
                        style={{
                            color: "#94a3b8",
                            marginBottom: "30px",
                        }}
                    >
                        Upload a resume and let InterviewForge AI generate a fresh technical interview tailored to your experience.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "20px",
                        }}
                    >

                        <button
                            onClick={() => navigate("/resume")}
                            style={{
                                padding: "14px 28px",
                                background: "#2563eb",
                                color: "white",
                                border: "none",
                                borderRadius: "10px",
                                cursor: "pointer",
                                fontSize: "16px",
                                fontWeight: "600",
                            }}
                        >
                            Upload Resume
                        </button>

                        <button
                            onClick={() => navigate("/history")}
                            style={{
                                padding: "14px 28px",
                                background: "#334155",
                                color: "white",
                                border: "none",
                                borderRadius: "10px",
                                cursor: "pointer",
                                fontSize: "16px",
                                fontWeight: "600",
                            }}
                        >
                            View History
                        </button>

                    </div>

                </div>

            </div>
        </>
    );

}

export default Dashboard;