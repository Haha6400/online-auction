import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PollIcon from "@mui/icons-material/Poll";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { Button, Card, Stack, Grid, Dialog, IconButton } from "@mui/material";

import AppAppBar from "../../components/base/AppAppBar";
import Footer from "../../components/common/Footer";

import { useAuth } from "../../hooks/AuthProvider";
import { formatPrice, formatTimeInBiddingRoom } from "../../utils/formatter";

import AnimatedBorder from "../../components/other/AnimatedBorder";
import WinningModal from "./modals/WinningModal";
import LosingModal from "./modals/LosingModal";
import BiddingModal from "./modals/BiddingModal";

import { connect, sendBid, subscribe } from "../../utils/auction";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const roomId = params.id;
  return roomId;
}

export default function BiddingRoom() {
  const roomId = useLoaderData();
  // console.log(roomId);
  const [accountUser, setAccountUser] = useState({});
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      setAccountUser(auth.user);
    }
  }, [auth.user]);

  const [openWinningModal, setOpenWinningModal] = useState(false);

  const [openLosingModal, setOpenLosingModal] = useState(false);

  const [openBiddingModal, setOpenBiddingModal] = useState(false);

  const toggleWinningModal = () => {
    setOpenWinningModal(!openWinningModal);
  };

  const toggleLosingModal = () => {
    setOpenLosingModal(!openLosingModal);
  };

  const toggleBiddingModal = () => {
    setOpenBiddingModal(!openBiddingModal);
  };

  const [initialPrice, setInitialPrice] = useState(0);
  const [priceStep, setPriceStep] = useState(0);
  const [countStep, setCountStep] = useState(1);
  const [auctioningLP, setAuctioningLP] = useState("xxx-xxxxx");

  const [currentPrice, setCurrentPrice] = useState(null);

  const [bids, setBids] = useState([]);

  const [bidData1, setBidData1] = useState({});

  const [bidData2, setBidData2] = useState({});

  const [endTime, setEndTime] = useState(null);
  // Display timer
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    let time = 0;

    if (endTime) {
      time = Date.parse(endTime) - Date.now();
      if (time <= 0) {
        // setOpenWinningModal(true);
        setOpenLosingModal(true);
        return;
      }
    } else {
      return;
    }
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    console.log("start interval");
    const interval = setInterval(() => getTime(), 500);

    return () => clearInterval(interval);
  }, [endTime]);

  useEffect(() => {
    connect();
    setTimeout(() => {
      subscribe(
        (data) => {
          setBidData1(data);
        },
        (data) => {
          setBidData2(data);
        },
      );
    }, 1000);
  }, []);

  useEffect(() => {
    try {
      console.log(bidData2);
      console.log(bidData2?.body);

      if (JSON.parse(bidData2?.body).type === "INITIALIZE_AUCTION_ROOM_DATA") {
        const auctionInfo = JSON.parse(bidData2?.body).auctionRoom;

        console.log(auctionInfo.endTime);
        setEndTime(new Date(auctionInfo.endTime));

        console.log(auctionInfo.initialPrice);
        setInitialPrice(auctionInfo.initialPrice);

        console.log(auctionInfo.priceStep);
        setPriceStep(auctionInfo.priceStep);

        console.log(auctionInfo.licensePlate);
        setAuctioningLP(auctionInfo.licensePlate);

        console.log(auctionInfo.bids);
        setBids(auctionInfo.bids);
      } else if (JSON.parse(bidData2?.body).type === "UPDATE_BID") {
        console.log("Update:");
        console.log(JSON.parse(bidData2?.body).bid);
        let temp = [...bids];
        temp.push(JSON.parse(bidData2?.body).bid);
        setBids(temp);
      }
    } catch (err) {
      console.log(err);
    }
  }, [bidData2]);

  useEffect(() => {
    try {
      console.log(bidData1);
      console.log(bidData1?.body);

      console.log(JSON.parse(bidData1?.body));
      console.log(JSON.parse(bidData1?.body).bid.user.id);
      console.log(accountUser.id);

      if (JSON.parse(bidData1?.body).bid.user.id === accountUser.id) {
        toggleBiddingModal();
      }
    } catch (err) {
      console.log(err);
    }
  }, [bidData1]);

  useEffect(() => {
    if (bids.length > 0) {
      setCurrentPrice(
        bids[bids.length - 1].priceBeforeBidding +
          bids[bids.length - 1].priceStep *
            bids[bids.length - 1].numberOfPriceStep,
      );
    }
  }, [bids]);

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
            {/* Main content */}
            <Grid container spacing={{ lg: 5, xs: 1 }}>
              <Grid item xs={12} md={5}>
                <Stack
                  height="100%"
                  alignItems="center"
                  spacing={2}
                  // sx={{ bgcolor: "#fff" }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      padding: 3,
                      bgcolor: "#fff",
                      boxShadow:
                        "rgb(0, 0, 0, 0.16) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
                      // border: "4px solid #ccc",
                      borderRadius: 2,
                    }}
                  >
                    <Typography sx={{ fontWeight: "700", fontSize: 24 }}>
                      THỜI GIAN CÒN LẠI
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        // alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <Stack>
                        <Typography sx={{ fontWeight: "700", fontSize: 30 }}>
                          {minutes.toString().padStart(2, "0")}
                        </Typography>
                        <Typography>Phút</Typography>
                      </Stack>
                      <Typography sx={{ fontWeight: "700", fontSize: 30 }}>
                        :
                      </Typography>
                      <Stack>
                        <Typography sx={{ fontWeight: "700", fontSize: 30 }}>
                          {seconds.toString().padStart(2, "0")}
                        </Typography>
                        <Typography>Giây</Typography>
                      </Stack>
                    </Box>
                  </Box>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    width="100%"
                    height="100%"
                    sx={{ bgcolor: "#ffffffaa", borderRadius: 2 }}
                  >
                    <AnimatedBorder>
                      <Box
                        sx={{
                          width: "100%",
                          py: 1.5,
                          // px: 10,
                          textAlign: "center",
                          // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                          borderRadius: 2,
                          background: "#FFFFFF",
                          // border: "2px solid #333",
                          // boxShadow:
                          //   "rgb(0, 0, 0, 0.16) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
                          boxShadow:
                            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: 700, color: "#333" }}
                        >
                          {auctioningLP.substring(0, auctioningLP.indexOf("-"))}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: 700, color: "#333" }}
                        >
                          {auctioningLP.substring(
                            auctioningLP.indexOf("-") + 1,
                          )}
                        </Typography>
                      </Box>
                    </AnimatedBorder>
                    <Button
                      variant="contained"
                      style={{ background: "#079455" }}
                      sx={{ width: 300 }}
                    >
                      {/* Biển số */}
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={7}>
                <Stack spacing={2}>
                  {/* Diễn biến */}
                  <Card>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: 2,
                        px: 3,
                        gap: 1,
                        borderBottomStyle: "solid",
                        borderBottomWidth: 2,
                        borderBottomColor: "#eee",
                      }}
                    >
                      <PollIcon />
                      <Typography sx={{ fontWeight: "700", fontSize: 16 }}>
                        Diễn biến cuộc đấu giá
                      </Typography>
                    </Box>
                    <Stack
                      spacing={2}
                      sx={{
                        padding: 2,
                        px: 3,
                        minHeight: 150,
                        maxHeight: 200,
                        overflowY: "scroll",
                      }}
                    >
                      {bids
                        .slice(0)
                        .reverse()
                        .map((bid, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{ fontSize: 16, fontWeight: "700" }}
                              >
                                {formatPrice(
                                  bid.priceBeforeBidding +
                                    bid.priceStep * bid.numberOfPriceStep,
                                )}
                              </Typography>
                              <Typography sx={{ fontSize: 14 }}>
                                {formatTimeInBiddingRoom(
                                  new Date(bid.eventTime),
                                )}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <AccountCircleIcon />
                              <Typography
                                sx={{
                                  fontWeight: "700",
                                }}
                              >
                                {bid.user.id}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                    </Stack>
                  </Card>

                  {/* Bid */}
                  <Card>
                    {/* Bid header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 2,
                        px: 3,
                        borderBottom: "2px solid #eee",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <LocalAtmIcon />
                        <Typography sx={{ fontWeight: "700", fontSize: 16 }}>
                          Giá hiện tại
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: "700", fontSize: 16 }}>
                          {currentPrice
                            ? formatPrice(currentPrice)
                            : formatPrice(initialPrice)}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Bid action */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 2,
                        px: 3,
                      }}
                    >
                      {/* Price step */}
                      <Box
                        sx={{
                          width: "25%",
                          textAlign: "center",
                          py: 0.5,
                          px: 1,
                          border: "2px solid #015433",
                          borderRadius: 20,
                        }}
                      >
                        <Typography>{formatPrice(priceStep)}</Typography>
                      </Box>

                      {/* Muiltiply symbol */}
                      <Box>
                        <Typography
                          sx={{
                            fontSize: 30,
                            fontWeight: "700",
                            color: "#555",
                          }}
                        >
                          &#215;
                        </Typography>
                      </Box>

                      {/* Step count */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          minWidth: "25%",
                          justifyContent: "center",
                          gap: 2,
                          py: 0.5,
                          px: 1,
                          border: "2px solid #015433",
                          borderRadius: 20,
                        }}
                      >
                        {/* Decrease button (-) */}
                        <IconButton
                          sx={{
                            width: 25,
                            height: 25,
                            background: "#eee",
                            ":hover": { background: "#ddd" },
                            ":disabled": { background: "#eee", opacity: 0.3 },
                          }}
                          size="small"
                          onClick={() => {
                            if (countStep > 1) setCountStep(countStep - 1);
                          }}
                          disabled={countStep === 1}
                        >
                          <Typography sx={{ fontSize: 20, color: "#079455" }}>
                            &#8722;
                          </Typography>
                        </IconButton>

                        {/* Step count value */}
                        <Typography
                          sx={{
                            fontWeight: "600",
                            minWidth: "20%",
                            textAlign: "center",
                          }}
                        >
                          {countStep}
                        </Typography>

                        {/* Increase button (+) */}
                        <IconButton
                          sx={{
                            width: 25,
                            height: 25,
                            background: "#eee",
                            ":hover": { background: "#ddd" },
                          }}
                          size="small"
                          onClick={() => {
                            setCountStep(countStep + 1);
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 20,
                              color: "#079455",
                            }}
                          >
                            &#43;
                          </Typography>
                        </IconButton>
                      </Box>

                      {/* Equal symbol */}
                      <Box>
                        <Typography
                          sx={{
                            fontSize: 30,
                            fontWeight: "700",
                            color: "#555",
                          }}
                        >
                          &#61;
                        </Typography>
                      </Box>

                      {/* Total amount */}
                      <Box
                        sx={{
                          width: "25%",
                          textAlign: "center",
                          py: 0.5,
                          px: 1,
                          borderWidth: 2,
                          borderStyle: "solid",
                          borderColor: "#015433",
                          borderRadius: 20,
                        }}
                      >
                        <Typography>
                          {formatPrice(priceStep * countStep)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ padding: 2, px: 3, paddingTop: 0 }}>
                      <Button
                        variant="contained"
                        sx={{ width: "100%" }}
                        style={{ background: "#079455", borderRadius: 20 }}
                        onClick={() => {
                          if (currentPrice) {
                            sendBid(currentPrice, priceStep, countStep);
                          } else {
                            sendBid(initialPrice, priceStep, countStep);
                          }
                          setCountStep(1);
                        }}
                      >
                        Trả giá
                        <span style={{ fontWeight: "700", marginLeft: 5 }}>
                          {formatPrice(currentPrice + priceStep * countStep)}
                        </span>
                      </Button>
                    </Box>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Footer />

      <Dialog open={openWinningModal} onClose={toggleWinningModal}>
        <WinningModal auctioningLP={auctioningLP} close={toggleWinningModal} />
      </Dialog>

      <Dialog open={openLosingModal} onClose={toggleLosingModal}>
        <LosingModal auctioningLP={auctioningLP} close={toggleLosingModal} />
      </Dialog>

      <Dialog open={openBiddingModal} onClose={toggleBiddingModal}>
        <BiddingModal
          close={() => {
            toggleBiddingModal();
            // window.location.reload();
          }}
        />
      </Dialog>
    </Stack>
  );
}
