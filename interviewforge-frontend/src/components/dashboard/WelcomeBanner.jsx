function WelcomeBanner({ name }) {
    return (
        <div
            style={{
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "18px",
                padding: "35px 40px",
                marginBottom: "40px",
            }}
        >
            <h1
                style={{
                    margin: 0,
                    color: "white",
                    fontSize: "38px",
                    fontWeight: "700",
                }}
            >
                Welcome back, {name} 👋
            </h1>

            <p
                style={{
                    marginTop: "14px",
                    marginBottom: 0,
                    color: "#94a3b8",
                    fontSize: "18px",
                    lineHeight: "1.6",
                }}
            >
                Ready for another interview? Upload your resume, practice with AI,
                and track your progress over time.
            </p>
        </div>
    );
}

export default WelcomeBanner;