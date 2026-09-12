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

<<<<<<< HEAD
export function getGameById(gameId) {
  const games = getAllGames();
  return games.find((game) => String(game.id) === String(gameId)) || null;
}

=======
>>>>>>> a1accea08ee34d94394533fa32c4d0e8ac42b083
export function searchGames(query){
    if(!query || query.trim() === "")return [];
    const normalized = query.toLowerCase().trim();
    const games = getAllGames();
    return games.filter(
        (game)=>{
            return game.title.toLowerCase().includes(normalized) ||
            game.developer.toLowerCase().includes(normalized)
        }
    );
}