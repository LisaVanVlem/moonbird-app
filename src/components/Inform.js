import "./Inform.css";

function Inform(props) {
  return (
    <div className="inform">
      <p className="small">{props.small}</p>
      <p className="large">{props.large}</p>
    </div>
  );
}

export default Inform;
