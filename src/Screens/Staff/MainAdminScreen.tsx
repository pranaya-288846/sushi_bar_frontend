import React from 'react';
import {AppBar, Box, Button, Card, CardContent, Grid, Toolbar, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";

const containerStyles = {
    minHeight: '100vh',
    width: '100vw',
    bgcolor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
};

const contentWrapperStyles = {
    flexGrow: 1,
    p: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

// const gridStyles = {
//     justifyContent: 'center',
//     maxWidth: 900,
// };

const cardStyles = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: 3,
    transition: 'box-shadow 0.3s',
    '&:hover': {
        boxShadow: 6,
    },
};

const titleStyles = {
    textAlign: 'center',
    mb: 3,
};

const buttonWrapperStyles = {
    display: 'flex',
    justifyContent: 'center',
};

const buttonStyles = {
    mt: 2,
};

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
            "@type": "ListItem",
            "title": card.title,
            "buttonText": card.buttonText,
            "onClick": card.onClick.toString() // Note: functions cannot be serialized, consider removing or replacing
        }))
    };

    return (
        <div
            vocab="https://schema.org/"
        >
            <Box sx={containerStyles}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            Admin Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Box sx={contentWrapperStyles}>
                    <Grid>
                        {cardData.map((card, index) => (
                            <Card
                                key={index}
                                typeof="WebPageElement"

                                sx={cardStyles}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        component="div"
                                        property="name"
                                        sx={titleStyles}
                                    >
                                        {card.title}
                                    </Typography>
                                    <Box sx={buttonWrapperStyles}>
                                        <Button
                                            variant="contained"
                                            onClick={card.onClick}
                                            sx={buttonStyles}
                                            property="potentialAction"
                                            typeof="Action"
                                        >
                                            <span property='name'>{card.buttonText}</span>
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Grid>
                </Box>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
                />
            </Box>
        </div>

    );
};

export default MainAdminScreen;
