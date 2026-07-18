import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // Restore user from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Restore token from localStorage
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  // Keep localStorage updated whenever user changes
  useEffect(() => {

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }

  }, [user]);

  // Keep localStorage updated whenever token changes
  useEffect(() => {

    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

  }, [token]);

  // Login
  const login = (userData, jwt) => {

    setUser(userData);
    setToken(jwt);

  };

  // Logout
  const logout = () => {

    setUser(null);
    setToken(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>

  );

};