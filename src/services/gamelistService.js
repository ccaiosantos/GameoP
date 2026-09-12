
// Esta função existe só para já deixar o botão "Adicionar à Gamelist" funcional na tela
// de detalhes do jogo.
export function addToGamelist(gameId, userId) {
  console.log(
    `[Gamelist] TODO: implementar a adição do jogo "${gameId}" à gamelist do usuário "${userId ?? "anônimo"}".`
  );
  return Promise.resolve({ ok: true, gameId, userId });
}
