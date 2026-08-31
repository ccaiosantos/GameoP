import { useGames, useTopRatedGames } from "../../hooks/useGames";
import { GameCarousel } from "../../components/game/GameCarousel/GameCarousel";
import { ReviewCard } from "../../components/game/ReviewCard/ReviewCard";
import styles from "./Home.module.css";

export function Home() {
  const { games } = useGames();
  const { topGames } = useTopRatedGames(8);

  // Pega os 2 jogos mais bem avaliados para a seção de reviews
  const featuredReviews = [...games]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <main className={styles.page}>
      {/* ── Seção: Mais jogados da semana ── */}
      <section className={styles.carouselSection}>
        <div className="container">
          <GameCarousel title="Mais Jogados da Semana" games={games} />
        </div>
      </section>

      {/* ── Seção: Melhores avaliados ── */}
      <section className={styles.carouselSection}>
        <div className="container">
          <GameCarousel title="Melhores Avaliados" games={topGames} />
        </div>
      </section>

      {/* ── Seção: Reviews em destaque ── */}
      {featuredReviews.length > 0 && (
        <section className={styles.reviewsSection}>
          <div className="container">
            <h2 className={styles.reviewsTitle}>Reviews</h2>
            <div className={styles.reviewsGrid}>
              {featuredReviews.map((game) => (
                <ReviewCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
