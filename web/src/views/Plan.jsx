import { useState } from "react";

import { alpha } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import DownloadIcon from "@mui/icons-material/Download";

import AppAppBar from "../components/base/AppAppBar";
import Footer from "../components/common/Footer";
import Box from "@mui/material/Box";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

const rows = [
  {
    time: "7/4/2024",
    name: "Thông báo thời gian đấu giá trực tuyến biển số xe ô tô ngày 7/4/2024",
  },
  {
    time: "7/4/2024",
    name: "Thông báo thời gian đấu giá trực tuyến biển số xe ô tô ngày 7/4/2024",
  },
  {
    time: "7/4/2024",
    name: "Thông báo thời gian đấu giá trực tuyến biển số xe ô tô ngày 7/4/2024",
  },
  {
    time: "7/4/2024",
    name: "Thông báo thời gian đấu giá trực tuyến biển số xe ô tô ngày 7/4/2024",
  },
  {
    time: "7/4/2024",
    name: "Thông báo thời gian đấu giá trực tuyến biển số xe ô tô ngày 7/4/2024",
  },
  {
    time: "7/4/2024",
    name: "Thông báo thời gian đấu giá trực tuyến biển số xe ô tô ngày 7/4/2024",
  },
  {
    time: "7/4/2024",
    name: "Thông báo thời gian đấu giá trực tuyến biển số xe ô tô ngày 7/4/2024",
  },
  {
    time: "7/4/2024",
    name: "Thông báo thời gian đấu giá trực tuyến biển số xe ô tô ngày 7/4/2024",
  },
  {
    time: "7/4/2024",
    name: "Thông báo thời gian đấu giá trực tuyến biển số xe ô tô ngày 7/4/2024",
  },
  {
    time: "7/4/2024",
    name: "Thông báo thời gian đấu giá trực tuyến biển số xe ô tô ngày 7/4/2024",
  },
  {
    time: "7/4/2024",
    name: "Thông báo thời gian đấu giá trực tuyến biển số xe ô tô ngày 7/4/2024",
  },
  {
    time: "7/4/2024",
    name: "Thông báo thời gian đấu giá trực tuyến biển số xe ô tô ngày 7/4/2024",
  },
];

function CustomizedTables() {
  const [startDate, setStartDate] = useState(dayjs("2024-04-14"));
  const [endDate, setEndDate] = useState(dayjs());

  return (
    <>
      <Box
        sx={{
          py: 2,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem label="Từ ngày:">
            <DatePicker
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              sx={{
                border: "2px solid darkgrey",
                borderRadius: 3,
              }}
              slotProps={{
                field: { clearable: true },
              }}
            />
          </DemoItem>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem label="Đến ngày:">
            <DatePicker
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              sx={{
                border: "2px solid darkgrey",
                borderRadius: 3,
              }}
              slotProps={{
                field: { clearable: true },
              }}
            />
          </DemoItem>
        </LocalizationProvider>
        <Button
          variant="contained"
          color="primary"
          sx={{ whiteSpace: "nowrap", pr: 2, mb: "2px" }}
        >
          <FilterAltIcon sx={{ width: 18, mr: 1 }} />
          Lọc
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead
            sx={(theme) => ({
              backgroundColor:
                theme.palette.mode === "light" ? "#F4F6F8" : "#37404E",
            })}
          >
            <TableRow>
              <TableCell
                sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
                align="center"
              >
                Thời gian đăng tải
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Tên tài liệu</TableCell>
              <TableCell sx={{ fontWeight: 600 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{row.time}</TableCell>
                <TableCell>
                  <Link href="#">{row.name}</Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    Tải xuống
                    <DownloadIcon sx={{ fontSize: 15, ml: 1 }} />
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

export default function Plan() {
  return (
    <>
      <AppAppBar loginCheck="false" currentPage="plan" />
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
            pt: { xs: 10, sm: 14 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Typography
            variant="h2"
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
            KẾ HOẠCH ĐẤU GIÁ
          </Typography>
          <Box
            sx={(theme) => ({
              mt: 3,
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
            <CustomizedTables />
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
