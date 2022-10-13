import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Memory from "./games/memory/Memory";
import TicTacToe from "./games/tic-tac-toe/TicTacToe";
import EtchASketch from "./games/etch-a-sketch/EtchASketch";
import RockPaperScissors from "./games/rock-paper-scissors/RockPaperScissors";

const RouteSwitch = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memory" element={<Memory timedSetSplash={props.timedSetSplash} />} />
        <Route path="/tic-tac-toe" element={<TicTacToe timedSetSplash={props.timedSetSplash} />} />
        <Route path="/etch-a-sketch" element={<EtchASketch timedSetSplash={props.timedSetSplash} />} />
        <Route path="/rock-paper-scissors" element={<RockPaperScissors timedSetSplash={props.timedSetSplash} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
