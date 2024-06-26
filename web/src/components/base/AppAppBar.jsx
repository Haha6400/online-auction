import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Dialog from "@mui/material/Dialog";

import Login from "../common/Login";
import AccountMenu from "../base/AccountMenu";

import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/AuthProvider";

const logoStyle = {
  width: "40px",
  height: "40px",
  cursor: "pointer",
  marginLeft: "10px",
  marginRight: "5px",
};

export default function AppAppBar({ currentPage, login }) {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  const [idToken, setIdToken] = React.useState(
    localStorage.getItem("id_token"),
  );
  const [accountUser, setAccountUser] = React.useState({});
  const auth = useAuth();

  const handleLoginButtonClick = () => {
    setOpenLoginDialog(true);
  };

  const handleLoginDialogClose = () => {
    setOpenLoginDialog(false);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  React.useEffect(() => {
    if (auth.user) {
      setAccountUser(auth.user);
    }
  }, [auth.user]);

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)`,
            }}
          >
            {/* Left side of navbar */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              {/* Logo */}
              <Link to="/">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img src={logo} style={logoStyle} alt="logo" />
                </Box>
              </Link>

              {/* Navbar items */}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Link to="/">
                  <MenuItem
                    sx={{ py: "6px", px: "12px", ml: "10px" }}
                    selected={currentPage === "home"}
                  >
                    <Typography
                      variant="navbar"
                      color={
                        currentPage === "home"
                          ? "text.primary"
                          : "text.secondary"
                      }
                    >
                      Trang chủ
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to="/plan">
                  <MenuItem
                    sx={{ py: "6px", px: "12px", ml: "10px" }}
                    selected={currentPage === "plan"}
                  >
                    <Typography
                      variant="navbar"
                      color={
                        currentPage === "plan"
                          ? "text.primary"
                          : "text.secondary"
                      }
                    >
                      Kế hoạch đấu giá
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to={idToken && "/list-auction-room"}>
                  <MenuItem
                    sx={{ py: "6px", px: "12px", ml: "10px" }}
                    selected={currentPage === "list_auction_room"}
                    onClick={!idToken ? login : () => { }}
                  >
                    <Typography
                      variant="navbar"
                      color={
                        currentPage === "list_auction_room"
                          ? "text.primary"
                          : "text.secondary"
                      }
                    >
                      Phòng đấu giá
                    </Typography>
                  </MenuItem>
                </Link>
                {idToken &&
                  accountUser["authorities"] &&
                  accountUser["authorities"].includes("ROLE_ADMIN") && (
                    <>
                      <Link to={idToken && "/payment"}>
                        <MenuItem
                          sx={{ py: "6px", px: "12px", ml: "10px" }}
                          selected={currentPage === "payment"}
                          onClick={!idToken ? login : () => { }}
                        >
                          <Typography
                            variant="navbar"
                            color={
                              currentPage === "payment"
                                ? "text.primary"
                                : "text.secondary"
                            }
                          >
                            Thanh toán
                          </Typography>
                        </MenuItem>
                      </Link>
                    </>)}
              </Box>
            </Box>

            {/* Right side of navbar */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {!idToken && (
                <>
                  {/* <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component="button"
                    sx={{ px: 1 }}
                    onClick={handleLoginButtonClick}

                  >
                    TEST DIALOG
                  </Button>
                  <Dialog
                    open={openLoginDialog}
                    onClose={handleLoginDialogClose}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"

                  >
                    <LicensePlate title="TẠO BIỂN SỐ XE" />
                  </Dialog> */}
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component="button"
                    sx={{ px: 1 }}
                    onClick={handleLoginButtonClick}
                  >
                    Đăng nhập
                  </Button>
                  <Dialog
                    open={openLoginDialog}
                    onClose={handleLoginDialogClose}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                  >
                    <Login handleLoginDialogClose={handleLoginDialogClose} />
                  </Dialog>
                  <Link to="/register">
                    <Button
                      sx={{
                        backgroundColor: "primary",
                        color: "white",
                      }}
                      variant="contained"
                      size="small"
                      component="button"
                    >
                      Đăng ký
                    </Button>
                  </Link>
                </>
              )}

              {idToken && accountUser && (
                <>
                  <h4 style={{ color: "#015433", fontSize: "14px" }}>
                    {accountUser.login}
                  </h4>
                  <AccountMenu accountUser={accountUser} />
                </>
              )}
            </Box>

            {/* Responsive drawer */}
            <Box sx={{ display: { sm: "", md: "none" } }}>
              {/* Toggle button */}
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>

              {/* Drawer */}
              <Drawer
                anchor="right"
                open={openDrawer}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{
                    minWidth: "40dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Link to="/">
                    <MenuItem
                      sx={{ my: 1, py: 1 }}
                      selected={currentPage === "home"}
                    >
                      <Typography
                        variant="navbar"
                        color={
                          currentPage === "home"
                            ? "text.primary"
                            : "text.secondary"
                        }
                      >
                        Trang chủ
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/plan">
                    <MenuItem
                      sx={{ my: 1, py: 1 }}
                      selected={currentPage === "plan"}
                    >
                      <Typography
                        variant="navbar"
                        color={
                          currentPage === "plan"
                            ? "text.primary"
                            : "text.secondary"
                        }
                      >
                        Kế hoạch đấu giá
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link to={idToken && "/list-auction-room"}>
                    <MenuItem
                      sx={{ my: 1, py: 1 }}
                      selected={currentPage === "list_auction_room"}
                      onClick={!idToken ? login : () => { }}
                    >
                      <Typography
                        variant="navbar"
                        color={
                          currentPage === "list_auction_room"
                            ? "text.primary"
                            : "text.secondary"
                        }
                      >
                        Phòng đấu giá
                      </Typography>
                    </MenuItem>
                  </Link>
                  {!idToken && (
                    <>
                      {/* Account buttons */}
                      <Button
                        color="primary"
                        variant="outlined"
                        sx={{ width: "100%" }}
                        component="button"
                        onClick={handleLoginButtonClick}
                      >
                        Đăng nhập
                      </Button>
                      <Dialog
                        open={openLoginDialog}
                        onClose={handleLoginDialogClose}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                      >
                        <Login
                          handleLoginDialogClose={handleLoginDialogClose}
                        />
                      </Dialog>
                      <Link to="/register">
                        <Button
                          color="primary"
                          variant="contained"
                          sx={{ width: "100%", my: 1 }}
                          component="button"
                        >
                          Đăng ký
                        </Button>
                      </Link>
                    </>
                  )}
                </Box>
                {idToken && accountUser && (
                  <>
                    <MenuItem
                      sx={{
                        my: 1,
                        py: 1,
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-end",
                        backgroundColor: "rgba(1, 84, 51, 0.2)",
                        borderRadius: "0",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <AccountMenu accountUser={accountUser} />
                        <h4
                          style={{
                            color: "#015433",
                            fontSize: "14px",
                            marginRight: "8px",
                          }}
                        >
                          {accountUser.login}
                        </h4>
                      </div>
                    </MenuItem>
                  </>
                )}
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
