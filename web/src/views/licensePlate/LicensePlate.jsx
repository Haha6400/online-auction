import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { styled, lighten, darken } from '@mui/system';
import { Button, Grid, Stack } from "@mui/material";
import LicensePlateInput from "../../components/common/LicensePlateInput";

import { LPtype, LPprovinces } from '../../utils/constants/LicensePlate';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: "black"
}));

const GroupItems = styled('ul')({
  padding: 0,
});


export default function LicensePlate(props) {
  const [LPinput, setLP] = React.useState('');
  const [LPprovince, setLPprovince] = React.useState('');

  const LPtypeProps = {
    options: Object.values(LPtype),
  };
  const options = Object.keys(LPprovinces).map((key) => ({
    title: LPprovinces[key], // Sử dụng giá trị của LPtype làm title cho option
  }));

  options.forEach((option) => {
    const firstLetter = option.title[0].toUpperCase();
    option.firstLetter = /[0-9]/.test(firstLetter) ? '0-9' : firstLetter;
  });



  const onChange = (value) => setLP(value);

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
          {props.title}
        </Typography>
        {props.title === "TẠO BIỂN SỐ XE" && (
          <>
            <LicensePlateInput value={LPinput} valueLength={9} onChange={onChange} />

          </>)}
        {props.title === "CẬP NHẬT BIỂN SỐ XE" && (
          <>
            <LicensePlateInput value={LPinput} valueLength={9} onChange={onChange} />

          </>)}
        <Grid container spacing={0.5} justifyContent="center" sx={{ mt: 2, ml: 0 }}>
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
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Chọn loại xe" variant="standard" />
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
                  options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => option.title}
                  sx={{ width: 180 }}
                  renderInput={(params) => <TextField {...params} placeholder="Chọn tỉnh thành" variant="standard" />}
                  renderGroup={(params) => (
                    <li key={params.key}>
                      <GroupHeader>{params.group}</GroupHeader>
                      <GroupItems>{params.children}</GroupItems>
                    </li>
                  )}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 0.5, ml: 0 }}>
          <Grid item xs={6}>
            <Button variant="outlined" color="primary" sx={{ width: "100%" }}>
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
    </Container >
  );
}