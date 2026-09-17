import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StarRating } from "../../components/ui/StarRating/StarRating";
import { ReviewForm } from "../../components/game/ReviewForm/ReviewForm";
import { UserReviewItem } from "../../components/game/UserReviewItem/UserReviewItem";
import { useAuth } from "../../hooks/useAuth";
import { getGameById } from "../../services/storageService";
import {
  deleteReview,
  getGameReviewStats,
  getReviewsByGame,
  getUserReviewForGame,
} from "../../services/reviewService";
import { useGamelist } from "../../hooks/useGamelist";
import styles from "./Game.module.css";

export function Game() {
  const { gameId } = useParams();
  const { user } = useAuth();
  const { toggleGame, isInGamelist } = useGamelist();

  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [heroImage, setHeroImage] = useState(null);
  const [heroIsFallback, setHeroIsFallback] = useState(false);

  useEffect(() => {
    setGame(getGameById(gameId));
  }, [gameId]);

  useEffect(() => {
    if (game) {
      setReviews(getReviewsByGame(game.id));
    }
  }, [game]);

  const MIN_VALID_BACKGROUND_SIZE = 300;

  useEffect(() => {
    if (!game) return;
    let cancelled = false;

    function useFallback() {
      if (!cancelled) {
        setHeroImage(game.coverImage);
        setHeroIsFallback(true);
      }
    }

    const testImage = new Image();
    testImage.onload = () => {
      if (cancelled) return;

      const isTooSmall =
        testImage.naturalWidth < MIN_VALID_BACKGROUND_SIZE ||
        testImage.naturalHeight < MIN_VALID_BACKGROUND_SIZE;

      if (isTooSmall) {
        useFallback();
      } else {
        setHeroImage(game.backgroundImage);
        setHeroIsFallback(false);
      }
    };
    testImage.onerror = useFallback;
    testImage.src = game.backgroundImage;

    return () => {
      cancelled = true;
    };
  }, [game]);

  if (!game) {
    return (
      <main className={styles.notFound}>
        <p>Jogo não encontrado.</p>
      </main>
    );
  }

  const userReview = user ? getUserReviewForGame(game.id, user.id) : null;
  const communityStats = getGameReviewStats(game.id);
  // Exibe as avaliações de outras pessoas separadas da avaliação do próprio usuário,
  // que já aparece destacada na seção "Sua avaliação" acima.
  const otherReviews = reviews.filter((review) => review.userId !== user?.id);

  function refreshReviews() {
    setReviews(getReviewsByGame(game.id));
  }

  function handleReviewSaved() {
    setIsEditingReview(false);
    refreshReviews();
  }

  function handleDeleteReview(reviewId) {
    if (!user) return;
    deleteReview(reviewId, user.id);
    refreshReviews();
  }

  const inGamelist = user ? isInGamelist(game.id) : false;

  function handleToggleGamelist() {
    if (!user) return;
    toggleGame(game.id);
}

  return (
    <main className={styles.page}>
      {/* Hero com a imagem de fundo do jogo + efeito de degradê.
          Se a imagem de fundo não carregar, cai para a capa do jogo desfocada. */}
      <section className={styles.hero}>
        {heroImage && (
          <div
            className={`${styles.heroBg} ${heroIsFallback ? styles.heroBgFallback : ""}`}
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        )}
        <div className={styles.heroGradient} />
      </section>

      <div className={`container ${styles.content}`}>
        <div className={styles.headerRow}>
          <img
            src={game.coverImage}
            alt={`Capa de ${game.title}`}
            className={styles.poster}
          />

          <div className={styles.info}>
            <h1 className={styles.title}>{game.title}</h1>
            <p className={styles.meta}>
              {game.developer} · {game.publisher} · {game.releaseYear}
            </p>

            <div className={styles.genreList}>
              {game.genre.map((tag) => (
                <span key={tag} className={styles.genreTag}>{tag}</span>
              ))}
            </div>

            <div className={styles.ratingsRow}>
              <div className={styles.ratingBlock}>
                <StarRating rating={game.rating} size="md" />
                <span className={styles.ratingHint}>
                  {game.reviewCount.toLocaleString("pt-BR")} avaliações
                </span>
              </div>

              {communityStats && (
                <div className={styles.ratingBlock}>
                  <StarRating rating={communityStats.average} size="md" />
                  <span className={styles.ratingHint}>
                    Comunidade GameoP · {communityStats.count} avaliação{communityStats.count > 1 ? "ões" : ""}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.actions}>
               {user ? (
                <button type="button" onClick={handleToggleGamelist} className={styles.gamelistButton}>
                  {inGamelist ? "✓ Na Gamelist" : "+ Adicionar à Gamelist"}
                </button>
              ) : (
                <Link to="/login" state={{ from: `/game/${game.id}` }} className={styles.gamelistButton}>
                  + Adicionar à Gamelist
                </Link>
               )}
            </div>
          </div>
        </div>

        <p className={styles.description}>{game.description}</p>

        {/* Sistema de avaliação */}
        <section className={styles.reviewSection}>
          <h2 className={styles.sectionTitle}>Sua avaliação</h2>

          {user ? (
            userReview && !isEditingReview ? (
              <div className={styles.ownReviewSummary}>
                <UserReviewItem
                  review={userReview}
                  isOwn
                  onEdit={() => setIsEditingReview(true)}
                  onDelete={() => handleDeleteReview(userReview.id)}
                />
              </div>
            ) : (
              <ReviewForm
                gameId={game.id}
                user={user}
                existingReview={userReview}
                onSaved={handleReviewSaved}
              />
            )
          ) : (
            <div className={styles.loginPrompt}>
              <p>
                <Link
                  to="/login"
                  state={{ from: `/game/${game.id}` }}
                  className={styles.loginLink}
                >
                  Faça login
                </Link>{" "}
                para avaliar este jogo.
              </p>
            </div>
          )}
        </section>

        {/* Avaliações da comunidade */}
        <section className={styles.reviewSection}>
          <h2 className={styles.sectionTitle}>Avaliações da comunidade</h2>

          {otherReviews.length === 0 ? (
            <p className={styles.emptyReviews}>
              {userReview ? "Nenhuma outra avaliação ainda." : "Seja o primeiro a avaliar este jogo!"}
            </p>
          ) : (
            <div className={styles.reviewsList}>
              {otherReviews.map((review) => (
                <UserReviewItem key={review.id} review={review} isOwn={false} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
