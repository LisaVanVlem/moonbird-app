import Button from "../../components/Button";
import Header from "../../components/Header";
import Inform from "../../components/Inform";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStop,
  faHeart,
  faClock,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import "./Exercise.css";
import Pie from "../../components/Pie";
import { useContext, useState, useEffect } from "react";
import ExerciseContext from "../../contexts/ExerciseContext";

function Exercise() {
  const totalTime = 900;
  const moonbirdInfo = useContext(ExerciseContext);

  const [status, setStatus] = useState("ready"); //ready/started/paused/stopt/finished
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  let formatNumber = (number) => {
    return ("0" + number).slice(-2);
  };

  useEffect(() => {
    let interval = null;

    if (timerOn && time < totalTime) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (time >= totalTime) {
      setStatus("finished");
      setTimerOn(false);
      clearInterval(interval);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn, status, time]);

  let smallText;
  let largeText;

  switch (status) {
    case "ready":
      smallText = "Relax, let's breathe";
      largeText = "Ready, set, go!";
      break;
    case "started":
      smallText = "just breathe";
      largeText = "You are doing great!";
      break;
    case "paused":
      smallText = "inhale, exhale";
      largeText = "Taking a break";
      break;
    case "stopt":
      smallText = "interrupted";
      largeText = "Good job!";
      break;
    case "finished":
      smallText = "finished";
      largeText = "well done!";
      break;
    default:
      smallText = "";
      largeText = "";
  }

  return (
    <div
      className={
        status === "stopt" || status === "finished"
          ? "exercise gradient"
          : "exercise"
      }
    >
      <div className="largeScreen">
        Your screen is too big, make it smaller, this is a mobile app! ;)
      </div>
      <Header
        displayBack={
          status === "ready" || status === "stopt" || status === "finished"
        }
        displayBluetoothMute={
          status === "started" || status === "paused" || status === "ready"
        }
      />
      <Inform small={smallText} large={largeText} />
      {status === "ready" ? (
        <div className="ready">
          <div className="spacer"></div>
          <p className="title">Evening relaxation</p>
          <p className="time">
            {formatNumber(Math.floor(totalTime / 60)) +
              ":" +
              formatNumber(totalTime % 60)}
          </p>
          <div className="playButton">
            <Button
              icon={<FontAwesomeIcon icon={faPlay} className="play" />}
              text="Let's do this"
              handler={() => {
                setStatus("started");
                setTimerOn(true);
              }}
            ></Button>
          </div>
        </div>
      ) : null}
      {(status === "started" || status === "paused") && (
        <div className="started">
          <div className="timer">
            <Pie
              from="0deg"
              percent={(time / totalTime) * 100}
              border="5px"
              color={"var(--accent)"}
              width="210px"
            ></Pie>
            {status === "started" && (
              <div className="timerContent">
                <div className="timeInfo">
                  <FontAwesomeIcon icon={faClock} className="icon" />
                  {formatNumber(Math.floor(time / 60)) +
                    ":" +
                    formatNumber(time % 60)}
                </div>
                <div className="respirationInfo">
                  <span id="resRate">Respiration rate</span>
                  <div className="rpm">
                    <FontAwesomeIcon icon={faWind} className="icon" />
                    {moonbirdInfo.respirationRate}
                    <span id="rpm"> rpm</span>
                  </div>
                </div>
              </div>
            )}
            {status === "paused" && (
              <div className="timerContent timerContentPaused">
                <div className="pause">
                  <FontAwesomeIcon icon={faPause} className="icon pauseIcon" />
                </div>
                <div className="timeInfo">
                  <FontAwesomeIcon icon={faClock} className="icon" />
                  {formatNumber(Math.floor(time / 60)) +
                    ":" +
                    formatNumber(time % 60)}
                </div>
              </div>
            )}
          </div>
          <div className="heartRateGraph">
            <div className="spacerHeartRate"></div>
            <div className="heartRate">
              <FontAwesomeIcon icon={faHeart} className="heartIcon" />
              {status === "started" ? moonbirdInfo.heartRate : "--"} bpm
            </div>
            <div className="buttons">
              {status === "started" && (
                <Button
                  icon={<FontAwesomeIcon icon={faPause} />}
                  text="Pause"
                  handler={() => {
                    setStatus("paused");
                    setTimerOn(false);
                  }}
                ></Button>
              )}
              {status === "paused" && (
                <Button
                  icon={<FontAwesomeIcon icon={faPlay} />}
                  text="Resume"
                  handler={() => {
                    setStatus("started");
                    setTimerOn(true);
                  }}
                ></Button>
              )}
              <Button
                icon={<FontAwesomeIcon icon={faStop} />}
                text="Finish"
                handler={() => {
                  setStatus("stopt");
                  setTimerOn(false);
                }}
              ></Button>
            </div>
          </div>
        </div>
      )}
      {(status === "stopt" || status === "finished") && (
        <div className="finished">
          <img src={require("../../assets/heartRateSummary.png")}></img>
          <p>
            You completed{" "}
            {formatNumber(Math.floor(time / 60)) +
              ":" +
              formatNumber(time % 60)}{" "}
            min of breathing exercises
          </p>
          <div className="backgroundImage" />
        </div>
      )}
    </div>
  );
}

export default Exercise;
