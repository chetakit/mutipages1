import React from "react";
import "./Home.css"; // ✅ เพิ่ม CSS ย่อยได้

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="home-title">🏠 HOME PAGE</h2>

      <div className="student-info">
        <img
          src="src/pages/San.jpg"
          alt="chetakit"
          className="student-photo"
        />

        <div className="info-text">
          <h3>📘 Student Information</h3>

          <ul>
            <li><b>ชื่อ-นามสกุล: </b> Chetakit Subsuksanti</li>
            <li><b>มหาวิทยาลัย:</b> Sripatum University</li>
            <li><b>คณะ :</b> Information Technology</li>
            <li><b>สาขา :</b> Computer Science</li>
            <li><b>Student ID:</b> 67150490</li>
            <li><b>Email:</b> chetakit.sub@spumail.net</li>
          </ul>
        </div>
      </div>

      <div className="contact">
        <h3>📬 Contact</h3>
        <a href="https://www.facebook.com/chetakit.subsuksanti?locale=th_TH" target="_blank">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="https://www.instagram.com/__chetakit__/" target="_blank">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="https://www.threads.com/@__chetakit__" target="_blank">
          <i className="bi bi-threads-fill"></i>
        </a>
      </div>
    </div>
  );
};

export default Home;
