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

    // JSON-LD for tables, using property names matching the table properties
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TableView",
        "name": "Restaurant Tables",
        "tableViewItems": tables.map(table => ({
            "@type": "Table",
            "identifier": table.id,
            "clientName": table.clientName,
            "hasMembership": table.hasMembership,
            "numberOfSeats": table.numberOfSeats
        }))
    };

    return (
        <div vocab="https://schema.org/" typeof="TableView">
            <meta property="name" content="Restaurant Tables"/>
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
                            <Card key={table.id} property="tableViewItems" typeof="Table" sx={{width: 300, m: 2}}>
                                <CardContent>
                                    <Typography variant="h6" property="identifier">
                                        Table ID: {table.id}
                                    </Typography>
                                    <Typography>
                                        <meta property="clientName" content={table.clientName}/>
                                        Client Name: {table.clientName}
                                    </Typography>
                                    <Typography>
                                        <meta property="hasMembership" content={table.hasMembership.toString()}/>
                                        Has Membership: {String(table.hasMembership)}
                                    </Typography>
                                    <Typography property="numberOfSeats" content={table.numberOfSeats.toString()}>
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
