import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const previousStates = (prev) => prev.slice(0, prev.length - 1);
  const transition = (state, replace = false) => {
    setHistory((prev) => {
      return replace ? [...previousStates(prev), state] : [...prev, state];
    });
  };

  const back = () => {
    if (history.length < 2) return;
    setHistory((prev) => [...prev.slice(0, history.length - 1)]);
  };

  return { mode: history[history.length - 1], transition, back };
}
