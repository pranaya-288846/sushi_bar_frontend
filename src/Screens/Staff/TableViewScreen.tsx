import React, {useEffect, useState} from "react";
import {Alert, Box, Card, CardContent, CircularProgress, Grid, Typography,} from "@mui/material";
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

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": tables.map(table => ({
            "@type": "FoodEstablishmentReservation",
            "identifier": table.id,
            "underName": table.clientName,
            "programMembershipUsed": table.hasMembership,
            "partySize": table.numberOfSeats
        }))
    };


    return (
        <div vocab="https://schema.org/" typeof="FoodEstablishmentReservation">
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
                    <Typography>No tables found.</Typography>
                )}

                {!loading && !error && tables.length > 0 && (
                    <Grid container spacing={4}>
                        {tables.map((table) => (
                            <Card key={table.id} sx={{width: 300, m: 2}}>
                                <CardContent>
                                    <Typography variant="h6" property="identifier">
                                        Table ID: {table.id}
                                    </Typography>
                                    <Typography>
                                        <meta property="underName" content={table.clientName}/>
                                        Client Name: {table.clientName}
                                    </Typography>
                                    <Typography>
                                        <meta property="programMembershipUsed"
                                              content={table.hasMembership.toString()}/>
                                        Has Membership: {String(table.hasMembership)}
                                    </Typography>
                                    <Typography property="partySize" content={table.numberOfSeats.toString()}>
                                        Number of Seats: {table.numberOfSeats}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Grid>
                )}
            </Box>
            {/* JSON-LD script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
        </div>
    );
};

export default TableViewScreen;
