import "./App.css";
import ExerciseContext from "./contexts/ExerciseContext";
import Exercise from "./pages/breathing-exercise/Exercise";
import { useState } from "react";

function App() {
  // let name = "Evening relaxation";
  // let time = 900;
  // let picture_url = "moonbird-app/src/assets/exercise3.png";

  const [muted, setMuted] = useState(false);

  return (
    <main>
      <ExerciseContext.Provider
        value={{
          heartRate: 87,
          respirationRate: 11,
          bluetoothConnection: "medium",
          muted,
          setMuted,
        }}
      >
        <Exercise />
      </ExerciseContext.Provider>
    </main>
  );
}

export default App;
