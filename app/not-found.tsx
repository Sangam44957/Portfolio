import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "500px" }}>
        {/* 404 Heading */}
        <h1
          style={{
            fontSize: "150px",
            fontWeight: "bold",
            lineHeight: 1,
            background: "linear-gradient(135deg, #00f0ff, #7b61ff, #ff006e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "16px",
          }}
        >
          404
        </h1>

        {/* Terminal style message */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "32px",
            fontFamily: "monospace",
            fontSize: "14px",
            textAlign: "left",
          }}
        >
          <p style={{ color: "#737373", marginBottom: "8px" }}>
            <span style={{ color: "#00f0ff" }}>❯</span> cd /requested-page
          </p>
          <p style={{ color: "#ef4444", marginBottom: "8px" }}>
            Error: Page not found in this dimension
          </p>
          <p style={{ color: "#737373", marginBottom: "8px" }}>
            <span style={{ color: "#00f0ff" }}>❯</span> suggest --fix
          </p>
          <p style={{ color: "#00ff88" }}>
            Try navigating to the homepage ↓
          </p>
        </div>

        {/* Home Button */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            background: "rgba(0, 240, 255, 0.1)",
            border: "1px solid rgba(0, 240, 255, 0.3)",
            borderRadius: "9999px",
            color: "#00f0ff",
            fontFamily: "monospace",
            fontSize: "14px",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
        >
          ← Go Home
        </Link>
      </div>
    </main>
  );
}