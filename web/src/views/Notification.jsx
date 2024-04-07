import AppAppBar from "../components/base/AppAppBar";
import Footer from "../components/common/Footer";
import Box from "@mui/material/Box";

import { alpha } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import DownloadIcon from "@mui/icons-material/Download";

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
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead sx={{ backgroundColor: "#B8D5FD" }}>
          <TableRow>
            <StyledTableCell>Thời gian đăng tải</StyledTableCell>
            <StyledTableCell>Tên tài liệu</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{row.time}</StyledTableCell>
              <StyledTableCell>
                <Link href="/">{row.name}</Link>
              </StyledTableCell>
              <StyledTableCell>
                <Button variant="contained" color="success" size="small">
                  Tải xuống
                  <DownloadIcon sx={{ fontSize: 15, ml: 1 }} />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function Notification() {
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
            pt: { xs: 10, sm: 14 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "36px",
            }}
          >
            Kế hoạch đấu giá
          </Typography>
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
            <CustomizedTables />
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
