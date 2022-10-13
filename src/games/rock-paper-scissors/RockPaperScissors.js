import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav";
import Seppuku from "./pictures/seppuku.png";
import Comet from "./pictures/comet.png";
import Mimic from "./pictures/mimic.png";
import rules from "./pictures/rules.png";

export default function RockPaperScissor(props) {
  const firstRender = useRef(true);
  const animationRunning = useRef(false);
  const justPlayed = useRef(false);
  const rockDOM = useRef();
  const paperDOM = useRef();
  const scissorsDOM = useRef();
  const allCardsDOM = [rockDOM, paperDOM, scissorsDOM];
  const [turnsWon, setTurnsWon] = useState(0);
  const [turnsLost, setTurnsLost] = useState(0);
  const [turnsTied, setTurnsTied] = useState(0);
  const round = useRef(0);
  // possible winning combinations for the first value
  // based on index numbers of the 'choices' variable
  // rock/bleed = 0, paper/comet = 1, scissors/mimic = 2
  const winningCombo = ["10", "02", "21"];

  function computerPlay() {
    return Math.floor(Math.random() * 3);
  }

  // Graphic, animation
  function cardAnimationRoulette(rounds = 5, duration = 0.6, delay = 0.4) {
    rockDOM.current.style.animation = `card-pulse ${duration}s ${rounds}`;
    paperDOM.current.style.animation = `card-pulse ${duration}s ${delay / 2}s ${rounds}`;
    scissorsDOM.current.style.animation = `card-pulse ${duration}s ${delay}s ${rounds}`;
    const animLength = (delay + duration * rounds) * 1000;
    setTimeout(function () {
      allCardsDOM.forEach((item) => (item.current.style.animation = ""));
    }, animLength);
    return animLength;
  }

  const animationDelayInMs = 200;
  function cardSinglePulseOn(event) {
    if (animationRunning.current) return;
    event.target.style.animation = `card-zoom-in ${animationDelayInMs / 1000}s forwards`;
  }
  function cardSinglePulseOff(event) {
    if (animationRunning.current) return;
    if (justPlayed.current) {
      justPlayed.current = false;
      return;
    }
    event.target.style.animation = `card-zoom-out ${animationDelayInMs / 1000}s`;
    setTimeout(function () {
      event.target.style.animation = "";
    }, animationDelayInMs);
  }

  // Game routine
  function playRound(playerSelection) {
    animationRunning.current = true;
    justPlayed.current = true;
    allCardsDOM.forEach((elem) => elem.current.classList.remove("enemychoice", "mychoice", "samechoice"));
    let outputLength = cardAnimationRoulette(1);
    allCardsDOM[playerSelection].current.classList.add("mychoice");
    setTimeout(function () {
      const computerSelection = computerPlay();
      if (playerSelection === computerSelection) {
        allCardsDOM[computerSelection].current.classList.remove("mychoice");
        allCardsDOM[computerSelection].current.classList.add("samechoice");
      } else {
        allCardsDOM[computerSelection].current.classList.add("enemychoice");
        allCardsDOM[playerSelection].current.classList.add("mychoice");
      }
      round.current += 1;
      const challenge = `${playerSelection}${computerSelection}`;
      if (winningCombo.includes(challenge)) {
        setTurnsWon((prev) => prev + 1);
      } else if (playerSelection === computerSelection) {
        setTurnsTied((prev) => prev + 1);
      } else {
        setTurnsLost((prev) => prev + 1);
      }
      if (round.current > 4) {
        announceWinner();
        return;
      }
      let turnsLeftMessage = `${5 - round.current} turns left to play`;
      if (round.current === 4) turnsLeftMessage = `Last turn to play`;
      setTimeout(() => {
        if (winningCombo.includes(challenge)) {
          props.timedSetSplash(
            <>
              <h2>You won the turn</h2>
              <p>
                {turnsWon + 1} won, {turnsLost} lost, {turnsTied} ties
                <br />
                {turnsLeftMessage}
              </p>
            </>,
            3000,
            "popup"
          );
        } else if (playerSelection === computerSelection) {
          props.timedSetSplash(
            <div>
              <h2>It's a tie</h2>
              <p>
                {turnsWon} won, {turnsLost} lost, {turnsTied + 1} ties
                <br />
                {turnsLeftMessage}
              </p>
            </div>,
            3000,
            "popup"
          );
        } else {
          props.timedSetSplash(
            <>
              <h2>You lost the turn</h2>
              <p>
                {turnsWon} won, {turnsLost + 1} lost, {turnsTied} ties
                <br />
                {turnsLeftMessage}
              </p>
            </>,
            3000,
            "popup"
          );
        }
        animationRunning.current = false;
      }, outputLength - 600);
    }, outputLength);
  }

  function announceWinner() {
    if (turnsWon === turnsLost) {
      props.timedSetSplash(
        <>
          <h2 className="tied">GAME TIED</h2>
          <p>
            <a href="/fromsoft-minibosses/">Go back home</a>
          </p>
        </>,
        "forever",
        "fullscreen"
      );
    } else if (turnsWon > turnsLost) {
      props.timedSetSplash(
        <>
          <h2 className="won">YOU WON</h2>
          <p>
            <a href="/fromsoft-minibosses/">Go back home</a>
          </p>
        </>,
        "forever",
        "fullscreen"
      );
    } else {
      props.timedSetSplash(
        <>
          <h2 className="lost">YOU DIED</h2>
          <p>
            <a href="/fromsoft-minibosses/">Go back home</a>
          </p>
        </>,
        "forever",
        "fullscreen"
      );
    }
  }

  // mounting
  useEffect(() => {
    if (firstRender.current) {
      document.title = "Bleed Comet Mimic";
      window.scrollTo(0, 0);
      props.timedSetSplash(
        <>
          <h3>Bleed Comet Mimic</h3>
        </>,
        2000,
        "fullscreen"
      );
      firstRender.current = false;
    }
  }, []);

  return (
    <>
      <Nav title="Bleed Comet Mimic" />
      <div className="RockPaperScissors">
        <div className="explanation">
          <p>
            The game plays like regular 5-turns Rock Paper Scissors
            <br /> with the exception that those objects have been replace with way better ones.
          </p>

          <div className="legend">
            <img src={rules} alt="" />
          </div>

          <p>Time to git gud 🌞</p>
        </div>

        <div id="cards">
          <img
            src={Seppuku}
            className="card rock"
            ref={rockDOM}
            key={0}
            onMouseEnter={(e) => cardSinglePulseOn(e)}
            onMouseLeave={(e) => cardSinglePulseOff(e)}
            onClick={(e) => playRound(0)}
            alt="rock"
            draggable="false"
          />
          <img
            src={Comet}
            className="card paper"
            ref={paperDOM}
            key={1}
            onMouseEnter={(e) => cardSinglePulseOn(e)}
            onMouseLeave={(e) => cardSinglePulseOff(e)}
            onClick={(e) => playRound(1)}
            alt="paper"
            draggable="false"
          />
          <img
            src={Mimic}
            className="card scissors"
            ref={scissorsDOM}
            key={2}
            onMouseEnter={(e) => cardSinglePulseOn(e)}
            onMouseLeave={(e) => cardSinglePulseOff(e)}
            onClick={(e) => playRound(2)}
            alt="scissors"
            draggable="false"
          />
        </div>
      </div>
    </>
  );
}
