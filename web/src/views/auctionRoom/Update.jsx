import { useEffect, useState } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import LanguageIcon from '@mui/icons-material/Language';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import DescriptionIcon from "@mui/icons-material/Description";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import DateAndTimePicker from '../../components/base/DateAndTimePicker';
import { Button, Grid, Stack, Dialog } from "@mui/material";

import { LPtype, LPprovinces } from "../../utils/constants/LicensePlate";
import LicensePlateInput from "../../components/common/LicensePlateInput";
import { updateLicensePlate } from "../../service/admin/licensePlateAPI";

import { formatTime } from "../../utils/timeFormatter";

export default function Update(props) {
    const [idToken, setIdToken] = useState(
        localStorage.getItem("id_token"),
    );
    const [LPinput, setLP] = useState();
    const [startTime, setStartTime] = useState(null);
    const [startDate, setStartDate] = useState(formatTime(new Date(props.currentAuctionRoom.startTime)));
    const openStartTime = Boolean(startTime);

    const [endTime, setEndTime] = useState(null);
    const openEndTime = Boolean(endTime);
    const [endDate, setEndDate] = useState(formatTime(new Date(props.currentAuctionRoom.endTime)));

    const handleOpenStartTime = (event) => {
        setStartTime(event.currentTarget);
    };

    const handleCloseStartTime = (link) => {
        setStartTime(null);
    };

    const handleStartDateChange = (newDate) => {
        setStartDate(newDate);
    };

    const handleOpenEndTime = (event) => {
        setEndTime(event.currentTarget);
    };

    const handleCloseEndTime = (link) => {
        setEndTime(null);
    };

    const handleEndDateChange = (newDate) => {
        setEndDate(newDate);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let startTime = props.currentAuctionRoom.startTime;
        if (data.get('startTime') != formatTime(new Date(startTime))) startTime = dayjs(data.get('startTime'), 'HH:mm DD/MM/YYYY').toISOString()
        let endTime = props.currentAuctionRoom.endTime;
        if (data.get('endTime') != formatTime(new Date(endTime))) endTime = dayjs(data.get('endTime'), 'HH:mm DD/MM/YYYY').toISOString()


        const values = {
            'id': props.currentAuctionRoom.id,
            'initPrice': data.get('initPrice'),
            'startTime': startTime,
            'endTime': endTime,
            'description': data.get('description')
        }

        try {
            const response = await axios.patch(`http://localhost:8080/api/auction-rooms/${props.currentAuctionRoom.id}`, values,
                {
                    headers: { Authorization: `Bearer ${idToken}` }
                });
            console.log("response", response.data);
            props.close();
            props.getAllAuctionRoom();
        } catch (error) {
            props.close();
            console.dir('Update auction room error:', error);
        }
    };
    useEffect(() => {
        setLP(props.currentAuctionRoom.licensePlate["plateNumber"])
    }, [])

    return (
        <Stack
        >
            <Box id="hero" sx={{ width: "100%" }}>
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    <Box
                        sx={{
                            margin: 5,
                            marginRight: 7,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                        component="form" onSubmit={handleSubmit}
                    >
                        <Typography
                            variant="h5"
                            color="text.secondary"
                            sx={{ fontWeight: 1000, fontSize: 24, textAlign: "center", mb: 2 }}
                        >
                            XEM PHÒNG ĐẤU GIÁ
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 700, color: "#333" }}
                        >
                            {props.currentAuctionRoom.licensePlate["plateNumber"].substring(
                                0,
                                props.currentAuctionRoom.licensePlate["plateNumber"].indexOf(
                                    "-",
                                ),
                            )}
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 700, color: "#333" }}
                        >
                            {props.currentAuctionRoom.licensePlate["plateNumber"].substring(
                                props.currentAuctionRoom.licensePlate["plateNumber"].indexOf(
                                    "-",
                                ) + 1,
                            )}
                        </Typography>

                        <Grid
                            container
                            spacing={0.5}
                            justifyContent="center"
                            sx={{ mt: 2, ml: 0 }}
                        >
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
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
                                        <Typography sx={{ fontWeight: 1000 }}>
                                            {props.currentAuctionRoom.licensePlate['vehicleType']}
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
                                        <LocationOnIcon sx={{ fontSize: 25, color: "#5DD397" }} />
                                    </Box>
                                    <Stack>
                                        <Typography>Tỉnh, thành phố</Typography>
                                        <Typography sx={{ fontWeight: 1000 }}>
                                            {props.currentAuctionRoom.licensePlate['province']}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            spacing={0.5}
                            justifyContent="center"
                            sx={{ mt: 2, ml: 0 }}
                        >
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box
                                        sx={{
                                            mr: 1,
                                            py: 1,
                                            px: 1,
                                            borderRadius: "50%",
                                            background: "#F4FCF8",
                                        }}
                                    >
                                        <EventIcon
                                            sx={{ fontSize: 25, color: "#5DD397" }}
                                        />
                                    </Box>
                                    <Stack>
                                        <Typography>Thời gian bắt đầu</Typography>
                                        <TextField
                                            fullWidth
                                            multiline
                                            variant="standard"
                                            id="startTime"
                                            name="startTime"
                                            autoComplete="startTime"
                                            value={startDate}
                                            sx={{
                                                mt: 1,
                                                mb: 1
                                            }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleOpenStartTime}
                                                        size="small"
                                                        aria-controls={openStartTime ? 'startTime' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={openStartTime ? 'true' : undefined}
                                                    >
                                                        <EventIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            }}
                                        >

                                        </TextField>

                                    </Stack>
                                    <Menu
                                        startTime={startTime}
                                        id="startTime"
                                        open={openStartTime}
                                        onClose={handleCloseStartTime}

                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <DateAndTimePicker close={handleCloseStartTime} date={startDate} onDateChange={handleStartDateChange} />
                                    </Menu>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box
                                        sx={{
                                            mr: 1,
                                            py: 1,
                                            px: 1,
                                            borderRadius: "50%",
                                            background: "#F4FCF8",
                                        }}
                                    >
                                        <EventBusyIcon sx={{ fontSize: 25, color: "#5DD397" }} />
                                    </Box>
                                    <Stack>
                                        <Typography>Thời gian kết thúc</Typography>
                                        <TextField
                                            variant="standard"
                                            fullWidth
                                            multiline
                                            id="endTime"
                                            name="endTime"
                                            autoComplete="endTime"
                                            value={endDate}
                                            sx={{
                                                mt: 1,
                                                mb: 1,
                                                boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.2)`,
                                                borderRadius: 3,
                                            }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleOpenEndTime}
                                                        size="small"
                                                        aria-controls={openEndTime ? 'endTime' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={openEndTime ? 'true' : undefined}
                                                    >
                                                        <EventIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            }}
                                        >
                                        </TextField>

                                    </Stack>
                                    <Menu
                                        endTime={endTime}
                                        id="endTime"
                                        open={openEndTime}
                                        onClose={handleCloseEndTime}

                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <DateAndTimePicker close={handleCloseEndTime} date={endDate} onDateChange={handleEndDateChange} />
                                    </Menu>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={0.5}
                            justifyContent="center"
                            sx={{ mt: 2, ml: 0 }}
                        >
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                                    <Box
                                        sx={{
                                            mr: 1,
                                            py: 1,
                                            px: 1,
                                            borderRadius: "50%",
                                            background: "#F4FCF8",
                                        }}
                                    >
                                        <DescriptionIcon
                                            sx={{ fontSize: 28, color: "#5DD397" }}
                                        />
                                    </Box>
                                    <Stack sx={{
                                        width: "100%",
                                    }}>
                                        <Typography>Ghi chú</Typography>
                                        <TextField
                                            variant="standard"
                                            fullWidth
                                            multiline
                                            id="description"
                                            name="description"
                                            autoComplete="description"
                                            defaultValue={props.currentAuctionRoom.description}
                                            sx={{
                                                fontWeight: 1000,
                                                mt: 1, mb: 1,
                                                boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.2)`,
                                                borderRadius: 3,
                                            }}
                                        />
                                    </Stack>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                                    <Box
                                        sx={{
                                            mr: 1,
                                            py: 1,
                                            px: 1,
                                            borderRadius: "50%",
                                            background: "#F4FCF8",
                                        }}
                                    >
                                        <CurrencyExchangeIcon
                                            sx={{ fontSize: 28, color: "#5DD397" }}
                                        />
                                    </Box>
                                    <Stack sx={{
                                        width: "100%",
                                    }}>
                                        <Typography>Giá khởi điểm</Typography>
                                        <TextField
                                            variant="standard"
                                            fullWidth
                                            multiline
                                            type="number"
                                            id="initPrice"
                                            name="initPrice"
                                            autoComplete="initPrice"
                                            defaultValue={props.currentAuctionRoom.initPrice}
                                            sx={{
                                                fontWeight: 1000,
                                                mt: 1, mb: 1,
                                                boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.2)`,
                                                borderRadius: 3,
                                            }}
                                        />
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={3}
                            justifyContent="center"
                            sx={{ mt: 0, ml: 0 }}
                        >
                            <Grid item xs={12} sm={6}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{ width: "100%" }}
                                    onClick={props.close}
                                >
                                    Hủy bỏ
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    sx={{ width: "100%", background: "#079455" }}
                                    type="submit"
                                >
                                    Xác nhận
                                </Button>
                            </Grid>
                        </Grid>


                    </Box>
                </Container>
            </Box >
        </Stack >
    );
}
