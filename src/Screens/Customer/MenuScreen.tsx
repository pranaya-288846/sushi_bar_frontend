import {useEffect, useState} from 'react';
import {AppBar, Button, Card, CardActions, CardContent, Grid, IconButton, Toolbar, Typography} from '@mui/material';
import useMenu from '../../Hooks/menuHook.ts';
import {MenuData} from '../../Api/types/MenuData.ts';
import useOrder from "../../Hooks/orderHook.ts";
import UserProfileSingleton from "../../Tools/UserProfileSingleton.ts";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useNavigate} from "react-router-dom";

const MenuScreen = () => {
    const {fetchMenu, loading, error} = useMenu();
    const [menuData, setMenuData] = useState<MenuData[]>([]);
    const {postOrder} = useOrder();
    const profileManager = UserProfileSingleton.getInstance();
    const navigate = useNavigate();

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

    const handleCartClick = () => {
        navigate('/summary');
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Menu",
        "name": "Restaurant Menu",
        "hasMenuItem": menuData.map(item => ({
            "@type": "MenuItem",
            "name": item.name,
            "description": item.description,
            "offers": {
                "@type": "Offer",
                "price": item.price,
                "priceCurrency": "USD",
                "availability": item.availability !== 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock"
            }
        }))
    };


    if (menuData.length === 0 && !loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl font-semibold">No menu items.</div>
            </div>
        );
    }

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
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Our Menu
                    </Typography>
                    <IconButton color="inherit" onClick={handleCartClick}>
                        <ShoppingCartIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <div vocab="https://schema.org/" typeof="Menu">
                <meta property="name" content="Restaurant Menu"/>
                <Grid container spacing={4}>
                    {menuData.map((item) => (
                        <span property="hasMenuItem" typeof="MenuItem" key={item.id}>
                          <Card>
                            <CardContent>
                              <h3 property="name" className="font-bold text-lg mb-1">{item.name}</h3>
                              <span property="offers" typeof="Offer">
                                <meta property="price" content={item.price.toString()}/>
                                <meta property="priceCurrency" content="USD"/>
                                <meta property="availability"
                                      content={item.availability !== 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"}/>
                                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                <div className="mt-2">
                                  <span
                                      className={`px-2 py-1 text-xs rounded-full ${
                                          item.availability !== 0
                                              ? 'bg-green-100 text-green-800'
                                              : 'bg-red-100 text-red-800'
                                      }`}
                                  >
                                    {item.availability === 0 ? 'Out of Stock' : 'Available'}
                                  </span>
                                </div>
                              </span>
                              <p property="description" className="text-sm text-gray-500 mt-2 line-clamp-2 flex-grow">
                                {item.description}
                              </p>
                            </CardContent>
                            <CardActions>
                              <Button
                                  onClick={() => {
                                      postOrder(item, profileManager.getProfile()?.id ?? 0);
                                  }}
                              >
                                Add to cart
                              </Button>
                            </CardActions>
                          </Card>
                        </span>
                    ))}
                </Grid>
                {/* JSON-LD script */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
                />
            </div>
        </>
    );
};

export default MenuScreen;