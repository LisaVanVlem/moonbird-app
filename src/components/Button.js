import "./Button.css";

function Button(props) {
  return (
    <button
      className="button"
      style={{ width: props.width }}
      onClick={props.handler}
    >
      <div className="icon">{props.icon}</div>
      {props.text}
    </button>
  );
}

export default Button;
