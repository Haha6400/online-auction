import React, { useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import Dialog from "@mui/material/Dialog";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { TextField } from "formik-material-ui"
import { Formik, Form, Field } from "formik"

import * as Yup from "yup"

import Login from "../common/Login";
import Footer from "./Footer";
import AppAppBar from "../base/AppAppBar";

//Data
const initialValues = {
    login: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    reEnterPassword: "",
}

//password validation
const lowercaseRegEx = /(?=.*[a-z])/
const uppercaseRegEx = /(?=.*[A-Z])/
const numericRegEx = /(?=.*[0-9])/
const lengthRegEx = /(?=.{6,})/

let validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Bắt buộc!"),
    lastName: Yup.string().required("Bắt buộc!"),
    login: Yup.string().required("Bắt buộc!"), //username
    email: Yup.string().email("Email không hợp lệ").required("Bắt buộc!"),
    password: Yup.string()
        .matches(
            lowercaseRegEx,
            "Mật khẩu phải bao gồm ít nhất một ký tự viết thường!"
        )
        .matches(
            uppercaseRegEx,
            "Mật khẩu phải bao gồm ít nhất một ký tự viết hoa!"
        )
        .matches(numericRegEx, "Mật khẩu phải bao gồm ít nhất một ký tự chữ số!")
        .matches(lengthRegEx, "Mật khẩu phải bao gồm ít nhất 6 ký tự!")
        .required("Bắt buộc!"),
    reEnterPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Mật khẩu nhập lại phải trùng khớp!')
        .required("Bắt buộc!"),
})


export default function RegisterV2() {

    const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState('');
    const [alertMessage, setAlertMessage] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(false);
    const navigate = useNavigate();

    const handleLoginButtonClick = () => {
        setOpenLoginDialog(true);
    };
    const handleLoginDialogClose = () => {
        setOpenLoginDialog(false);
    };
    const handleSubmit = async (values) => {
        delete values.reEnterPassword;
        try {
            const response = await axios.post(`http://localhost:8080/api/register`, values);
            if (response.status === 201) {
                setAlertSeverity('success');
                setAlertMessage('Đăng ký thành công!');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    navigate('/');
                }, 3000);
            } else {
                setAlertSeverity('error');
                setAlertMessage('Đăng ký thất bại.');
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            }
        } catch (error) {
            console.dir('Registration error:', error);

        }
    };
    return (
        <Stack
            sx={{
                background: "url(/bgr.png)",
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
            }}
        >
            <AppAppBar loginCheck="false" currentPage="home" />
            <Box id="hero" sx={{ width: "100%" }}>
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        pt: { xs: 10, sm: 14 },
                        pb: { xs: 8, sm: 12 },
                    }}
                >
                    <Typography
                        variant="h2"
                        color="text.secondary"
                        sx={{
                            my: 3,
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            alignSelf: "center",
                            textAlign: "center",
                            fontSize: "32px",
                            fontWeight: "700",
                        }}
                    >
                        ĐĂNG KÝ TÀI KHOẢN
                    </Typography>
                    <Box
                        sx={{
                            mt: 3,
                            padding: 5,
                            alignSelf: "center",
                            width: "100%",
                            bgcolor: "rgba(255, 255, 255, 0.3)",
                            backgroundSize: "cover",
                            borderRadius: "10px",
                            boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)`
                        }}
                    >
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}>
                            {({ dirty, isValid, values, handleChange, handleBlur }) => {
                                return (
                                    <Form>
                                        <CardContent>
                                            <Grid item container spacing={2} justify="center">
                                                <Grid item xs={12} sm={6} md={6}>
                                                    <Typography >
                                                        Tên đăng nhập
                                                    </Typography>
                                                    <Field
                                                        variant="outlined"
                                                        fullWidth
                                                        name="login"
                                                        value={values.login}
                                                        component={TextField}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6}>
                                                    <Typography >
                                                        Email
                                                    </Typography>
                                                    <Field
                                                        variant="outlined"
                                                        fullWidth
                                                        name="email"
                                                        value={values.email}
                                                        component={TextField}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={6}>
                                                    <Typography >
                                                        Họ
                                                    </Typography>
                                                    <Field
                                                        variant="outlined"
                                                        fullWidth
                                                        name="firstName"
                                                        value={values.firstName}
                                                        component={TextField}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6}>
                                                    <Typography >
                                                        Tên
                                                    </Typography>
                                                    <Field
                                                        variant="outlined"
                                                        fullWidth
                                                        name="lastName"
                                                        value={values.lastName}
                                                        component={TextField}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6} md={6}>
                                                    <Typography >
                                                        Mật khẩu
                                                    </Typography>
                                                    <Field
                                                        variant="outlined"
                                                        fullWidth
                                                        name="password"
                                                        value={values.password}
                                                        type="password"
                                                        component={TextField}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6}>
                                                    <Typography >
                                                        Nhập lại mật khẩu
                                                    </Typography>
                                                    <Field
                                                        variant="outlined"
                                                        fullWidth
                                                        name="reEnterPassword"
                                                        value={values.reEnterPassword}
                                                        type="password"
                                                        component={TextField}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControlLabel
                                                        name="allowExtraEmails"
                                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                                        label="
                                                        Tôi cam kết chịu trách nhiệm về các thông tin cá nhân đã kê khai, chính sách bảo mật thông tin khách hàng, cơ chế giải quyết tranh chấp, quy chế hoạt động tại Website. Đồng ý chia sẻ các thông tin đã cung cấp cho tổ chức đấu giá tham chiếu theo nghị định 13/2023/NĐ-CP"
                                                    ></FormControlLabel>
                                                </Grid>

                                            </Grid>
                                        </CardContent>

                                        <CardActions>
                                            {showAlert && (
                                                <Alert
                                                    severity={alertSeverity}
                                                    sx={{
                                                        position: 'fixed',
                                                        bottom: '20px',
                                                        right: '20px',
                                                        zIndex: 9999
                                                    }}
                                                >
                                                    {alertMessage}
                                                </Alert>
                                            )}
                                            <Button
                                                disabled={!dirty || !isValid}
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "primary",
                                                    color: "white",
                                                }}
                                                onClick={handleSubmit}
                                            >
                                                Đăng ký
                                            </Button>
                                        </CardActions>
                                        <Grid container justifyContent="center">
                                            <Grid item>

                                                <Button
                                                    color="primary"
                                                    variant="text"
                                                    sx={{ width: "100%" }}
                                                    component="button"
                                                    onClick={handleLoginButtonClick}
                                                >
                                                    {" Đã có tài khoản? "}
                                                    <strong style={{ margin: "5px" }}>{"Đăng nhập"}</strong>
                                                </Button>
                                                <Dialog
                                                    open={openLoginDialog}
                                                    onClose={handleLoginDialogClose}
                                                    aria-labelledby="scroll-dialog-title"
                                                    aria-describedby="scroll-dialog-description"
                                                >
                                                    <Login />
                                                </Dialog>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </Stack>
    );
}
