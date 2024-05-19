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

import {
    OutlinedInput,
    FormControl,
    Select,
    MenuItem,
    Dialog,
    Typography,
} from "@mui/material";
import AuctionRegisterModal from "../../components/base/AuctionRegisterModal";
import { LPStatus } from "../../utils/constants/LicensePlate";
import { getAllAuctionRoom } from "../../service/user/licensePlateAPI";
import { formatTime } from "../../utils/timeFormatter";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

export default function WaitingList() {
    const [idToken, setIdToken] = useState(
        localStorage.getItem("id_token"),
    );
    const [LPSearchInput, setLPSearchInput] = useState("");
    const [vehicleStatus, setVehicleStatus] = useState("");
    const [openAuctionRegisterModal, setOpenAuctionRegisterModal] =
        useState(false);

    const [licensePlates, setLicensePlates] = useState([]);

    const [currentLP, setCurrentLP] = useState({});

    const navigate = useNavigate();

    const filteredLicensePlates = licensePlates
        ? licensePlates.filter((plate) => {
            // const matchesVehicleType =
            //     !vehicleType || plate.vehicleType === vehicleType;
            const matchesPlateNumber =
                !LPSearchInput ||
                plate.plateNumber.toLowerCase().includes(LPSearchInput.toLowerCase());
            return matchesPlateNumber;
        })
        : [];

    const toggleAuctionRegisterMdal = () => {
        setOpenAuctionRegisterModal(!openAuctionRegisterModal);
    };

    const fetchLicensePlates = async () => {
        const res = await getAllAuctionRoom();

        const comingAuctionRooms = res.filter(
            (auctionRoom) => new Date(auctionRoom.startTime) > new Date()
        );

        setLicensePlates(
            comingAuctionRooms.map((auctionRoom) => {
                return {
                    ...auctionRoom.licensePlate,
                    startTime: formatTime(new Date(auctionRoom.startTime)),
                    endTime: formatTime(new Date(auctionRoom.endTime)),
                    description: auctionRoom.description,
                    initPrice: auctionRoom.initPrice,
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
                    py: 2,
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
                        width: 250,
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
                <FormControl sx={{ minWidth: 250, marginY: 2 }} size="small">
                    <Select
                        autoWidth
                        displayEmpty
                        value={vehicleStatus}
                        onChange={(event) => {
                            setVehicleStatus(event.target.value);
                        }}
                        sx={{
                            width: 250,
                            border: "1px solid #015433",
                            borderRadius: 3,
                        }}
                    >
                        <MenuItem sx={{ borderRadius: 0, width: 250 }} value="">
                            Chọn trạng thái
                        </MenuItem>
                        {Object.keys(LPStatus).map((key) => (
                            <MenuItem
                                key={key}
                                sx={{ borderRadius: 0, width: 250 }}
                                value={LPStatus[key]}
                            >
                                {LPStatus[key]}
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
                                <TableCell align="center">{licensePlate.plateNumber}</TableCell>
                                <TableCell align="center">{licensePlate.province}</TableCell>
                                <TableCell align="center">{licensePlate.vehicleType}</TableCell>

                                <TableCell sx={{ whiteSpace: "nowrap" }} align="center">
                                    {licensePlate.startTime}
                                </TableCell>

                                <TableCell width={200}>
                                    <Button
                                        onClick={() => {
                                            if (idToken) {
                                                setCurrentLP(licensePlate);
                                                toggleAuctionRegisterMdal();
                                            }
                                        }}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        sx={{
                                            whiteSpace: "nowrap",
                                            backgroundColor: "primary",
                                            color: "white",
                                        }}
                                    >
                                        Đăng ký đấu giá
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
                <AuctionRegisterModal
                    licensePlate={currentLP}
                    close={toggleAuctionRegisterMdal}
                />
            </Dialog>
        </>
    );
}
