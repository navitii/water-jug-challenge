import './App.css';
import React, { useState } from 'react';

function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [jugChanges, setJugChanges] = useState([]);

  const handleXChange = (event) => {
    setX(parseInt(event.target.value));
  };

  const handleYChange = (event) => {
    setY(parseInt(event.target.value));
  };

  const handleZChange = (event) => {
    setZ(parseInt(event.target.value));
  };

  const handleSolve = () => {
    const changes = solveWaterJug(x, y, z);
    setJugChanges(changes);
  };

  const solveWaterJug = (x, y, z) => {
    const jugChanges = [];
    const visited = new Set();
    const queue = [[0, 0, []]];

    while (queue.length > 0) {
      const [jugX, jugY, path] = queue.shift();
      const currentState = `${jugX}-${jugY}`;

      if (jugX === z || jugY === z || jugX + jugY === z) {
        jugChanges.push(...path, `X: ${jugX}, Y: ${jugY}`, `Reached Z: ${z}`);
        return jugChanges;
      }

      if (visited.has(currentState)) {
        continue;
      }

      visited.add(currentState);

      // Fill jugX
      const fillX = [x, jugY, [...path, `Fill X`]];
      queue.push(fillX);

      // Fill jugY
      const fillY = [jugX, y, [...path, `Fill Y`]];
      queue.push(fillY);

      // Empty jugX
      const emptyX = [0, jugY, [...path, `Empty X`]];
      queue.push(emptyX);

      // Empty jugY
      const emptyY = [jugX, 0, [...path, `Empty Y`]];
      queue.push(emptyY);

      // Transfer from jugX to jugY
      const transferXY = Math.min(jugX, y - jugY);
      const transferFromXToY = [jugX - transferXY, jugY + transferXY, [...path, `Transfer X to Y`]];
      queue.push(transferFromXToY);

      // Transfer from jugY to jugX
      const transferYX = Math.min(x - jugX, jugY);
      const transferFromYToX = [jugX + transferYX, jugY - transferYX, [...path, `Transfer Y to X`]];
      queue.push(transferFromYToX);
    }

    return ['No solution'];
  };

  return (
    <div className="App">
      <h1>Water Jug Puzzle Solver</h1>
      <div className="input-container">
        <label htmlFor="x-jug">X gallons:</label>
        <input type="number" id="x-jug" value={x} onChange={handleXChange} />

        <label htmlFor="y-jug">Y gallons:</label>
        <input type="number" id="y-jug" value={y} onChange={handleYChange} />

        <label htmlFor="z-gallons">Z gallons:</label>
        <input type="number" id="z-gallons" value={z} onChange={handleZChange} />

        <button onClick={handleSolve}>Solve</button>
      </div>

      <div className="changes-container">
        <ul>
          {jugChanges.map((change, index) => (
            <li key={index}>{change}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
