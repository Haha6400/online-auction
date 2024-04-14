// color:
// primary: #00623B
// secondary: #015433



import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Launch from "@mui/icons-material/Launch";
import Search from "@mui/icons-material/Search";

import carImage from "../assets/car.png";

import { OutlinedInput, alpha } from "@mui/material";
import { FormControl, Select, MenuItem, Dialog } from "@mui/material";

import Footer from "../components/common/Footer";
import AppAppBarTest from "../components/base/AppAppBarTest";
import Register from "../components/common/Register";

const rows = [
    {
        licensePlate: "30L-111.11",
        time: "7/4/2024",
        province: "Thành phố Hà Nội",
        carType: "Xe con",
        remainingTime: "20 giờ 24 phút",
    },
    {
        licensePlate: "30L-222.22",
        time: "7/4/2024",
        province: "Thành phố Hà Nội",
        carType: "Xe con",
        remainingTime: "20 giờ 24 phút",
    },
    {
        licensePlate: "30L-333.33",
        time: "7/4/2024",
        province: "Thành phố Hà Nội",
        carType: "Xe con",
        remainingTime: "20 giờ 24 phút",
    },
    {
        licensePlate: "30L-444.44",
        time: "7/4/2024",
        province: "Thành phố Hà Nội",
        carType: "Xe con",
        remainingTime: "20 giờ 24 phút",
    },
    {
        licensePlate: "30L-111.11",
        time: "7/4/2024",
        province: "Thành phố Hà Nội",
        carType: "Xe con",
        remainingTime: "20 giờ 24 phút",
    },
    {
        licensePlate: "30L-222.22",
        time: "7/4/2024",
        province: "Thành phố Hà Nội",
        carType: "Xe con",
        remainingTime: "20 giờ 24 phút",
    },
    {
        licensePlate: "30L-333.33",
        time: "7/4/2024",
        province: "Thành phố Hà Nội",
        carType: "Xe con",
        remainingTime: "20 giờ 24 phút",
    },
    {
        licensePlate: "30L-444.44",
        time: "7/4/2024",
        province: "Thành phố Hà Nội",
        carType: "Xe con",
        remainingTime: "20 giờ 24 phút",
    },
    {
        licensePlate: "30L-111.11",
        time: "7/4/2024",
        province: "Thành phố Hà Nội",
        carType: "Xe con",
        remainingTime: "20 giờ 24 phút",
    },
    {
        licensePlate: "30L-222.22",
        time: "7/4/2024",
        province: "Thành phố Hà Nội",
        carType: "Xe con",
        remainingTime: "20 giờ 24 phút",
    },
    {
        licensePlate: "30L-333.33",
        time: "7/4/2024",
        province: "Thành phố Hà Nội",
        carType: "Xe con",
        remainingTime: "20 giờ 24 phút",
    },
    {
        licensePlate: "30L-444.44",
        time: "7/4/2024",
        province: "Thành phố Hà Nội",
        carType: "Xe con",
        remainingTime: "20 giờ 24 phút",
    },
];

function CustomizedTables() {
    const [province, setProvince] = React.useState("");
    const [carType, setCarType] = React.useState("");
    return (
        <>
            <Box
                sx={{
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 5,
                }}
            >
                <OutlinedInput
                    type="search"
                    placeholder="Nhập biển số xe cần tìm"
                    size="small"
                    sx={{
                        width: 250,
                        marginY: 2,
                        border: "1px solid #015433",
                        borderRadius: 3,
                    }}
                    startAdornment={
                        <Search sx={{ width: 20, color: "#015433", mr: 1 }} />
                    }
                />
                <FormControl sx={{ minWidth: 250, marginY: 2 }} size="small">
                    <Select
                        autoWidth
                        displayEmpty
                        value={province}
                        onChange={(event) => {
                            setProvince(event.target.value);
                        }}
                        sx={{
                            width: 250,
                            border: "1px solid #015433",
                            borderRadius: 3,
                        }}
                    >
                        <MenuItem sx={{ borderRadius: 0, width: 250 }} value="">
                            Chọn tỉnh/thành phố
                        </MenuItem>
                        <MenuItem sx={{ borderRadius: 0, width: 250 }} value={1}>
                            Thành phố Hà Nội
                        </MenuItem>
                        <MenuItem sx={{ borderRadius: 0, width: 250 }} value={2}>
                            Thành phố Hồ Chí Minh
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 250, marginY: 2 }} size="small">
                    <Select
                        autoWidth
                        displayEmpty
                        value={carType}
                        onChange={(event) => {
                            setCarType(event.target.value);
                        }}
                        sx={{
                            width: 250,
                            border: "1px solid #015433",
                            borderRadius: 3,
                        }}
                    >
                        <MenuItem sx={{ borderRadius: 0, width: 250 }} value="">
                            Chọn loại xe
                        </MenuItem>
                        <MenuItem sx={{ borderRadius: 0, width: 250 }} value={1}>
                            Xe con
                        </MenuItem>
                        <MenuItem sx={{ borderRadius: 0, width: 250 }} value={2}>
                            Xe tải
                        </MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    style={{ whiteSpace: "nowrap", marginY: 2, color: "#FFFFFF", backgroundColor: "#015433" }}
                >
                    Tìm kiếm
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 2, backgroundColor: "rgba(255, 255, 255, 0.15)", boxShadow: "#015433", color: "#015433" }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead
                        sx={{ backgroundColor: "rgba(1, 84, 51, 0.2)" }}
                    >
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }} align="center">
                                STT
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Biển số</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Tỉnh/Thành phố</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Thời gian đấu giá</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Loại xe</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>
                                Thời gian đăng ký còn lại
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "#15433" }}>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell>{row.licensePlate}</TableCell>
                                <TableCell>{row.time}</TableCell>
                                <TableCell>{row.province}</TableCell>
                                <TableCell>{row.carType}</TableCell>
                                <TableCell>{row.remainingTime}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        style={{ whiteSpace: "nowrap", color: "#FFFFFF", backgroundColor: "#015433" }}

                                    >
                                        Đăng ký đấu giá
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default function HomeTest() {
    const [openRegisterDialog, setOpenRegisterDialog] = React.useState(false);

    const toggleRegisterDialog = () => {
        setOpenRegisterDialog(!openRegisterDialog);
    };

    return (
        <>
            <div style={{ backgroundImage: "url(/bgr.png)" }}>
                <AppAppBarTest loginCheck="false" currentPage="home" />
                <Box
                    id="hero"
                    sx={{
                        width: "100%",
                        backgroundSize: "100% 20%",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <Container
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            pt: { xs: 14, sm: 16 },
                            pb: { xs: 8, sm: 12 },
                        }}
                    >
                        {/* Hero section */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { lg: "row", xs: "column" },
                                justifyContent: "space-between",
                                pl: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    width: { xs: "100%", lg: "40%" },
                                    textAlign: { xs: "center", lg: "left" },
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Stack
                                    spacing={1}
                                    useFlexGap
                                    sx={{ width: { lg: "100%", md: "60%", xs: "80%" } }}
                                >
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            lineHeight: 1.2,
                                            fontSize: "60px",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Công ty đấu giá hợp danh&nbsp;
                                        <Typography
                                            component={"span"}
                                            sx={{
                                                display: { lg: "block" },
                                                fontWeight: "800",
                                                lineHeight: 1.2,
                                                fontSize: "60px",
                                                color: "#015433"
                                            }}
                                        >
                                            OOAD
                                        </Typography>
                                    </Typography>

                                    <Typography
                                        color="#727584"
                                        sx={{
                                            marginTop: 5,
                                            fontSize: "18px",
                                        }}
                                    >
                                        Khám phá và sở hữu biển số xe độc đáo ngay hôm nay!
                                    </Typography>

                                    <Box>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            style={{
                                                mt: 5,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                width: { xs: "100%", lg: "auto" },
                                                color: "#FFFFFF",
                                                backgroundColor: "#015433"
                                            }}
                                            onClick={toggleRegisterDialog}
                                        >
                                            Đăng ký ngay
                                            <Launch />
                                        </Button>
                                        <Dialog
                                            open={openRegisterDialog}
                                            onClose={toggleRegisterDialog}
                                            aria-labelledby="scroll-dialog-title"
                                            aria-describedby="scroll-dialog-description"
                                        >
                                            <Register />
                                        </Dialog>
                                    </Box>
                                </Stack>
                            </Box>
                            <Box
                                sx={{
                                    width: { lg: "65%", xs: "100%" },
                                    display: { xs: "none", sm: "flex" },
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Box sx={{ width: { lg: "100%", xs: "80%" } }}>
                                    <img
                                        src={carImage}
                                        style={{ maxWidth: "100%", textAlign: "center" }}
                                        alt="car hero"
                                    />
                                </Box>
                            </Box>
                        </Box>

                        {/* List of license plate */}
                        <Box
                            sx={{
                                mt: { xs: 8, sm: 10 },
                                padding: 5,
                                alignSelf: "center",
                                width: "100%",
                                bgcolor: "rgba(255, 255, 255, 0.3)", // Mã rgba với opacity là 50%
                                backgroundSize: "cover",
                                borderRadius: "10px",
                                boxShadow: "#015433"
                            }}
                        >
                            <Typography
                                component="h2"
                                variant="h5"
                                color="#015433"
                                sx={{ fontWeight: 700, fontSize: 24, textAlign: "center" }}
                            >
                                DANH SÁCH BIỂN SỐ
                            </Typography>
                            <CustomizedTables />
                        </Box>
                    </Container>
                </Box>
                <Footer />
            </div >
        </>
    );
}
