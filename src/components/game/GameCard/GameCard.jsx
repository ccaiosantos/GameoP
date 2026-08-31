import { Link } from "react-router-dom";
import { StarRating } from "../../ui/StarRating/StarRating";
import styles from "./GameCard.module.css";

export function GameCard({ game }) {
  return (
    <Link to={`/game/${game.id}`} className={styles.card} aria-label={`Ver detalhes de ${game.title}`}>
      <div className={styles.imageWrapper}>
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
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{game.title}</h3>
        <span className={styles.year}>{game.releaseYear}</span>
      </div>
    </Link>
  );
}