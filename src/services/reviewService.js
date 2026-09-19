// Serviço responsável pelo sistema de avaliação dos jogos (nota de 1 a 5 estrelas + comentário).
// As avaliações são salvas no localStorage vinculadas ao id do usuário logado, então elas
// continuam lá mesmo se a pessoa sair e entrar de novo na conta (login persistente).

const KEYS = {
  reviews: "gameoP:reviews",
};

function uid() {
  return crypto?.randomUUID ? crypto.randomUUID() : `review-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getAllReviews() {
  const stored = localStorage.getItem(KEYS.reviews);
  return stored ? JSON.parse(stored) : [];
}

function saveAllReviews(reviews) {
  localStorage.setItem(KEYS.reviews, JSON.stringify(reviews));
}

// Retorna todas as avaliações de um jogo, das mais recentes para as mais antigas.
export function getReviewsByGame(gameId) {
  return getAllReviews()
    .filter((review) => String(review.gameId) === String(gameId))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

// Retorna a avaliação que um usuário específico já fez para um jogo (ou null, se não existir).
export function getUserReviewForGame(gameId, userId) {
  if (!userId) return null;
  return (
    getAllReviews().find(
      (review) => String(review.gameId) === String(gameId) && review.userId === userId
    ) || null
  );
}

// Retorna todas as avaliações feitas por um usuário (usado na tela "Minhas Reviews"),
// das mais recentes para as mais antigas.
export function getReviewsByUser(userId) {
  if (!userId) return [];
  return getAllReviews()
    .filter((review) => review.userId === userId)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export function getRecentReviews(limit = 6) {
  return getAllReviews()
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, limit);
}

// Cria ou atualiza (se o usuário já tiver avaliado esse jogo) uma avaliação.
export function upsertReview({ gameId, userId, username, rating, comment }) {
  if (!userId) {
    throw new Error("É necessário estar logado para avaliar um jogo.");
  }
  if (!rating || rating < 1 || rating > 5) {
    throw new Error("Selecione uma nota de 1 a 5 estrelas.");
  }

  const reviews = getAllReviews();
  const existingIndex = reviews.findIndex(
    (review) => String(review.gameId) === String(gameId) && review.userId === userId
  );

  const now = new Date().toISOString();

  if (existingIndex >= 0) {
    const updatedReview = {
      ...reviews[existingIndex],
      rating,
      comment: (comment || "").trim(),
      updatedAt: now,
    };
    reviews[existingIndex] = updatedReview;
    saveAllReviews(reviews);
    return updatedReview;
  }

  const newReview = {
    id: uid(),
    gameId: String(gameId),
    userId,
    username,
    rating,
    comment: (comment || "").trim(),
    createdAt: now,
    updatedAt: now,
  };

  saveAllReviews([...reviews, newReview]);
  return newReview;
}

// Remove a avaliação do próprio usuário.
export function deleteReview(reviewId, userId) {
  const reviews = getAllReviews();
  const filtered = reviews.filter(
    (review) => !(review.id === reviewId && review.userId === userId)
  );
  saveAllReviews(filtered);
  return filtered;
}

// Estatísticas calculadas a partir das avaliações reais da comunidade (não mexe na
// nota "de fábrica" que já vem em src/data/games.js).
export function getGameReviewStats(gameId) {
  const reviews = getReviewsByGame(gameId);
  if (reviews.length === 0) return null;

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return {
    average: total / reviews.length,
    count: reviews.length,
  };
}
