import React, { useState } from "react";

const API = process.env.REACT_APP_API_URL;  // ✅ use env variable

function Signup({ goHome }) {
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");

  const handleSignup = async () => {
    await fetch(`${API}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email.split("@")[0],
        email,
        passwordHash,
        role: "Consumer" // always Consumer
      })
    });
    alert("Consumer account created! Please login.");
    goHome();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Consumer Account</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
      <input
        type="password"
        placeholder="Password"
        value={passwordHash}
        onChange={e => setPasswordHash(e.target.value)}
      /><br />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={goHome}>Back</button>
    </div>
  );
}

export default Signup;
