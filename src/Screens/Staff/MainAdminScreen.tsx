import React from 'react';
import {AppBar, Box, Button, Card, CardContent, Grid, Toolbar, Typography,} from '@mui/material';
import {useNavigate} from "react-router-dom";

const MainAdminScreen: React.FC = () => {
    const navigate = useNavigate();

    const cardData = [
        {
            title: 'Manage customer orders',
            buttonText: 'Orders',
            onClick: () => navigate('/order-view-admin'),
        },
        {
            title: 'Manage customer data',
            buttonText: 'Tables',
            onClick: () => navigate('/table-view-admin'),
        },
        {
            title: 'Manage menu data',
            buttonText: 'Menu',
            onClick: () => navigate('/menu-editor-admin'),
        },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": cardData.map(card => ({
            "@type": "Card",
            "title": card.title,
            "buttonText": card.buttonText,
            "onClick": card.onClick
        }))
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                bgcolor: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
            }}
            vocab="https://schema.org/"
            typeof="ItemList"
        >
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div">
                        Admin Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    flexGrow: 1,
                    p: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Grid container spacing={4} justifyContent="center" maxWidth={900}>
                    {cardData.map((card, index) => (
                        <Card
                            key={index}
                            property="itemListElement"
                            typeof="Card"
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: 3,
                                '&:hover': {
                                    boxShadow: 6,
                                },
                                transition: 'box-shadow 0.3s',
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    component="div"
                                    property="title"
                                    sx={{textAlign: 'center', mb: 3}}
                                >
                                    {card.title}
                                </Typography>
                                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Button
                                        variant="contained"
                                        onClick={card.onClick}
                                        sx={{mt: 2}}
                                        property="buttonText"
                                    >
                                        {card.buttonText}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            </Box>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd, null, 2)}}
            />
        </Box>
    );
};

export default MainAdminScreen;
