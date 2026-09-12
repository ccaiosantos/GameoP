import { useState } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());

  function login(username, password) {
    const loggedUser = loginUser(username, password);
    setUser(loggedUser);
    return loggedUser;
  }

  function register(username, password) {
    const newUser = registerUser(username, password);
    setUser(newUser);
    return newUser;
  }

  function logout() {
    logoutUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
