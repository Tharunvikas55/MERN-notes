import { useState, useRef } from 'react';
import './Stopwatch.css';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [pausedTime, setPausedTime] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    if (pausedTime) {
      const timeDifference = Date.now() - pausedTime;
      setStartTime((prevTime) => prevTime + timeDifference);
      setPausedTime(null);
    } else {
      setStartTime(Date.now());
      setNow(Date.now());
    }

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handlePause() {
    clearInterval(intervalRef.current);
    setPausedTime(Date.now());
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    setStartTime(null);
    setNow(null);
    setPausedTime(null);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>
        Time passed: <span className="animated-number">{secondsPassed.toFixed(3)}</span>
      </h1>
      <button onClick={handleStart}>
        {pausedTime ? 'Resume' : 'Start'}
      </button>
      <button onClick={handlePause} disabled={!startTime || pausedTime}>
        Pause
      </button>
      <button onClick={handleReset} disabled={!startTime && !pausedTime}>
        Reset
      </button>
    </>
  );
}
