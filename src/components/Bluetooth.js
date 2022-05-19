import Pie from "./Pie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBluetoothB } from "@fortawesome/free-brands-svg-icons";
import "./Bluetooth.css";
import { useContext } from "react";
import ExerciseContext from "../contexts/ExerciseContext";

function Bluetooth(props) {
  const moonbirdInfo = useContext(ExerciseContext);

  let percent;
  switch (moonbirdInfo.bluetoothConnection) {
    case "good":
      percent = "80";
      break;
    case "medium":
      percent = "40";
      break;
    case "bad":
      percent = "10";
      break;
    default:
      percent = "10";
  }

  return (
    <div className="bluetooth">
      <Pie
        from="215deg"
        percent={percent}
        border="2px"
        color="var(--dark)"
        width="35px"
        className="bluetoothCircle"
      />
      <FontAwesomeIcon icon={faBluetoothB} className="bluetoothIcon" />
    </div>
  );
}

export default Bluetooth;
