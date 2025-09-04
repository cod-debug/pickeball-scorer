import { useState } from "react";
import "./App.css";

const defaultValues = {
  score: [0, 0, 2],
  server: null,
  players: [['Player 1', 'Player 2'], ['Player 3', 'Player 4']],
  teamNames: ['Team 1', 'Team 2'],
}

function App() {
  const [score, setScore] = useState(defaultValues.score);
  const [server, setServer] = useState(defaultValues.server);
  const [players, setPlayers] = useState(defaultValues.players);
  const [teamNames, setTeamNames] = useState(defaultValues.teamNames);

  const updateScore = (scoredTeam) => {
    if (server === scoredTeam) {
      setScore([score[0] + 1, score[1], score[2]]);
    } else {
      if (score[2] === 2) {
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

  const updateTeamName = (event, index) => {
    const updatedValue = event.target.value;
    setTeamNames((prevValue) => {
      const newValues = [...prevValue];
      newValues[index] = updatedValue;
      return newValues;
    });
  };

  const resetGame = () => {
    setScore(defaultValues.score);
    setServer(defaultValues.server);
    setPlayers(defaultValues.players);
    setTeamNames(defaultValues.teamNames);
  }

  return (
    <div>
      <div className="text-center bg-grey p-4">
        <p>Team Names:</p>
        <div className="flex flex-col gap-2 justify-center md:flex-row">
          <input
            value={teamNames[0]}
            onChange={(event) => updateTeamName(event, 0)}
            className={`border p-2 rounded ${server === 0 ? 'bg-accent text-white' : ''}`}
          />
          <input
            value={teamNames[1]}
            onChange={(event) => updateTeamName(event, 1)}
            className={`border p-2 rounded ${server === 1 ? 'bg-accent text-white' : ''}`}
          />
        </div>
      </div>
      <div className="w-[720px] mx-auto max-w-full p-4">
        {
          server === null &&
          <div id="chooseServer">
            <p>Who Serves First?</p>
            <div className="flex gap-4">
              {
                teamNames.map((team, key) => {
                  return (
                    <button onClick={() => { setServer(key) }} className="bg-primary text-white px-4 py-2 hover:bg-accent" key={`server-${team}-${key}`}>{team}</button>
                  )
                })
              }
            </div>
          </div>
        }
        {
          server !== null &&
          <div id="scoreboard">
            <p className="text-center">Serving: {teamNames[server]}</p>
            <div className="text-center my-4">
              <div>SCORE: </div>
              <div className="text-[32pt] flex gap-4 justify-center">
                <input value={score[0]} className="w-[64pt] text-center" />
                <span>-</span>
                <input value={score[1]} className="w-[64pt] text-center" />
                <span>-</span>
                <input value={score[2]} className="w-[64pt] text-center" />
              </div>
            </div>
            <div>
              <p>Who Scored?</p>
              <div className="flex gap-4">
                {
                  teamNames.map((team, key) => {
                    return (
                      <button onClick={() => { updateScore(key) }} className="flex-grow bg-primary text-white px-4 py-2 hover:bg-accent" key={`${team}-${key}`}>{team}</button>
                    )
                  })
                }
              </div>
            </div>
            <div className="my-4">
              <button onClick={resetGame} className="bg-primary text-white px-4 py-2 hover:bg-accent">Reset Game</button>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
