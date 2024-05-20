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
import AuctionRegisterModal from "../../components/base/AuctionRegisterModal";
import { LPStatus } from "../../utils/constants/LicensePlate";
import { getAllAuctionRoom } from "../../service/user/licensePlateAPI";
import { formatTime } from "../../utils/timeFormatter";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

export default function MyAuction() {
    const [idToken, setIdToken] = useState(
        localStorage.getItem("id_token"),
    );
    const auth = useAuth();
    const [LPSearchInput, setLPSearchInput] = useState("");
    const [vehicleStatus, setVehicleStatus] = useState("");
    const [openAuctionModal, setOpenAuctionModal] =
        useState(false);

    const [licensePlates, setLicensePlates] = useState([]);

    const [selectedAutionRoom, setSelectedAutionRoom] = useState(null);

    const navigate = useNavigate();

    const filteredLicensePlates = licensePlates
        ? licensePlates.filter((licensePlate) => {
            const plate = licensePlate.licensePlate
            // const matchesVehicleType =
            //     !vehicleType || plate.vehicleType === vehicleType;
            const matchesPlateNumber =
                !LPSearchInput ||
                plate.plateNumber.toLowerCase().includes(LPSearchInput.toLowerCase());
            return matchesPlateNumber;
        })
        : [];

    const toggleAuctionViewMdal = () => {
        setOpenAuctionModal(!openAuctionModal);
    };
    const fetchLicensePlates = async (userId) => {
        const res = await getAllAuctionRoom();

        const comingAuctionRooms = res.filter(
            (auctionRoom) => {
                return auctionRoom.users.some(user => user.id === userId)
            }
        );

        setLicensePlates(
            comingAuctionRooms.map((auctionRoom) => {
                return {
                    ...auctionRoom,
                    startTime: formatTime(new Date(auctionRoom.startTime)),
                    endTime: formatTime(new Date(auctionRoom.endTime)),
                };
            }),
        );
        console.log("comingAuctionRooms", comingAuctionRooms)
    };
    useEffect(() => {
        if (auth.user) {
            fetchLicensePlates(auth.user.id);
        }
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
                                Thời gian đấu giá
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
                                align="center"
                            >
                                Kết quả
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredLicensePlates.map((auctionRoom, index) => (
                            <TableRow key={auctionRoom.id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{auctionRoom.licensePlate['plateNumber']}</TableCell>
                                <TableCell align="center">{auctionRoom.licensePlate['province']}</TableCell>


                                <TableCell sx={{ whiteSpace: "nowrap" }} align="center">
                                    {auctionRoom.startTime}
                                </TableCell>

                                <TableCell align="center">{auctionRoom.licensePlate['vehicleType']}</TableCell>

                                <TableCell>
                                    <Button
                                        onClick={() => {
                                            if (idToken) {
                                                setSelectedAutionRoom(auctionRoom)
                                                toggleAuctionViewMdal();
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
                open={openAuctionModal}
                onClose={toggleAuctionViewMdal}
            >
                {selectedAutionRoom && (
                    <AuctionRegisterModal
                        title="XEM PHÒNG ĐẤU GIÁ"
                        auctionRoom={selectedAutionRoom}
                        close={toggleAuctionViewMdal}
                    />
                )}
            </Dialog>
        </>
    );
}
