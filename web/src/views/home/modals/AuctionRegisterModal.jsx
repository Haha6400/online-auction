import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Grid, Stack } from "@mui/material";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";
import DescriptionIcon from "@mui/icons-material/Description";

export default function AuctionRegisterModal({ licensePlate, close }) {
  console.log(licensePlate);
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
          XÁC NHẬN ĐĂNG KÝ ĐẤU GIÁ
        </Typography>

        <Grid container spacing={0.5} justifyContent="center">
          <Grid item xs={12} sm={8}>
            <Box
              sx={{
                my: 2,
                mb: 5,
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
                {licensePlate.plateNumber.substring(
                  0,
                  licensePlate.plateNumber.indexOf("-"),
                )}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#333" }}>
                {licensePlate.plateNumber.substring(
                  licensePlate.plateNumber.indexOf("-") + 1,
                )}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
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
                  {licensePlate.vehicleType}
                </Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
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
                  {licensePlate.province}
                </Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
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
                <Typography>Thời gian bắt đầu</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {licensePlate.startTime}
                </Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
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
                <Typography>Thời gian kết thúc</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {licensePlate.endTime}
                </Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
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
                  }).format(licensePlate.initPrice)}
                </Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
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
                  {licensePlate.description}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>

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
            >
              Đăng ký
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex" }}></Box>
      </Box>
    </Container>
  );
}
