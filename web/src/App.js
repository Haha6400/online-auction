import * as React from "react";

import "./App.css";
import Home from "./views/home/Home";
import MyAuction from "./views/account/MyAuction";
import MyAccount from "./views/account/MyAccount";
import { CssBaseline } from "@mui/material";
import CustomThemeProvider from "./utils/ThemeContext";
import Plan from "./views/plan/Plan";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuctionRoom from "./views/auctionRoom/AuctionRoom";
import RegisterV2 from "./components/common/RegisterV2";
import AuthProvider from "./hooks/AuthProvider";
import BiddingRoom, {
  loader as biddingRoomLoader,
} from "./views/auctionRoom/BiddingRoom";
import Payment from "./views/payment/Payment";

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
    path: "/list-auction-room",
    element: <AuctionRoom />,
  },
  {
    path: "/auction-room/:id",
    element: <BiddingRoom />,
    loader: biddingRoomLoader,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/my-auction",
    element: <MyAuction />,
  },
  {
    path: "/my-account",
    element: <MyAccount />,
  },
  {
    path: "/register",
    element: <RegisterV2 />,
  },
]);

function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CustomThemeProvider>
  );
}

export default App;
