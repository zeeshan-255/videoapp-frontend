import React, { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    setPage("home");
  };

  if (user) {
    return <Dashboard user={user} logout={handleLogout} />;
  }

  if (page === "login") {
    return <Login setUser={setUser} goHome={() => setPage("home")} />;
  }

  if (page === "signup") {
    return <Signup goHome={() => setPage("home")} />;
  }

  return <Home goLogin={() => setPage("login")} goSignup={() => setPage("signup")} />;
}

export default App;
