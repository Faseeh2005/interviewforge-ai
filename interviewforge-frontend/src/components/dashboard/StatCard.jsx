function StatCard({ title, value }) {
    return (
        <div
            style={{
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "18px",
                padding: "28px",
                minHeight: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 10px 30px rgba(0,0,0,0.20)",
                transition: "transform 0.2s ease",
            }}
        >
            <p
                style={{
                    color: "#94a3b8",
                    fontSize: "15px",
                    margin: 0,
                    fontWeight: "500",
                }}
            >
                {title}
            </p>

            <h1
                style={{
                    color: "white",
                    fontSize: "42px",
                    margin: "16px 0 0",
                    fontWeight: "700",
                }}
            >
                {value}
            </h1>
        </div>
    );
}

export default StatCard;