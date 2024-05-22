

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";


import Footer from "./Footer";
import AppAppBar from "../base/AppAppBar";

import React from "react"
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';

import { Formik, Form, Field } from "formik"

import * as Yup from "yup"

import { TextField } from "formik-material-ui"



//Data
const initialValues = {
    login: "",
    email: "",
    firstName: "",
    lastName: "",
    occupation: "",
    city: "",
    country: "",
    password: "",
}

const options = [
    { label: "Computer Programmer", value: "Computer_programmer" },
    { label: "Web Developer", value: "web_developer" },
    { label: "User Experience Designer", value: "user_experience_designer" },
    { label: "Systems Analyst", value: "systems_analyst" },
    { label: "Quality Assurance Tester", value: "quality_assurance_tester" },
]

//password validation
const lowercaseRegEx = /(?=.*[a-z])/
const uppercaseRegEx = /(?=.*[A-Z])/
const numericRegEx = /(?=.*[0-9])/
const lengthRegEx = /(?=.{6,})/

let validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    login: Yup.string().required("Required"), //username
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .matches(
            lowercaseRegEx,
            "Must contain one lowercase alphabetical character!"
        )
        .matches(
            uppercaseRegEx,
            "Must contain one uppercase alphabetical character!"
        )
        .matches(numericRegEx, "Must contain one numeric character!")
        .matches(lengthRegEx, "Must contain 6 characters!")
        .required("Required!"),
})

const onSubmit = (values) => {
    console.log(values)
}

export default function Test() {
    return (
        <Stack
            sx={{
                background: "url(/bgr.png)",
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
            }}
        >
            <AppAppBar loginCheck="false" currentPage="plan" />
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
                            onSubmit={onSubmit}>
                            {({ dirty, isValid, values, handleChange, handleBlur }) => {
                                return (
                                    <Form>
                                        <CardContent>
                                            <Grid item container spacing={1} justify="center">
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
                                                        name="password"
                                                        // value={values.password}
                                                        component={TextField}
                                                    />
                                                </Grid>

                                            </Grid>
                                        </CardContent>
                                        <CardActions>

                                            <Button
                                                disabled={!dirty || !isValid}
                                                variant="contained"
                                                color="primary"
                                                type="Submit">
                                                REGISTER
                                            </Button>
                                        </CardActions>
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
