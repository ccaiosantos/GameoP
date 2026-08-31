import { seedGamesIfEmpty, getAllGames } from "../services/storageService";
import { useState, useEffect, useCallback } from "react";


//Embaralha os jogos em ordem diferente toda vez que o site é iniciado
function shuffleArray(array){
    const copy = [...array];
      for (let index = copy.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}
// Retorna todos os jogos, já embaralhados
export function useGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const allGames = getAllGames();
    setGames(shuffleArray(allGames));
  }, []);

  return { games };
}

// Retorna os jogos melhor avaliados, também embaralhados
export function useTopRatedGames(limit = 8) {// esse limit = 8 pega os oito melhores mais bem avaliados do site, se eu colocar 8 jogos de 5 estrelas vai aparecer apenas esses 8, portanto posso sim ou não aumentar a lista
  const [topGames, setTopGames] = useState([]);

  useEffect(() => {
    const allGames = getAllGames();
    const sorted = [...allGames].sort((a, b) => b.rating - a.rating); //coloca os de maior nota primeiro esse sort vai ordenar
    const topSlice = sorted.slice(0, limit);
    setTopGames(shuffleArray(topSlice));
  }, [limit]);

  return { topGames };
}