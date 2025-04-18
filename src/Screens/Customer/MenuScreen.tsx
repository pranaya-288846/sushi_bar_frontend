import {useEffect, useState} from 'react';
import useMenu from '../../Hooks/menuHook.ts';
import {MenuData} from '../../Api/types/MenuData.ts';
import {Button, Card, CardActions, CardContent, Grid} from "@mui/material";
import {useCart} from "../../Hooks/cartHook.tsx";

const MenuScreen = () => {
    const {fetchMenu, loading, error} = useMenu();
    const [menuData, setMenuData] = useState<MenuData[]>([]);
    const {addToCart} = useCart()

    useEffect(() => {
        const loadMenu = async () => {
            try {
                const items: MenuData[] = await fetchMenu();
                setMenuData(Array.isArray(items) ? items : []);
            } catch (error) {
                console.error('Failed to load menu:', error);
                setMenuData([]);
            }
        };
        loadMenu();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl font-semibold">Loading menu...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500 text-xl font-semibold">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Our Menu</h1>

            <Grid container spacing={4}>
                {menuData.map((item) => (
                    <Card key={item.id}>
                        <CardContent>
                            <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                            <p className="text-gray-600">${item.price.toFixed(2)}</p>
                            <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-grow">
                                {item.description}
                            </p>
                            <div className="mt-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                                item.availability !== 0
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            }`}>
                            {item.availability === 0 ? 'Out of Stock' : 'Available'}
                            </span>
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button key={item.id} onClick={() => {
                                addToCart(item)
                            }}>Add to cart</Button>
                        </CardActions>
                    </Card>
                ))}
            </Grid>
        </div>
    );
};

export default MenuScreen;