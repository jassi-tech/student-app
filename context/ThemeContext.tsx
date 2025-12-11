import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { darkTheme, lightTheme } from "../constants/color";

type ThemeName = "light" | "dark";

type ThemeContextType = {
  themeName: ThemeName;
  colors: typeof lightTheme;
  toggleTheme: () => void;
  setTheme: (name: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  const colors = useMemo(() => (themeName === "light" ? lightTheme : darkTheme), [themeName]);

  const toggleTheme = () => setThemeName((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ themeName, colors, toggleTheme, setTheme: setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export default ThemeContext;
