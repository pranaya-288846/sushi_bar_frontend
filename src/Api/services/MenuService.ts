import { MenuData } from "../types/MenuData.ts";
import apiClient from "../Client.ts";

const MenuService = {
    async getMenuItems(): Promise<MenuData[]> {
        try {
            const response = await apiClient.get<MenuData[]>('/menu');

            console.log('API Response:', response);

            return response.data;
        } catch (e) {
            console.error('Failed to fetch menu items:', e);
            return [];
        }
    },

    async postMenuItem(item: Omit<MenuData, 'id'>) {
        try {
            const response = await apiClient.post<MenuData>('/menu', item);

            // Validate the response structure
            if (!response || typeof response.data.id !== 'number') {
                throw new Error('Invalid response structure');
            }

            return null;
        } catch (e) {
            console.error('Failed to post menu item:', e);
            throw e; // Re-throw to let the caller handle it
        }
    }
};

export default MenuService;