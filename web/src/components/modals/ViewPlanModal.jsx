import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function ViewPlanModal({ close }) {
  const plugins = defaultLayoutPlugin();
  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          margin: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Box
            sx={{
              // border: "1px solid rgba(0, 0, 0, 0.3)",
              height: "580px",
              width: "700px",
              mb: 2,
            }}
          >
            <Viewer fileUrl="/demo.pdf" plugins={[plugins]} />
          </Box>
        </Worker>

        <Button
          variant="contained"
          sx={{ width: "100%", background: "#079455" }}
          onClick={close}
        >
          Đóng
        </Button>
      </Box>
    </Container>
  );
}
