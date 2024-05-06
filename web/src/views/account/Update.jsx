import * as React from "react";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        email: data.get('email'),
        username: data.get('username'),
    });
};

export default function Update() {
    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography>Username</Typography>
                            <TextField
                                required
                                fullWidth
                                name="username"
                                type="username"
                                id="username"
                                defaultValue="Đây là username"
                                sx={{ mt: 1, mb: 1 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Phone Number</Typography>
                            <TextField
                                required
                                fullWidth
                                id="phoneNumber"
                                name="phoneNumber"
                                autoComplete="phoneNumber"
                                sx={{ mt: 1, mb: 1 }}
                            />

                        </Grid>

                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Email*</Typography>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                defaultValue="Đây là email"
                                sx={{ mt: 1, mb: 1 }}
                            />
                        </Grid>
                    </Grid>

                    <Divider sx={{
                        marginTop: 2,
                        marginBottom: 2,
                    }} />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography>ID Number</Typography>
                            <TextField
                                disabled
                                fullWidth
                                name="id"
                                type="id"
                                id="id"
                                sx={{ mt: 1, mb: 1 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Date of Issue</Typography>
                            <TextField
                                disabled
                                fullWidth
                                id="issuedDate"
                                name="issuedDate"
                                autoComplete="issuedDate"
                                sx={{ mt: 1, mb: 1 }}
                            />

                        </Grid>

                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Place of Issue</Typography>
                            <TextField
                                disabled
                                fullWidth
                                id="issuedPlace"
                                name="issuedPlace"
                                autoComplete="issuedPlace"
                                sx={{ mt: 1, mb: 1 }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 1, mb: 1, width: '20%', marginRight: 0 }}
                    >
                        Update
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
