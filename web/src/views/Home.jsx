import * as React from "react";
import Box from "@mui/material/Box";

import { Toolbar, alpha } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Footer from "../components/common/Footer";
import AppAppBar from "../components/base/AppAppBar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Launch from "@mui/icons-material/Launch";

import carImage from "../assets/car.png";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const rows = [
  {
    licensePlate: "30L-111.11",
    time: "7/4/2024",
    province: "Thành phố Hà Nội",
    carType: "Xe con",
    remainingTime: "20 giờ",
  },
  {
    licensePlate: "30L-222.22",
    time: "7/4/2024",
    province: "Thành phố Hà Nội",
    carType: "Xe con",
    remainingTime: "20 giờ",
  },
  {
    licensePlate: "30L-333.33",
    time: "7/4/2024",
    province: "Thành phố Hà Nội",
    carType: "Xe con",
    remainingTime: "20 giờ",
  },
  {
    licensePlate: "30L-444.44",
    time: "7/4/2024",
    province: "Thành phố Hà Nội",
    carType: "Xe con",
    remainingTime: "20 giờ",
  },
  {
    licensePlate: "30L-111.11",
    time: "7/4/2024",
    province: "Thành phố Hà Nội",
    carType: "Xe con",
    remainingTime: "20 giờ",
  },
  {
    licensePlate: "30L-222.22",
    time: "7/4/2024",
    province: "Thành phố Hà Nội",
    carType: "Xe con",
    remainingTime: "20 giờ",
  },
  {
    licensePlate: "30L-333.33",
    time: "7/4/2024",
    province: "Thành phố Hà Nội",
    carType: "Xe con",
    remainingTime: "20 giờ",
  },
  {
    licensePlate: "30L-444.44",
    time: "7/4/2024",
    province: "Thành phố Hà Nội",
    carType: "Xe con",
    remainingTime: "20 giờ",
  },
  {
    licensePlate: "30L-111.11",
    time: "7/4/2024",
    province: "Thành phố Hà Nội",
    carType: "Xe con",
    remainingTime: "20 giờ",
  },
  {
    licensePlate: "30L-222.22",
    time: "7/4/2024",
    province: "Thành phố Hà Nội",
    carType: "Xe con",
    remainingTime: "20 giờ",
  },
  {
    licensePlate: "30L-333.33",
    time: "7/4/2024",
    province: "Thành phố Hà Nội",
    carType: "Xe con",
    remainingTime: "20 giờ",
  },
  {
    licensePlate: "30L-444.44",
    time: "7/4/2024",
    province: "Thành phố Hà Nội",
    carType: "Xe con",
    remainingTime: "20 giờ",
  },
];

function CustomizedTables() {
  const [province, setProvince] = React.useState("");
  const [carType, setCarType] = React.useState("");
  return (
    <>
      <Box sx={{ py: 5 }}>
        <FormControl sx={{ minWidth: 250 }} size="small">
          <Select
            autoWidth
            displayEmpty
            value={province}
            onChange={(event) => {
              setProvince(event.target.value);
            }}
            sx={{
              width: 250,
              marginRight: 5,
              border: "1px solid darkgrey",
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
        <FormControl sx={{ minWidth: 250 }} size="small">
          <Select
            autoWidth
            displayEmpty
            value={carType}
            onChange={(event) => {
              setCarType(event.target.value);
            }}
            sx={{
              width: 250,
              border: "1px solid darkgrey",
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
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead
            sx={(theme) => ({
              backgroundColor:
                theme.palette.mode === "light" ? "#F4F6F8" : "transparent",
            })}
          >
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell>Biển số</TableCell>
              <TableCell>Thời gian đấu giá</TableCell>
              <TableCell>Tỉnh/Thành phố</TableCell>
              <TableCell>Loại xe</TableCell>
              <TableCell>Thời gian đăng ký còn lại</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
                    color="primary"
                    size="small"
                    sx={{ whiteSpace: "nowrap" }}
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

export default function Home() {
  return (
    <>
      <AppAppBar loginCheck="false" currentPage="home" />
      <Box
        id="hero"
        sx={(theme) => ({
          width: "100%",
          background:
            theme.palette.mode === "light"
              ? "#F7FAFC"
              : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
        })}
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
          <Box sx={{ display: "flex", justifyContent: "space-between", pl: 4 }}>
            <Box sx={{ width: { xs: "100%", sm: "40%" } }}>
              <Typography
                variant="h1"
                sx={{
                  lineHeight: 1.2,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignSelf: "center",
                  textAlign: "left",
                  fontSize: "60px",
                  fontWeight: "700",
                }}
              >
                Công ty đấu giá hợp danh&nbsp;
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: "800",
                  lineHeight: 1.2,
                  fontSize: "60px",
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "#45BAB0"
                      : "primary.light",
                }}
              >
                OOAD
              </Typography>
              <Typography
                textAlign="left"
                color="#727584"
                sx={{
                  marginTop: 5,
                  alignSelf: "center",
                  width: { sm: "100%", md: "80%" },
                  fontSize: "18px",
                }}
              >
                Khám phá và sở hữu biển số xe độc đáo ngay hôm nay!
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignSelf="center"
                spacing={1}
                useFlexGap
                sx={{ pt: 5, width: { xs: "100%", sm: "auto" } }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  Đăng ký ngay
                  <Launch />
                </Button>
              </Stack>
            </Box>
            <Box sx={{ width: "65%", display: "flex", alignItems: "center" }}>
              <img
                src={carImage}
                style={{ width: 700 }}
                alt="logo of onlineauction"
              />
            </Box>
          </Box>
          <Box
            sx={(theme) => ({
              mt: { xs: 8, sm: 10 },
              padding: 5,
              alignSelf: "center",
              width: "100%",
              bgcolor: theme.palette.mode === "light" ? "#FFFFFF" : "#090E10",
              backgroundSize: "cover",
              borderRadius: "10px",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)`
                  : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
            })}
          >
            <Typography
              component="h2"
              variant="h5"
              color="text.primary"
              sx={{ fontWeight: 700, fontSize: 24 }}
            >
              DANH SÁCH BIỂN SỐ
            </Typography>
            <CustomizedTables />
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
