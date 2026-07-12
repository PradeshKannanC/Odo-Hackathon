import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

const THEME_KEY = "transitops_theme";
const DEFAULT_THEME = "dark";

const applyThemeClass = (theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    const stored = localStorage.getItem(THEME_KEY);
    return stored === "light" || stored === "dark" ? stored : DEFAULT_THEME;
  });

  useEffect(() => {
    applyThemeClass(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const setTheme = (nextTheme) => {
    setThemeState(nextTheme === "light" ? "light" : "dark");
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
