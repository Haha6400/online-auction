//TODO: Select license plate number
import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import EventIcon from '@mui/icons-material/Event';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
import Menu from '@mui/material/Menu';
import DateAndTimePicker from '../../components/base/DateAndTimePicker';


export default function CRUDialog(props) {


    const [startTime, setStartTime] = React.useState(null);
    const [startDate, setStartDate] = React.useState(dayjs((new Date()).$d).format('HH:mm DD/MM/YYYY'));
    const openStartTime = Boolean(startTime);
    const licensePlateList = {
        NO_1: '19A-125123',
        NO_2: '20A-125123',
    };
    const licensePlateListProps = {
        options: Object.values(licensePlateList),
    };

    const handleOpenStartTime = (event) => {
        setStartTime(event.currentTarget);
    };

    const handleCloseStartTime = (link) => {
        setStartTime(null);
    };

    const handleStartDateChange = (newDate) => {
        setStartDate(newDate);
    };

    const [endTime, setEndTime] = React.useState(null);
    const openEndTime = Boolean(endTime);
    const [endDate, setEndDate] = React.useState(dayjs((new Date()).$d).format('HH:mm DD/MM/YYYY'));

    const [licensePlateNumber, setLicensePlateNumber] = React.useState(null);
    const handleOpenEndTime = (event) => {
        setEndTime(event.currentTarget);
    };

    const handleCloseEndTime = (link) => {
        setEndTime(null);
    };

    const handleEndDateChange = (newDate) => {
        setEndDate(newDate);
    };

    const handleLicensePlateNumberChange = (event, values) => {
        setLicensePlateNumber(values)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let startTime = data.get('startTime');
        let endTime = data.get('endTime');
        const values = {
            'initPrice': data.get('initPrice'),
            'startTime': dayjs(startTime, 'HH:mm DD/MM/YYYY').toISOString(),
            'endTime': dayjs(endTime, 'HH:mm DD/MM/YYYY').toISOString(),
            'description': data.get('description'),
            'licensePlateNumber': licensePlateNumber
        }
        const idToken = localStorage.getItem('id_token');
        console.log("values", values);
        try {
            const response = await axios.post(`http://localhost:8080/api/auction-rooms`, values,
                {
                    headers: { Authorization: `Bearer ${idToken}` }
                });
            console.log("response", response.data);
            props.close();
        } catch (error) {
            props.close();
            console.dir('Create auction room error:', error);
        }
    };

    return (
        <Stack
            sx={{
                background: "url(/bgr.png)",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Box id="hero" sx={{ width: "100%" }}>
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            margin: 3,
                            padding: 5,
                            alignSelf: "center",
                            width: "100%",
                            bgcolor: "rgba(255, 255, 255, 0.3)",
                            backgroundSize: "cover",
                            borderRadius: "10px",
                            boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            alignContent: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5"
                            sx={{
                                mb: 1
                            }}>
                            {props.title}
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid spacing={2}
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="stretch">
                                <Grid item xs={6}>
                                    <Typography >
                                        Biển số xe
                                    </Typography>

                                    <Autocomplete
                                        {...licensePlateListProps}
                                        id="licensePlateNumber"
                                        name="licensePlateNumber"
                                        onChange={handleLicensePlateNumberChange}
                                        sx={{
                                            mt: 1,
                                            mb: 1,
                                            boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.2)`,
                                            borderRadius: 3,
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder="Chọn biển số" />
                                        )}
                                    />



                                </Grid>
                                <Grid item xs={6}>
                                    <Typography >
                                        Giá khởi điểm (VNĐ)
                                    </Typography>

                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        id="initPrice"
                                        name="initPrice"
                                        autoComplete="initPrice"
                                        autoFocus
                                        sx={{
                                            mt: 1, mb: 1,
                                            boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.2)`,
                                            borderRadius: 3,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid spacing={2}
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="stretch">
                                <Grid item xs={6}>
                                    <Typography >
                                        Thời điểm bắt đầu
                                    </Typography>
                                    <TextField
                                        required
                                        fullWidth
                                        id="startTime"
                                        name="startTime"
                                        autoComplete="startTime"
                                        value={startDate}
                                        sx={{
                                            mt: 1,
                                            mb: 1,
                                            boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.2)`,
                                            borderRadius: 3,
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



                                </Grid>
                                <Grid item xs={6}>
                                    <Typography >
                                        Thời điểm kết thúc
                                    </Typography>
                                    <Tooltip title="Thời điểm kết thúc">
                                        <TextField
                                            required
                                            fullWidth
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

                                    </Tooltip>
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
                                </Grid>
                            </Grid>
                            <Typography >
                                Note
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                multiline
                                id="description"
                                name="description"
                                autoComplete="description"
                                sx={{
                                    mt: 1, mb: 1,
                                    boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.2)`,
                                    borderRadius: 3,
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 1, mb: 1, backgroundColor: "primary",
                                    color: "white"
                                }}
                            >
                                Xác nhận
                            </Button>
                        </Box>
                        <CssBaseline />
                    </Box>
                </Container>
            </Box>
        </Stack >
    );
}