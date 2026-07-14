import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useLocalStorage("theme", false);

  const toggleTheme = () => setIsDark(!isDark);

  const value = {
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
