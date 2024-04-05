import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getLPTheme from "../views/getLPTheme";

const ThemeContext = createContext({
  currentTheme: "light",
  changeCurrentTheme: () => {},
});

function getInitialMode() {
  const savedMode = JSON.parse(localStorage.getItem("mode"));
  return savedMode || "light";
}

export default function CustomThemeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode());
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(mode));
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ currentTheme: LPtheme, toggleColorMode }}>
      <ThemeProvider theme={LPtheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeProvider = () => useContext(ThemeContext);
