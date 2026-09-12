
// Usa localStorage como "banco de dados". Serve para termos uma conta de usuário
// e assim conseguir salvar as avaliações (rating + comentário) vinculadas a quem logou.


const KEYS = {
  users: "gameoP:users",
  currentUserId: "gameoP:currentUserId",
};

function getUsers() {
  const stored = localStorage.getItem(KEYS.users);
  return stored ? JSON.parse(stored) : [];
}

function saveUsers(users) {
  localStorage.setItem(KEYS.users, JSON.stringify(users));
}

function normalizeUsername(username) {
  return username.trim().toLowerCase();
}

function toPublicUser(user) {
  if (!user) return null;
  const { id, username } = user;
  return { id, username };
}

export function registerUser(username, password) {
  const cleanUsername = (username || "").trim();
  const cleanPassword = password || "";

  if (!cleanUsername || !cleanPassword) {
    throw new Error("Preencha usuário e senha.");
  }
  if (cleanPassword.length < 4) {
    throw new Error("A senha deve ter pelo menos 4 caracteres.");
  }

  const users = getUsers();
  const alreadyExists = users.some(
    (user) => normalizeUsername(user.username) === normalizeUsername(cleanUsername)
  );
  if (alreadyExists) {
    throw new Error("Esse nome de usuário já está em uso.");
  }

  const newUser = {
    id: crypto?.randomUUID ? crypto.randomUUID() : `user-${Date.now()}`,
    username: cleanUsername,
    password: cleanPassword,
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, newUser]);
  localStorage.setItem(KEYS.currentUserId, newUser.id);

  return toPublicUser(newUser);
}

export function loginUser(username, password) {
  const users = getUsers();
  const found = users.find(
    (user) => normalizeUsername(user.username) === normalizeUsername(username || "")
  );

  if (!found || found.password !== password) {
    throw new Error("Usuário ou senha inválidos.");
  }

  localStorage.setItem(KEYS.currentUserId, found.id);
  return toPublicUser(found);
}

export function logoutUser() {
  localStorage.removeItem(KEYS.currentUserId);
}

export function getCurrentUser() {
  const currentUserId = localStorage.getItem(KEYS.currentUserId);
  if (!currentUserId) return null;

  const users = getUsers();
  const found = users.find((user) => user.id === currentUserId);
  return toPublicUser(found);
}
