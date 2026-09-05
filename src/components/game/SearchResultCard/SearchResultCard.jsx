import { Link } from "react-router-dom";
import { StarRating } from "../../ui/StarRating/StarRating";
import styles from "./SearchResultCard.module.css";

export function SearchResultCard({ game }) {
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
        <div className={styles.titleRow}>
          <Link to={`/game/${game.id}`} className={styles.titleLink}>
            <h3 className={styles.title}>{game.title}</h3>
          </Link>
          <span className={styles.year}>{game.releaseYear}</span>
        </div>

        <span className={styles.developer}>Desenvolvido por {game.developer}</span>

        <div className={styles.genreList}>
          {game.genre.map((tag) => (
            <span key={tag} className={styles.genreTag}>{tag}</span>
          ))}
        </div>

        <StarRating rating={game.rating} size="sm" />

        <p className={styles.description}>
          {game.description.length > 280
            ? `${game.description.slice(0, 280)}…`
            : game.description}
        </p>
      </div>
    </article>
  );
}