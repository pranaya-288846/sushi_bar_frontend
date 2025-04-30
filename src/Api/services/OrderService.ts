import apiClient from "../Client.ts";
import {OrderData} from "../types/OrderData.ts";

const OrderService = {
    async getOrderItems(tableId: number): Promise<OrderData[]> {
        try {
            const response = await apiClient.get<OrderData[]>(`/orders?tableId=${tableId}`);

            console.log('API Response:', response);

            return response.data;
        } catch (e) {
            console.error('Failed to fetch menu items:', e);
            return [];
        }
    },

    async postMenuItem(item: Omit<OrderData, 'id'>) {
        try {
            const response = await apiClient.post<OrderData>('/orders', item);

            console.log('API Response:', response);

            return null;
        } catch (e) {
            console.error('Failed to post menu item:', e);
            throw e;
        }
    }
};

export default OrderService;