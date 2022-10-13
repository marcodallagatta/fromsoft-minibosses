import LeftArrow from "../styling/UI/caret-left.svg";
import { Link } from "react-router-dom";

function Nav(props) {
  return (
    <div className="Nav">
      <div className="back-home">
        <a href="/fromsoft-minibosses/">
          <img src={LeftArrow} alt="Home" />
        </a>
      </div>
      <nav className="nav-title">
        <p>{props.title}</p>
      </nav>
    </div>
  );
}

export default Nav;
