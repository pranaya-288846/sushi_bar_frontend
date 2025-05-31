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
import {useNavigate} from "react-router-dom";
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

    const navigate = useNavigate();

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

    // JSON-LD for Order
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Order",
        "customerName": profileManager.getProfile()?.name ?? "",
        "totalPrice": totalPrice,
        "orderedItems": menuList.map(item => ({
            "@type": "MenuItem",
            "name": item.name,
            "price": item.price
        }))
    };

    const handleBackClick = () => {
        navigate("/menu");
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
                <div vocab="https://schema.org/" typeof="Order">
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
                                            <span
                                                property='orderedItem' typeof='OrderItem'
                                            >
                                                <meta property='orderQuantity' content='1'/>
                                                <meta property='orderItemNumber' content={list.id.toString()}/>
                                                    <span property="orderedItem" typeof="Offer">
                                                        <TableCell property='name'>{list.name}</TableCell>
                                                        
                                                        <TableCell property='price'
                                                                   content={list.price.toString()}>{list.price}</TableCell>

                                                    </span>
                                                </span>
                                        </TableRow>

                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    {!loading && !error && (
                        <Typography>Total Price: {totalPrice}</Typography>
                    )}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
                    />
                </div>
            </Box>
        </>
    );
};

export default SummaryScreen;