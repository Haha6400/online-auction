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
export default function Login() {
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
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography >
              Email
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
                boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.2)`,
                borderRadius: 3,
              }}
            />
            <Typography >
              Mật khẩu
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
                boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.2)`,
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
                mt: 1, mb: 1, backgroundColor: "primary",
                color: "white"
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
    </ThemeProvider>
  );
}