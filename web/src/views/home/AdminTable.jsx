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
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

import {
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  Typography,
} from "@mui/material";

import ManageSearchIcon from "@mui/icons-material/ManageSearch";

import { LPprovinces, LPtype } from "../../utils/constants/LicensePlate";
import {
  deleteLicensePlate,
  getAllLicensePlate,
} from "../../service/admin/licensePlateAPI";
import CreateLPModal from "./modals/CreateLPModal";
import UpdateLPModal from "./modals/UpdateLPModal";
import ResultModal from "./modals/ResultModal";

export default function AdminTable({ idToken }) {
  const [LPSearchInput, setLPSearchInput] = useState("");
  const [province, setProvince] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [openCreateLPModal, setOpenCreateLPModal] = useState(false);

  const [openUpdateLPModal, setOpenUpdateLPModal] = useState(false);

  const [openResultModal, setOpenResultModal] = useState(false);

  const [licensePlates, setLicensePlates] = useState([]);

  const [currentLP, setCurrentLP] = useState({});

  const [resultType, setResultType] = useState(""); // CREATE, UPDATE, DELETE

  const toggleCreateLPModal = () => {
    setOpenCreateLPModal(!openCreateLPModal);
  };

  const toggleUpdateLPModal = () => {
    setOpenUpdateLPModal(!openUpdateLPModal);
  };

  const toggleResultModal = () => {
    setOpenResultModal(!openResultModal);
  };
  const filteredLicensePlates = licensePlates
    ? licensePlates.filter((plate) => {
        const matchesLPprovince = !province || plate.province === province;
        const matchesVehicleType =
          !vehicleType || plate.vehicleType === vehicleType;
        const matchesPlateNumber =
          !LPSearchInput ||
          plate.plateNumber.toLowerCase().includes(LPSearchInput.toLowerCase());
        return matchesLPprovince && matchesVehicleType && matchesPlateNumber;
      })
    : [];

  const fetchLicensePlates = async () => {
    const res = await getAllLicensePlate(idToken);
    // console.log(res);
    setLicensePlates(res);
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
            value={vehicleType}
            onChange={(event) => {
              setVehicleType(event.target.value);
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
          startIcon={<PlaylistAddIcon />}
          onClick={() => {
            setResultType("CREATE");
            toggleCreateLPModal();
          }}
        >
          Tạo biển số
        </Button>
      </Box>

      <Dialog open={openCreateLPModal} onClose={toggleCreateLPModal}>
        <CreateLPModal
          close={toggleCreateLPModal}
          idToken={idToken}
          fetchLicensePlates={fetchLicensePlates}
          toggleResultModal={toggleResultModal}
        />
      </Dialog>

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

                <TableCell width={300}>
                  <Button
                    variant="contained"
                    sx={{ mr: 2, ml: 5 }}
                    style={{ background: "#079455" }}
                    startIcon={<EditNoteIcon style={{ fontSize: 16 }} />}
                    onClick={() => {
                      setCurrentLP(licensePlate);
                      setResultType("UPDATE");
                      toggleUpdateLPModal();
                    }}
                  >
                    Chỉnh sửa
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      background: "#e05757",
                    }}
                    startIcon={<DeleteIcon style={{ fontSize: 14 }} />}
                    onClick={async () => {
                      const res = await deleteLicensePlate(
                        idToken,
                        licensePlate.id,
                      );
                      setResultType("DELETE");
                      toggleResultModal();
                      fetchLicensePlates();
                    }}
                  >
                    Xóa
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

      <Dialog open={openUpdateLPModal} onClose={toggleUpdateLPModal}>
        <UpdateLPModal
          close={toggleUpdateLPModal}
          idToken={idToken}
          fetchLicensePlates={fetchLicensePlates}
          currentLP={currentLP}
          toggleResultModal={toggleResultModal}
        />
      </Dialog>

      <Dialog open={openResultModal} onClose={toggleResultModal}>
        <ResultModal type={resultType} close={toggleResultModal} />
      </Dialog>
    </>
  );
}
