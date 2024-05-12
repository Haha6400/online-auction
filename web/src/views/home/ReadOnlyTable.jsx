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

import {
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  Dialog,
} from "@mui/material";
import AuctionRegisterModal from "./modals/AuctionRegisterModal";

import { LPprovinces, LPtype } from "../../utils/constants/LicensePlate";

export default function ReadOnlyTable({ idToken }) {
  const [LPSearchInput, setLPSearchInput] = useState("");
  const [province, setProvince] = useState("");
  const [carType, setCarType] = useState("");
  const [openAuctionRegisterModal, setOpenAuctionRegisterModal] =
    useState(false);

  const [licensePlates, setLicensePlates] = useState([
    {
      id: 1,
      plateNumber: "50A-12345",
      vehicleType: "Xe tải",
      province: "TP Hồ Chí Minh",
    },
  ]);

  const toggleAuctionRegisterMdal = () => {
    setOpenAuctionRegisterModal(!openAuctionRegisterModal);
  };

  const searchLP = () => {
    console.log(LPSearchInput, province, carType);
  };

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
            value={province}
            onChange={(event) => {
              setProvince(event.target.value);
            }}
            sx={{
              width: 250,
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
        <FormControl sx={{ minWidth: 250, marginY: 2 }} size="small">
          <Select
            autoWidth
            displayEmpty
            value={carType}
            onChange={(event) => {
              setCarType(event.target.value);
            }}
            sx={{
              width: 250,
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
        <Button
          variant="contained"
          color="primary"
          sx={{
            whiteSpace: "nowrap",
            marginY: 2,
            backgroundColor: "primary",
            color: "white",
          }}
          onClick={searchLP}
        >
          Tìm kiếm
        </Button>
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
            {licensePlates.map((licensePlate, index) => (
              <TableRow key={licensePlate.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{licensePlate.plateNumber}</TableCell>
                <TableCell align="center">{licensePlate.province}</TableCell>
                <TableCell align="center">{licensePlate.vehicleType}</TableCell>

                <TableCell
                  sx={{ whiteSpace: "nowrap" }}
                  align="center"
                ></TableCell>

                <TableCell width={200}>
                  <Button
                    onClick={toggleAuctionRegisterMdal}
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
      <Dialog
        open={openAuctionRegisterModal}
        onClose={toggleAuctionRegisterMdal}
      >
        <AuctionRegisterModal close={toggleAuctionRegisterMdal} />
      </Dialog>
    </>
  );
}
