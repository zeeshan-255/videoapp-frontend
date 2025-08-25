import React from "react";

function Home({ goLogin, goSignup }) {
  return (
    <div style={{ padding: 20 }}>
      <h1> Welcome to Video Sharing App</h1>
      <button onClick={goLogin}>Login</button>
      <button onClick={goSignup}>Create Account (Consumers only)</button>
    </div>
  );
}

export default Home;
