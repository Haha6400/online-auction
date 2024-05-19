import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Button, Card, Stack, Grid, Dialog } from "@mui/material";

import AppAppBar from "../../components/base/AppAppBar";
import Footer from "../../components/common/Footer";
import Create from "./Create";
import Update from "./Update";
import AuctionRegisterModal from "../../components/base/AuctionRegisterModal";

import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from '@mui/icons-material/Create';
import EditNoteIcon from "@mui/icons-material/EditNote";


import { useAuth } from "../../hooks/AuthProvider";
import { formatTime } from "../../utils/timeFormatter";

export default function AuctionRoom() {
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
  const [openViewDialog, setOpenViewDialog] = React.useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = React.useState(false);

  const [idToken, setIdToken] = React.useState(
    localStorage.getItem("id_token"),
  );
  const [accountUser, setAccountUser] = React.useState({});
  const [auctionRoomList, setAuctionRoomList] = React.useState(null);
  const [selectedAutionRoom, setSelectedAutionRoom] = React.useState(null);
  const auth = useAuth();
  const dateNow = new Date();

  const handleCreateButtonClick = () => {
    setOpenCreateDialog(true);
  };
  const handleCreateButtonClose = () => {
    setOpenCreateDialog(false);
  };

  const formatAuctionRoom = (auctionRoom) => {
    auctionRoom = {
      ...auctionRoom,
      'startTime': formatTime(new Date(auctionRoom.startTime)),
      'endTime': formatTime(new Date(auctionRoom.endTime)),
    }
    setSelectedAutionRoom(auctionRoom);
  };

  const handleOpenButtonClick = (auctionRoom) => {
    formatAuctionRoom(auctionRoom);
    setOpenViewDialog(true);
  };

  const handleOpenButtonClose = () => {
    setOpenViewDialog(false);
  };
  const handleRegisterButtonClick = (auctionRoom) => {
    formatAuctionRoom(auctionRoom);
    setOpenRegisterDialog(true);
  };

  const handleRegisterButtonClose = () => {
    setOpenRegisterDialog(false);
  };

  const handleUpdateButtonClick = (auctionRoom) => {
    setSelectedAutionRoom(auctionRoom);
    setOpenUpdateDialog(true);
  };

  const handleUpdateButtonClose = () => {
    setOpenUpdateDialog(false);
  };

  const handleDeleteButtonClick = async (auctionRoom) => {
    setSelectedAutionRoom(auctionRoom);
    setOpenDeleteDialog(true);
    console.log("sdv");
  }

  const deleteAuctionRoomConfirm = async (event) => {
    await axios.delete(`http://localhost:8080/api/auction-rooms/${selectedAutionRoom.id}`, {
      headers: { Authorization: `Bearer ${idToken}` }
    })
      .then((res) => {
        setOpenDeleteDialog(false)
        getAllAuctionRoom();
      })
      .catch((error) => {
        console.dir("Delete auction room error:", error);
      });
    return;
  }

  const getAllAuctionRoom = async () => {
    await axios
      .get(`http://localhost:8080/api/auction-rooms`)
      .then((res) => {
        const auctionRoomList = Object.values(res.data);
        setAuctionRoomList(auctionRoomList);
        console.log("list auction room: ", res.data);
      })
      .catch((error) => {
        console.dir("Get all auction room error:", error);
      });
    return;
  };

  React.useEffect(() => {
    if (auth.user) {
      setAccountUser(auth.user);
      console.log(auth.user);
    }
  }, [auth.user]);

  React.useEffect(() => {
    if (
      (accountUser["authorities"] &&
        accountUser["authorities"].includes("ROLE_ADMIN")) ||
      !accountUser["authorities"]
    )
      getAllAuctionRoom();
  }, []);

  return (
    <Stack
      sx={{
        background: "url(/bgr.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AppAppBar currentPage="list_auction_room" />
      <Box id="hero" sx={{ width: "100%" }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 10, sm: 14 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Typography
            variant="h2"
            color="text.secondary"
            sx={{
              my: 3,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "32px",
              fontWeight: "700",
            }}
          >
            DANH SÁCH PHÒNG ĐẤU GIÁ
          </Typography>
          <Box
            sx={{
              mt: 3,
              padding: 5,
              alignSelf: "center",
              width: "100%",
              bgcolor: "rgba(255, 255, 255, 0.3)",
              backgroundSize: "cover",
              borderRadius: "10px",
              boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)`,
            }}
          >
            {idToken &&
              accountUser["authorities"] &&
              accountUser["authorities"].includes("ROLE_ADMIN") && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                    startIcon={<PlaylistAddIcon />}
                    onClick={handleCreateButtonClick}
                  >
                    Tạo phòng
                  </Button>
                  <Dialog
                    open={openCreateDialog}
                    onClose={handleCreateButtonClose}
                  >
                    <Create
                      title="Tạo phòng đấu giá"
                      close={handleCreateButtonClose}
                      getAllAuctionRoom={getAllAuctionRoom}
                    />
                  </Dialog>
                </>
              )}

            <Box sx={{ mt: 5 }}>
              <Grid container spacing={{ lg: 5, xs: 1 }}>
                {auctionRoomList && (
                  <>
                    {auctionRoomList.map((auctionRoom) => (
                      <Grid item xs={12} sm={6} md={4} key={auctionRoom.id}>
                        <Card
                          sx={{
                            p: 2,
                          }}
                        >
                          <Box
                            sx={{
                              mb: 2,
                              py: 1.5,
                              px: 5,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                              borderRadius: 2,
                              background: "#FFFFFF",
                            }}
                          >
                            <Typography
                              variant="h4"
                              sx={{ fontWeight: 700, color: "#333" }}
                            >
                              {auctionRoom.licensePlate.plateNumber.substring(
                                0,
                                auctionRoom.licensePlate.plateNumber.indexOf(
                                  "-",
                                ),
                              )}
                            </Typography>
                            <Typography
                              variant="h4"
                              sx={{ fontWeight: 700, color: "#333" }}
                            >
                              {auctionRoom.licensePlate.plateNumber.substring(
                                auctionRoom.licensePlate.plateNumber.indexOf(
                                  "-",
                                ) + 1,
                              )}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <Box
                              sx={{
                                mr: 1,
                                py: 1,
                                px: 1.3,
                                borderRadius: "50%",
                                background: "#F4FCF8",
                              }}
                            >
                              <DirectionsCarIcon
                                sx={{ fontSize: 25, color: "#5DD397" }}
                              />
                            </Box>
                            <Stack>
                              <Typography sx={{ fontSize: 12 }}>
                                Loại xe
                              </Typography>
                              <Typography sx={{ fontWeight: 600 }}>
                                {auctionRoom.licensePlate.vehicleType}
                              </Typography>
                            </Stack>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
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
                              <LocationOnIcon
                                sx={{ fontSize: 20, color: "#5DD397" }}
                              />
                            </Box>
                            <Stack>
                              <Typography sx={{ fontSize: 12 }}>
                                Tỉnh, thành phố
                              </Typography>
                              <Typography sx={{ fontWeight: 600 }}>
                                Tỉnh {auctionRoom.licensePlate.province}
                              </Typography>
                            </Stack>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
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
                              <EventIcon
                                sx={{ fontSize: 20, color: "#5DD397" }}
                              />
                            </Box>
                            <Stack>
                              <Typography sx={{ fontSize: 12 }}>
                                Thời gian mở phòng
                              </Typography>
                              <Typography sx={{ fontWeight: 600 }}>
                                {formatTime(new Date(auctionRoom.startTime))}
                              </Typography>
                            </Stack>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
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
                              <HourglassTopIcon
                                sx={{ fontSize: 20, color: "#5DD397" }}
                              />
                            </Box>
                            <Stack>
                              <Typography sx={{ fontSize: 12 }}>
                                Trạng thái
                              </Typography>
                              <Typography sx={{ fontWeight: 600 }}>
                                {dateNow < (new Date(auctionRoom.startTime)) && (
                                  <>Chưa bắt đầu</>
                                )}
                                {dateNow > (new Date(auctionRoom.startTime)) && (
                                  <>Đã kết thúc</>
                                )}
                              </Typography>
                            </Stack>
                          </Box>

                          <Grid container spacing={0.5}>
                            {dateNow > new Date(auctionRoom.startTime) && (
                              <>
                                <Grid item xs={12}>
                                  <Button
                                    key={auctionRoom.id} // Đảm bảo mỗi button có một key duy nhất
                                    variant="contained"
                                    style={{
                                      width: "100%",
                                      color: "#FFFFFF",
                                      background: "#A0A0A0",
                                      whiteSpace: "nowrap",
                                    }}
                                    onClick={() => handleOpenButtonClick(auctionRoom)} // Pass auctionRoom tương ứng vào hàm handleOpenButtonClick
                                    startIcon={<VisibilityIcon style={{ fontSize: 14 }} />}
                                  >
                                    Xem phòng
                                  </Button>
                                </Grid>
                              </>
                            )}

                            {dateNow < new Date(auctionRoom.startTime) && (
                              <>
                                {accountUser && accountUser["authorities"] && (
                                  <>
                                    {accountUser["authorities"].includes(
                                      "ROLE_ADMIN",
                                    ) && (
                                        <>
                                          <Grid item xs={6}>
                                            <Button
                                              key={auctionRoom.id} // Đảm bảo mỗi button có một key duy nhất
                                              variant="contained"
                                              style={{
                                                width: "100%",
                                                background: "#079455",
                                                whiteSpace: "nowrap",
                                              }}
                                              onClick={() => handleUpdateButtonClick(auctionRoom)}
                                              startIcon={<EditNoteIcon
                                                style={{ fontSize: 16 }}
                                              />}
                                            >
                                              Chỉnh sửa
                                            </Button>
                                          </Grid>
                                          <Grid item xs={6}>
                                            <Button
                                              variant="contained"
                                              style={{
                                                width: "100%",
                                                color: "#FFFFFF",
                                                background: "#e05757",
                                                whiteSpace: "nowrap",
                                              }}
                                              onClick={() => {
                                                handleDeleteButtonClick(auctionRoom);
                                              }}
                                              startIcon={
                                                <DeleteIcon
                                                  style={{ fontSize: 14 }}
                                                />
                                              }
                                            >
                                              Xóa phòng
                                            </Button>
                                          </Grid>
                                        </>
                                      )}
                                  </>
                                )}
                                {(!accountUser["authorities"] ||
                                  !accountUser["authorities"].includes(
                                    "ROLE_ADMIN",
                                  )) && (
                                    <>
                                      <Grid item xs={6}>
                                        <Button
                                          key={auctionRoom.id} // Ensures unique key for each button
                                          variant="text"
                                          style={{
                                            width: "100%",
                                            color: "#079455",
                                            outline: "1px solid #079455"
                                          }}
                                          onClick={() => handleOpenButtonClick(auctionRoom)}
                                          startIcon={<VisibilityIcon style={{ fontSize: 14 }} />}
                                        >
                                          Xem phòng
                                        </Button>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Button
                                          key={auctionRoom.id} // Đảm bảo mỗi button có một key duy nhất
                                          variant="contained"
                                          style={{
                                            width: "100%",
                                            color: "#FFFFFF",
                                            background: "#079455",
                                            whiteSpace: "nowrap",
                                          }}
                                          onClick={() => handleRegisterButtonClick(auctionRoom)} // Pass auctionRoom tương ứng vào hàm handleOpenButtonClick
                                          startIcon={<CreateIcon style={{ fontSize: 14 }} />}
                                        >
                                          Đăng ký
                                        </Button>
                                      </Grid>

                                    </>
                                  )}
                              </>
                            )}
                          </Grid>
                        </Card>
                      </Grid>
                    ))}
                    <Dialog open={openViewDialog} onClose={handleOpenButtonClose}>
                      {selectedAutionRoom && (
                        <AuctionRegisterModal
                          title="XEM PHÒNG ĐẤU GIÁ"
                          auctionRoom={selectedAutionRoom}
                          close={handleOpenButtonClose}
                        />
                      )}
                    </Dialog>
                    <Dialog open={openRegisterDialog} onClose={setOpenRegisterDialog}>
                      {selectedAutionRoom && (
                        <AuctionRegisterModal
                          title="XÁC NHẬN ĐĂNG KÝ ĐẤU GIÁ"
                          auctionRoom={selectedAutionRoom}
                          close={handleRegisterButtonClose}
                        />
                      )}
                    </Dialog>
                    <Dialog open={openUpdateDialog} onClose={handleUpdateButtonClose}>
                      {selectedAutionRoom && (
                        <Update
                          close={handleUpdateButtonClose}
                          idToken={idToken}
                          currentAuctionRoom={selectedAutionRoom}
                          getAllAuctionRoom={getAllAuctionRoom}
                        />
                      )}
                    </Dialog>
                    <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                      {selectedAutionRoom && (
                        <Stack>
                          <Box id="hero" sx={{ width: "100%" }}>
                            <Container
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                              }}>
                              <Box
                                sx={{
                                  marginTop: 3,
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                component="form" onSubmit={deleteAuctionRoomConfirm} onClickOutside
                              >
                                <Typography
                                  variant="h5"
                                  color="text.secondary"
                                  sx={{ fontWeight: 1000, fontSize: 24, textAlign: "start", textJustify: "start", mb: 2 }}
                                >
                                  Xóa phòng đấu giá
                                </Typography>
                                <Typography>
                                  Bạn có chắc chắn muốn xóa phòng đấu giá?
                                </Typography>
                                <Grid
                                  container
                                  spacing={3}
                                  justifyContent="center"
                                  sx={{ mb: 3, mt: 1, mr: 3 }}
                                >
                                  <Grid item xs={12} sm={6}>
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      sx={{ width: "100%" }}
                                      onClick={() => setOpenDeleteDialog(false)}
                                    >
                                      Hủy bỏ
                                    </Button>
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <Button
                                      variant="contained"
                                      sx={{ width: "100%", background: "#e05757", color: "#FFFFFF" }}
                                      onClick={() => deleteAuctionRoomConfirm()}
                                    >
                                      Xác nhận
                                    </Button>
                                  </Grid>
                                </Grid>

                              </Box>

                            </Container>
                          </Box>

                        </Stack>
                      )}
                    </Dialog>
                  </>
                )}
              </Grid>
            </Box>
          </Box>
        </Container >
      </Box >
      <Footer />
    </Stack >
  );
}
