import { useEffect, useState } from "react";
import Card from "./Card";
import guardianApe from "../pictures/guardian-ape.png";
import gyoubu from "../pictures/gyoubu-oniwa.png";
import demon from "../pictures/hatred-demon.png";
import isshin from "../pictures/isshin-ashina.png";
import lady from "../pictures/lady-butterfly.png";
import owl from "../pictures/owl.png";
import saint from "../pictures/saint-isshin.png";
import monkeys from "../pictures/screen-monkeys.png";
import monk from "../pictures/true-monk.png";
import dragon from "../pictures/divine-dragon.png";
import genichiro from "../pictures/genichiro.png";
import shinobi from "../pictures/great-shinobi.png";

export default function Deck(props) {
  const defaultDeck = [
    {
      id: 0,
      picked: false,
      img: guardianApe,
    },
    {
      id: 1,
      picked: false,
      img: gyoubu,
    },
    {
      id: 2,
      picked: false,
      img: demon,
    },
    {
      id: 3,
      picked: false,
      img: isshin,
    },
    {
      id: 4,
      picked: false,
      img: lady,
    },
    {
      id: 5,
      picked: false,
      img: owl,
    },
    {
      id: 6,
      picked: false,
      img: saint,
    },
    {
      id: 7,
      picked: false,
      img: monkeys,
    },
    {
      id: 8,
      picked: false,
      img: monk,
    },
    {
      id: 9,
      picked: false,
      img: dragon,
    },
    {
      id: 10,
      picked: false,
      img: genichiro,
    },
    {
      id: 11,
      picked: false,
      img: shinobi,
    },
  ];

  const randomSequence = (max) => {
    let randSource = [];
    for (let i = 0; i < max; i++) {
      randSource.push(i);
    }

    let randDest = [];
    for (let i = 0; i < max; i++) {
      const randomIndex = Math.floor(Math.random() * randSource.length);
      randDest.push(randSource[randomIndex]);
      randSource.splice(randomIndex, 1);
    }
    return randDest;
  };

  const randDeckOfLength = (length) => {
    const filteredDeck = [];
    const randIndex = randomSequence(length);
    for (let i = 0; i < length; i++) {
      filteredDeck.push(defaultDeck[randIndex[i]]);
    }
    return filteredDeck;
  };

  const [playingDeck, setPlayingDeck] = useState(randDeckOfLength(props.cardsPerTurn[props.level]));

  // finds the array index for the current card object
  let currIndex = null;
  const updateCurrentIndex = (value) => {
    playingDeck.filter((obj, index) => {
      if (obj.id === value) currIndex = index;
      return obj.id === value;
    });
  };

  const gameOver = () => {
    props.timedSetSplash(
      <>
        <h2 className="lost">YOU DIED</h2>
        <p>
          <a href="/fromsoft-minibosses/">Go back home</a>
        </p>
      </>,
      9999,
      "fullscreen"
    );
  };

  const gameWon = () => {
    props.timedSetSplash(
      <>
        <h2 className="won">YOU WON</h2>
        <p>
          <a href="/fromsoft-minibosses/">Go back home</a>
        </p>
      </>,
      9999,
      "fullscreen"
    );
  };

  const checkLevelDone = () => {
    let count = 0;
    playingDeck.map((obj) => (obj.picked ? count++ : null));
    // I know the next click is a winning one
    //  so if the total-1 is equal to the count the level can be considered won
    return count === props.cardsPerTurn[props.level] - 1 ? true : false;
  };

  const nextLevel = () => {
    if (props.cardsPerTurn[props.level + 1] === undefined) {
      gameWon();
      return;
    }
    props.setLevel((p) => p + 1);
    props.timedSetSplash(
      <>
        <h2>LEVEL {props.level + 2}</h2>
      </>,
      2000,
      "fullscreen"
    );
    setPlayingDeck(randDeckOfLength(props.cardsPerTurn[props.level + 1]));
  };

  const shuffleCards = () => {
    setPlayingDeck((prev) => {
      const newObj = [...prev];
      newObj[currIndex].picked = true;
      checkLevelDone();
      let shuffled = {};

      // makes sure that the current clicked card will change place
      const checkIdForChange = newObj[currIndex].id;
      do {
        shuffled = newObj.sort((a, b) => 0.5 - Math.random());
      } while (checkIdForChange === shuffled[currIndex].id);

      return shuffled;
    });
  };

  const sendClick = (card) => {
    updateCurrentIndex(card.id);
    // card was already picked, game over
    if (playingDeck[currIndex].picked === true) {
      gameOver();
    } else {
      // card hasn't been clicked before, proceed
      props.setCurrScore((p) => p + 1);
      // current level is done, pass to the next one
      if (checkLevelDone()) {
        nextLevel();
        return;
      }
      // current level still in progress, proceed
      shuffleCards();
    }
  };

  useEffect(() => {
    if (props.currScore > props.highScore) props.setHighScore((p) => p + 1);
  }, [playingDeck]);

  return (
    <div className="Deck">
      {playingDeck.map((card, index) => {
        return <Card card={card} key={index} sendClick={sendClick} />;
      })}
    </div>
  );
}
