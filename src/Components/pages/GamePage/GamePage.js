import React, { useState, useEffect, useRef } from "react";
import style from "./GamePage.styles.scss";

const Gamepage = () => {
  const [word, setword] = useState("dans");
  const [loading, setLoading] = useState("false");
  const [input, setInput] = useState("");
  const [score, setScore] = useState("0");
  const [placeholder, setPlaceholder] = useState(
    "start typing to start the game"
  );

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  //start timer//

  return (
    <div>
      <div className="gamepage-wrapper">
        <h1 className="game-title">OKTOBERFEST TASTESPILL </h1>
        <div className="game-container">
          <div className="random-text">
            <h3> Text to Type:</h3>
            <p> {word} </p>
          </div>

          <div className="input-container">
            <input
              type="text"
              className="text-field-input"
              value={input}
              placeholder={placeholder}
              onChange={inputHandler}
            />
          </div>
          <div className="timer-button-container">
            <div className="timer">
              <p>"02:00:00"</p>
            </div>
            <button className="start-button">Reset Game</button>
            <div className="Score-display">
              <p>Score: 0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamepage;
