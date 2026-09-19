import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLists } from "../../hooks/useLists";
import { ListCard } from "../../components/game/ListCard/ListCard";
import { ListForm } from "../../components/game/ListForm/ListForm";
import styles from "./Lists.module.css";

export function Lists() {
  const { user } = useAuth();
  const { lists, addList } = useLists();
  const [isCreating, setIsCreating] = useState(false);

  if (!user) {
    return (
      <main className={styles.page}>
        <div className="container">
          <div className={styles.loginPrompt}>
            <p>
              <Link to="/login" state={{ from: "/lists" }} className={styles.loginLink}>
                Faça login
              </Link>{" "}
              para criar e ver as suas listas de jogos.
            </p>
          </div>
        </div>
      </main>
    );
  }

  function handleCreate(data) {
    addList(data);
    setIsCreating(false);
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>Listas</h1>
            <span className={styles.count}>
              {lists.length} lista{lists.length === 1 ? "" : "s"}
            </span>
          </div>
          {!isCreating && (
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className={styles.createButton}
            >
              + Nova lista
            </button>
          )}
        </div>

        <p className={styles.subtitle}>
          Monte coleções temáticas: jogos de ação, jogos da Rockstar, favoritos e o que quiser.
        </p>

        {isCreating && (
          <div className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Nova lista</h2>
            <ListForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreating(false)}
              submitLabel="Criar lista"
            />
          </div>
        )}

        {lists.length === 0 && !isCreating ? (
          <p className={styles.emptyState}>
            Você ainda não tem listas. Crie uma para organizar jogos por gênero, estúdio ou tema.
          </p>
        ) : (
          <div className={styles.grid}>
            {lists.map((list) => (
              <ListCard key={list.id} list={list} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
