import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styling/common.css";
import "./styling/RockPaperScissors.css";
import "./styling/EtchASketch.css";
import "./styling/TicTacToe.css";
import "./styling/Memory.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
