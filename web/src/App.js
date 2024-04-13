import * as React from "react";

import "./App.css";
import Home from "./views/Home";
import MyAuction from "./views/account/MyAuction";
import MyAccount from "./views/account/MyAccount";
import { CssBaseline } from "@mui/material";
import CustomThemeProvider from "./utils/ThemeContext";
import Plan from "./views/Plan";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/plan",
    element: <Plan />,
  },
  {
    path: "/my-auction",
    element: <MyAuction />,
  },
  {
    path: "/my-account",
    element: <MyAccount />,
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
