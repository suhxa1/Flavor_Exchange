import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

const getInitialMode = () => {
  const saved = localStorage.getItem("themeMode");
  return saved === "dark" || saved === "light" ? saved : "light"; // Ensures fallback to light mode if corrupted
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(getInitialMode());

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
