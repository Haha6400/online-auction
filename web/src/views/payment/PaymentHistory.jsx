import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Search from "@mui/icons-material/Search";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
    OutlinedInput,
    FormControl,
    Select,
    MenuItem,
    Dialog,
    Typography,
} from "@mui/material";

import PaymentDialog from "../../components/common/PaymentDialog";
import { LPprovinces, LPtype } from "../../utils/constants/LicensePlate";
import { getAllAuctionRoom } from "../../service/user/licensePlateAPI";
import { formatTime } from "../../utils/timeFormatter";
import { useNavigate } from "react-router-dom";

export default function PaymentHistory() {
    const [LPSearchInput, setLPSearchInput] = useState("");
    const [province, setProvince] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [openAuctionRegisterModal, setOpenAuctionRegisterModal] =
        useState(false);

    const [licensePlates, setLicensePlates] = useState([]);

    const [currentLP, setCurrentLP] = useState({});

    const navigate = useNavigate();

    const filteredLicensePlates = licensePlates
        ? licensePlates.filter((licensePlate) => {
            const plate = licensePlate.licensePlate
            const matchesLPprovince = !province || plate.province === province;
            const matchesVehicleType =
                !vehicleType || plate.vehicleType === vehicleType;
            const matchesPlateNumber =
                !LPSearchInput ||
                plate.plateNumber.toLowerCase().includes(LPSearchInput.toLowerCase());
            return matchesLPprovince && matchesVehicleType && matchesPlateNumber;
        })
        : [];

    const toggleAuctionRegisterMdal = () => {
        setOpenAuctionRegisterModal(!openAuctionRegisterModal);
    };

    const fetchLicensePlates = async () => {
        const res = await getAllAuctionRoom();
        const comingAuctionRooms = res.filter(
            (auctionRoom) => new Date(auctionRoom.startTime) > new Date(),
        );

        setLicensePlates(
            comingAuctionRooms.map((auctionRoom) => {
                return {
                    ...auctionRoom,
                    'startTime': formatTime(new Date(auctionRoom.startTime)),
                    'endTime': formatTime(new Date(auctionRoom.endTime))
                };
            }),
        );
    };

    useEffect(() => {
        fetchLicensePlates();
    }, []);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 5,
                }}
            >
                <OutlinedInput
                    type="search"
                    placeholder="Nhập biển số xe cần tìm"
                    size="small"
                    sx={{
                        width: 210,
                        marginY: 2,
                        border: "1px solid #015433",
                        borderRadius: 3,
                    }}
                    startAdornment={
                        <Search
                            sx={{
                                width: 20,
                                color: "015433",
                                mr: 1,
                            }}
                        />
                    }
                    value={LPSearchInput}
                    onChange={(event) => {
                        setLPSearchInput(event.target.value);
                    }}
                />
                <FormControl sx={{ minWidth: 150, marginY: 2 }} size="small">
                    <Select
                        autoWidth
                        displayEmpty
                        value={province}
                        onChange={(event) => {
                            setProvince(event.target.value);
                        }}
                        sx={{
                            width: 210,
                            border: "1px solid #015433",
                            borderRadius: 3,
                        }}
                    >
                        <MenuItem sx={{ borderRadius: 0, width: 250 }} value="">
                            Chọn tỉnh/thành phố
                        </MenuItem>
                        {Object.keys(LPprovinces).map((key) => (
                            <MenuItem
                                key={key}
                                sx={{ borderRadius: 0, width: 250 }}
                                value={LPprovinces[key]}
                            >
                                {LPprovinces[key]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150, marginY: 2 }} size="small">
                    <Select
                        autoWidth
                        displayEmpty
                        value={vehicleType}
                        onChange={(event) => {
                            setVehicleType(event.target.value);
                        }}
                        sx={{
                            width: 210,
                            border: "1px solid #015433",
                            borderRadius: 3,
                        }}
                    >
                        <MenuItem sx={{ borderRadius: 0, width: 250 }} value="">
                            Chọn loại xe
                        </MenuItem>
                        {Object.keys(LPtype).map((key) => (
                            <MenuItem
                                key={key}
                                sx={{ borderRadius: 0, width: 250 }}
                                value={LPtype[key]}
                            >
                                {LPtype[key]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <TableContainer
                component={Paper}
                sx={{
                    mt: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
            >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead sx={{ backgroundColor: "rgba(1, 84, 51, 0.2)" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }} align="center">
                                STT
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="center">
                                Biển số
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="center">
                                Tỉnh, Thành phố
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
                                align="center"
                            >
                                Loại xe
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
                                align="center"
                            >
                                Thời gian đấu giá
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredLicensePlates.map((licensePlate, index) => (
                            <TableRow key={licensePlate.id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{licensePlate.licensePlate['plateNumber']}</TableCell>
                                <TableCell align="center">{licensePlate.licensePlate['province']}</TableCell>
                                <TableCell align="center">{licensePlate.licensePlate['vehicleType']}</TableCell>

                                <TableCell sx={{ whiteSpace: "nowrap" }} align="center">

                                    {licensePlate.startTime}
                                </TableCell>

                                <TableCell>
                                    <Button
                                        onClick={() => {
                                            setCurrentLP(licensePlate);
                                            toggleAuctionRegisterMdal();
                                        }}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        sx={{
                                            whiteSpace: "nowrap",
                                            backgroundColor: "primary",
                                            color: "white",
                                        }}
                                        startIcon={<VisibilityIcon style={{ fontSize: 14 }} />}
                                    >
                                        Xem phòng
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {filteredLicensePlates.length === 0 && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        bgcolor: "#01543333",
                        color: "#555",
                        padding: 5,
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,
                    }}
                >
                    <ManageSearchIcon style={{ fontSize: 70 }} />
                    <Typography sx={{ fontWeight: "600" }}>
                        Không tìm thấy biển số phù hợp
                    </Typography>
                </Box>
            )}

            <Dialog
                open={openAuctionRegisterModal}
                onClose={toggleAuctionRegisterMdal}
            >
                <PaymentDialog
                    title="XEM LỊCH SỬ ĐẤU GIÁ"
                    auctionRoom={currentLP}
                    close={toggleAuctionRegisterMdal}
                />
            </Dialog>
        </>
    );
}
