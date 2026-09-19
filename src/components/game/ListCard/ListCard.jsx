import { Link } from "react-router-dom";
import { getGameById } from "../../../services/storageService";
import styles from "./ListCard.module.css";

export function ListCard({ list }) {
  const games = list.gameIds.map((id) => getGameById(id)).filter(Boolean);
  const covers = games.slice(0, 4);

  return (
    <Link to={`/lists/${list.id}`} className={styles.card} aria-label={`Ver lista ${list.name}`}>
      <div className={styles.covers}>
        {covers.length === 0 ? (
          <div className={styles.emptyCover} />
        ) : (
          covers.map((game) => (
            <img
              key={game.id}
              src={game.coverImage}
              alt=""
              className={styles.cover}
            />
          ))
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{list.name}</h3>
        {list.description ? (
          <p className={styles.description}>{list.description}</p>
        ) : null}
        <span className={styles.count}>
          {games.length} jogo{games.length === 1 ? "" : "s"}
        </span>
      </div>
    </Link>
  );
}
