import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../Components/AppHeader";
import AppNavbar from "../Components/AppNavbar";
import "./AppLayout.css";

function AppLayout({ setToken, role }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);

    // 👋 สร้างอีโมจิ logout animation
    const emoji = document.createElement("div");
    emoji.className = "logout-avatar";
    emoji.textContent = "👋";
    document.body.appendChild(emoji);

    // ให้ทั้งหน้า slide ออกทางขวา
    const layout = document.querySelector(".app-layout");
    layout.classList.add("logout-slide");

    // ⏳ ดีเลย์ให้อนิเมชัน smooth ขึ้น
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setToken(null);
      emoji.remove();
      layout.classList.remove("logout-slide");
      setIsLoggingOut(false);
    }, 1600);
  };

  return (
    <div className={`app-layout ${isLoggingOut ? "fade-out" : ""}`}>
      <AppHeader />

      {/* ✅ จัด Navbar ให้อยู่ตรงกลาง */}
      <div className="layout-top">
        <div className="navbar-wrapper">
          <AppNavbar />
        </div>

        <div className="layout-role">
          <div className="d-flex align-items-center text-secondary">
            <i
              className="bi bi-person-fill me-1"
              style={{ fontSize: "1.2rem", color: "purple" }}
            ></i>
            <span className="fw-semibold text-dark badge bg-primary text-white px-2 py-1">
              {role ? role.toUpperCase() : "GUEST"}
            </span>
          </div>

          <button
            className="btn btn-outline-danger fw-bold px-3 py-1 logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div
        style={{
          border: "1px solid black",
          margin: "20px auto",
          padding: "20px",
          borderRadius: "8px",
          minHeight: "150px",
          textAlign: "center",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
