import * as React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import Dialog from "@mui/material/Dialog";
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';


import { useThemeProvider } from "../../utils/ThemeContext";



import Login from "../common/Login";
import Register from "../common/Register";
import AccountMenu from "../base/AccountMenu";

import logo from "../../assets/logo.png";
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const logoStyle = {
  width: "40px",
  height: "auto",
  cursor: "pointer",
  marginLeft: "10px",
  marginRight: "5px",
};

export default function AppAppBar(props) {
  const { mode, toggleColorMode } = useThemeProvider();

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = React.useState(false);


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


  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // if (setting) {
  //   navigate(`/${setting}`);
  // } else {
  //   navigate(`/`);
  // }
  // };

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
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >

              <Link to="/">
                <img src={logo} style={logoStyle} alt="logo of onlineauction" />
              </Link>
              <Link to="/">
                <h3 style={{ color: "#4876EE", fontWeight: "900", display: 'inline-block', verticalAlign: 'middle' }}>Onauction</h3>
              </Link>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Typography variant="body2" color="text.primary">
                    Features
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Typography variant="body2" color="text.primary">
                    Testimonials
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Typography variant="body2" color="text.primary">
                    Highlights
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Typography variant="body2" color="text.primary">
                    Pricing
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              {props.loginCheck === "false" && (
                <>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component="button"
                    onClick={handleLoginButtonClick}
                  >
                    Log in
                  </Button>
                  <Dialog
                    open={openLoginDialog}
                    onClose={handleLoginDialogClose}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                  >
                    <Login />
                  </Dialog>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component="button"
                    onClick={handleRegisterButtonClick}
                  >
                    Register
                  </Button>
                  <Dialog
                    open={openRegisterDialog}
                    onClose={handleRegisterDialogClose}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                  >
                    <Register />
                  </Dialog>
                </>
              )}

              {props.loginCheck === "true" && (
                <>
                  <h4 style={{ color: mode === "dark" ? "#fff" : "#007bff" }}>{props.name}</h4>
                  <AccountMenu name={props.name} />
                </>
              )}

            </Box>

            {/* Responsive */}
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer
                anchor="right"
                open={openDrawer}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                  </Box>
                  <MenuItem>Features</MenuItem>
                  <MenuItem>Testimonials</MenuItem>
                  <MenuItem>Highlights</MenuItem>
                  <MenuItem>Pricing</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{ width: "100%" }}
                      component="button"
                      onClick={handleRegisterButtonClick}
                    >
                      Register
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      sx={{ width: "100%" }}
                      component="button"
                      onClick={handleLoginButtonClick}
                    >
                      Log in
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div >
  );
}
