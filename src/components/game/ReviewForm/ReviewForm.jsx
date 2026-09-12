import { useState } from "react";
import { StarRating } from "../../ui/StarRating/StarRating";
import { upsertReview } from "../../../services/reviewService";
import styles from "./ReviewForm.module.css";

export function ReviewForm({ gameId, user, existingReview, onSaved }) {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const savedReview = upsertReview({
        gameId,
        userId: user.id,
        username: user.username,
        rating,
        comment,
      });
      onSaved?.(savedReview);
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.ratingRow}>
        <span className={styles.label}>Sua nota</span>
        <StarRating rating={rating} size="lg" interactive onChange={setRating} />
      </div>

      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Escreva sua opinião sobre esse jogo (opcional)..."
        className={styles.textarea}
        rows={4}
        maxLength={1000}
      />

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.submitButton}>
        {existingReview ? "Atualizar avaliação" : "Publicar avaliação"}
      </button>
    </form>
  );
}
