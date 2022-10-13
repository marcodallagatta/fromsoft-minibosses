import { useRef } from "react";

export default function Cell(props) {
  const cellRef = useRef();
  const BBcolorPalette = [
    "rgba(48,48,48,0.3)",
    "rgba(48,48,72,0.3)",
    "rgba(72,72,72,0.3)",
    "rgba(96,96,96,0.3)",
    "rgba(72,48,48,0.3)",
    "rgba(72,72,48,0.3)",
    "rgba(48,72,72,0.3)",
    "rgba(72,72,96,0.3)",
    "rgba(24,48,48,0.3)",
    "rgba(96,72,48,0.3)",
    "rgba(24,24,48,0.3)",
    "rgba(96,96,72,0.3)",
    "rgba(96,72,72,0.3)",
    "rgba(72,48,72,0.3)",
    "rgba(120,120,120,0.3)",
    "rgba(72,96,96,0.3)",
  ];

  const addCellColor = () => {
    let color = BBcolorPalette[Math.floor(Math.random() * BBcolorPalette.length)];
    props.setGrid((prev) => {
      const temp = [...prev];
      temp[props.index] = color;
      return temp;
    });
  };
  const addFullCellColor = () => {
    let color = BBcolorPalette[Math.floor(Math.random() * BBcolorPalette.length)].replace("0.3", "1.0");
    props.setGrid((prev) => {
      const temp = [...prev];
      temp[props.index] = color;
      return temp;
    });
  };

  const handleMouseEnter = () => {
    const currColor = cellRef.current.style.backgroundColor;
    if (!currColor || currColor === "inherit") {
      addCellColor();
    } else {
      let newColor = currColor;
      if (currColor.includes("0.3")) newColor = currColor.replace("0.3", "0.6");
      if (currColor.includes("0.6")) newColor = currColor.replace("0.6", "1.0");
      cellRef.current.style.backgroundColor = newColor;
    }
  };

  return (
    <div className="cell" style={{ backgroundColor: props.bgColor }} ref={cellRef} data-color={props.bgColor} onMouseEnter={handleMouseEnter} onClick={addFullCellColor}></div>
  );
}
