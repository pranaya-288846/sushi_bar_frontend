import {useState} from "react";
import OrderService from "../Api/services/OrderService.ts";
import {OrderData} from "../Api/types/OrderData.ts";
import {MenuData} from "../Api/types/MenuData.ts";

const useOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async (tableId: number = 0): Promise<OrderData[]> => {
        setLoading(true);
        setError(null);

        try {
            return await OrderService.getOrderItems(tableId);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch menu';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const postOrder = async (item: MenuData, tableId: number) => {
        setLoading(true)
        setError(null)

        try {
            await OrderService.postMenuItem({
                menuItemId: item.id,
                tableId: tableId,
                status: "PROCESSING",
            })
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