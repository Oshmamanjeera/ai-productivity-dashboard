import React, { useState, useEffect, useRef, useCallback } from 'react';
import './pomodorotimer.css';

function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [totalMinutesSpent, setTotalMinutesSpent] = useState(() => {
    const stored = localStorage.getItem('totalPomodoroMinutes');
    return stored ? parseInt(stored) : 0;
  });

  const secondsSpentRef = useRef(0);

  const handleSessionEnd = useCallback(() => {
    const minutesSpent = Math.floor(secondsSpentRef.current / 60);
    const updatedTotal = totalMinutesSpent + minutesSpent;

    setTotalMinutesSpent(updatedTotal);
    localStorage.setItem('totalPomodoroMinutes', updatedTotal);

    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    secondsSpentRef.current = 0;
  }, [totalMinutesSpent]);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        secondsSpentRef.current += 1;

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            handleSessionEnd();
          } else {
            setMinutes(prev => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(prev => prev - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, handleSessionEnd]);

  const toggleTimer = () => {
    if (!isActive) {
      secondsSpentRef.current = 0;
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    if (isActive) {
      handleSessionEnd(); // save time before resetting
    } else {
      setMinutes(25);
      setSeconds(0);
    }
  };

  return (
    <div className="pomodoro-container">
      <h2>🍅 Pomodoro Timer</h2>
      <h3>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</h3>
      <div className="buttons">
        <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <p><strong>Total Time Spent:</strong> {totalMinutesSpent} minutes</p>
    </div>
  );
}

export default PomodoroTimer;
