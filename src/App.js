import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import RouteSwitch from "./RouteSwitch";
import Home from "./components/Home";
import Memory from "./games/memory/Memory";
import TicTacToe from "./games/tic-tac-toe/TicTacToe";
import EtchASketch from "./games/etch-a-sketch/EtchASketch";
import RockPaperScissors from "./games/rock-paper-scissors/RockPaperScissors";
import Splashscreen from "./components/Splashscreen";
import Footer from "./components/Footer";

const App = () => {
  const [splash, setSplash] = useState(<div className="Splashscreen splashscreen-hidden"></div>);

  // either use type of 'fullscreen' or 'popup'
  const timedSetSplash = (content, msLength, type = "") => {
    const newSplash = <div className={`Splashscreen ${type}`}>{content}</div>;
    setSplash(newSplash);
    if (msLength === "forever") return;
    setTimeout(() => setSplash(<div className="Splashscreen splashscreen-hidden"></div>), msLength);
  };

  return (
    <div className="App">
      <Splashscreen content={splash} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memory" element={<Memory timedSetSplash={timedSetSplash} />} />
          <Route path="/tic-tac-toe" element={<TicTacToe timedSetSplash={timedSetSplash} />} />
          <Route path="/etch-a-sketch" element={<EtchASketch timedSetSplash={timedSetSplash} />} />
          <Route path="/rock-paper-scissors" element={<RockPaperScissors timedSetSplash={timedSetSplash} />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
