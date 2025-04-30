import {TableData} from "../types/TableData.ts";
import apiClient from "../Client.ts";

const TableService = {

    async registerTable(item: Omit<TableData, 'id'>) {
        try {
            await apiClient.post<TableData>('/tables', item)
            return null;
        } catch (e) {
            console.error("Error when posting new table", e)
            throw e;
        }
    },

    async deleteTable(id: number) {
        try {
            await apiClient.delete(`/tables/${id}`)
            return null;
        } catch (e) {
            console.error("Failed to delete table", e)
            throw e;
        }
    },

    async viewTables(): Promise<TableData[]> {
        try {
            const tableList = await apiClient.get<TableData[]>("/tables");
            return tableList.data;
        } catch (e) {
            console.error("Failed to get a list of all tables", e)
            throw e;
        }
    },

    async viewTableById(id: number): Promise<TableData> {
        try {
            const tableData = await apiClient.get<TableData>(`/tables/${id}`)
            return tableData.data;
        } catch (e) {
            console.error("Failed to get table data", e)
            throw e;
        }
    }
}

export default TableService;