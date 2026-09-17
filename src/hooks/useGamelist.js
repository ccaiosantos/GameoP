import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getGamelistByUser, isInGamelist, toggleGamelist } from "../services/gamelistService";

export function useGamelist() {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);

  const refresh = useCallback(() => {
    setEntries(user ? getGamelistByUser(user.id) : []);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  function toggleGame(gameId) {
    if (!user) return;
    toggleGamelist(gameId, user.id);
    refresh();
  }

  function checkInGamelist(gameId) {
    return isInGamelist(gameId, user?.id);
  }

  return { entries, toggleGame, isInGamelist: checkInGamelist, refresh };
}