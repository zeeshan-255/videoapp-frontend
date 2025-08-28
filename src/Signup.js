// import React, { useState } from "react";

// const API = process.env.REACT_APP_API_URL;  // ✅ use env variable

// function Signup({ goHome }) {
//   const [email, setEmail] = useState("");
//   const [passwordHash, setPasswordHash] = useState("");

//   const handleSignup = async () => {
//     await fetch(`${API}/users/signup`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         username: email.split("@")[0],
//         email,
//         passwordHash,
//         role: "Consumer" // always Consumer
//       })
//     });
//     alert("Consumer account created! Please login.");
//     goHome();
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Create Consumer Account</h2>
//       <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
//       <input
//         type="password"
//         placeholder="Password"
//         value={passwordHash}
//         onChange={e => setPasswordHash(e.target.value)}
//       /><br />
//       <button onClick={handleSignup}>Sign Up</button>
//       <button onClick={goHome}>Back</button>
//     </div>
//   );
// }

// export default Signup;


import React, { useState } from "react";

const API = process.env.REACT_APP_API_URL; // ✅ env variable

function Signup({ goHome }) {
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const validEmail = (v) => /\S+@\S+\.\S+/.test(v);
  const canSubmit = validEmail(email) && passwordHash.length >= 6 && !loading;

  const handleSignup = async () => {
    if (!canSubmit) return;
    setErr("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email.split("@")[0],
          email,
          passwordHash,
          role: "Consumer",
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Signup failed (${res.status})`);
      }

      alert("Consumer account created! Please login.");
      goHome();
    } catch (e) {
      setErr(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && canSubmit) handleSignup();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      >
        <source src="https://res.cloudinary.com/dyh8wkiqp/video/upload/v1756331756/3569294-hd_1920_1080_24fps_s3likd.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.55))",
          zIndex: -1,
        }}
      />

      {/* Card */}
      <div
        style={{
          width: "92%",
          maxWidth: 420,
          background: "rgba(20,20,20,0.72)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          borderRadius: 24,
          padding: 24,
          backdropFilter: "blur(8px)",
        }}
      >
        <h2
          style={{
            margin: 0,
            marginBottom: 8,
            fontSize: 24,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Create Consumer Account
        </h2>
        <p
          style={{
            margin: 0,
            marginBottom: 24,
            fontSize: 13,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
          }}
        >
          Join and start sharing.
        </p>

        {/* Inputs */}
        <div style={{ display: "grid", gap: 12 }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={onKeyDown}
            inputMode="email"
            style={{
              width: "90%",
              padding: "14px 16px",
              background: "#0f0f0f",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 9999,
              outline: "none",
              fontSize: 14,
              transition: "border-color 0.2s ease, background-color 0.2s ease",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#fff")}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")
            }
          />

          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={passwordHash}
            onChange={(e) => setPasswordHash(e.target.value)}
            onKeyDown={onKeyDown}
            style={{
              width: "90%",
              padding: "14px 16px",
              background: "#0f0f0f",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 9999,
              outline: "none",
              fontSize: 14,
              transition: "border-color 0.2s ease, background-color 0.2s ease",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#fff")}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")
            }
          />
        </div>

        {/* Error */}
        {err ? (
          <div
            style={{
              marginTop: 12,
              fontSize: 13,
              color: "#ff9aa2",
              textAlign: "center",
            }}
          >
            {err}
          </div>
        ) : null}

        {/* Buttons */}
        <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
          <button
            onClick={handleSignup}
            disabled={!canSubmit}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 9999,
              backgroundColor: canSubmit ? "#FE2C55" : "#a1a1a1",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              border: "none",
              cursor: canSubmit ? "pointer" : "not-allowed",
              transition: "background-color 0.2s ease, transform 0.05s ease",
              transform: loading ? "scale(0.99)" : "none",
            }}
            onMouseOver={(e) => {
              if (canSubmit) e.currentTarget.style.backgroundColor = "#e0254b";
            }}
            onMouseOut={(e) => {
              if (canSubmit) e.currentTarget.style.backgroundColor = "#FE2C55";
            }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <button
            onClick={goHome}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 9999,
              backgroundColor: "#fff",
              color: "#000",
              fontWeight: 700,
              fontSize: 16,
              border: "1px solid #d4d4d4",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#f2f2f2")
            }
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
          >
            Back
          </button>
        </div>

        {/* Tiny helper text */}
        <p
          style={{
            marginTop: 12,
            fontSize: 12,
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          By signing up you agree to our Terms and acknowledge our Privacy
          Policy.
        </p>
      </div>
    </div>
  );
}

export default Signup;
