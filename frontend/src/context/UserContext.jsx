import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/authService";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const data = await getProfile();
      setUser(data);
    } catch {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loadUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}