import { useState, useEffect } from "react";
import axios from "axios";

import { Dialog, Pagination } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import DownloadIcon from "@mui/icons-material/Download";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteIcon from "@mui/icons-material/Delete";

import AppAppBar from "../../components/base/AppAppBar";
import Footer from "../../components/common/Footer";
import Box from "@mui/material/Box";

import ViewPlanModal from "./modals/ViewPlanModal";
import { formatTimeWithoutHour, getNthDay } from "../../utils/formatter";

let planData = [
  {
    time: new Date("2024-05-15"),
    url: "21-5.pdf",
  },
  {
    time: new Date("2024-05-14"),
    url: "20-5.pdf",
  },
  {
    time: new Date("2024-05-11"),
    url: "17-5.pdf",
  },
  {
    time: new Date("2024-05-10"),
    url: "16-5.pdf",
  },
  {
    time: new Date("2024-05-9"),
    url: "15-5.pdf",
  },
  {
    time: new Date("2024-05-8"),
    url: "14-5.pdf",
  },
  {
    time: new Date("2024-05-7"),
    url: "13-5.pdf",
  },
  {
    time: new Date("2024-05-3"),
    url: "9-5.pdf",
  },
  {
    time: new Date("2024-05-2"),
    url: "8-5.pdf",
  },
  {
    time: new Date("2024-05-1"),
    url: "7-5.pdf",
  },
  {
    time: new Date("2024-04-15"),
    url: "21-5.pdf",
  },
  {
    time: new Date("2024-04-14"),
    url: "20-5.pdf",
  },
  {
    time: new Date("2024-04-11"),
    url: "17-5.pdf",
  },
  {
    time: new Date("2024-04-10"),
    url: "16-5.pdf",
  },
  {
    time: new Date("2024-04-9"),
    url: "15-5.pdf",
  },
  {
    time: new Date("2024-04-8"),
    url: "14-5.pdf",
  },
  {
    time: new Date("2024-04-7"),
    url: "13-5.pdf",
  },
  {
    time: new Date("2024-04-3"),
    url: "9-5.pdf",
  },
  {
    time: new Date("2024-04-2"),
    url: "8-5.pdf",
  },
  {
    time: new Date("2024-04-1"),
    url: "7-5.pdf",
  },
];

function CustomizedTables() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [openPdfModal, setOpenPdfModal] = useState(false);

  const [currentPdfUrl, setCurrentPdfUrl] = useState("");

  const [plans, setPlans] = useState(planData);

  const [idToken] = useState(localStorage.getItem("id_token"));
  const [role, setRole] = useState();

  useEffect(() => {
    if (idToken) {
      axios
        .get(`http://localhost:8080/api/account`, {
          headers: { Authorization: `Bearer ${idToken}` },
        })
        .then((response) => {
          setRole(response.data.authorities);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const filteredPlans = plans.filter((plan) => {
    if (!startDate) {
      return !endDate || plan.time <= endDate;
    } else {
      return plan.time >= startDate && (!endDate || plan.time <= endDate);
    }
  });

  const togglePdfModal = () => {
    setOpenPdfModal(!openPdfModal);
  };

  return (
    <>
      <Box
        sx={{
          py: 2,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            // alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 5,
          }}
        >
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <DemoItem>
              <Typography sx={{ fontWeight: 700 }}>Từ ngày:</Typography>
              <DatePicker
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                sx={{
                  border: "2px solid #015433",
                  borderRadius: 3,
                }}
                slotProps={{
                  field: { clearable: true },
                }}
              />
            </DemoItem>
          </LocalizationProvider>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <DemoItem>
              <Typography sx={{ fontWeight: 700 }}>Đến ngày:</Typography>
              <DatePicker
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                sx={{
                  border: "2px solid #015433",
                  borderRadius: 3,
                }}
                slotProps={{
                  field: { clearable: true },
                }}
              />
            </DemoItem>
          </LocalizationProvider>
        </Box>

        {role && role.includes("ROLE_ADMIN") && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlaylistAddIcon />}
            onClick={() => {}}
          >
            Đăng thông báo
          </Button>
        )}
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          mt: 2,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
        }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead
            sx={{
              backgroundColor: "rgba(1, 84, 51, 0.2)",
            }}
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
            {filteredPlans.map((plan, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  {formatTimeWithoutHour(plan.time)}
                </TableCell>
                <TableCell>
                  <div
                    onClick={() => {
                      setCurrentPdfUrl(plan.url);
                      togglePdfModal();
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: 14,
                        ":hover": { cursor: "pointer", color: "#079455" },
                      }}
                    >
                      Thông báo thời gian đấu giá trực tuyến biển số xe ô tô
                      ngày {formatTimeWithoutHour(getNthDay(plan.time, 6))}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  {role && role.includes("ROLE_ADMIN") ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ whiteSpace: "nowrap" }}
                      style={{
                        background: "#e05757",
                      }}
                      startIcon={<DeleteIcon style={{ fontSize: 14 }} />}
                      onClick={() => {
                        const temp = [...plans];
                        temp.splice(index, 1);
                        setPlans(temp);
                      }}
                    >
                      Xóa tài liệu
                    </Button>
                  ) : (
                    <a href={`/pdf/${plan.url}`} download={plan.url}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        Tải xuống
                        <DownloadIcon sx={{ fontSize: 15, ml: 1 }} />
                      </Button>
                    </a>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Box
        sx={{
          paddingTop: 5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination count={10} size="large" sx={{ fontWeight: "bold" }} />
      </Box> */}
      <Dialog maxWidth="xl" open={openPdfModal} onClose={togglePdfModal}>
        <ViewPlanModal url={currentPdfUrl} close={togglePdfModal} />
      </Dialog>
    </>
  );
}

export default function Plan() {
  return (
    <Stack
      sx={{
        background: "url(/bgr.png)",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AppAppBar name="Ha Nguyen" currentPage="plan" />
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
            KẾ HOẠCH ĐẤU GIÁ
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
              boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)`,
            }}
          >
            <CustomizedTables />
          </Box>
        </Container>
      </Box>
      <Footer />
    </Stack>
  );
}
