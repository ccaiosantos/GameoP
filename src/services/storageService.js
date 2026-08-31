import { initialGames } from "../data/games";

const KEYS = {
    games: "gameoP:games"
}

export function seedGamesIfEmpty(){
    const stored = localStorage.getItem(KEYS.games)
    if(!stored){
        localStorage.setItem(KEYS.games, JSON.stringify(initialGames))
    }

}
export function getAllGames() {
  const stored = localStorage.getItem(KEYS.games);
  return stored ? JSON.parse(stored) : [];
}