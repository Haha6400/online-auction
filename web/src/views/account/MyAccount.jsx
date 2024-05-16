import * as React from "react";
import Box from "@mui/material/Box";

import { alpha } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import ListIcon from '@mui/icons-material/List';

import Footer from "../../components/common/Footer";
import AppAppBar from "../../components/base/AppAppBar";
import Update from "../account/Update";


const items = [
    {
        icon: <AccountCircleIcon />,
        title: 'Thông tin cá nhân',
    },
    {
        icon: <HistoryIcon />,
        title: 'Lịch sử đấu giá',
    },
    {
        icon: <ListIcon />,
        title: 'Danh sách chờ',
    },


];

export default function MyAccount() {

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
            <AppAppBar />
            <Box
                id="hero"
                sx={{
                    width: "100%",
                }}
            >
                <Container id="myAccount" sx={{ py: { xs: 8, sm: 16 } }}>
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

                                                {/* <Link
                                                    color="primary"
                                                    variant="body2"
                                                    fontWeight="bold"
                                                    sx={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        '& > svg': { transition: '0.2s' },
                                                        '&:hover > svg': { transform: 'translateX(2px)' },
                                                    }}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                    }}
                                                >
                                                </Link> */}
                                            </Box>
                                        </Box>
                                    </Card>
                                ))}
                            </Stack>
                        </Grid>
                        {/* <Grid
                            item
                            xs={14}
                            md={8}
                            sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
                        >
                            <Box
                                sx={{
                                    // mt: { xs: 8, sm: 10 },
                                    padding: 5,
                                    alignSelf: "center",
                                    width: "100%",
                                    bgcolor: "rgba(255, 255, 255, 0.3)",
                                    backgroundSize: "cover",
                                    borderRadius: "10px",
                                    boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)`,
                                }}
                                id="LPTable"
                            >
                                <Typography
                                    component="h1" variant="h5"

                                    color="text.secondary"
                                    sx={{ fontWeight: 700, fontSize: 24, textAlign: "center" }}
                                >
                                    {items[selectedItemIndex].title}
                                </Typography>
                            </Box> */}
                        {/* <Card
                                variant="outlined"
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    display: { xs: 'none', sm: 'flex' },
                                    boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)`,
                                    backgroundColor: 'red'
                                }}
                            > */}

                        {/* <Box
                                sx={{
                                    m: 'auto',
                                    width: '95%',
                                    height: 500,
                                    backgroundSize: 'contain',
                                    backgroundColor: 'rgba(255, 255, 255, 0.3)'
                                }}
                            >
                                <Typography component="h1" variant="h5" sx={{
                                    margin: 3
                                }}>
                                    {items[selectedItemIndex].title}
                                </Typography>
                                {items[selectedItemIndex].title === "Thông tin cá nhân" && (
                                    <>
                                        <Update />
                                    </>
                                )}

                            </Box> */}
                        {/* </Card> */}
                        {/* </Grid> */}
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
                                    alignSelf: "center",
                                    width: "100%",
                                    bgcolor: "rgba(255, 255, 255, 0.3)",
                                    backgroundSize: "cover",
                                    borderRadius: "10px",
                                    boxShadow: `0px 3.5px 5.5px rgba(0, 0, 0, 0.02)`
                                }}
                            >
                                {items[selectedItemIndex].title === "Thông tin cá nhân" && (
                                    <>
                                        <Update />
                                    </>
                                )}
                            </Box>
                        </Grid>

                    </Grid>
                </Container>
            </Box>

            <Footer />
        </Stack >
    );
}
