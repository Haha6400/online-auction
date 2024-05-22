import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Grid, Stack } from "@mui/material";

export default function LosingModal({ auctioningLP, close }) {
  return (
    <Container component="main" sx={{ width: 400 }}>
      <Stack spacing={3} alignItems="center" sx={{ margin: 3 }}>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ fontWeight: 700, fontSize: 28, textAlign: "center", mb: 3 }}
        >
          Không trúng đấu giá
        </Typography>

        <Box sx={{ px: 2, textAlign: "center" }}>
          <Typography sx={{ fontWeight: 500 }}>
            Rất tiếc! Bạn đã không đấu giá thành công biển số xe: {auctioningLP}
            . Chúc bạn may mắn lần sau!
          </Typography>
        </Box>

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
