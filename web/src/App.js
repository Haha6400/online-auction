import * as React from "react";

import "./App.css";
import Home from "./views/Home";
import MyAuction from "./views/account/MyAuction";
import MyAccount from "./views/account/MyAccount";
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
  {
    path: "/my-auction",
    element: <MyAuction />,
  },
  {
    path: "/my-account",
    element: <MyAccount />,
  }
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
