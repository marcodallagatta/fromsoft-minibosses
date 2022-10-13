export default function Scoreboard(props) {
  return <>
    <p>Current score: {props.currScore}</p>
    <p>High score: {props.highScore}</p>
  </>;
}
