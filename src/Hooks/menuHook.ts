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
    };

    return {fetchMenu, loading, error};
};

export default useMenu;