// src/hooks/useTable.ts
import {useState} from 'react';
import {TableData} from '../Api/types/TableData.ts';
import TableService from '../Api/services/TableService';

const useTable = () => {
    const [tables, setTables] = useState<TableData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTables = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await TableService.viewTables();
            setTables(data);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch tables');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const registerTable = async (item: Omit<TableData, 'id'>) => {
        setLoading(true);
        setError(null);
        try {
            await TableService.registerTable(item);
            console.log("PRUNE UPDATED TABLE")
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to register table');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteTable = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await TableService.deleteTable(id);
            // Update local state without refetching
            setTables(prev => prev.filter(table => table.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete table');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getTableById = async (id: number): Promise<TableData> => {
        setLoading(true);
        setError(null);
        try {
            return await TableService.viewTableById(id);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch table');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        tables,
        loading,
        error,
        fetchTables,
        registerTable,
        deleteTable,
        getTableById,
    };
};

export default useTable;