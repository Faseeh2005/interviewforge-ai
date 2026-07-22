import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav
            style={{
                height: "75px",
                background: "#1e293b",
                borderBottom: "1px solid #334155",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 40px",
            }}
        >
            <h2
                style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: "24px",
                }}
            >
                InterviewForge AI
            </h2>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "30px",
                }}
            >
                <Link
                    to="/dashboard"
                    style={{
                        color: "#cbd5e1",
                    }}
                >
                    Dashboard
                </Link>

                <Link
                    to="/history"
                    style={{
                        color: "#cbd5e1",
                    }}
                >
                    History
                </Link>

                <Link
                    to="/resume"
                    style={{
                        color: "#cbd5e1",
                    }}
                >
                    New Interview
                </Link>

                <button
                    onClick={handleLogout}
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 18px",
                        cursor: "pointer",
                        fontWeight: "600",
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;