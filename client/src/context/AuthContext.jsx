import { createContext, useEffect, useRef, useState } from "react";
import authService from "../services/authService";

export const AuthContext = createContext(null);

export const TOKEN_KEY = "transitops_token";
export const USER_KEY = "transitops_user";
const REMEMBER_KEY = "transitops_remember";

// Decodes a JWT payload without verifying the signature - verification always
// happens server-side, this is only used to read the "exp" claim for the
// client-side session timeout.
const decodeTokenPayload = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
};

// "Remember Me" decides which Web Storage holds the session: localStorage
// survives browser restarts, sessionStorage clears when the tab/browser closes.
const getActiveStorage = () =>
  localStorage.getItem(REMEMBER_KEY) === "true" ? localStorage : sessionStorage;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);

  const clearSessionTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const logout = () => {
    clearSessionTimer();
    [localStorage, sessionStorage].forEach((storage) => {
      storage.removeItem(TOKEN_KEY);
      storage.removeItem(USER_KEY);
    });
    localStorage.removeItem(REMEMBER_KEY);
    setUser(null);
  };

  const scheduleSessionTimeout = (token) => {
    clearSessionTimer();
    const payload = decodeTokenPayload(token);
    if (!payload?.exp) return;

    const msRemaining = payload.exp * 1000 - Date.now();
    if (msRemaining <= 0) {
      logout();
      return;
    }
    timeoutRef.current = setTimeout(logout, msRemaining);
  };

  useEffect(() => {
    const storage = getActiveStorage();
    const storedUser = storage.getItem(USER_KEY);
    const storedToken = storage.getItem(TOKEN_KEY);

    if (storedUser && storedToken) {
      const payload = decodeTokenPayload(storedToken);
      if (payload?.exp && payload.exp * 1000 > Date.now()) {
        setUser(JSON.parse(storedUser));
        scheduleSessionTimeout(storedToken);
      } else {
        logout();
      }
    }
    setLoading(false);

    return clearSessionTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async ({ rememberMe, ...credentials }) => {
    const { data } = await authService.login(credentials);
    const storage = rememberMe ? localStorage : sessionStorage;
    const otherStorage = rememberMe ? sessionStorage : localStorage;

    otherStorage.removeItem(TOKEN_KEY);
    otherStorage.removeItem(USER_KEY);
    localStorage.setItem(REMEMBER_KEY, rememberMe ? "true" : "false");

    storage.setItem(TOKEN_KEY, data.token);
    storage.setItem(USER_KEY, JSON.stringify(data.data));

    setUser(data.data);
    scheduleSessionTimeout(data.token);
    return data;
  };

  // Updates the cached user (e.g. after a profile edit) without a new login
  const updateUser = (nextUser) => {
    const storage = getActiveStorage();
    storage.setItem(USER_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated: !!user, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
