import { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Dialog } from "@mui/material";

import Launch from "@mui/icons-material/Launch";

import Footer from "../../components/common/Footer";
import AppAppBar from "../../components/base/AppAppBar";
import Register from "../../components/common/Register";
import AdminTable from "./AdminTable";
import ReadOnlyTable from "./ReadOnlyTable";

import carImage from "../../assets/car.png";
import Login from "../../components/common/Login";

export default function Home() {
  const [idToken, setIdToken] = useState(localStorage.getItem("id_token"));
  const [role, setRole] = useState();

  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const toggleLoginDialog = () => {
    setOpenLoginDialog(!openLoginDialog);
  };

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

  return (
    <Stack
      sx={{
        background: "url(/bgr.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AppAppBar currentPage="home" login={toggleLoginDialog} />
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
          {!(role && role.includes("ROLE_ADMIN")) && (
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
                      OOAD
                    </Typography>
                  </Typography>
                  <Typography
                    color=""
                    sx={{
                      marginTop: 2,
                      fontSize: "18px",
                    }}
                  >
                    Khám phá và sở hữu biển số xe độc đáo ngay hôm nay!
                  </Typography>

                  <Box>
                    <a href={idToken && "#LPTable"}>
                      <Button
                        variant="contained"
                        size="large"
                        sx={{
                          mt: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          width: { xs: "100%", lg: "auto" },
                        }}
                        onClick={!idToken ? toggleLoginDialog : () => {}}
                      >
                        Đăng ký ngay
                        <Launch />
                      </Button>
                    </a>
                    <Dialog open={openLoginDialog} onClose={toggleLoginDialog}>
                      <Login handleLoginDialogClose={toggleLoginDialog} />
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
          )}

          {/* List of license plate */}
          {/* <div id="LPTable"> */}
          <Box
            sx={{
              // mt: { xs: 8, sm: 10 },
              padding: 5,
              alignSelf: "center",
              width: "100%",
              bgcolor: "rgba(255, 255, 255, 0.3)",
              backgroundSize: "cover",
              borderRadius: "10px",
              boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)`,
            }}
            id="LPTable"
          >
            <Typography
              component="h2"
              variant="h5"
              color="text.secondary"
              sx={{ fontWeight: 700, fontSize: 24, textAlign: "center" }}
            >
              DANH SÁCH BIỂN SỐ
            </Typography>

            {role && role.includes("ROLE_ADMIN") ? (
              <AdminTable idToken={idToken} />
            ) : (
              <ReadOnlyTable idToken={idToken} login={toggleLoginDialog} />
            )}
          </Box>
          {/* </div> */}
        </Container>
      </Box>
      <Footer />
    </Stack>
  );
}
