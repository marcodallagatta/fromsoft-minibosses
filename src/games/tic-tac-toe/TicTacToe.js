/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import Nav from "../../components/Nav";
import bloodred from "./pictures/bloodred.png";
import bone from "./pictures/bone.png";
import estus from "./pictures/estus.png";
import powder from "./pictures/powder.png";
import prism from "./pictures/prism.png";
import purple from "./pictures/purple.png";

const TicTacToe = (props) => {
  const boardDOM = useRef(null);
  const turnDOM = useRef(null);
  const turnsInputDOM = useRef(null);
  const formButtonDOM = useRef(null);
  const player1nameDOM = useRef();
  const player2nameDOM = useRef();
  const firstRender = useRef(true);
  const [turns, setTurns] = useState(1);
  const [gameboard, setGameboard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [players, setPlayers] = useState([]);
  const [turnWon, setTurnWon] = useState(false);
  const cellsDOM = document.querySelectorAll(".gameboard .cell");
  const solutions = ["012", "345", "678", "036", "147", "258", "840", "246"];
  const symbolsImg = [estus, powder, bloodred, bone, prism, purple];

  const createPlayers = (name1, name2, symbol1, symbol2) => {
    if (players.length >= 2) return;
    const newPlayer1 = {
      name: name1,
      sign: symbolsImg[symbol1],
      turn: Math.random() >= 0.5 ? true : false,
      points: 0,
    };
    const newPlayer2 = {
      name: name2,
      sign: symbolsImg[symbol2],
      turn: !newPlayer1.turn,
      points: 0,
    };
    setPlayers([newPlayer1, newPlayer2]);
  };

  const play = (cell) => {
    if (turnWon) return;
    if (cell.target.innerText === "") {
      let sign = nextInLine().sign;
      let cellNum = window.getComputedStyle(cell.target, "::before").getPropertyValue("content").replaceAll('"', "");
      updateGameboard(cellNum - 1, sign);
    }
  };

  const updateGameboard = (cell, symbol) => {
    setGameboard((prev) => {
      let tempBoard = [...prev];
      tempBoard[cell] = symbol;
      return tempBoard;
    });
  };

  const nextInLine = () => {
    return players.find((e) => e.turn === true);
  };

  const nextTurn = () => {
    const current = players[0].turn;
    setPlayers((prev) => {
      const temp = [...prev];
      temp[0].turn = !current;
      temp[1].turn = current;
      return temp;
    });
  };

  const addPoint = (winner) => {
    setPlayers((prev) => {
      const temp = [...prev];
      temp[winner].points += 0.5;
      return temp;
    });
  };

  const isThereWinner = () => {
    if (turnWon) return;
    solutions.forEach((sol) => {
      if (
        // some winning cells combinations are not filled
        gameboard[sol[0]] === "" &&
        gameboard[sol[1]] === "" &&
        gameboard[sol[2]] === ""
      ) {
        return;
      }
      const signCheck = gameboard[sol[0]];
      if (
        // a player has won
        gameboard[sol[0]] === signCheck &&
        gameboard[sol[1]] === signCheck &&
        gameboard[sol[2]] === signCheck
      ) {
        // shows splash screen on turn end
        if (turns > 0) {
          setTimeout(() => {
            if (turns > 1)
              props.timedSetSplash(
                <>
                  <h2>
                    {turns - 1} {turns - 1 > 1 ? "turns" : "turn"} left
                  </h2>
                  <p>
                    {players[0].name}: {players[0].points} points / {players[1].name}: {players[1].points} points
                  </p>
                </>,
                2000,
                "popup"
              );
            nextGameTurn();
          }, 1000);
        }
        setTurnWon(true);
        const winner = signCheck === players[0].sign ? 0 : 1;
        addPoint(winner);
        playerWon(winner, sol);
        return;
      }
    });
    if (gameboard.join("").length === 9 && !turnWon) {
      // if the whole cell is filled without a winner it's a tie
      playerWon(2);
    }
  };

  const playerWon = (player, winningCells = "") => {
    if (player !== 2) {
      // a player won
      const color = player === 0 ? "rgba(242, 195, 107, 0.5)" : "rgba(39, 102, 140, 0.5)";
      winningCells.split("").forEach((cellIndex) => {
        cellsDOM[cellIndex].style.backgroundColor = color;
      });
      return;
    } else {
      // tie
      boardDOM.current.style.backgroundColor = "black";
      turnDOM.current.innerText = "It's a tie!";
    }
  };

  const sendFormFields = (player1nameDOM, player2nameDOM, turnsInput) => {
    const player1symbol = document.querySelector(".player1Sign > img.selected").dataset.src;
    const player2symbol = document.querySelector(".player2Sign > img.selected").dataset.src;
    setTurns(parseInt(turnsInput.current.value, 10));
    firstRender.current = false;
    createPlayers(player1nameDOM.current.value, player2nameDOM.current.value, player1symbol, player2symbol);
    props.timedSetSplash(null, 0);
  };

  const selectImgInput = (e, player, calledElem) => {
    const symbols = document.querySelectorAll(`.${player} .playerSign img`);
    symbols.forEach((s, index) => {
      if (index === calledElem) s.classList = "selected";
      if (index !== calledElem) s.classList = "";
    });
  };

  const checkFilledForms = () => {
    if (turnsInputDOM.current.value !== "" && player1nameDOM.current.value !== "" && player2nameDOM.current.value !== "") {
      formButtonDOM.current.style = "visibility: visible; opacity: 1; transition: all .2s ease-in";
    } else {
      formButtonDOM.current.style = " visibility: hidden; opacity: 0; transition: all .2s ease-in";
    }
  };

  const splashChoosePlayerElement = (
    <div className="tictactoeSplash">
      <h2>Please choose the name of the players and their symbols:</h2>
      <form onSubmit={(e) => e.preventDefault()} onChange={checkFilledForms}>
        <div className="turns">
          <input type="number" min="1" placeholder="Turns" name="turns" id="turns" ref={turnsInputDOM} />
        </div>
        <div className="playerdata player1data">
          <input type="text" ref={player1nameDOM} name="player1nameDOM" placeholder="Player A Name" className="player1nameDOM" />
          <div className="playerSign player1Sign">
            <img src={estus} data-src="0" onClick={(e) => selectImgInput(e, "player1data", 0)} className="selected" alt="Player 1 Symbol 1" />
            <img src={powder} data-src="1" onClick={(e) => selectImgInput(e, "player1data", 1)} alt="Player 1 Symbol 2" />
            <img src={bloodred} data-src="2" onClick={(e) => selectImgInput(e, "player1data", 2)} alt="Player 1 Symbol 3" />
          </div>
        </div>
        <div className="playerdata player2data">
          <input type="text" ref={player2nameDOM} name="player2nameDOM" placeholder="Player B Name" />
          <div className="playerSign player2Sign">
            <img src={bone} data-src="3" className="selected" onClick={(e) => selectImgInput(e, "player2data", 0)} alt="Player 2 Symbol 1" />
            <img src={prism} data-src="4" onClick={(e) => selectImgInput(e, "player2data", 1)} alt="Player 2 Symbol 2" />
            <img src={purple} data-src="5" onClick={(e) => selectImgInput(e, "player2data", 2)} alt="Player 2 Symbol 3" />
          </div>
        </div>
        <button
          type="submit"
          ref={formButtonDOM}
          style={{ visibility: "hidden", opacity: "0", transition: "all .2s ease-in" }}
          onClick={sendFormFields.bind(this, player1nameDOM, player2nameDOM, turnsInputDOM)}
        >
          Start Game
        </button>
      </form>
    </div>
  );

  const nextGameTurn = () => {
    nextTurn();
    setTurns((prev) => prev - 1);
    setTurnWon(false);
    setGameboard(["", "", "", "", "", "", "", "", ""]);
    cellsDOM.forEach((cell) => (cell.style.backgroundColor = ""));
  };

  // mounting
  useEffect(() => {
    if (firstRender.current) {
      document.title = "Pin Bell Gwyn";
      props.timedSetSplash(
        <>
          <h3>Pin Bell Gwyn</h3>
        </>,
        2000,
        "fullscreen"
      );
      setTimeout(() => {
        props.timedSetSplash(splashChoosePlayerElement, "forever", "fullscreen");
      }, 2000);
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) return;
    if (turnWon) return;
  }, [players]);

  useEffect(() => {
    if (firstRender.current) return;
    nextTurn();
    if (turnWon) return;
    isThereWinner();
  }, [gameboard]);

  const whoWon = () => {
    const scores = players.map((pl) => pl.points);
    if (scores[0] === scores[1]) return "Oops! It's a tie!";
    const wonIndex = scores.indexOf(Math.max(...scores));
    return `${players[wonIndex].name} won!`;
  };

  // no more turns left to play, game is done!
  useEffect(() => {
    if (turns > 0) return;
    props.timedSetSplash(
      <div className="tictactoeSplash">
        <h2>{whoWon()}</h2>
        <p>
          <a href="/">Go back home</a>
          <a href="/tic-tac-toe">Play again</a>
        </p>
      </div>,
      "forever",
      "fullscreen"
    );
  }, [turns]);

  const cellsMap = gameboard.map((cell, index) => {
    if (cell === "") {
      return <div className="cell" key={index} onClick={play} style={turnWon ? { cursor: "default" } : { cursor: "pointer" }}></div>;
    } else {
      return (
        <div className="cell" key={index}>
          <img src={cell} alt="" />
        </div>
      );
    }
  });

  return (
    <>
      <Nav title="Pin Bell Gwyn" />
      <div className="TicTacToe">
        <div className="explanation">
          <p>
            <em>When the Ashes are three, a flame alighteth.</em>
            <br />- Ashes of Ariandel
          </p>
        </div>
        <div className="gameboard" ref={boardDOM}>
          {cellsMap}
        </div>
        <div className="turn" ref={turnDOM}></div>
      </div>
    </>
  );
};

export default TicTacToe;
