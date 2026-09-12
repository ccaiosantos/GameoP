import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getGameById } from "../../services/storageService";
import { deleteReview, getReviewsByUser } from "../../services/reviewService";
import { MyReviewCard } from "../../components/game/MyReviewCard/MyReviewCard";
import { ReviewForm } from "../../components/game/ReviewForm/ReviewForm";
import styles from "./MyReviews.module.css";

export function MyReviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    if (user) {
      setReviews(getReviewsByUser(user.id));
    }
  }, [user]);

  function refresh() {
    if (user) {
      setReviews(getReviewsByUser(user.id));
    }
  }

  function handleDelete(reviewId) {
    if (!user) return;
    deleteReview(reviewId, user.id);
    refresh();
  }

  if (!user) {
    return (
      <main className={styles.page}>
        <div className="container">
          <div className={styles.loginPrompt}>
            <p>
              <Link to="/login" state={{ from: "/reviews" }} className={styles.loginLink}>
                Faça login
              </Link>{" "}
              para ver as suas avaliações.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Minhas Reviews</h1>
          <span className={styles.count}>
            {reviews.length} avaliaç{reviews.length === 1 ? "ão" : "ões"}
          </span>
        </div>

        {reviews.length === 0 ? (
          <p className={styles.emptyState}>
            Você ainda não avaliou nenhum jogo. Vá até a página de um jogo e deixe sua nota!
          </p>
        ) : (
          <div className={styles.list}>
            {reviews.map((review) => {
              const game = getGameById(review.gameId);
              if (!game) return null;

              if (editingReviewId === review.id) {
                return (
                  <div key={review.id} className={styles.editingWrapper}>
                    <div className={styles.editingHeader}>
                      <Link to={`/game/${game.id}`} className={styles.editingGameTitle}>
                        {game.title}
                      </Link>
                    </div>
                    <ReviewForm
                      gameId={game.id}
                      user={user}
                      existingReview={review}
                      onSaved={() => {
                        setEditingReviewId(null);
                        refresh();
                      }}
                    />
                  </div>
                );
              }

              return (
                <MyReviewCard
                  key={review.id}
                  review={review}
                  game={game}
                  onEdit={() => setEditingReviewId(review.id)}
                  onDelete={() => handleDelete(review.id)}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
