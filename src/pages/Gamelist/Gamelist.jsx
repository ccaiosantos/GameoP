import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useGamelist } from "../../hooks/useGamelist";
import { getGameById } from "../../services/storageService";
import { GamelistCard } from "../../components/game/GamelistCard/GamelistCard";
import styles from "./Gamelist.module.css";

export function Gamelist() {
  const { user } = useAuth();
  const { entries, toggleGame } = useGamelist();

  if (!user) {
    return (
      <main className={styles.page}>
        <div className="container">
          <div className={styles.loginPrompt}>
            <p>
              <Link to="/login" state={{ from: "/gamelist" }} className={styles.loginLink}>
                Faça login
              </Link>{" "}
              para ver a sua gamelist.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const games = entries.map((entry) => getGameById(entry.gameId)).filter(Boolean);

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Gamelist</h1>
          <span className={styles.count}>
            {games.length} jogo{games.length === 1 ? "" : "s"}
          </span>
        </div>

        {games.length === 0 ? (
          <p className={styles.emptyState}>
            Sua gamelist está vazia. Vá até a página de um jogo e adicione seus favoritos!
          </p>
        ) : (
          <div className={styles.grid}>
            {games.map((game) => (
              <GamelistCard key={game.id} game={game} onRemove={() => toggleGame(game.id)} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}