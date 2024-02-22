/** @format */

import { createBrowserHistory } from "history";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Create a Context for the history
export const HistoryContext = createContext([]);

function useHistoryTracker() {
  const [historyStack, setHistoryStack] = useState<any[]>([]);
  const location = useLocation();

  const fetchHistory = async () => {
    await setHistoryStack((prevHistory) => [...prevHistory, location.pathname]);
  };

  useEffect(() => {
    fetchHistory();
  }, [location]);

  return historyStack;
}

export default useHistoryTracker;
