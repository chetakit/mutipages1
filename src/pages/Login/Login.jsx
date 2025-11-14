import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { verifyUser } from "../../data/users";
import "./Login.css";

const Login = ({ setToken, setRole }) => {
  const [mood, setMood] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (isLoggingIn) return;

    const box = document.querySelector(".login-box");
    box.classList.remove("login-glow", "login-fadeout", "shake-box");

    if (verifyUser(username, password)) {
      setMood("success");
      setError("");
      setIsLoggingIn(true);

      box.classList.add("login-glow");
      createParticles();

      setTimeout(() => {
        box.classList.add("login-fadeout");
        setTimeout(() => {
          const fakeToken = "key_token";
          const userRole = username === "admin" ? "admin" : "user";
          setToken(fakeToken);
          setRole(userRole);
          localStorage.setItem("token", fakeToken);
          localStorage.setItem("role", userRole);
        }, 1200);
      }, 1200);
    } else {
      setMood("fail");
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง ❌");
      box.classList.add("shake-box");

      setTimeout(() => {
        box.classList.remove("shake-box");
        setMood("");
      }, 800);
    }
  };

  const createParticles = () => {
    const container = document.querySelector(".avatar-wrapper");
    if (!container) return;
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div");
      particle.className = "gold-particle";
      container.appendChild(particle);

      const angle = Math.random() * 2 * Math.PI;
      const radius = 60 + Math.random() * 40;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      particle.style.setProperty("--x", `${x}px`);
      particle.style.setProperty("--y", `${y}px`);

      setTimeout(() => particle.remove(), 1500);
    }
  };
      // 🌠 ดาวตกพื้นหลัง
  React.useEffect(() => {
    const container = document.querySelector(".login-page");
    if (!container) return;

    const interval = setInterval(() => {
      const star = document.createElement("div");
      star.classList.add("shooting-star");
      star.style.left = Math.random() * window.innerWidth + "px";
      star.style.animationDuration = 3 + Math.random() * 2 + "s";
      star.style.opacity = 0.3 + Math.random() * 0.7;
      container.appendChild(star);

      setTimeout(() => star.remove(), 4000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="login-page">
      <div className="login-box">
        <div className={`avatar-wrapper ${mood}`}>
          <div className="avatar-core">
            <div className="eyes"></div>
            <div className="mouth"></div>
            <div className="mask"></div> {/* 🩶 เพิ่มผ้าปิดตา */}
          </div>
        </div>

        <h3 className="login-title">🔒 Login</h3>

        <Form className="login-form" onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onFocus={() => setMood("focus-username")}
              onBlur={() => setMood("")}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="User"
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onFocus={() => setMood("focus-password")}
              onBlur={() => setMood("")}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="pass"
              autoComplete="off"
            />
          </Form.Group>

          {error && <p className="error-text">{error}</p>}

          <Button
            type="submit"
            className="luxury-btn"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
