import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  function handleSearchSubmit(event) {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link to="/" className={styles.logoLink} aria-label="GameoP - Página inicial">
          <img src="/logo.png" alt="GameoP" className={styles.logoImage} />
          <span className={styles.logoText}>GameoP</span>
        </Link>

        {/* Navegação */}
        <nav className={styles.nav} aria-label="Navegação principal">
          <Link to="/games" className={styles.navLink}>Jogos</Link>
          <Link to="/lists" className={styles.navLink}>Listas</Link>
          <Link to="/gamelist" className={styles.navLink}>Gamelist</Link>
        </nav>

        {/* Busca */}
        <form onSubmit={handleSearchSubmit} className={styles.searchForm} role="search">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Buscar jogos..."
            className={styles.searchInput}
            aria-label="Buscar jogos"
          />
          <button type="submit" className={styles.searchButton} aria-label="Realizar busca">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
}
