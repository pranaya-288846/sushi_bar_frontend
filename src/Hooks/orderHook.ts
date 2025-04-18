import {useState} from "react";
import OrderService from "../Api/services/OrderService.ts";
import {OrderData} from "../Api/types/OrderData.ts";

const useOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async (): Promise<OrderData[]> => {
        setLoading(true);
        setError(null);

        try {
            const data: OrderData[] = await OrderService.getOrderItems();
            return data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch menu';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const postOrder = async (item: OrderData) => {
        setLoading(true)
        setError(null)

        try {
            await OrderService.postMenuItem(item)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to post item';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return {fetchOrders, postOrder, loading, error};
};

export default useOrder;