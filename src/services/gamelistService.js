// Serviço responsável pela Gamelist (lista de jogos favoritos do usuário).
// Segue o mesmo padrão do reviewService.js: os dados ficam salvos no localStorage,
// vinculados ao id do usuário logado, então a lista continua lá mesmo se a pessoa
// sair e entrar de novo na conta (login persistente).

const KEYS = {
  gamelist: "gameoP:gamelist",
};

function uid() {
  return crypto?.randomUUID
    ? crypto.randomUUID()
    : `gamelist-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getAllGamelistEntries() {
  const stored = localStorage.getItem(KEYS.gamelist);
  return stored ? JSON.parse(stored) : [];
}

function saveAllGamelistEntries(entries) {
  localStorage.setItem(KEYS.gamelist, JSON.stringify(entries));
}

export function getGamelistByUser(userId) {
  if (!userId) return [];
  return getAllGamelistEntries()
    .filter((entry) => entry.userId === userId)
    .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
}

export function isInGamelist(gameId, userId) {
  if (!userId) return false;
  return getAllGamelistEntries().some(
    (entry) => String(entry.gameId) === String(gameId) && entry.userId === userId
  );
}

export function addToGamelist(gameId, userId) {
  if (!userId) {
    throw new Error("É necessário estar logado para adicionar um jogo à gamelist.");
  }
  if (isInGamelist(gameId, userId)) {
    return getAllGamelistEntries();
  }
  const newEntry = {
    id: uid(),
    gameId: String(gameId),
    userId,
    addedAt: new Date().toISOString(),
  };
  const entries = [...getAllGamelistEntries(), newEntry];
  saveAllGamelistEntries(entries);
  return entries;
}

export function removeFromGamelist(gameId, userId) {
  const entries = getAllGamelistEntries().filter(
    (entry) => !(String(entry.gameId) === String(gameId) && entry.userId === userId)
  );
  saveAllGamelistEntries(entries);
  return entries;
}

export function toggleGamelist(gameId, userId) {
  if (!userId) {
    throw new Error("É necessário estar logado para usar a gamelist.");
  }
  if (isInGamelist(gameId, userId)) {
    removeFromGamelist(gameId, userId);
    return false;
  }
  addToGamelist(gameId, userId);
  return true;
}