import { Link } from "react-router-dom";
import { StarRating } from "../../ui/StarRating/StarRating";
import styles from "./ReviewCard.module.css";

export function ReviewCard({ game }) {
  return (
    <article className={styles.card}>
      <Link to={`/game/${game.id}`} className={styles.coverLink} aria-label={`Ver ${game.title}`}>
        <img
          src={game.coverImage}
          alt={`Capa de ${game.title}`}
          className={styles.cover}
          loading="lazy"
        />
      </Link>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.developer}>{game.developer}</span>
        </div>

        <Link to={`/game/${game.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{game.title}</h3>
        </Link>

        <StarRating rating={game.rating} size="sm" />

        <p className={styles.description}>
          {game.description.length > 220
            ? `${game.description.slice(0, 220)}…`
            : game.description}
        </p>
      </div>
    </article>
  );
}