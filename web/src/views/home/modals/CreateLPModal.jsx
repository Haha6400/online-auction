import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, Grid, Stack } from "@mui/material";

import { LPtype, LPprovinces } from "../../../utils/constants/LicensePlate";
import LicensePlateInput from "../../../components/common/LicensePlateInput";
import { createLicensePlate } from "../../../service/admin/licensePlateAPI";

export default function CreateLPModal({
  close,
  idToken,
  fetchLicensePlates,
  toggleResultModal,
}) {
  const LPtypeProps = {
    options: Object.values(LPtype),
  };
  const options = Object.keys(LPprovinces).map((key) => ({
    title: LPprovinces[key],
  }));

  options.forEach((option) => {
    const firstLetter = option.title[0].toUpperCase();
    option.firstLetter = /[0-9]/.test(firstLetter) ? "0-9" : firstLetter;
  });

  const [LPinput, setLP] = useState("");
  const [vehicleType, setVehicleType] = useState(LPtypeProps.options[0]);
  const [LPprovince, setLPprovince] = useState(options[0]);

  const onChange = (value) => setLP(value);

  const submit = async () => {
    close();
    const reqBody = {
      plateNumber: LPinput,
      vehicleType: vehicleType,
      province: LPprovince.title,
    };

    const res = await createLicensePlate(idToken, reqBody);

    toggleResultModal();
    fetchLicensePlates();
  };

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
          sx={{ fontWeight: 1000, fontSize: 24, textAlign: "center", mb: 2 }}
        >
          TẠO BIỂN SỐ XE
        </Typography>
        <LicensePlateInput
          value={LPinput}
          valueLength={9}
          onChange={onChange}
        />
        <Grid
          container
          spacing={0.5}
          justifyContent="center"
          sx={{ mt: 2, ml: 0 }}
        >
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  mr: 1,
                  py: 1,
                  px: 1,
                  borderRadius: "50%",
                  background: "#F4FCF8",
                }}
              >
                <DirectionsCarIcon sx={{ fontSize: 30, color: "#5DD397" }} />
              </Box>
              <Stack>
                <Typography>Loại xe</Typography>
                <Autocomplete
                  {...LPtypeProps}
                  style={{ width: "180px" }}
                  value={vehicleType}
                  onChange={(event, newValue) => {
                    setVehicleType(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Chọn loại xe"
                      variant="standard"
                    />
                  )}
                />
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
                <Autocomplete
                  options={options.sort(
                    (a, b) => -b.firstLetter.localeCompare(a.firstLetter),
                  )}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => option.title}
                  sx={{ width: 180 }}
                  isOptionEqualToValue={(option, value) =>
                    option.title === value.title
                  }
                  value={LPprovince}
                  onChange={(event, newValue) => {
                    setLPprovince(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Chọn tỉnh thành"
                      variant="standard"
                    />
                  )}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 0.5, ml: 0 }}>
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
              onClick={submit}
            >
              Tạo
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex" }}></Box>
      </Box>
    </Container>
  );
}
