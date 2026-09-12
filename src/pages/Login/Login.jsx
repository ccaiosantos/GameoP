import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Login.module.css";

const gamingImage = "/gameplay.jpg";
const logo = "/logo.png";

export function Login() {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/";
  const isRegister = mode === "register";

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          setError("As senhas não coincidem.");
          return;
        }
        register(username, password);
      } else {
        login(username, password);
      }
      navigate(redirectTo, { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  function toggleMode() {
    setMode(isRegister ? "login" : "register");
    setError("");
  }

  return (
    <main className={styles.page}>
      {/* Lado esquerdo — imagem */}
      <div className={styles.imageSide}>
        <img
          src={gamingImage}
          alt="Dois jogadores segurando controles de PlayStation"
          className={styles.coverImage}
        />
        <div className={styles.imageOverlay}>
          <p className={styles.imageTagline}>
            Avalie. Descubra. Jogue.
          </p>
        </div>
      </div>

      {/* Lado direito — formulário */}
      <div className={styles.formSide}>
        <div className={styles.card}>
          {/* Logo */}
          <div className={styles.logoWrapper}>
            <img src={logo} alt="GameOp logo" className={styles.logo} />
          </div>

          <h1 className={styles.title}>
            {isRegister ? "Criar conta" : "Entrar"}
          </h1>
          <p className={styles.subtitle}>
            {isRegister
              ? "Crie uma conta para avaliar jogos e salvar suas avaliações."
              : "Entre na sua conta para avaliar jogos e ver suas avaliações salvas."}
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.field}>
              <span className={styles.label}>Usuário</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
                placeholder="Seu usuário"
                autoFocus
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Senha</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="Sua senha"
                required
              />
            </label>

            {isRegister && (
              <label className={styles.field}>
                <span className={styles.label}>Confirmar senha</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Repita a senha"
                  required
                />
              </label>
            )}

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.submitButton}>
              {isRegister ? "Criar conta" : "Entrar"}
            </button>
          </form>

          <button type="button" onClick={toggleMode} className={styles.toggleButton}>
            {isRegister
              ? "Já tem uma conta? Entrar"
              : "Ainda não tem conta? Criar conta"}
          </button>
        </div>
      </div>
    </main>
  );
}