import "./Pie.css";

function Pie(props) {
  return (
    <div
      className="pie"
      style={{
        "--from": props.from,
        "--percent": props.percent,
        "--border": props.border,
        "--color": props.color,
        "--width": props.width,
      }}
    ></div>
  );
}

export default Pie;
