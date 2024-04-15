import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { OutlinedInput, alpha } from "@mui/material";
import getLPTheme from '../../views/getLPTheme';
export default function Register() {
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
      <Container component="main" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            margin: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Đăng ký
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography >
                  Họ và tên
                </Typography>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  autoFocus
                  sx={{
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? `0px 3.5px 5.5px rgba(0, 0, 0, 0.1)`
                        : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
                    borderRadius: 3,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography >
                  Email
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  sx={{
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? `0px 3.5px 5.5px rgba(0, 0, 0, 0.1)`
                        : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
                    borderRadius: 3,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography >
                  Số điện thoại
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  sx={{
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? `0px 3.5px 5.5px rgba(0, 0, 0, 0.1)`
                        : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
                    borderRadius: 3,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography >
                  Mật khẩu
                </Typography>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  sx={{
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? `0px 3.5px 5.5px rgba(0, 0, 0, 0.1)`
                        : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
                    borderRadius: 3,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Tôi đồng ý chia sẻ các thông tin đã cung cấp cho tổ chức đấu giá tham chiếu theo nghị định 13/2023/NĐ-CP"></FormControlLabel>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3, mb: 2,
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary"
                    : "primary.light",
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "white"
                    : "black",
              }}
            >
              Đăng ký
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="#" variant="body2">
                  {" Đã có tài khoản?"}
                  <strong>{"  Đăng nhập"}</strong>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}