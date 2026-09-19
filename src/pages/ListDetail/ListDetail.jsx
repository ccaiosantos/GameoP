import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLists } from "../../hooks/useLists";
import { getGameById } from "../../services/storageService";
import { GamelistCard } from "../../components/game/GamelistCard/GamelistCard";
import { ListForm } from "../../components/game/ListForm/ListForm";
import styles from "./ListDetail.module.css";

export function ListDetail() {
  const { listId } = useParams();
  const { user } = useAuth();
  const { findList, editList, removeList, refresh } = useLists();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <main className={styles.page}>
        <div className="container">
          <div className={styles.loginPrompt}>
            <p>
              <Link to="/login" state={{ from: `/lists/${listId}` }} className={styles.loginLink}>
                Faça login
              </Link>{" "}
              para ver esta lista.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const list = findList(listId);

  if (!list) {
    return (
      <main className={styles.page}>
        <div className="container">
          <p className={styles.emptyState}>Lista não encontrada.</p>
          <Link to="/lists" className={styles.backLink}>
            Voltar para listas
          </Link>
        </div>
      </main>
    );
  }

  const games = list.gameIds.map((id) => getGameById(id)).filter(Boolean);

  function handleUpdate(data) {
    editList(list.id, data);
    setIsEditing(false);
    setError("");
  }

  function handleRemoveGame(gameId) {
    setError("");
    try {
      editList(list.id, {
        name: list.name,
        description: list.description,
        gameIds: list.gameIds.filter((id) => id !== String(gameId)),
      });
    } catch (removeError) {
      setError(removeError.message);
    }
  }

  function handleDeleteList() {
    removeList(list.id);
    navigate("/lists");
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <Link to="/lists" className={styles.backLink}>
          Voltar para listas
        </Link>

        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>{list.name}</h1>
            {list.description ? (
              <p className={styles.description}>{list.description}</p>
            ) : null}
            <span className={styles.count}>
              {games.length} jogo{games.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className={styles.headerActions}>
            <button
              type="button"
              onClick={() => {
                setIsEditing((current) => !current);
                setError("");
                refresh();
              }}
              className={styles.editButton}
            >
              {isEditing ? "Fechar edição" : "Editar"}
            </button>
            <button type="button" onClick={handleDeleteList} className={styles.deleteButton}>
              Excluir lista
            </button>
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {isEditing ? (
          <div className={styles.formWrapper}>
            <ListForm
              initialList={list}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
              submitLabel="Salvar lista"
            />
          </div>
        ) : games.length === 0 ? (
          <p className={styles.emptyState}>Esta lista não tem jogos válidos.</p>
        ) : (
          <div className={styles.grid}>
            {games.map((game) => (
              <GamelistCard
                key={game.id}
                game={game}
                onRemove={() => handleRemoveGame(game.id)}
                removeLabel="Remover da lista"
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
