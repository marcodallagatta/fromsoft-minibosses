import LeftArrow from "../styling/UI/caret-left.svg";
import { Link } from "react-router-dom";

function Nav(props) {
  return (
    <div className="Nav">
      <div className="back-home">
        <Link to="/fromsoft-minibosses/">
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
