import { useState, useEffect, useCallback } from "react";
import { getAllGames, searchGames } from "../services/storageService";

function shuffleArray(array) {
  const copy = [...array];
  for (let index = copy.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

export function useGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const allGames = getAllGames();
    setGames(shuffleArray(allGames));
  }, []);

  return { games };
}

export function useTopRatedGames(limit = 8) {
  const [topGames, setTopGames] = useState([]);

  useEffect(() => {
    const allGames = getAllGames();
    const sorted = [...allGames].sort((a, b) => b.rating - a.rating);
    const topSlice = sorted.slice(0, limit);
    setTopGames(shuffleArray(topSlice));
  }, [limit]);

  return { topGames };
}

export function useGameSearch(query, debounceMs = 300) {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const runSearch = useCallback((searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const found = searchGames(searchQuery);
    setResults(found);
    setIsSearching(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => runSearch(query), debounceMs);
    return () => clearTimeout(timer);
  }, [query, debounceMs, runSearch]);

  return { results, isSearching };
}