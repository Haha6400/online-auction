import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Grid, Stack, Dialog } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from '@mui/icons-material/People';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useAuth } from "../../hooks/AuthProvider";
import ResultModal from "../base/ResultModal";


export default function PaymentDialog({ title, auctionRoom, close }) {
    const [accountUser, setAccountUser] = React.useState({});
    const [idToken, setIdToken] = React.useState(
        localStorage.getItem("id_token"),
    );
    const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
    const [openFailModal, setOpenFailModal] = React.useState(false);
    const auth = useAuth();

    const [paymentMethod, setPaymentMethod] = React.useState();

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleSubmit = async (id) => {
        // setOpenSuccessModal(!openSuccessModal);
        // console.log("id", id)
        // axios.patch(`http://localhost:8080/api/license-plates/${id}`, {
        //     "id": id,
        //     "status": "PAYMENT_COMPLETED",
        // },
        //     {
        //         headers: { Authorization: `Bearer ${idToken}` }
        //     })
    };


    const toggleSuccessModal = () => {
        setOpenSuccessModal(!openSuccessModal);
        axios.patch(`http://localhost:8080/api/auction-rooms/register/${auctionRoom.id}`, {},
            {
                headers: { Authorization: `Bearer ${idToken}` }
            })
    };
    const toggleFailModal = () => {
        setOpenFailModal(!openFailModal);
    };

    const handleRegisterButton = async () => { //Return true if account user can not register
        let registerCheck = false;
        if (auctionRoom.users.length > 0) {

            registerCheck = auctionRoom.users.some(user => {
                console.log(user.id === accountUser.id)
                return user.id === accountUser.id
            });
        }
        if (registerCheck) toggleFailModal()
        else {
            toggleSuccessModal();
        }
    }

    React.useEffect(() => {
        if (auth.user) {
            setAccountUser(auth.user);
        }
    }, [auth.user]);

    return (
        <Container component="main">
            <Box
                sx={{
                    margin: 5,
                    marginLeft: 0,
                    marginRight: 0,
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
                    {title}
                </Typography>

                <Grid container spacing={0.5} justifyContent="center">
                    <Grid item xs={12} sm={12}>
                        <Box
                            sx={{
                                py: 2,
                                px: 5,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                                borderRadius: 2,
                                background: "#FFFFFF",
                            }}
                        >
                            <Typography variant="h4" sx={{ fontWeight: 700, color: "#333" }}>
                                {auctionRoom.licensePlate['plateNumber'].substring(
                                    0,
                                    auctionRoom.licensePlate['plateNumber'].indexOf("-"),
                                )}
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: "#333" }}>
                                {auctionRoom.licensePlate['plateNumber'].substring(
                                    auctionRoom.licensePlate['plateNumber'].indexOf("-") + 1,
                                )}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Box
                                sx={{
                                    mr: 1,
                                    py: 1,
                                    px: 1.2,
                                    borderRadius: "50%",
                                    background: "#F4FCF8",
                                }}
                            >
                                <DirectionsCarIcon sx={{ fontSize: 30, color: "#5DD397" }} />
                            </Box>
                            <Stack>
                                <Typography>Loại xe</Typography>
                                <Typography sx={{ fontWeight: 600 }}>
                                    {auctionRoom.licensePlate['vehicleType']}
                                </Typography>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Box
                                sx={{
                                    mr: 1,
                                    pt: 1.5,
                                    pb: 0.5,
                                    px: 1.5,
                                    borderRadius: "50%",
                                    background: "#F4FCF8",
                                }}
                            >
                                <LocationOnIcon sx={{ fontSize: 25, color: "#5DD397" }} />
                            </Box>
                            <Stack>
                                <Typography>Tỉnh, thành phố</Typography>
                                <Typography sx={{ fontWeight: 600 }}>
                                    {auctionRoom.licensePlate['province']}
                                </Typography>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                                sx={{
                                    mr: 1,
                                    pt: 1.5,
                                    pb: 0.5,
                                    px: 1.5,
                                    borderRadius: "50%",
                                    background: "#F4FCF8",
                                }}
                            >
                                <DescriptionIcon sx={{ fontSize: 25, color: "#5DD397" }} />
                            </Box>
                            <Stack>
                                <Typography>Ghi chú</Typography>
                                <Typography sx={{ fontWeight: 600 }}>
                                    {auctionRoom.description}
                                </Typography>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Box
                                sx={{
                                    mr: 1,
                                    pt: 1.5,
                                    pb: 0.5,
                                    px: 1.5,
                                    borderRadius: "50%",
                                    background: "#F4FCF8",
                                }}
                            >
                                <EventIcon sx={{ fontSize: 25, color: "#5DD397" }} />
                            </Box>
                            <Stack>
                                <Typography>Bắt đầu</Typography>
                                <Typography sx={{ fontWeight: 600 }}>
                                    {auctionRoom.startTime}
                                </Typography>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                                sx={{
                                    mr: 1,
                                    pt: 1.5,
                                    pb: 0.5,
                                    px: 1.5,
                                    borderRadius: "50%",
                                    background: "#F4FCF8",
                                }}
                            >
                                <AccessTimeIcon sx={{ fontSize: 25, color: "#5DD397" }} />
                            </Box>
                            <Stack>
                                <Typography>Kết thúc</Typography>
                                <Typography sx={{ fontWeight: 600 }}>
                                    {auctionRoom.endTime}
                                </Typography>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                                sx={{
                                    mr: 1,
                                    pt: 1.5,
                                    pb: 0.5,
                                    px: 1.5,
                                    borderRadius: "50%",
                                    background: "#F4FCF8",
                                }}
                            >
                                <PeopleIcon sx={{ fontSize: 25, color: "#5DD397" }} />
                            </Box>
                            <Stack>
                                <Typography>Lượng người tham gia</Typography>
                                <Typography sx={{ fontWeight: 600 }}>
                                    {auctionRoom.users.length}
                                </Typography>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Box
                                sx={{
                                    mr: 1,
                                    pt: 1.5,
                                    pb: 0.5,
                                    px: 1.5,
                                    borderRadius: "50%",
                                    background: "#F4FCF8",
                                }}
                            >
                                <PaidIcon sx={{ fontSize: 25, color: "#5DD397" }} />
                            </Box>
                            <Stack>
                                <Typography>Giá khởi điểm</Typography>
                                <Typography sx={{ fontWeight: 600 }}>
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(auctionRoom.initialPrice)}
                                </Typography>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Box
                                sx={{
                                    mr: 1,
                                    pt: 1.5,
                                    pb: 0.5,
                                    px: 1.5,
                                    borderRadius: "50%",
                                    background: "#F4FCF8",
                                }}
                            >
                                <VerifiedIcon sx={{ fontSize: 25, color: "#5DD397" }} />
                            </Box>
                            <Stack>
                                <Typography>Giá kết thúc</Typography>
                                <Typography sx={{ fontWeight: 600 }}>
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(auctionRoom.finalPrice)}
                                </Typography>
                            </Stack>
                        </Box>
                    </Grid>

                    {(title === "XEM PHÒNG ĐẤU GIÁ") && (
                        <>
                            <Grid item xs={12} sm={4}>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <Box
                                        sx={{
                                            mr: 1,
                                            pt: 1.5,
                                            pb: 0.5,
                                            px: 1.5,
                                            borderRadius: "50%",
                                            background: "#F4FCF8",
                                        }}
                                    >
                                        <EmojiEventsIcon sx={{ fontSize: 25, color: "#5DD397" }} />
                                    </Box>
                                    <Stack>
                                        <Typography>Kết quả</Typography>
                                        <Typography sx={{ fontWeight: 600 }}>
                                            Kết quả
                                        </Typography>
                                    </Stack>

                                </Box>
                            </Grid>
                        </>)}

                    {(title !== "XEM PHÒNG ĐẤU GIÁ") && (
                        <>
                            <Grid item xs={12} sm={4}>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <Box
                                        sx={{
                                            mr: 1,
                                            pt: 1.5,
                                            pb: 0.5,
                                            px: 1.5,
                                            borderRadius: "50%",
                                            background: "#F4FCF8",
                                        }}
                                    >
                                        <EmojiEventsIcon sx={{ fontSize: 25, color: "#5DD397" }} />
                                    </Box>
                                    <Stack>
                                        <Typography>Người trúng</Typography>
                                        (auctionRoom.winner && (
                                        <>
                                            <Typography sx={{ fontWeight: 600 }}>

                                                {auctionRoom.winner['fullName']}
                                            </Typography>
                                        </>
                                        ))

                                    </Stack>

                                </Box>
                            </Grid>
                        </>)}

                    {/* Action button */}
                    {(title === "XEM PHÒNG ĐẤU GIÁ") && (
                        <>
                            <Grid item xs={6}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{ width: "100%" }}
                                    onClick={close}
                                >
                                    Đóng
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    sx={{ width: "100%", background: "#079455" }}
                                    onClick={handleRegisterButton}
                                >
                                    Xem tài liệu
                                </Button>
                            </Grid>
                        </>)}
                    {(title === "XÁC NHẬN THANH TOÁN") && (
                        <>

                            <Grid item container spacing={2} justify="start" alignItems="center" marginLeft="4px">
                                <Grid item xs={4}>
                                    Xác nhận thanh toán:
                                </Grid>
                                <Grid item xs={8}>
                                    <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
                                        <FormControlLabel
                                            value="bankTransfer"
                                            control={<Radio size="22px" color="primary" />}
                                            label="Thanh toán bằng tài khoản ngân hàng."
                                        />
                                        <FormControlLabel
                                            value="cash"
                                            control={<Radio size="22px" color="primary" />}
                                            label="Thanh toán bằng tiền mặt."
                                        />
                                    </RadioGroup>
                                </Grid>
                            </Grid>

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
                                    disabled={!paymentMethod}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "primary",
                                        color: "white",
                                    }}
                                    onClick={handleSubmit(auctionRoom.licensePlate['id'])}
                                >
                                    Xác nhận
                                </Button>
                            </Grid>

                        </>
                    )}
                    {(title === "XEM LỊCH SỬ ĐẤU GIÁ") && (
                        <>
                            <Button
                                variant="contained"
                                sx={{ width: "100%", background: "#079455" }}
                                onClick={close}
                            >
                                Đóng
                            </Button>
                        </>
                    )}
                </Grid>
                <Box sx={{ display: "flex" }}></Box>
            </Box>
        </Container >
    );
}
