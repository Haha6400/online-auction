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
import { useThemeProvider } from "../../utils/ThemeContext";

import Login from "../common/Login";
import Register from "../common/Register";
import RegisterV2 from "../common/RegisterV2";
import AccountMenu from "../base/AccountMenu";


import logo from "../../assets/logo.png";



const logoStyle = {
  width: "40px",
  height: "40px",
  cursor: "pointer",
  marginLeft: "10px",
  marginRight: "5px",
};

export default function AppAppBar(props) {
  const { mode, toggleColorMode } = useThemeProvider();

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = React.useState(false);
  const [idToken, setIdToken] = React.useState(localStorage.getItem('id_token'));
  const [accountUser, setAccountUser] = React.useState({});

  React.useEffect(async () => {
    const idToken = localStorage.getItem('id_token');
    setIdToken(idToken);
    try {
      const response = await axios.get(`http://localhost:8080/api/account`,
        {
          headers: { Authorization: `Bearer ${idToken}` }
        });
      setAccountUser(response.data)
      console.log("accountUser", response.data)
    } catch (error) {
      console.dir('Get current account error:', error);
    }

  }, [idToken]);

  const handleLoginButtonClick = () => {
    setOpenLoginDialog(true);
  };

  const handleRegisterButtonClick = () => {
    setOpenRegisterDialog(true);

  };

  const handleLoginDialogClose = () => {
    setOpenLoginDialog(false);
  };

  const handleRegisterDialogClose = () => {
    setOpenRegisterDialog(false);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };


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
                    selected={props.currentPage === "home"}
                  >
                    <Typography
                      variant="navbar"
                      color={
                        props.currentPage === "home"
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
                    selected={props.currentPage === "plan"}
                  >
                    <Typography
                      variant="navbar"
                      color={
                        props.currentPage === "plan"
                          ? "text.primary"
                          : "text.secondary"
                      }
                    >
                      Kế hoạch đấu giá
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to="/list-auction-room">
                  <MenuItem
                    sx={{ py: "6px", px: "12px", ml: "10px" }}
                    selected={props.currentPage === "list_auction_room"}
                  >
                    <Typography
                      variant="navbar"
                      color={
                        props.currentPage === "list_auction_room"
                          ? "text.primary"
                          : "text.secondary"
                      }
                    >
                      Phòng đấu giá
                    </Typography>
                  </MenuItem>
                </Link>
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
                      onClick={handleRegisterButtonClick}
                    >
                      Đăng ký
                    </Button>
                  </Link>

                </>
              )}

              {idToken && (
                <>
                  <h4 style={{ color: "#015433", 'fontSize': '14px' }}>
                    {accountUser.login}
                  </h4>
                  <AccountMenu name={props.name} />
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
                      selected={props.currentPage === "home"}
                    >
                      <Typography
                        variant="navbar"
                        color={
                          props.currentPage === "home"
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
                      selected={props.currentPage === "plan"}
                    >
                      <Typography
                        variant="navbar"
                        color={
                          props.currentPage === "plan"
                            ? "text.primary"
                            : "text.secondary"
                        }
                      >
                        Kế hoạch đấu giá
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link to="/list-auction-room">
                    <MenuItem
                      sx={{ my: 1, py: 1 }}
                      selected={props.currentPage === "list_auction_room"}
                    >
                      <Typography
                        variant="navbar"
                        color={
                          props.currentPage === "list_auction_room"
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
                      < Button
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
                        <Login handleLoginDialogClose={handleLoginDialogClose} />
                      </Dialog>
                      <Link to="/register">
                        <Button
                          color="primary"
                          variant="contained"
                          sx={{ width: "100%", my: 1 }}
                          component="button"
                          onClick={handleRegisterButtonClick}
                        >
                          Đăng ký
                        </Button>
                      </Link>
                    </>
                  )}
                </Box>
                {idToken && (
                  <>
                    <MenuItem sx={{ my: 1, py: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', backgroundColor: 'rgba(1, 84, 51, 0.2)', borderRadius: '0' }} >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <AccountMenu name={props.name} />
                        <h4 style={{ color: "#015433", fontSize: "14px", marginRight: "8px" }}>{props.name}</h4>
                      </div>
                    </MenuItem>


                  </>
                )}
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar >
    </div >
  );
}