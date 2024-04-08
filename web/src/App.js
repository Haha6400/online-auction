import * as React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import "./App.css";

import { CssBaseline } from "@mui/material";
import CustomThemeProvider from "./utils/ThemeContext";

import Home from "./views/Home";
import MyAuction from "./views/account/MyAuction";
import MyAccount from "./views/account/MyAccount";

function App() {
  return (
    <BrowserRouter>

      <CustomThemeProvider>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-auction" element={<MyAuction />} />
          <Route path="/my-account" element={<MyAccount />} />
        </Routes>
      </CustomThemeProvider>

    </BrowserRouter>

  );
}

export default App;
