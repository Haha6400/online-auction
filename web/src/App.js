import * as React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Home from "./views/Home";
import { CssBaseline } from "@mui/material";
import CustomThemeProvider from "./utils/ThemeContext";
import Notification from "./views/Notification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/notification",
    element: <Notification />,
  },
]);

function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </CustomThemeProvider>
  );
}

export default App;
