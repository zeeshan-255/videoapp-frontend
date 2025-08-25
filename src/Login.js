import React, { useState } from "react";

const API = process.env.REACT_APP_API_URL;  // ✅ use env variable

function Login({ setUser, goHome }) {
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");

  const handleLogin = async () => {
    const res = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, passwordHash })
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user); // Role comes from backend
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" value={passwordHash} onChange={e => setPasswordHash(e.target.value)} /><br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={goHome}>Back</button>
    </div>
  );
}

export default Login;
