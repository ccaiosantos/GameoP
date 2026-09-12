import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGameSearch } from "../../hooks/useGames";
import { SearchResultCard } from "../../components/game/SearchResultCard/SearchResultCard";
import styles from "./Search.module.css";

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Pega a query da URL — se o usuário veio do header já terá valor
  const initialQuery = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(initialQuery);

  const { results, isSearching } = useGameSearch(inputValue);

  function handleInputChange(event) {
    const value = event.target.value;
    setInputValue(value);

    // Atualiza a URL enquanto digita para poder compartilhar a busca
    if (value.trim()) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  }

  const hasQuery = inputValue.trim().length > 0;
  const hasResults = results.length > 0;

  return (
    <main className={styles.page}>
      <div className={`container ${styles.inner}`}>

        {/*Coluna principal*/}
        <div className={styles.mainColumn}>

          {/* Campo de busca */}
          <div className={styles.searchHeader}>
            <input
              type="search"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Buscar jogos, desenvolvedoras ou gêneros..."
              className={styles.searchInput}
              autoFocus
              aria-label="Campo de busca"
            />
          </div>

          {/* Estado: digitando / buscando */}
          {isSearching && (
            <p className={styles.statusText}>Buscando...</p>
          )}

          {/* Estado: tem query mas sem resultados */}
          {hasQuery && !isSearching && !hasResults && (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>
                Nenhum resultado para <strong>"{inputValue}"</strong>
              </p>
              <p className={styles.emptyHint}>
                Tente buscar pelo nome do jogo ou desenvolvedor
              </p>
            </div>
          )}

          {/* Estado: tem resultados */}
          {hasResults && (
            <>
              <p className={styles.resultsCount}>
                Mostrando resultados para <strong>"{inputValue}"</strong> — {results.length} jogo{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
              </p>
              <div className={styles.resultsList}>
                {results.map((game) => (
                  <SearchResultCard key={game.id} game={game} />
                ))}
              </div>
            </>
          )}

          {/* Estado: campo vazio */}
          {!hasQuery && (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Digite algo para buscar</p>
              <p className={styles.emptyHint}>
                Você pode buscar por nome do jogo ou desenvolvedor
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
