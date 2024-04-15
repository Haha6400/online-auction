import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { alpha } from "@mui/material";

import AppAppBar from "../components/base/AppAppBar";
import Footer from "../components/common/Footer";

export default function AuctionRoom() {
  return (
    <>
      <AppAppBar loginCheck="false" currentPage="list_auction_room" />
      <Box
        id="hero"
        sx={{
          width: "100%",
          background: "#F7FAFC",
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
          <Box
            sx={{
              mt: { xs: 8, sm: 10 },
              padding: 5,
              alignSelf: "center",
              width: "100%",
              bgcolor: "#FFFFFF",
              backgroundSize: "cover",
              borderRadius: "10px",
              boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)`,
            }}
          >
            <Typography
              component="h2"
              variant="h5"
              color="text.primary"
              sx={{ fontWeight: 700, fontSize: 24, textAlign: "center" }}
            >
              DANH SÁCH PHÒNG ĐẤU GIÁ
            </Typography>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
