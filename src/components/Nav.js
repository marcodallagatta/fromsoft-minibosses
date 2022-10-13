import LeftArrow from "../styling/UI/caret-left.svg";
import { Link } from "react-router-dom";

function Nav(props) {
  window.scrollTo(0, 0);

  return (
    <div className="Nav">
      <div className="back-home">
        <Link to="/">
          <img src={LeftArrow} alt="Home" />
        </Link>
      </div>
      <nav className="nav-title">
        <p>{props.title}</p>
      </nav>
    </div>
  );
}

export default Nav;
