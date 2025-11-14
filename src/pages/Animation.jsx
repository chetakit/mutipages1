import React, { useState, useEffect, useRef } from "react";




const Animation = () => {
  const fieldWidth = 650;
  const fieldHeight = 400;
  const ballDiameter = 100;
  const maxX = fieldWidth - ballDiameter;
  const maxY = fieldHeight - ballDiameter;

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [running, setRunning] = useState(false);
  const [selectedButton, setSelectedButton] = useState("None");

  const goRightRef = useRef(true);
  const goDownRef = useRef(true);

  const vx = 20;
  const vy = 5;

  const ballRef = useRef();

  const buttons = ["None","Basketball","Football","Voleyball","Cartoon","Human","Logo"];

  // Ball movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        setX(prevX => {
          let nextX = goRightRef.current ? prevX + vx : prevX - vx;
          if (nextX >= maxX) goRightRef.current = false;
          if (nextX <= 0) goRightRef.current = true;
          return Math.min(Math.max(nextX, 0), maxX);
        });

        setY(prevY => {
          let nextY = goDownRef.current ? prevY + vy : prevY - vy;
          if (nextY >= maxY) goDownRef.current = false;
          if (nextY <= 0) goDownRef.current = true;
          return Math.min(Math.max(nextY, 0), maxY);
        });
      }
    }, 25);
    return () => clearInterval(interval);
  }, [running, vx, vy, maxX, maxY]);

  // Update ball style
  useEffect(() => {
    if (ballRef.current) {
      ballRef.current.style.left = x + "px";
      ballRef.current.style.top = y + "px";

  switch (selectedButton) {
  case "None":
    ballRef.current.style.backgroundImage = "none";
    ballRef.current.style.backgroundColor = "black";
    break;
  case "Basketball":
    ballRef.current.style.backgroundImage = "url('src/pages/basketball-png-1-.png')";
    break;
  case "Football":
    ballRef.current.style.backgroundImage = "url('src/pages/ucl.png')";
    break;
  case "Voleyball":
    ballRef.current.style.backgroundImage = "url('src/pages/Voleyball.png')";
    break;
  case "Cartoon":
    ballRef.current.style.backgroundImage = "url('src/pages/Batmancartoon.png')";
    break;
  case "Human":
    ballRef.current.style.backgroundImage = "url('src/pages/Herejin.png')";
    break;
  case "Logo":
    ballRef.current.style.backgroundImage = "url('src/pages/Real.png')";
    break;
  default:
    ballRef.current.style.backgroundImage = "none";
}


    }
  }, [x, y, selectedButton]);

  const handleRun = () => setRunning(!running);
  const handleSelect = (name) => setSelectedButton(name);
  const getRunBtn = () => running ? <i className="bi bi-pause"></i> : <i className="bi bi-play"></i>;

  return (
    <div style={{
      margin: "auto",
      width: fieldWidth + 40 + "px", // เผื่อ padding
      padding: "20px",
    //   border: "2px solid black",
      borderRadius: "15px",
      backgroundColor: "#f0f0f0"
    }}>

           <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Animation</h1>

      {/* Field */}
      <div
        style={{
          width: fieldWidth + "px",
          height: fieldHeight + "px",
          border: "2px solid black",
          borderRadius: "15px",
          backgroundImage: "url('./cement.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "relative",
          overflow: "hidden",
          margin: "0 auto"
        }}
      >
        <div
          ref={ballRef}
          style={{
            width: ballDiameter + "px",
            height: ballDiameter + "px",
            borderRadius: "50%",
            position: "absolute",
            left: x + "px",
            top: y + "px",
            backgroundColor: "black",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        ></div>
      </div>

      {/* Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button className={`btn ${running ? "btn-warning" : "btn-success"}`} onClick={handleRun}>
          {getRunBtn()}&nbsp;{running ? "PAUSE" : "Run"}
        </button>

        <div>
          {buttons.map(btn => (
            <button
              key={btn}
              className={`btn ${selectedButton === btn ? (btn === "None" ? "btn-secondary" : "btn-primary") : (btn === "None" ? "btn-outline-secondary" : "btn-outline-primary")} m-1`}
              onClick={() => handleSelect(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "1rem", fontWeight: "bold" }}>
       
      </div>
    </div>
  );
};

export default Animation;
