import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface User {
  id: string;
  walletAddress: string;
  isAuthenticated: boolean;
}

interface UserContextType {
  token: string | null;
  setUserToken: (token: string) => void;
  clearUserToken: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const cookieData = Cookies.get("token");
    if (cookieData) {
      try {
        setToken(cookieData);
      } catch {
        Cookies.remove("token");
      }
    }
  }, []);

  const setUserToken = (token: string) => {
    Cookies.set("token", JSON.stringify(token), { expires: 7 });
  };

  const clearUserToken = () => {
    Cookies.remove("token");
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ token, setUserToken, clearUserToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
