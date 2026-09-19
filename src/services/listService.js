const KEYS = {
  lists: "gameoP:lists",
};

function uid() {
  return crypto?.randomUUID
    ? crypto.randomUUID()
    : `list-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getAllLists() {
  const stored = localStorage.getItem(KEYS.lists);
  return stored ? JSON.parse(stored) : [];
}

function saveAllLists(lists) {
  localStorage.setItem(KEYS.lists, JSON.stringify(lists));
}

export function getListsByUser(userId) {
  if (!userId) return [];
  return getAllLists()
    .filter((list) => list.userId === userId)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export function getListById(listId) {
  if (!listId) return null;
  return getAllLists().find((list) => list.id === listId) || null;
}

export function getOwnedList(listId, userId) {
  if (!listId || !userId) return null;
  return (
    getAllLists().find((list) => list.id === listId && list.userId === userId) || null
  );
}

export function getRecentLists(limit = 6) {
  return getAllLists()
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, limit);
}

export function createList({ name, description, gameIds, userId, username }) {
  if (!userId) {
    throw new Error("É necessário estar logado para criar uma lista.");
  }

  const trimmedName = name?.trim();
  if (!trimmedName) {
    throw new Error("O nome da lista é obrigatório.");
  }

  const uniqueGameIds = [...new Set((gameIds || []).map(String))];
  if (uniqueGameIds.length === 0) {
    throw new Error("Selecione pelo menos um jogo para a lista.");
  }

  const now = new Date().toISOString();
  const newList = {
    id: uid(),
    userId,
    username: username || "",
    name: trimmedName,
    description: description?.trim() || "",
    gameIds: uniqueGameIds,
    createdAt: now,
    updatedAt: now,
  };

  saveAllLists([...getAllLists(), newList]);
  return newList;
}

export function updateList(listId, userId, { name, description, gameIds }) {
  if (!userId) {
    throw new Error("É necessário estar logado para editar uma lista.");
  }

  const lists = getAllLists();
  const index = lists.findIndex((list) => list.id === listId && list.userId === userId);
  if (index === -1) {
    throw new Error("Lista não encontrada.");
  }

  const trimmedName = name?.trim();
  if (!trimmedName) {
    throw new Error("O nome da lista é obrigatório.");
  }

  const uniqueGameIds = [...new Set((gameIds || []).map(String))];
  if (uniqueGameIds.length === 0) {
    throw new Error("Selecione pelo menos um jogo para a lista.");
  }

  const updated = {
    ...lists[index],
    name: trimmedName,
    description: description?.trim() || "",
    gameIds: uniqueGameIds,
    updatedAt: new Date().toISOString(),
  };

  lists[index] = updated;
  saveAllLists(lists);
  return updated;
}

export function deleteList(listId, userId) {
  const lists = getAllLists().filter(
    (list) => !(list.id === listId && list.userId === userId)
  );
  saveAllLists(lists);
  return lists;
}

export function addGameToList(listId, userId, gameId) {
  const list = getOwnedList(listId, userId);
  if (!list) {
    throw new Error("Lista não encontrada.");
  }
  if (list.gameIds.includes(String(gameId))) {
    return list;
  }
  return updateList(listId, userId, {
    name: list.name,
    description: list.description,
    gameIds: [...list.gameIds, String(gameId)],
  });
}

export function removeGameFromList(listId, userId, gameId) {
  const list = getOwnedList(listId, userId);
  if (!list) {
    throw new Error("Lista não encontrada.");
  }
  const nextIds = list.gameIds.filter((id) => id !== String(gameId));
  if (nextIds.length === 0) {
    throw new Error("A lista precisa ter pelo menos um jogo.");
  }
  return updateList(listId, userId, {
    name: list.name,
    description: list.description,
    gameIds: nextIds,
  });
}
