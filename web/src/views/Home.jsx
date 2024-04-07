import * as React from "react";
import Box from "@mui/material/Box";

import { alpha } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Footer from "../components/common/Footer";
import AppAppBar from "../components/base/AppAppBar";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success,
    color: "#0F3554",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
];

function CustomizedTables() {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead sx={{ backgroundColor: "#B8D5FD" }}>
          <TableRow>
            <StyledTableCell>STT</StyledTableCell>
            <StyledTableCell>Biển số</StyledTableCell>
            <StyledTableCell>Thời gian đấu giá</StyledTableCell>
            <StyledTableCell>Tỉnh/Thành phố</StyledTableCell>
            <StyledTableCell>Loại xe</StyledTableCell>
            <StyledTableCell>Thời gian đăng ký còn lại</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell>{row.licensePlate}</StyledTableCell>
              <StyledTableCell>{row.time}</StyledTableCell>
              <StyledTableCell>{row.province}</StyledTableCell>
              <StyledTableCell>{row.carType}</StyledTableCell>
              <StyledTableCell>{row.remainingTime}</StyledTableCell>
              <StyledTableCell>
                <Button variant="contained" color="warning" size="small">
                  Đăng ký đấu giá
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function Home() {
  return (
    <>
      <AppAppBar />
      <Box
        id="hero"
        sx={(theme) => ({
          width: "100%",
          backgroundImage:
            theme.palette.mode === "light"
              ? "linear-gradient(180deg, #CEE5FD, #FFF)"
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
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Stack
            spacing={2}
            useFlexGap
            sx={{ width: { xs: "100%", sm: "100%" } }}
          >
            <Typography
              variant="h1"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                textAlign: "center",
                fontSize: "50px",
              }}
            >
              Công ty đấu giá hợp danh&nbsp;
              <Typography
                component="span"
                variant="h1"
                sx={{
                  fontSize: "50px",
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "primary.main"
                      : "primary.light",
                }}
              >
                Abc
              </Typography>
            </Typography>
            <Typography
              textAlign="center"
              color="text.secondary"
              sx={{
                alignSelf: "center",
                width: { sm: "100%", md: "80%" },
                fontSize: "20px",
              }}
            >
              Khám phá và sở hữu biển số xe độc đáo ngay hôm nay!
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignSelf="center"
              spacing={1}
              useFlexGap
              sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
            >
              {/* <TextField
                id="outlined-basic"
                hiddenLabel
                size="small"
                variant="outlined"
                aria-label="Enter your email address"
                placeholder="Your email address"
              /> */}

              <Button variant="contained" color="primary">
                Đăng ký
              </Button>
              <Button variant="outlined" color="secondary">
                Hướng dẫn
              </Button>
            </Stack>
          </Stack>
          <Box
            id="image"
            sx={(theme) => ({
              mt: { xs: 8, sm: 10 },
              padding: 5,
              alignSelf: "center",
              height: { xs: 200, sm: 700 },
              width: "100%",
              backgroundImage:
                theme.palette.mode === "light"
                  ? 'url("/static/images/templates/templates-images/hero-light.png")'
                  : 'url("/static/images/templates/templates-images/hero-dark.png")',
              backgroundSize: "cover",
              borderRadius: "10px",
              outline: "1px solid",
              outlineColor:
                theme.palette.mode === "light"
                  ? alpha("#BFCCD9", 0.5)
                  : alpha("#9CCCFC", 0.1),
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                  : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
            })}
          >
            <Typography
              component="h2"
              variant="h4"
              color="text.primary"
              sx={{}}
            >
              Danh sách biển số
            </Typography>
            <CustomizedTables />
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
