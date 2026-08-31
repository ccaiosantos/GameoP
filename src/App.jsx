import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header/Header";
import { Home } from "./pages/Home/Home";
import { seedGamesIfEmpty } from "./services/storageService";

function ComingSoon({ pageName }) {
  return (
    <main style={{ paddingTop: "120px", textAlign: "center", color: "var(--color-text-secondary)" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{pageName}</h2>
      <p>Em breve — próxima sprint! 🚀</p>
    </main>
  );
}

export function App() {
  useEffect(() => {
    seedGamesIfEmpty();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<ComingSoon pageName="Detalhe do Jogo" />} />
        <Route path="/search" element={<ComingSoon pageName="Busca" />} />
        <Route path="/games" element={<ComingSoon pageName="Todos os Jogos" />} />
        <Route path="/lists" element={<ComingSoon pageName="Listas" />} />
        <Route path="/gamelist" element={<ComingSoon pageName="Gamelist" />} />
        <Route path="/profile" element={<ComingSoon pageName="Perfil" />} />
      </Routes>
    </BrowserRouter>
  );
}