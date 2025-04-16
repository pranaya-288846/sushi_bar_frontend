import {API_CONFIG} from "../config.ts";
import {MenuData} from "../models/MenuData.ts";

export async function get(): Promise<MenuData[]> {
    const response = await fetch(`${API_CONFIG.BASE_URL}/menu`);

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
}

// export async function post<T>(endpoint: string, data: any): Promise<T> {
//     const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });
//
//     if (!response.ok) {
//         throw new Error(`API request failed: ${response.status}`);
//     }
//
//     return response.json();
// }

// Only include the methods you actually need
export default {
    get,
    // post,
    // put, delete, etc. can be added similarly if needed
};