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
