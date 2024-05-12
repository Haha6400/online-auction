import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Grid } from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ResultModal({ type, close }) {
  return (
    <Container component="main">
      <Box
        sx={{
          margin: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ fontWeight: 700, fontSize: 20, textAlign: "center", mb: 3 }}
        >
          THÔNG BÁO
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CheckCircleIcon sx={{ color: "green" }} />
          <Typography sx={{ fontSize: 16, textAlign: "center", my: 2 }}>
            {type === "DELETE" && "Xóa biển số thành công!"}
            {type === "CREATE" && "Tạo biển số thành công!"}
            {type === "UPDATE" && "Cập nhật biển số thành công!"}
          </Typography>
        </Box>

        <Grid container sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ width: "100%", background: "#079455" }}
              style={{ background: "#529290" }}
              onClick={close}
            >
              Đóng
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
