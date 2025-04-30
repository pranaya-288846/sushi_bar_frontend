import {useEffect, useState} from 'react';
import useMenu from '../../../Hooks/menuHook.ts';
import {MenuData} from '../../../Api/types/MenuData.ts';
import {Button, Card, CardActions, CardContent, Fab, Grid} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {styled} from '@mui/material/styles';
import ItemEditorModal from "./ItemEditorModal.tsx";

const StyledFab = styled(Fab)({
    position: 'fixed',
    bottom: 32,
    right: 32,
});

const MenuEditorScreen = () => {
    const {fetchMenu, postMenuItem, updateMenuItem, deleteMenuItem, loading, error} = useMenu();
    const [menuData, setMenuData] = useState<MenuData[]>([]);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MenuData>({
        imageUrl: "",
        name: '',
        description: '',
        price: 0,
        availability: 0,
        id: 0,
    });

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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEditClick = async (selectedItem: MenuData) => {
        setSelectedItem(selectedItem);
        setIsEditing(true);
        setOpen(true);
    }

    const handleDeleteClick = async (id: number) => {
        try {
            await deleteMenuItem(id);
            const newMenu = await fetchMenu();
            setMenuData(newMenu);
        } catch (error) {
            console.error('Failed to delete menu item:', error);
        }
    }

    const handleSubmit = async (item: MenuData) => {
        try {
            if (isEditing) {
                await updateMenuItem(item);
            } else {
                await postMenuItem(item);
            }
            const newMenu = await fetchMenu();
            setMenuData(newMenu);
            handleClose();
            setSelectedItem({
                imageUrl: "",
                name: '',
                description: '',
                price: 0,
                availability: 0,
                id: 0,
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update menu item:', error);
        }
    };

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
            <h1 className="text-3xl font-bold mb-8">Menu Editor</h1>

            <Grid container spacing={4}>
                {menuData.map((item) => (
                    <Card>
                        <CardContent key={item.id}>
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
                                        {item.availability === 0 ? 'Out of Stock' : `Available (${item.availability})`}
                                    </span>
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => handleEditClick(item)}>Edit</Button>
                            <Button size="small" color="error"
                                    onClick={() => handleDeleteClick(item.id)}>Delete</Button>
                        </CardActions>
                    </Card>
                ))}
            </Grid>

            <StyledFab color="primary" aria-label="add" onClick={handleOpen}>
                <AddIcon/>
            </StyledFab>

            <ItemEditorModal
                open={open}
                onClose={function (): void {
                    setOpen(false);
                    setIsEditing(false);
                    setSelectedItem({
                        imageUrl: "",
                        name: '',
                        description: '',
                        price: 0,
                        availability: 0,
                        id: 0,
                    });
                }}
                menuData={selectedItem}
                onUpdate={(updatedItem: MenuData) => handleSubmit(updatedItem)}
            />
        </div>
    );
};

export default MenuEditorScreen;