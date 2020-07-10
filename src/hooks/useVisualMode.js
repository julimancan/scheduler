import React, { useState, useEffect } from "react";



// first
// second 
// third

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // const addModetoHistory = (newMode) => setHistory([...history, newMode]);
  const previousStates = (prev) => prev.slice(0, prev.length - 1);
  const transition = (state, replace = false) => {
    setHistory(prev => {
      return replace ? [...previousStates(prev), state] : [...prev, state];
      
    });
  };


  const back = () => {

    if (history.length < 2) return;
    setHistory(prev => [...prev.slice(0, history.length - 1)]);
  }

    // if (history.length === 1) {
    //   setMode(history);
    // } else
    //   console.log('====================', history[history.length - 1])
    //   history.pop()
    //   setMode(history[history.length - 1]);
  return { mode: history[history.length - 1], transition, back };
  // return { mode, history, transition, back };
};