import * as React from "react";

import "./App.css";
import Home from "./views/Home";
import { CssBaseline } from "@mui/material";
import CustomThemeProvider from "./utils/ThemeContext";

function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <Home />
    </CustomThemeProvider>
  );
}

export default App;
