export default function Card(props) {
  return (
    <div className="Card" onClick={props.sendClick.bind(this, props.card)}>
      <img src={props.card.img} alt="Memory Card" />
    </div>
  );
}
