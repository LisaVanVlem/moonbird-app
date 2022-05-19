import Bluetooth from "./Bluetooth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useContext } from "react";
import ExerciseContext from "../contexts/ExerciseContext";

function Header(props) {
  const moonbirdInfo = useContext(ExerciseContext);

  return (
    <div className="header">
      {props.displayBack ? (
        <button className="backButton">
          <FontAwesomeIcon icon={faArrowLeft} className="back" />
        </button>
      ) : (
        <div className="backButton" />
      )}
      <img src={require("../assets/logo.png")} alt="logo"></img>
      {props.displayBluetoothMute ? (
        <div className="bluetooth-mute">
          <Bluetooth />
          <button
            className="mute"
            onClick={() => {
              moonbirdInfo.setMuted(!moonbirdInfo.muted);
            }}
          >
            {moonbirdInfo.muted ? (
              <FontAwesomeIcon icon={faVolumeMute} className="volumeOff" />
            ) : (
              <FontAwesomeIcon icon={faVolumeHigh} className="volume" />
            )}
          </button>
        </div>
      ) : (
        <div className="bluetooth-mute" />
      )}
    </div>
  );
}

export default Header;
