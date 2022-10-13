import { useState, useRef, useEffect } from "react";
import Cell from "./Cell";
import Nav from "../../components/Nav";

const EtchASketch = (props) => {
  const firstRender = useRef(true);
  const gridDOM = useRef(null);
  const gridSize = useRef(100);
  const [grid, setGrid] = useState([]);

  const initialGridMake = (squares = 100) => {
    setGrid(Array.from(Array(squares).keys()));
    gridSize.current = squares;
    // generated the correct number of '1fr' for the container grid after resetting it
    gridDOM.current.style.gridTemplateColumns = "";
    const sideNum = Math.sqrt(squares);
    for (let x = 0; x < sideNum; x++) {
      gridDOM.current.style.gridTemplateColumns += " 1fr";
    }
  };

  const reset = () => {
    const gridElems = document.querySelectorAll("#grid div");
    gridElems.forEach((item) => {
      item.style.background = "";
      item.style.opacity = "";
    });
  };

  const maxSize = 24;
  function createNewGrid() {
    let size;
    while (size > maxSize || isNaN(size)) {
      size = prompt(`Input columns for new grid, maximum is ${maxSize}:`);
      if (size === null) return;
      if (size > maxSize || isNaN(size)) alert(`Please select a grid with a maximum size of ${maxSize}`);
    }
    reset();
    initialGridMake(size * size);
    gridSize.current = size * size;
  }

  // mounting
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      window.scrollTo(0, 0);
      document.title = "Etch a Beast";
      props.timedSetSplash(
        <>
          <h3>Etch a Beast</h3>
        </>,
        2000,
        "fullscreen"
      );
      initialGridMake(gridSize.current);
    }
  }, []);

  return (
    <>
      <Nav title="Etch a Beast" />
      <div className="EtchASketch">
        <div className="explanation">
          <p>
            Tired of having your kid complain because he's not allowed to play Bloodborne?
            <br />
            Just lie straight to his face and tell him that this is the game!
            <br />
            Just be sure to play this with a mouse, you <em>beast</em>.
          </p>
        </div>

        <div className="buttons">
          <div className="resetButton">
            <button type="button" name="Hover" onClick={reset}>
              Reset Grid
            </button>
          </div>
          <div className="newGridButton">
            <button type="button" name="Hover" onClick={createNewGrid}>
              New Grid
            </button>
          </div>
        </div>

        <div id="grid" ref={gridDOM}>
          {grid.map((card, index) => {
            return <Cell key={index} index={index} setGrid={setGrid} bgColor={typeof grid[index] !== "number" ? grid[index] : "inherit"} />;
          })}
        </div>
      </div>
    </>
  );
};

export default EtchASketch;
