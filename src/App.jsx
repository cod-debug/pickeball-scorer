import { useState } from "react";
import "./App.css";

function App() {
  const [score, setScore] = useState([0, 0, 2]);
  const [server, setServer] = useState(null);
  const [players, setPlayers] = [['Player 1', 'Player 2'], ['Player 3', 'Player 4']];
  const [teamNames, setTeamNames] = useState(['Team 1', 'Team 2']);

  const updateScore = (scoredTeam) => {
    if(server === scoredTeam) {
      setScore([score[0] + 1, score[1], score[2]]);
    } else {
      if(score[2] === 2){
        changeService();
      } else {
        setScore([score[0], score[1], score[2] + 1]);
      }
    }
  }

  const changeService = () => {
      setServer(server === 0 ? 1 : 0);
      setScore([score[1], score[0], 1]);
  }
  return (
    <>
      {
        server === null &&
        <div id="chooseServer">
          <p>Who Serves First?</p>
          <div className="flex gap-4">
            <button onClick={() => { setServer(0) }} className="bg-primary text-white px-4 py-2 hover:bg-accent">Team 1</button>
            <button onClick={() => { setServer(1) }} className="bg-primary text-white px-4 py-2 hover:bg-accent">Team 2</button>
          </div>
        </div>
      }
      {
        server !== null &&
        <div id="scoreboard">
          <p>Serving: { teamNames[server] }</p>
          <div>
            <div>SCORE: </div>
            <span>{ score[0] }</span>
            <span>-</span>
            <span>{ score[1] }</span>
            <span>-</span>
            <span>{ score[2] }</span>
          </div>
          <div>
            <p>Who Scored?</p>
            <div className="flex gap-4">
              {
                teamNames.map((team, key) => {
                  return (
                    <button onClick={() => {updateScore(key)}} className="bg-primary text-white px-4 py-2 hover:bg-accent" key={`${team}-${key}`}>{ team }</button>
                  )
                })
              }
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default App;
