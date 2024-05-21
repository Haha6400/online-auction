import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Grid, Stack, Dialog } from "@mui/material";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";
import DescriptionIcon from "@mui/icons-material/Description";
import { useAuth } from "../../hooks/AuthProvider";
import ResultModal from "../base/ResultModal";
import { useNavigate } from "react-router-dom";

export default function PayAction({ title, auctionRoom, close }) {
    const [idToken, setIdToken] = React.useState(
        localStorage.getItem("id_token"),
    );
    const navigate = useNavigate();
    const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
    const [QRImageData, setQRImageData] = React.useState('');

    const auth = useAuth();
    const toggleSuccessModal = () => {
        setOpenSuccessModal(!openSuccessModal);

    };
    const handleConfirmButton = async () => {
        axios.patch(`http://localhost:8080/api/winning-bids/${auctionRoom.id}`, {
            "paymentStatus": "WAITING_CONFIRM"
        }, {
            headers: { Authorization: `Bearer ${idToken}` }
        }).then(() => {
            toggleSuccessModal();
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }).catch((err) => {
            console.log(err);
        });
    }

    React.useEffect(() => {
    }, []);

    React.useEffect(async () => {
        const values = {
            "accountNo": "2153883597",
            "accountName": "NGUYEN THI HONG HA",
            "acqId": "970418",
            "addInfo": `Thanh toán biển số xe ${auctionRoom.plateNumber}`,
            "amount": `${auctionRoom.finalPrice}`,
            "template": "print"
        }
        console.log("values", values)
        const resQR = await axios.post(`https://api.vietqr.io/v2/generate`, values)
        const qrDataURL = resQR.data
        setQRImageData(qrDataURL.data['qrDataURL'])
    }, []);


    return (
        <Container component="main">
            <Box
                sx={{
                    marginTop: 8,
                    margin: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{ fontWeight: 700, fontSize: 20, textAlign: "center", mb: 2 }}
                >
                    {title} {auctionRoom.plateNumber}
                </Typography>

                <Grid container spacing={0.5} justifyContent="center">
                    {QRImageData && (
                        <>
                            <img width="70%" src={QRImageData} alt="Payment QR Image" />
                        </>
                    )}

                    {/* Action button */}
                    <Grid container spacing={3} sx={{ mt: 0.5 }}>
                        <Grid item xs={6}>
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{ width: "100%" }}
                                onClick={close}
                            >
                                Hủy bỏ
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                sx={{ width: "100%", background: "#079455" }}
                                onClick={handleConfirmButton}
                            >
                                Xác nhận
                            </Button>
                            <Dialog open={openSuccessModal} onClose={toggleSuccessModal}>
                                <ResultModal type="PAYMENT_SUCCESS" close={toggleSuccessModal} />
                            </Dialog>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ display: "flex" }}></Box>
            </Box>
        </Container >
    );
}
