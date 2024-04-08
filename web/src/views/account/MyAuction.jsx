import * as React from "react";
import Box from "@mui/material/Box";

import { alpha } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Footer from "../../components/common/Footer";
import AppAppBar from "../../components/base/AppAppBar";

import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const items = [
    {
        icon: <AccountCircleIcon />,
        title: 'Auction đấu giá thành công',
        imageLight: 'url("/static/images/templates/templates-images/dash-light.png")',
        imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
    },
    {
        icon: <SettingsIcon />,
        title: 'Auction đã tham gia',
        imageLight: 'url("/static/images/templates/templates-images/dash-light.png")',
        imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
    },


];
export default function MyAuction() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

    const handleItemClick = (index) => {
        setSelectedItemIndex(index);
    };

    const selectItem = items[selectedItemIndex];
    return (
        <>
            <AppAppBar loginCheck="true" name="Ha Nguyen" />
            <Box
                id="hero"
                sx={(theme) => ({
                    width: "100%",
                    backgroundImage:
                        theme.palette.mode === "light"
                            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
                            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
                    backgroundSize: "100% 20%",
                    backgroundRepeat: "no-repeat",
                })}
            >
                <Container id="myAuction" sx={{ py: { xs: 8, sm: 16 } }}>
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
                                                selectedItemIndex === index ? 'action.selected' : undefined,
                                            borderColor: (theme) => {
                                                if (theme.palette.mode === 'light') {
                                                    return selectedItemIndex === index
                                                        ? 'primary.light'
                                                        : 'grey.200';
                                                }
                                                return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
                                            },
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
                                                    color: (theme) => {
                                                        if (theme.palette.mode === 'light') {
                                                            return selectedItemIndex === index
                                                                ? 'primary.main'
                                                                : 'grey.300';
                                                        }
                                                        return selectedItemIndex === index
                                                            ? 'primary.main'
                                                            : 'grey.700';
                                                    },
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
                                                    sx={{ display: 'flex', alignItems: 'center', textTransform: 'none' }}
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
                        <Grid
                            item
                            xs={14}
                            md={8}
                            sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
                        >
                            <Card
                                variant="outlined"
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    display: { xs: 'none', sm: 'flex' },
                                    pointerEvents: 'none',
                                }}
                            >
                                <Box
                                    sx={{
                                        m: 'auto',
                                        width: 420,
                                        height: 500,
                                        backgroundSize: 'contain',
                                        backgroundImage: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? items[selectedItemIndex].imageLight
                                                : items[selectedItemIndex].imageDark,
                                    }}
                                />
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box >
            <Footer />
        </>
    );
}
