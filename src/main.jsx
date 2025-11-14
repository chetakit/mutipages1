import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap-icons/font/bootstrap-icons.css";

// ✅ โหลด Bootstrap CSS ก่อน
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

// ✅ โหลดไฟล์ CSS ของเรา
import "./index.css";

// ✅ โหลด App หลัก
import App from "./App.jsx";

// ✅ โหลด Bootstrap JS ด้วย dynamic import (ให้แน่ใจว่ามันเข้า window)
import("bootstrap/dist/js/bootstrap.bundle.js").then(() => {
  console.log("✅ Bootstrap JS Loaded!");
  console.log("window.bootstrap =", window.bootstrap);
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
