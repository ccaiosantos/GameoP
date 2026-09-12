import { useRef } from "react";
import { GameCard } from "../GameCard/GameCard";
import styles from "./GameCarousel.module.css";

const SCROLL_AMOUNT = 480; 

export function GameCarousel({ title, games }) {
  const trackRef = useRef(null);

  function scrollLeft() {
    trackRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  }

  function scrollRight() {
    trackRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  }

  if (!games || games.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>

      <div className={styles.carouselWrapper}>
        <button
          className={`${styles.arrowButton} ${styles.arrowLeft}`}
          onClick={scrollLeft}
          aria-label="Rolar para a esquerda"
        >
          ‹
        </button>

        <div className={styles.track} ref={trackRef}>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        <button
          className={`${styles.arrowButton} ${styles.arrowRight}`}
          onClick={scrollRight}
          aria-label="Rolar para a direita"
        >
          ›
        </button>
      </div>
    </section>
  );
}
