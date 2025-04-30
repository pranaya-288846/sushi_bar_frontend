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
import useTable from "../../Hooks/tableHook.ts";
import {TableData} from "../../Api/types/TableData.ts";

const TableViewScreen: React.FC = () => {
    const {fetchTables, loading, error} = useTable();
    const [tables, setTables] = useState<TableData[]>([]);

    useEffect(() => {
        const loadTables = async () => {
            try {
                const data = await fetchTables();
                setTables(data);
            } catch {
                // Error is handled by the hook's error state
            }
        };

        loadTables();
    }, []);

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Tables
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

            {!loading && !error && tables.length === 0 && (
                <Typography>No clients found.</Typography>
            )}

            {!loading && !error && tables.length > 0 && (
                <TableContainer component={Paper}>
                    <Table aria-label="Customer information">
                        <TableHead>
                            <TableRow>
                                <TableCell>Table ID</TableCell>
                                <TableCell>Client name</TableCell>
                                <TableCell>Has membership</TableCell>
                                <TableCell>Number of seats</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tables.map((table) => (
                                <TableRow key={table.id}>
                                    <TableCell>{table.id}</TableCell>
                                    <TableCell>{table.clientName}</TableCell>
                                    <TableCell>{String(table.hasMembership)}</TableCell>
                                    <TableCell>{table.numberOfSeats}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default TableViewScreen;
