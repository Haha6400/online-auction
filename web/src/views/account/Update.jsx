import * as React from "react";
import axios from 'axios';
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import ResultModal from "../../components/base/ResultModal";
import { useAuth } from "../../hooks/AuthProvider";

export default function Update() {
    const [idToken, setIdToken] = React.useState(
        localStorage.getItem("id_token"),
    );
    const [accountUser, setAccountUser] = React.useState({});
    const auth = useAuth();
    const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
    const [openFailModal, setOpenFailModal] = React.useState(false);
    const toggleSuccessModal = () => {
        setOpenSuccessModal(!openSuccessModal);
    };
    const toggleFailModal = () => {
        setOpenFailModal(!openFailModal);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const values = Object.fromEntries(data.entries());
        try {
            const response = await axios.put(`http://localhost:8080/api/account/update`, values, {
                headers: { Authorization: `Bearer ${idToken}` }
            });
            if (response.status === 200) {
                toggleSuccessModal();
            } else {
                toggleFailModal();
            }
            auth.getCurrentUser(idToken);
        } catch (error) {
            console.dir('Update Account error:', error);
        }
    };

    React.useEffect(() => {
        if (auth.user) {
            setAccountUser(auth.user);
        }
    }, [auth.user]);
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
                            <Typography>Họ</Typography>
                            <TextField
                                required
                                autoFocus
                                fullWidth
                                name="firstName"
                                type="firstName"
                                id="firstName"
                                value={accountUser.firstName || ''}
                                onChange={(e) => setAccountUser({ ...accountUser, firstName: e.target.value })}
                                sx={{ mt: 1, mb: 1 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Tên</Typography>
                            <TextField
                                required
                                fullWidth
                                name="lastName"
                                type="lastName"
                                id="lastName"
                                value={accountUser.lastName || ''}
                                onChange={(e) => setAccountUser({ ...accountUser, lastName: e.target.value })}
                                sx={{ mt: 1, mb: 1 }}
                            />

                        </Grid>

                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography>Tên đăng nhập</Typography>
                            <TextField
                                required
                                fullWidth
                                name="login"
                                type="login"
                                id="login"
                                value={accountUser.login || ''}
                                onChange={(e) => setAccountUser({ ...accountUser, login: e.target.value })}
                                sx={{ mt: 1, mb: 1 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Email</Typography>
                            <TextField
                                required
                                fullWidth
                                name="email"
                                type="email"
                                id="email"
                                value={accountUser.email || ''}
                                onChange={(e) => setAccountUser({ ...accountUser, email: e.target.value })}
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
                            <Typography>Căn cước công dân</Typography>
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
                            <Typography>Ngày cấp</Typography>
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
                            <Typography>Địa điểm cấp</Typography>
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
                        Cập nhật
                    </Button>
                    <Dialog open={openSuccessModal} onClose={toggleSuccessModal}>
                        <ResultModal type="UPDATE_ACCOUNT_SUCCESS" close={toggleSuccessModal} />
                    </Dialog>
                    <Dialog open={openFailModal} onClose={toggleFailModal}>
                        <ResultModal type="UPDATE_ACCOUNT_FAIL" close={toggleFailModal} />
                    </Dialog>
                </Box>
            </Box>
        </Container>
    );
}
