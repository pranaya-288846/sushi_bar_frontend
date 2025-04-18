// src/pages/DataDisplayScreen.tsx
import { useState, useEffect } from 'react';
import { MenuData } from "../Api/types/MenuData.ts";
import MenuService from "../Api/services/MenuService.ts";

export default function DataDisplayScreen() {
    const [data, setData] = useState<MenuData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [postStatus, setPostStatus] = useState<string | null>(null);

    // Sample data for the POST request
    const sampleMenuItem: MenuData = {
        id: 25,
        name: "Brozza",
        description: "Delicious food",
        availability: 2,
        price: 25,
        imageUrl: "test-url.jpg"
    };

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await MenuService.getMenuItems();
                setData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Function to handle POST request
    const handlePost = async () => {
        setPostStatus('Sending...');
        try {
            await MenuService.postMenuItem(sampleMenuItem);
            setPostStatus('Item added successfully!');

            // Refresh the data after successful POST
            const updatedData = await MenuService.getMenuItems();
            setData(updatedData);

            // Clear status after 3 seconds
            setTimeout(() => setPostStatus(null), 3000);
        } catch (err) {
            setPostStatus(`Error: ${err instanceof Error ? err.message : 'Failed to add item'}`);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl font-semibold">Loading data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500 text-xl font-semibold">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">API Data Display</h1>
                <button
                    onClick={handlePost}
                    disabled={postStatus === 'Sending...'}
                    className={`px-4 py-2 rounded-md text-white ${postStatus === 'Sending...'
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {postStatus === 'Sending...' ? 'Adding Item...' : 'Add Sample Item'}
                </button>
            </div>

            {postStatus && (
                <div className={`mb-4 p-3 rounded-md ${postStatus.includes('Error')
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'}`}>
                    {postStatus}
                </div>
            )}

            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${item.price.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                        <p className="text-gray-600 mb-1">${item.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}