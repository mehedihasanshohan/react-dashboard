import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Use consistent keys: "task_token" and "task_user"
  const [token, setToken] = useState(localStorage.getItem("task_token"));

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("task_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (newToken, userData) => {
    // 2. Make sure these keys match the ones in useState above
    localStorage.setItem("task_token", newToken);
    localStorage.setItem("task_user", JSON.stringify(userData));

    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("task_token");
    localStorage.removeItem("task_user");
    setToken(null);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};