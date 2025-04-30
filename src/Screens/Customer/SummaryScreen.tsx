import React, {useEffect, useState} from "react";
import {
    Alert,
    AppBar,
    Box,
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom"; // Import useNavigate
import useOrder from "../../Hooks/orderHook.ts";
import useMenu from "../../Hooks/menuHook.ts";
import {MenuData} from "../../Api/types/MenuData.ts";
import UserProfileSingleton from "../../Tools/UserProfileSingleton.ts";
import matchOrdersWithMenuItems from "../../Tools/ListMatcher.ts";

const SummaryScreen: React.FC = () => {
    const {fetchOrders} = useOrder();
    const {fetchMenu, loading, error} = useMenu();
    const [menuList, setMenuList] = useState<MenuData[]>([]);
    const profileManager = UserProfileSingleton.getInstance();
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const navigate = useNavigate(); // Initialize navigate

    profileManager.setProfile({id: 3, name: "Prune"});

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const tableId = profileManager.getProfile()?.id ?? 1;
                const data = await fetchOrders(tableId);
                const menuItems = await fetchMenu();
                const filteredItems = matchOrdersWithMenuItems(data, menuItems);
                setMenuList(filteredItems);
                setTotalPrice(filteredItems.reduce((acc, item) => acc + item.price, 0));
            } catch {
                console.log("Error");
            }
        };

        loadOrders();
    }, []);

    // Back button handler
    const handleBackClick = () => {
        navigate("/menu"); // Adjust the path if your menu route is different
    };

    return (
        <>
            <AppBar>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="back"
                        onClick={handleBackClick}
                        sx={{mr: 2}}
                    >
                        <ArrowBackIcon/>
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Summary
                    </Typography>

                    <Typography variant="h6" component="div">
                        {profileManager.getProfile()?.name}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box p={3}>
                <Typography variant="h4" gutterBottom>
                    Summary screen
                </Typography>

                {loading && (
                    <Box display="flex" justifyContent="center" my={4}>
                        <CircularProgress/>
                    </Box>
                )}

                {error && (
                    <Alert severity="error" sx={{mb: 2}}>
                        {error}
                    </Alert>
                )}

                {!loading && !error && menuList.length === 0 && (
                    <Typography>No orders found.</Typography>
                )}

                {!loading && !error && menuList.length > 0 && (
                    <TableContainer component={Paper}>
                        <Table aria-label="Customer information">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Menu name</TableCell>
                                    <TableCell>Menu price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {menuList.map((list) => (
                                    <TableRow key={list.id}>
                                        <TableCell>{list.name}</TableCell>
                                        <TableCell>{list.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {!loading && !error && (
                    <Typography>Total Price: {totalPrice}</Typography>
                )}
            </Box>
        </>
    );
};

export default SummaryScreen;
