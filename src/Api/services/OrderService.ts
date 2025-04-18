import apiClient from "../Client.ts";
import {OrderData} from "../types/OrderData.ts";

const OrderService = {
    async getOrderItems(): Promise<OrderData[]> {
        try {
            const response = await apiClient.get<OrderData[]>('/menu');

            console.log('API Response:', response);

            return response.data;
        } catch (e) {
            console.error('Failed to fetch menu items:', e);
            return [];
        }
    },

    async postMenuItem(item: Omit<OrderData, 'orderId'>) {
        try {
            const response = await apiClient.post<OrderData>('/orders', item);

            // Validate the response structure
            if (!response || typeof response.data.orderId !== 'number') {
                throw new Error('Invalid response structure');
            }

            return null;
        } catch (e) {
            console.error('Failed to post menu item:', e);
            throw e; // Re-throw to let the caller handle it
        }
    }
};

export default OrderService;