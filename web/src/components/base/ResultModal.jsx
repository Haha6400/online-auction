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
          {(type === "DELETE" || type === "CREATE" || type === "UPDATE") && (
            <>
              <CheckCircleIcon sx={{ color: "green" }} />
            </>
          )}
          <Typography sx={{ fontSize: 16, textAlign: "center", my: 2 }}>
            {type === "DELETE" && "Xóa biển số thành công!"}
            {type === "CREATE" && "Tạo biển số thành công!"}
            {type === "UPDATE" && "Cập nhật biển số thành công!"}
            {type === "REGISTER_ACCOUNT_SUCCESS" && (
              <>
                Ghi nhận thông tin thành công!<br />
                Vui lòng xác minh tài khoản qua email!
              </>
            )}
            {type === "REGISTER_ACCOUNT_FAIL" && (
              <>
                Đăng ký thất bại!<br />
                Vui lòng kiểm tra lại thông tin
              </>
            )}
            {type === "REGISTER_AUCTION_SUCCESS" && "Đăng ký đấu giá thành công!"}
            {type === "REGISTER_AUCTION_FAIL" && "Bạn đã đăng ký phòng đấu giá này trước đó!"}
            {type === "UPDATE_ACCOUNT_SUCCESS" && "Cập nhật thông tin tài khoản thành công!"}
            {type === "UPDATE_ACCOUNT_FAIL" && (
              <>
                Cập nhật thông tin tài khoản thất bại!<br />
                Vui lòng kiểm tra lại thông tin.
              </>
            )}
            {type === "PAYMENT_SUCCESS" && (
              <>
                Ghi nhận thông tin thành công!<br />
                Vui lòng khoảng 2-5 ngày để xác minh thanh toán.
              </>
            )}
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
