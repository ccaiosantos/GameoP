import { Link } from "react-router-dom";
import { StarRating } from "../../ui/StarRating/StarRating";
import styles from "./ReviewCard.module.css";

export function ReviewCard({ game, review }) {
  const rating = review?.rating ?? game.rating;
  const text = review?.comment || game.description;
  const snippet =
    text.length > 220 ? `${text.slice(0, 220)}…` : text;

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
          <span className={styles.developer}>
            {review?.username ? review.username : game.developer}
          </span>
        </div>

        <Link to={`/game/${game.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{game.title}</h3>
        </Link>

        <StarRating rating={rating} size="sm" />

        {snippet ? <p className={styles.description}>{snippet}</p> : null}
      </div>
    </article>
  );
}
