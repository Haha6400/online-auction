import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Grid, Stack } from "@mui/material";

import { formatPrice } from "../../../utils/formatter";

export default function WinningModal({ winningPrice, auctioningLP, close }) {
  return (
    <Container component="main">
      <Stack spacing={3} alignItems="center" sx={{ margin: 3 }}>
        <Box
          sx={{
            py: 1.5,
            px: 10,
            textAlign: "center",
            borderRadius: 2,
            background: "#FFFFFF",
            border: "3px solid #333",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#333" }}>
            {auctioningLP.substring(0, auctioningLP.indexOf("-"))}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#333" }}>
            {auctioningLP.substring(auctioningLP.indexOf("-") + 1)}
          </Typography>
        </Box>

        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ fontWeight: 700, fontSize: 28, textAlign: "center", mb: 3 }}
        >
          Trúng đấu giá
        </Typography>

        <Stack spacing={2}>
          <Typography sx={{ fontWeight: 700 }}>
            Bạn là người trả giá cao nhất và trúng đấu giá
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Giá trúng đấu giá</Typography>
            <Typography sx={{ fontWeight: 700, color: "red" }}>
              {formatPrice(winningPrice)}
            </Typography>
          </Box>
          {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Bằng chữ</Typography>
            <Typography sx={{ fontWeight: 700, color: "red" }}>
              Một trăm triệu đồng
            </Typography>
          </Box> */}
          {/* <Typography sx={{ fontWeight: 700 }}>
            Biên bản cuộc đấu giá sẽ được gửi về "Tài liệu của tôi"
          </Typography> */}
        </Stack>

        <Grid container sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <Link to="/">
              <Button
                variant="contained"
                sx={{ width: "100%", background: "#079455" }}
                style={{ background: "#529290" }}
                onClick={close}
              >
                Trở về trang chủ
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
