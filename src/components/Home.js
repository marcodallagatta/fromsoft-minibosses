import rps from "../games/rock-paper-scissors/pictures/rules.png";
import etch from "../styling/UI/etch-preview.png";
import ttt from "../styling/UI/ttt-preview.png";
import mem from "../styling/UI/memory-preview.png";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="Home">
      <div className="title">
        <h1>
          <span className="from-soft">From Soft</span>
          <br />
          Minigames
        </h1>
        <div className="shadow-title">
          <p>
            <span className="from-soft">From Soft</span>
            <br />
            Minigames
          </p>
        </div>
      </div>
      <p className="home-description">
        Are you ready to face your biggest challenge yet?
        <br />
        Are you prepared to try and try again, until your will breaks?
        <br />
        Get ready, these won't be children's games! <em>(sort of)</em>
      </p>
      <div className="home-links">
        <Link to="rock-paper-scissors">
          <img src={rps} alt="Rock Paper Scissors" />
        </Link>
        <Link to="memory">
          <img src={mem} alt="Memory" />
        </Link>
        <Link to="etch-a-sketch">
          <img src={etch} alt="Etch A Sketch" />
        </Link>
        <Link to="tic-tac-toe">
          <img src={ttt} alt="Tic Tac Toe" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
