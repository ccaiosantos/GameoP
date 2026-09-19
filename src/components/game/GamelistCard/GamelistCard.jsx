import { Link } from "react-router-dom";
import { StarRating } from "../../ui/StarRating/StarRating";
import styles from "./GamelistCard.module.css";

export function GamelistCard({ game, onRemove, removeLabel = "Remover da gamelist" }) {
  return (
    <div className={styles.card}>
      <Link
        to={`/game/${game.id}`}
        className={styles.imageWrapper}
        aria-label={`Ver detalhes de ${game.title}`}
      >
        <img
          src={game.coverImage}
          alt={`Capa de ${game.title}`}
          className={styles.cover}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <StarRating rating={game.rating} size="sm" />
          </div>
        </div>
      </Link>

      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className={styles.removeButton}
          aria-label={`${removeLabel}: ${game.title}`}
          title={removeLabel}
        >
          ×
        </button>
      ) : null}

      <div className={styles.info}>
        <Link to={`/game/${game.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{game.title}</h3>
        </Link>
        <span className={styles.year}>{game.releaseYear}</span>
      </div>
    </div>
  );
}
