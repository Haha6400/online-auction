import { useState, useEffect } from "react";
import axios from 'axios';

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
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Launch from "@mui/icons-material/Launch";
import Search from "@mui/icons-material/Search";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Alert from '@mui/material/Alert';
import carImage from "../assets/car.png";

import { OutlinedInput, alpha } from "@mui/material";
import { FormControl, Select, MenuItem, Dialog } from "@mui/material";

import Footer from "../components/common/Footer";
import AppAppBar from "../components/base/AppAppBar";
import Register from "../components/common/Register";
import Login from "../components/common/Login";
import AuctionRegisterModal from "../components/modals/AuctionRegisterModal";
import { styled } from '@mui/system';
import { useAuth } from "../hooks/AuthProvider";
import { LPtype, LPprovinces } from "../utils/constants/LicensePlate";

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: "black"
}));

const GroupItems = styled('ul')({
  padding: 0,
});

function CustomizedTables(props) {
  const [idToken, setToken] = useState(localStorage.getItem("id_token") || "");
  const [LPprovince, setLPprovince] = useState('');
  const [vehicleType, setVehicleType] = useState("");
  const [LPnumber, setLPnumber] = useState('');
  const [openAuctionRegisterModal, setOpenAuctionRegisterModal] = useState(false);
  const [openLoginAlert, setOpenLoginAlert] = useState(false);
  const [licensePlateList, setLicensePlateList] = useState(null);

  const LPtypeProps = {
    options: Object.values(LPtype),
  };
  const options = Object.keys(LPprovinces).map((key) => ({
    title: LPprovinces[key], // Sử dụng giá trị của LPtype làm title cho option
  }));
  options.forEach((option) => {
    const firstLetter = option.title[0].toUpperCase();
    option.firstLetter = /[0-9]/.test(firstLetter) ? '0-9' : firstLetter;
  });

  const handleLPProvinceFilter = (event, values) => {
    setLPprovince(values.title)
  }
  const handleVehicleTypeFilter = (event, values) => {
    setVehicleType(values)
  }
  const handleLPNumberFilter = (event) => {
    setLPnumber(event.target.value)
  }


  const getAllLicensePlate = async () => {
    await axios.get(`http://localhost:8080/api/license-plates`).then(res => {
      const licensePlateList = Object.values(res.data);
      setLicensePlateList(licensePlateList)
      console.log("list license plate: ", res.data)
    }).catch(error => {
      console.dir('Get all auction room error:', error);
    });
    return;
  };
  const filteredLicensePlateList = licensePlateList ? licensePlateList.filter(plate => {
    const matchesLPprovince = !LPprovince || plate.province === LPprovince;
    const matchesVehicleType = !vehicleType || plate.vehicleType === vehicleType;
    const matchesPlateNumber = !LPnumber || plate.plateNumber.toLowerCase().includes(LPnumber.toLowerCase());
    return matchesLPprovince && matchesVehicleType && matchesPlateNumber;
  }) : [];

  const toggleAuctionRegisterMdal = () => {
    setOpenAuctionRegisterModal(!openAuctionRegisterModal);
  };
  const handleLoginAlert = () => {
    setOpenLoginAlert(!openLoginAlert);
  };
  const handleButtonClick = () => {
    if (idToken) toggleAuctionRegisterMdal();
    else handleLoginAlert();
  }

  useEffect(() => {
    getAllLicensePlate();
    console.log('accountUser', props.accountUser)
  }, [props.accountUser]);

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
            border: "2px solid #015433",
            borderRadius: 3,
            color: "primary"
          }}
          onChange={handleLPNumberFilter}
          startAdornment={
            <Search sx={{
              width: 20,
              color: "015433",
              mr: 1
            }}
            />
          }
        />
        <FormControl sx={{ minWidth: 250, marginY: 2 }} size="small">
          <Stack>
            <Autocomplete
              options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.title}
              sx={{
                width: 250,
                border: "2px solid #015433",
                borderRadius: 3,
                color: "primary"
              }}
              renderInput={(params) => <TextField {...params} placeholder="Chọn tỉnh thành" variant="outlined" />}
              renderGroup={(params) => (
                <li key={params.key}>
                  <GroupHeader>{params.group}</GroupHeader>
                  <GroupItems>{params.children}</GroupItems>
                </li>
              )}
              onChange={handleLPProvinceFilter}
            />
          </Stack>
        </FormControl>
        <FormControl sx={{ minWidth: 250, marginY: 2 }} size="small">
          <Stack>
            <Autocomplete
              {...LPtypeProps}
              sx={{
                width: 250,
                border: "2px solid #015433",
                borderRadius: 3,
                color: "primary"
              }}
              value={vehicleType}
              renderInput={(params) => (
                <TextField {...params} placeholder="Chọn loại xe" variant="outlined" />
              )}
              onChange={handleVehicleTypeFilter}
            />
          </Stack>

        </FormControl>
      </Box >
      <TableContainer
        component={Paper}
        sx={{
          mt: 2,
          backgroundColor: "rgba(255, 255, 255, 0.15)"
        }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead
            sx={{ backgroundColor: "rgba(1, 84, 51, 0.2)" }}
          >
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                STT
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Biển số</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Tỉnh, Thành phố</TableCell>
              <TableCell sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                Loại xe
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Thời điểm đấu giá
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {licensePlateList && (
              <>
                {filteredLicensePlateList.map((licensePlate, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell>{licensePlate.plateNumber}</TableCell>
                    <TableCell>{licensePlate.province}</TableCell>
                    <TableCell>{licensePlate.vehicleType}</TableCell>
                    <TableCell align="center">{licensePlate.remainingTime}</TableCell>
                    {/* TODO: Return auction room */}
                    <TableCell>
                      <Button
                        onClick={handleButtonClick}
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                          whiteSpace: "nowrap",
                          backgroundColor: "primary",
                          color: "white"
                        }}
                      >
                        Đăng ký đấu giá
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openAuctionRegisterModal}
        onClose={toggleAuctionRegisterMdal}
      >
        <AuctionRegisterModal close={toggleAuctionRegisterMdal} accountUser={props.accountUser} />
      </Dialog>
      <Dialog
        open={openLoginAlert}
        onClose={handleLoginAlert}
      >
        <Login />
      </Dialog>
    </>
  );
}

export default function Home(props) {
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const [accountUser, setAccountUser] = useState({});
  const [idToken, setToken] = useState(localStorage.getItem("id_token") || "");
  const auth = useAuth()


  const toggleRegisterDialog = () => {
    setOpenRegisterDialog(!openRegisterDialog);
  };

  useEffect(() => {
    if (auth.user) {
      setAccountUser(auth.user);
    }
  }, [auth.user]);


  return (
    <Stack
      sx={{
        background: "url(/bgr.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AppAppBar currentPage="home" />
      <Box
        id="hero"
        sx={{
          width: "100%",
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
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", lg: "40%" },
                textAlign: { xs: "center", lg: "left" },
                display: "flex",
                justifyContent: "center",
                pl: { xs: 0, lg: 4 },
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
                      color: "#015433",
                    }}
                  >
                    OOAD {accountUser.login}
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
                    sx={{
                      mt: 5,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      width: { xs: "100%", lg: "auto" },
                      backgroundColor: "primary",
                      color: "white"

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
              bgcolor: "rgba(255, 255, 255, 0.3)",
              backgroundSize: "cover",
              borderRadius: "10px",
              boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)`,
            }}
          >
            <Typography
              component="h2"
              variant="h5"
              color="text.secondary"
              sx={{ fontWeight: 700, fontSize: 24, textAlign: "center" }}
            >
              DANH SÁCH BIỂN SỐ
            </Typography>
            <CustomizedTables accountUser={accountUser} />
          </Box>
        </Container>
      </Box>
      <Footer />
    </Stack>
  );
}
