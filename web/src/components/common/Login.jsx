import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import getLPTheme from '../../views/getLPTheme';



export default function Login({ handleLoginDialogClose }) {
  const [mode, setMode] = React.useState(getInitialMode());
  const [loginError, setLoginError] = React.useState(false);

  const LPtheme = createTheme(getLPTheme(mode));
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the registration page
  };


  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('mode'));
    return savedMode || 'light';
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      'username': data.get('username'),
      'password': data.get('password')
    }
    try {
      const response = await axios.post(`http://localhost:8080/api/authenticate`, values);
      const id_token = response.data.id_token;
      localStorage.setItem('id_token', id_token);
      if (id_token) {
        handleLoginDialogClose();
      }
    } catch (error) {
      setLoginError(true);
      console.dir('Login error:', error);
    }
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
              Tên đăng nhập
            </Typography>
            <TextField
              required
              fullWidth
              id="username"
              name="username"
              autoComplete="username"
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
              {loginError && (
                <div style={{
                  'color': 'red',
                  'fontSize': '14px'

                }}>
                  Tên đăng nhập hoặc mật khẩu không hợp lệ!
                </div>
              )}
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
                <Button
                  color="primary"
                  variant="text"
                  sx={{ width: "100%" }}
                  component="button"
                  onClick={handleRegisterClick}
                >
                  {"Không có tài khoản?"}
                  <strong style={{ margin: "5px" }}>{"  Đăng ký"}</strong>
                </Button>
              </Grid>
            </Grid>
          </Box>
          <CssBaseline />
        </Box>
      </Container>
    </ThemeProvider>
  );
}