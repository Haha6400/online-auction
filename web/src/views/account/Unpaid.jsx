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
import AddCardIcon from '@mui/icons-material/AddCard';
import {
    OutlinedInput,
    FormControl,
    Select,
    MenuItem,
    Dialog,
    Typography,
} from "@mui/material";
import PayAction from "../../components/common/PayAction";
import { getAllAuctionRoom } from "../../service/user/licensePlateAPI";
import { formatTime } from "../../utils/formatter";
import { useAuth } from "../../hooks/AuthProvider";

export default function Unpaid() {
    const [idToken, setIdToken] = useState(
        localStorage.getItem("id_token"),
    );

    const auth = useAuth();

    const [openPaymentModal, setOpenPaymentModal] = useState(false);

    const [licensePlates, setLicensePlates] = useState([]);

    const [selectedAutionRoom, setSelectedAutionRoom] = useState(null);

    const togglePaymentMdal = () => {
        setOpenPaymentModal(!openPaymentModal);
    };
    const fetchLicensePlates = async (userId) => {
        const res = await getAllAuctionRoom();

        const comingAuctionRooms = res.filter(
            (auctionRoom) => {
                return auctionRoom.users.some(user => user.id === userId)
                // && auctionRoom.winner
                // && new Date(auctionRoom.startTime) < new Date() //TODO: Enabled if data is prepared & using winning bid instead of auction room
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
    };
    useEffect(() => {
        if (auth.user) {
            fetchLicensePlates(auth.user.id);
        }
    }, []);

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
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
                        {licensePlates.map((auctionRoom, index) => (
                            <TableRow key={auctionRoom.id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{auctionRoom.licensePlate['plateNumber']}</TableCell>
                                <TableCell align="center">{auctionRoom.licensePlate['province']}</TableCell>
                                <TableCell align="center">{auctionRoom.licensePlate['vehicleType']}</TableCell>
                                <TableCell align="center">{auctionRoom.startTime}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => {
                                            if (idToken) {
                                                setSelectedAutionRoom(auctionRoom)
                                                togglePaymentMdal();
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
                                        startIcon={<AddCardIcon style={{ fontSize: 14 }} />}
                                    >
                                        Thanh toán
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {licensePlates.length === 0 && (
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
                open={openPaymentModal}
                onClose={togglePaymentMdal}
            >
                {selectedAutionRoom && (
                    <PayAction
                        title="THANH TOÁN BIỂN SỐ XE"
                        auctionRoom={selectedAutionRoom}
                        close={togglePaymentMdal}
                    />
                )}
            </Dialog>
        </>
    );
}
