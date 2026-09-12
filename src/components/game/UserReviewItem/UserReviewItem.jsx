import { StarRating } from "../../ui/StarRating/StarRating";
import styles from "./UserReviewItem.module.css";

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function UserReviewItem({ review, isOwn, onEdit, onDelete }) {
  return (
    <article className={styles.card}>
      <div className={styles.avatar} aria-hidden="true">
        {review.username?.charAt(0).toUpperCase()}
      </div>

      <div className={styles.content}>
        <div className={styles.headerRow}>
          <span className={styles.username}>{review.username}</span>
          <span className={styles.date}>{formatDate(review.updatedAt)}</span>
        </div>

        <StarRating rating={review.rating} size="sm" />

        {review.comment && <p className={styles.comment}>{review.comment}</p>}

        {isOwn && (
          <div className={styles.actions}>
            <button type="button" onClick={onEdit} className={styles.actionButton}>
              Editar
            </button>
            <button type="button" onClick={onDelete} className={styles.actionButtonDanger}>
              Excluir
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
