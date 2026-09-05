import { useGames } from "../../hooks/useGames";
import { GameCard } from "../../components/game/GameCard/GameCard";
import styles from "./Games.module.css";

export function Games() {
  const { games } = useGames();

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Jogos</h1>
          <span className={styles.count}>{games.length} jogos</span>
        </div>

        <div className={styles.grid}>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </main>
  );
}