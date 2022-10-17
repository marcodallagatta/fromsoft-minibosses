import Nav from "../../components/Nav.tsx";
import Deck from "./components/Deck";
import { useEffect, useState, useRef } from "react";

export default function Memory(props) {
  const firstRender = useRef(true);
  const [currScore, setCurrScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cardsPerTurn, setCardsPerTurn] = useState([3, 6, 9, 12]);
  const [level, setLevel] = useState(0);

  // mounting
  useEffect(() => {
    if (firstRender.current) {
      document.title = "Idol's Riddle";
      window.scrollTo(0, 0);
      props.timedSetSplash(
        <>
          <h3>Idol's Riddle</h3>
        </>,
        2000,
        "fullscreen"
      );
      firstRender.current = false;
    }
  }, []);

  return (
    <>
      <Nav title="Idol's Riddle" />
      <div className="Memory">
        <div className="explanation">
          <p>
            Help Sekiro recollects his thoughts with this incresingly-challenging game of Memory.
            <br />
            Simply choose a Memory, and then be sure to not choose <em>the same one</em> before the turns ends.
          </p>
          <p>Will you be able to reach the end?</p>
        </div>
        <div className="memory-container">
          {/* <Scoreboard currScore={currScore} highScore={highScore} /> */}
          <Deck
            cardsPerTurn={cardsPerTurn}
            setCardsPerTurn={setCardsPerTurn}
            level={level}
            setLevel={setLevel}
            currScore={currScore}
            highScore={highScore}
            setCurrScore={setCurrScore}
            setHighScore={setHighScore}
            timedSetSplash={props.timedSetSplash}
          />
        </div>
      </div>
    </>
  );
}
