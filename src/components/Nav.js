import LeftArrow from "../styling/UI/caret-left.svg";

function Nav(props) {
  return (
    <div className="Nav">
      <div className="back-home">
        <a href="/">
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
