import LeftArrow from "../styling/UI/caret-left.svg";

function Nav(props: { title: string }) {
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
