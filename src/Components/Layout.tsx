import {AddShoppingCart, Menu as MenuIcon} from "@mui/icons-material";
import {AppBar, Badge, Box, Button, Divider, Drawer, IconButton, List, Toolbar, Typography} from "@mui/material";
import {ReactNode, useState} from "react";
import CartModal from "./CartModal.tsx";
import {useCart} from "../Hooks/cartHook.tsx";

// import {useLocation} from "react-router-dom";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({children}: LayoutProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const {cart} = useCart();
    // const location = useLocation();

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    // const menuItems = [
    //     {text: "Summary", path: "/summary"},
    //     {text: "Menu", path: "/menu"},
    // ];

    return (
        <>
            <AppBar>
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingLeft: 2,
                    paddingRight: 2
                }}>
                    <Box display="flex" alignItems="center">
                        <IconButton
                            color="inherit"
                            aria-label="open menu"
                            onClick={toggleDrawer}
                            edge="start"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div">
                            Hello Prune!
                        </Typography>
                    </Box>
                    <IconButton
                        color="inherit"
                        aria-label="shopping cart"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Badge badgeContent={cart.length} color="error">
                            <AddShoppingCart/>
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer}
            >
                <Box
                    sx={{width: 250}}
                    role="presentation"
                    onClick={toggleDrawer}
                    onKeyDown={toggleDrawer}
                >
                    <Toolbar/>
                    <Divider/>
                    <List>
                        {/*{menuItems.map((item) => (*/}
                        {/*    <ListItem key={item.text} disablePadding>*/}
                        {/*        <ListItemButton*/}
                        {/*            selected={location.pathname === item.path}*/}
                        {/*            onClick={() => {*/}
                        {/*                // In a real app, you would navigate here*/}
                        {/*                // navigate(item.path);*/}
                        {/*            }}*/}
                        {/*        >*/}
                        {/*            <ListItemText primary={item.text}/>*/}
                        {/*        </ListItemButton>*/}
                        {/*    </ListItem>*/}
                        {/*))}*/}
                    </List>
                </Box>
            </Drawer>

            <Box component="main" sx={{p: 3}}>
                <Toolbar/> {/* This adds padding below the AppBar */}
                {children}
            </Box>

            <CartModal isOpen={isModalOpen} onClose={closeModal}>
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <Box key={item.id} sx={{mb: 2}}>
                            <Typography variant="body1">{item.name}</Typography>
                            <Typography variant="body2">${item.price.toFixed(2)}</Typography>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body1">Your cart is empty</Typography>
                )}
                <Button
                    onClick={() => {
                    }}
                >
                    <Typography>Order items</Typography>
                </Button>
            </CartModal>
        </>
    );
};

export default Layout;