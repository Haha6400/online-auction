import * as React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import Dialog from "@mui/material/Dialog";

import { useThemeProvider } from "../../utils/ThemeContext";

import Login from "../common/Login";
import Register from "../common/Register";
import AccountMenu from "../base/AccountMenu";

import logo from "../../assets/logo.png";

const logoStyle = {
    width: "40px",
    height: "40px",
    cursor: "pointer",
    marginLeft: "10px",
    marginRight: "5px",
};

export default function AppAppBarTest(props) {
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
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexShrink: 0,
                            borderRadius: "999px",
                            bgcolor: "rgba(255, 255, 255, 0.3)",
                            backdropFilter: "blur(24px)",
                            maxHeight: 40,
                            boxShadow: "#015433"
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
                                                    ? "#000000"
                                                    : "#015433"
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
                                                    ? "#000000"
                                                    : "#015433"
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
                                                    ? "#015433"
                                                    : "#00623B"
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
                                gap: 1,
                                alignItems: "center",
                            }}
                        >
                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

                            {props.loginCheck === "false" && (
                                <>
                                    <Button
                                        style={{ color: "#015433" }}
                                        variant="text"
                                        size="small"
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
                                        <Login />
                                    </Dialog>
                                    <Button
                                        style={{ color: "#FFFFFF", backgroundColor: "#015433" }}
                                        variant="contained"
                                        size="small"
                                        component="button"
                                        onClick={handleRegisterButtonClick}
                                    >
                                        Đăng ký
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
                                    <h4 style={{ color: mode === "dark" ? "#fff" : "#007bff" }}>
                                        {props.name}
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
                                    {/* Toggle mode */}
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

                                    {/* Links */}
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

                                    {/* Account buttons */}
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        sx={{ width: "100%", my: 1 }}
                                        component="button"
                                        onClick={handleRegisterButtonClick}
                                    >
                                        Đăng ký
                                    </Button>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        sx={{ width: "100%" }}
                                        component="button"
                                        onClick={handleLoginButtonClick}
                                    >
                                        Đăng nhập
                                    </Button>
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div >
    );
}
