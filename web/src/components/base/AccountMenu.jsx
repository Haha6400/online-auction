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
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import AllInboxIcon from '@mui/icons-material/AllInbox';

import { useThemeProvider } from "../../utils/ThemeContext";

export default function AccountMenu() {
    const { mode, toggleColorMode } = useThemeProvider();
    const navigate = useNavigate();

    const [anchorEl, setanchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleOpenUserMenu = (event) => {
        setanchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = (link) => {
        setanchorEl(null);
        navigate(`/${link}`);
    };


    return (
        <div sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            ml: "-18px",
            px: 0,
        }}>
            <Box sx={{ flexGrow: 0 }}>

                <Tooltip title="Open settings">
                    <IconButton
                        onClick={handleOpenUserMenu}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar style={{
                            backgroundColor: "rgba(9, 89, 170, 0.08)",
                            color: "#015433"
                        }}
                            src="/broken-image.jpg" />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleCloseUserMenu}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={() => handleCloseUserMenu("my-account")}>
                        <ListItemIcon>
                            <Avatar fontSize="small" />
                        </ListItemIcon>
                        My Account
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => handleCloseUserMenu("setting")}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={() => handleCloseUserMenu("my-auction")}>
                        <ListItemIcon>
                            <AllInboxIcon fontSize="small" />
                        </ListItemIcon>
                        My Auction
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
        </div>
    );


}
