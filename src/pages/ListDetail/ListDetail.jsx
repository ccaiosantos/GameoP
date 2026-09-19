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

  const list = findList(listId);

  if (!list) {
    return (
      <main className={styles.page}>
        <div className="container">
          <p className={styles.emptyState}>Lista não encontrada.</p>
          <Link to="/" className={styles.backLink}>
            Voltar para a página inicial
          </Link>
        </div>
      </main>
    );
  }

  const isOwner = Boolean(user && user.id === list.userId);
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
        <Link to={isOwner ? "/lists" : "/"} className={styles.backLink}>
          {isOwner ? "Voltar para listas" : "Voltar para a página inicial"}
        </Link>

        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>{list.name}</h1>
            {list.username ? (
              <p className={styles.description}>por {list.username}</p>
            ) : null}
            {list.description ? (
              <p className={styles.description}>{list.description}</p>
            ) : null}
            <span className={styles.count}>
              {games.length} jogo{games.length === 1 ? "" : "s"}
            </span>
          </div>
          {isOwner ? (
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
          ) : null}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {isOwner && isEditing ? (
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
                onRemove={isOwner ? () => handleRemoveGame(game.id) : undefined}
                removeLabel="Remover da lista"
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
