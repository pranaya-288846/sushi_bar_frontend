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
import useOrder from "../../Hooks/orderHook"; // Adjust the path as needed
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

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Orders
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

            {!loading && !error && orders.length === 0 && (
                <Typography>No orders found.</Typography>
            )}

            {!loading && !error && orders.length > 0 && (
                <TableContainer component={Paper}>
                    <Table aria-label="orders table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Table ID</TableCell>
                                <TableCell>Item</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
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
        </Box>
    );
};

export default OrdersScreen;
