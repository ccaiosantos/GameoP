import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header/Header";
import { Home } from "./pages/Home/Home";
import { Search } from "./pages/Search/Search";
import { seedGamesIfEmpty } from "./services/storageService";
import { Games } from "./pages/Games/Games";

function ComingSoon({ pageName }) {
  return (
    <main style={{ paddingTop: "120px", textAlign: "center", color: "var(--color-text-secondary)" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{pageName}</h2>
      <p>Em breve</p>
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
        <Route path="/search" element={<Search />} />
        <Route path="/games" element={<Games/>} />
        <Route path="/game/:gameId" element={<ComingSoon pageName="Detalhe do Jogo" />} />
        <Route path="/reviews" element={<ComingSoon pageName="Suas Reviews" />} />  
        <Route path="/lists" element={<ComingSoon pageName="Listas" />} />
        <Route path="/gamelist" element={<ComingSoon pageName="Gamelist" />} />
        <Route path="/profile" element={<ComingSoon pageName="Perfil" />} />
      </Routes>
    </BrowserRouter>
  );
}