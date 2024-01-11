import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStartStop = () => {
    fetch('http://localhost:3001/api/start-stop', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        setIsRunning(data.isRunning);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleReset = () => {
    fetch('http://localhost:3001/api/reset', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        setTime(data.time);
        setIsRunning(data.isRunning);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Timer : {time} seconds</h1>
      <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;
