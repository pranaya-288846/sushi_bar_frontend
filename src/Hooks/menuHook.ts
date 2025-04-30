// src/hooks/useMenu.ts
import {useState} from "react";
import MenuService from "../Api/services/MenuService.ts";
import {MenuData} from "../Api/types/MenuData.ts"; // Import your MenuItem type

const useMenu = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMenu = async (): Promise<MenuData[]> => {
        setLoading(true);
        setError(null);

        try {
            const data: MenuData[] = await MenuService.getMenuItems();
            return data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch menu';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const postMenuItem = async (item: Omit<MenuData, 'id'>) => {
        setLoading(true);
        setError(null);

        try {
            await MenuService.postMenuItem(item);
            return null;
        } catch (e) {
            console.error("Failed to add new menu item", e)
            throw e;
        } finally {
            setLoading(false);
        }
    }

    const updateMenuItem = async (item: MenuData) => {
        try {
            await MenuService.updateMenuItem(item);
            return null;
        } catch (e) {
            console.error("Failed to update menu item", e)
            throw e;
        }
    }

    const deleteMenuItem = async (id: number) => {
        try {
            await MenuService.deleteMenuItem(id);
            return null;
        } catch (e) {
            console.error("Failed to delete menu item", e)
        }
    }

    const fetchMenuItemById = async (id: number): Promise<MenuData> => {
        try {
            return await MenuService.getMenuItemById(id);
        } catch (e) {
            console.error("Failed to fetch menu item by id", e)
            throw e;
        }
    }

    return {fetchMenu, postMenuItem, updateMenuItem, deleteMenuItem, fetchMenuItemById, loading, error};
};

export default useMenu;