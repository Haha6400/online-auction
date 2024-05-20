import * as React from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HistoryIcon from '@mui/icons-material/History';
import ListIcon from '@mui/icons-material/List';

import { Button, Card, Stack, Grid, Dialog } from "@mui/material";
import AppAppBar from "../../components/base/AppAppBar";
import Footer from "../../components/common/Footer";
import WaitingConfirmPayment from "./WaitingConfirmPayment";
import PaymentHistory from "./PaymentHistory";
import { getAllAuctionRoom } from "../../service/user/licensePlateAPI";
import { formatTime } from "../../utils/timeFormatter";

const items = [
    {
        icon: <ListIcon />,
        title: 'Danh sách chờ xác nhận',
    },
    {
        icon: <HistoryIcon />,
        title: 'Lịch sử thanh toán',
    },

];


export default function Payment() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

    const handleItemClick = (index) => {
        setSelectedItemIndex(index);
    };

    const selectItem = items[selectedItemIndex];



    return (
        <Stack
            sx={{
                background: "url(/bgr.png)",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
            }}
        >
            <AppAppBar currentPage="payment" />
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
                            mb: 6,
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            alignSelf: "center",
                            textAlign: "center",
                            fontSize: "32px",
                            fontWeight: "700",
                        }}
                    >
                        THỐNG KÊ THANH TOÁN
                    </Typography>
                    <Grid container spacing={6}>

                        <Grid item xs={9} md={4}>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={2}
                                useFlexGap
                                sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
                            >
                                {items.map(({ icon, title }, index) => (
                                    <Card
                                        key={index}
                                        variant="outlined"
                                        component={Button}
                                        onClick={() => handleItemClick(index)}
                                        sx={{
                                            p: 3,
                                            height: 'fit-content',
                                            width: '100%',
                                            background: 'none',
                                            backgroundColor:
                                                selectedItemIndex === index ? 'rgba(255, 255, 255, 0.3)' : "rgba(255, 255, 255, 0.1)",
                                            borderColor: selectedItemIndex === index
                                                ? 'primary.light'
                                                : 'rgba(255, 255, 255, 0.2)',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                textAlign: 'left',
                                                flexDirection: { xs: 'column', md: 'row' },
                                                alignItems: { md: 'center' },
                                                gap: 2.5,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    color: 'primary.main',
                                                    display: 'flex', alignItems: 'center', textTransform: 'none'
                                                }}

                                            >
                                                {icon}
                                            </Box>
                                            <Box>
                                                <Typography
                                                    color="text.primary"
                                                    variant="body2"
                                                    fontWeight="bold"
                                                    sx={{ display: 'flex', alignItems: 'center', textTransform: 'none', color: 'primary.main' }}
                                                >
                                                    {title}
                                                    <ChevronRightRoundedIcon
                                                        fontSize="small"
                                                        sx={{ mt: '1px', ml: '2px' }}
                                                    />
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Card>
                                ))}
                            </Stack>
                        </Grid>

                        <Grid
                            item
                            xs={14}
                            md={8}
                            sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%', flexDirection: 'column', gap: 2 }}
                        >
                            <Box
                                sx={{
                                    padding: 3,
                                    alignSelf: "center",
                                    width: "100%",
                                    bgcolor: "rgba(255, 255, 255, 0.3)",
                                    backgroundSize: "cover",
                                    borderRadius: "10px",
                                    boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)`,
                                }}
                            >
                                <Typography
                                    component="h1" variant="h5"
                                    sx={{ paddingLeft: 2, color: 'primary.main' }}
                                >
                                    {items[selectedItemIndex].title}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    padding: 2,
                                    width: "100%",
                                    alignSelf: "center",
                                    bgcolor: "rgba(255, 255, 255, 0.3)",
                                    backgroundSize: "cover",
                                    borderRadius: "10px",
                                    boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)`
                                }}
                            >
                                {items[selectedItemIndex].title === "Lịch sử thanh toán" && (
                                    <>
                                        <PaymentHistory />

                                    </>
                                )}

                                {items[selectedItemIndex].title === "Danh sách chờ xác nhận" && (
                                    <>
                                        <WaitingConfirmPayment />

                                    </>
                                )}
                            </Box>
                        </Grid>

                    </Grid>
                </Container>

            </Box>
            <Footer />
        </Stack>
    )
}