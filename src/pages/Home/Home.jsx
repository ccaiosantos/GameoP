import { useEffect, useState } from "react";
import { useGames, useTopRatedGames } from "../../hooks/useGames";
import { GameCarousel } from "../../components/game/GameCarousel/GameCarousel";
import { ReviewCard } from "../../components/game/ReviewCard/ReviewCard";
import { ListCard } from "../../components/game/ListCard/ListCard";
import { getGameById } from "../../services/storageService";
import { getRecentReviews } from "../../services/reviewService";
import { getRecentLists } from "../../services/listService";
import styles from "./Home.module.css";

export function Home() {
  const { games } = useGames();
  const { topGames } = useTopRatedGames(8);
  const [communityReviews, setCommunityReviews] = useState([]);
  const [communityLists, setCommunityLists] = useState([]);

  useEffect(() => {
    const reviews = getRecentReviews(6)
      .map((review) => {
        const game = getGameById(review.gameId);
        if (!game) return null;
        return { review, game };
      })
      .filter(Boolean);

    setCommunityReviews(reviews);
    setCommunityLists(getRecentLists(6));
  }, []);

  return (
    <main className={styles.page}>
      <section className={styles.carouselSection}>
        <div className="container">
          <GameCarousel title="Mais Jogados da Semana" games={games} />
        </div>
      </section>

      <section className={styles.carouselSection}>
        <div className="container">
          <GameCarousel title="Melhores Avaliados" games={topGames} />
        </div>
      </section>

      {communityReviews.length > 0 && (
        <section className={styles.reviewsSection}>
          <div className="container">
            <h2 className={styles.reviewsTitle}>Reviews da comunidade</h2>
            <div className={styles.reviewsGrid}>
              {communityReviews.map(({ review, game }) => (
                <ReviewCard key={review.id} game={game} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {communityLists.length > 0 && (
        <section className={styles.reviewsSection}>
          <div className="container">
            <h2 className={styles.reviewsTitle}>Listas da comunidade</h2>
            <div className={styles.listsGrid}>
              {communityLists.map((list) => (
                <ListCard key={list.id} list={list} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
