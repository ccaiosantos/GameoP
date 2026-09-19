import { useMemo, useState } from "react";
import { getAllGames } from "../../../services/storageService";
import styles from "./ListForm.module.css";

export function ListForm({ initialList, onSubmit, onCancel, submitLabel = "Criar lista" }) {
  const [name, setName] = useState(initialList?.name || "");
  const [description, setDescription] = useState(initialList?.description || "");
  const [selectedIds, setSelectedIds] = useState(initialList?.gameIds || []);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const games = useMemo(() => getAllGames(), []);

  const filteredGames = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return games;
    return games.filter((game) => {
      const inTitle = game.title.toLowerCase().includes(normalized);
      const inDeveloper = game.developer.toLowerCase().includes(normalized);
      const inPublisher = game.publisher.toLowerCase().includes(normalized);
      const inGenre = game.genre.some((tag) => tag.toLowerCase().includes(normalized));
      return inTitle || inDeveloper || inPublisher || inGenre;
    });
  }, [games, query]);

  function toggleGame(gameId) {
    setSelectedIds((current) => {
      if (current.includes(gameId)) {
        return current.filter((id) => id !== gameId);
      }
      return [...current, gameId];
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      onSubmit({
        name,
        description,
        gameIds: selectedIds,
      });
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.field}>
        <span className={styles.label}>Nome da lista</span>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={styles.input}
          placeholder="Ex.: Jogos de ação, Jogos da Rockstar"
          required
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Descrição (opcional)</span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={styles.textarea}
          placeholder="Sobre o que é essa lista?"
          rows={3}
        />
      </label>

      <div className={styles.field}>
        <span className={styles.label}>Jogos</span>
        <p className={styles.hint}>
          {selectedIds.length} jogo{selectedIds.length === 1 ? "" : "s"} selecionado
          {selectedIds.length === 1 ? "" : "s"}
        </p>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className={styles.input}
          placeholder="Filtrar por nome, gênero ou desenvolvedora..."
          aria-label="Filtrar jogos"
        />
      </div>

      <div className={styles.gamePicker}>
        {filteredGames.length === 0 ? (
          <p className={styles.emptyPicker}>Nenhum jogo encontrado.</p>
        ) : (
          filteredGames.map((game) => {
            const selected = selectedIds.includes(game.id);
            return (
              <button
                key={game.id}
                type="button"
                onClick={() => toggleGame(game.id)}
                className={`${styles.gameOption} ${selected ? styles.gameOptionSelected : ""}`}
                aria-pressed={selected}
              >
                <img src={game.coverImage} alt="" className={styles.gameCover} />
                <span className={styles.gameMeta}>
                  <span className={styles.gameTitle}>{game.title}</span>
                  <span className={styles.gameDeveloper}>{game.developer}</span>
                </span>
                <span className={styles.check}>{selected ? "✓" : "+"}</span>
              </button>
            );
          })
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button type="submit" className={styles.submitButton}>
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className={styles.cancelButton}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
