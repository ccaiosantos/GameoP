import { Link } from "react-router-dom";
import { StarRating } from "../../ui/StarRating/StarRating";
import styles from "./MyReviewCard.module.css";

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function MyReviewCard({ review, game, onEdit, onDelete }) {
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
        <div className={styles.headerRow}>
          <Link to={`/game/${game.id}`} className={styles.titleLink}>
            <h3 className={styles.title}>{game.title}</h3>
          </Link>
          <span className={styles.date}>{formatDate(review.updatedAt)}</span>
        </div>

        <StarRating rating={review.rating} size="sm" />

        {review.comment && <p className={styles.comment}>{review.comment}</p>}

        <div className={styles.actions}>
          <button type="button" onClick={onEdit} className={styles.actionButton}>
            Editar
          </button>
          <button type="button" onClick={onDelete} className={styles.actionButtonDanger}>
            Excluir
          </button>
        </div>
      </div>
    </article>
  );
}
