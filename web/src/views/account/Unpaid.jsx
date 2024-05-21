import { useState, useEffect } from "react";
import axios from 'axios';
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
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
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

    const [licensePlatesUNPAID, setLicensePlatesUNPAID] = useState([]);
    const [licensePlatesWAITING, setLicensePlatesWAITING] = useState([]);

    const [selectedAutionRoom, setSelectedAutionRoom] = useState(null);

    const togglePaymentMdal = () => {
        setOpenPaymentModal(!openPaymentModal);
    };
    const fetchLicensePlates = async () => {
        const resUnpaid = await axios.get(`http://localhost:8080/api/winning-bids/self/all?filter=unpaid`, {
            headers: { Authorization: `Bearer ${idToken}` }
        })
        const resWaiting = await axios.get(`http://localhost:8080/api/winning-bids/self/all?filter=waiting_confirm`, {
            headers: { Authorization: `Bearer ${idToken}` }
        })

        const unpaidAuctionRooms = resUnpaid.data
        const waitingAuctionRooms = resWaiting.data

        setLicensePlatesUNPAID(unpaidAuctionRooms);
        setLicensePlatesWAITING(waitingAuctionRooms);
    };
    useEffect(() => {
        fetchLicensePlates();
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
                                Giá kết thúc
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {licensePlatesWAITING && (
                            <>
                                {licensePlatesWAITING.map((auctionRoom, index) => (
                                    <TableRow key={auctionRoom.id}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center">{auctionRoom.plateNumber}</TableCell>
                                        <TableCell align="center">{auctionRoom.province}</TableCell>
                                        <TableCell align="center">{auctionRoom.vehicleType}</TableCell>
                                        <TableCell align="center">{new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(auctionRoom.finalPrice)}</TableCell>
                                        <TableCell>
                                            <Button
                                                disabled
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    whiteSpace: "nowrap",
                                                }}
                                                startIcon={<HourglassBottomIcon style={{ fontSize: 14 }} />}
                                            >
                                                Đang xác minh...
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        )}
                        {licensePlatesUNPAID && (
                            <>
                                {licensePlatesUNPAID.map((auctionRoom, index) => (
                                    <TableRow key={auctionRoom.id}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center">{auctionRoom.plateNumber}</TableCell>
                                        <TableCell align="center">{auctionRoom.province}</TableCell>
                                        <TableCell align="center">{auctionRoom.vehicleType}</TableCell>
                                        <TableCell align="center">{new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(auctionRoom.finalPrice)}</TableCell>
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
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {licensePlatesUNPAID.length === 0 && licensePlatesWAITING.length === 0 && (
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
                    {/* <Typography sx={{ fontWeight: "600" }}>
                        Không tìm thấy biển số phù hợp
                    </Typography> */}
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
