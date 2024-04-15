import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { OutlinedInput, alpha } from "@mui/material";
import getLPTheme from '../../views/getLPTheme';

import { FormControl, FormLabel } from '@mui/material';

export default function LicencePlate(props) {
    const [mode, setMode] = React.useState(getInitialMode());
    const LPtheme = createTheme(getLPTheme(mode));


    function getInitialMode() {
        const savedMode = JSON.parse(localStorage.getItem('mode'));
        return savedMode || 'light';
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={LPtheme}>
            <Container component="main" width='70%'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        margin: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        alignContent: 'center',

                    }}
                >
                    <Typography
                        component="h2"
                        variant="h5"
                        color="text.secondary"
                        sx={{ fontWeight: 1000, fontSize: 24, textAlign: "center" }}
                    >
                        TẠO BIỂN SỐ
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Typography >
                            Biển số
                        </Typography>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            sx={{
                                mt: 1, mb: 1,
                                boxShadow: (theme) =>
                                    theme.palette.mode === "light"
                                        ? `0px 3.5px 5.5px rgba(0, 0, 0, 0.1)`
                                        : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
                                borderRadius: 3,
                            }}
                        />
                        <Typography >
                            Loại xe
                        </Typography>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            sx={{
                                mt: 1, mb: 1,
                                boxShadow: (theme) =>
                                    theme.palette.mode === "light"
                                        ? `0px 3.5px 5.5px rgba(0, 0, 0, 0.1)`
                                        : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
                                borderRadius: 3,
                            }}
                        />
                        <Grid item>
                            <Link href="#" variant="body2">
                                Quên mật khẩu?
                            </Link>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 1, mb: 1, backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? "primary"
                                        : "primary.light",
                                color: (theme) =>
                                    theme.palette.mode === "light"
                                        ? "white"
                                        : "black",
                            }}
                        >
                            Đăng nhập
                        </Button>
                        <Grid container justifyContent="center">

                            <Grid item >
                                <Link href="#" variant="body2">
                                    {"Không có tài khoản?"}
                                    <strong>{"  Đăng ký"}</strong>
                                </Link>
                            </Grid>
                        </Grid>

                    </Box>
                    <CssBaseline />
                </Box>
            </Container>
        </ThemeProvider >
    );
}