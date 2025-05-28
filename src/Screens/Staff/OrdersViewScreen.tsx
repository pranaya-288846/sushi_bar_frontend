import React, {useEffect, useState} from "react";
import {
    Alert,
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import useOrder from "../../Hooks/orderHook";
import {OrderData} from "../../Api/types/OrderData";

const OrdersScreen: React.FC = () => {
    const {fetchOrders, loading, error} = useOrder();
    const [orders, setOrders] = useState<OrderData[]>([]);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchOrders();
                setOrders(data);
            } catch {
                // Error is handled by the hook's error state
            }
        };

        loadOrders();
    }, []);

    // JSON-LD for ItemList of Orders
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": orders.map(order => ({
            "@type": "Order",
            "orderNumber": order.id,
            "tableNumber": order.tableId,
            "orderedItem": {
                "@type": "MenuItem",
                "identifier": order.menuItemId
            },
            "orderStatus": order.status
        }))
    };

    return (
        <Box p={3}>
            <div vocab="https://schema.org/" typeof="ItemList">
                <Typography variant="h4" gutterBottom>
                    Orders
                </Typography>

                {/* RDFa-friendly list for parsers */}
                {!loading && !error && orders.length > 0 && (
                    <ul style={{display: "none"}}>
                        {orders.map(order => (
                            <li key={order.id} property="itemListElement" typeof="Order">
                                <span property="orderNumber">{order.id}</span>
                                <span property="tableNumber">{order.tableId}</span>
                                <span property="orderStatus">{order.status}</span>
                                <span property="orderedItem" typeof="MenuItem">
                                    <span property="identifier">{order.menuItemId}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                )}

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

                {!loading && !error && orders.length === 0 && (
                    <Typography>No orders found.</Typography>
                )}

                {!loading && !error && orders.length > 0 && (
                    <TableContainer component={Paper}>
                        <Table aria-label="orders table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order Number</TableCell>
                                    <TableCell>Table Number</TableCell>
                                    <TableCell>Menu Item ID</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow
                                        key={order.id}
                                    >
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>{order.tableId}</TableCell>
                                        <TableCell>{order.menuItemId}</TableCell>
                                        <TableCell>{order.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
                />
            </div>
        </Box>
    );
};

export default OrdersScreen;