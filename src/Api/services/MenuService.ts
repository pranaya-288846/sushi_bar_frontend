import {MenuData} from "../types/MenuData.ts";
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

    async getMenuItemById(id: number): Promise<MenuData> {
        try {
            const response = await apiClient.get<MenuData>(`/menu/${id}`);
            return response.data;
        } catch (e) {
            console.error('Failed to fetch the menu item by id:', e);
            throw e;
        }
    },

    async postMenuItem(item: Omit<MenuData, 'id'>) {
        try {
            await apiClient.post<Omit<MenuData, 'id'>>('/menu', item);
            return null;
        } catch (e) {
            console.error('Failed to post menu item:', e);
            throw e; // Re-throw to let the caller handle it
        }
    },

    async updateMenuItem(item: MenuData) {
        try {
            await apiClient.put<MenuData>(`/menu/${item.id}`, item);
            return null;
        } catch (e) {
            console.error('Failed to update menu item:', e);
            throw e;
        }
    },

    async deleteMenuItem(id: number) {
        try {
            await apiClient.delete(`/menu/${id}`);
            return null;
        } catch (e) {
            console.error('Failed to delete menu item:', e);
            throw e;
        }
    }
};

export default MenuService;