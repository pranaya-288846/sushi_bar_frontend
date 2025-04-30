import {OrderData} from "../Api/types/OrderData.ts";
import {MenuData} from "../Api/types/MenuData.ts";

function matchOrdersWithMenuItems(
    orderData: OrderData[],
    menuData: MenuData[]
): typeof menuData {

    console.log(orderData)
    // Create a Set of menuItemIds from orderData for efficient lookup
    const orderedItemIds = new Set(orderData.map(order => order.menuItemId));

    // Filter menuData to only include items with matching ids
    const matchedMenuItems = menuData.filter(menuItem =>
        orderedItemIds.has(menuItem.id)
    );

    console.log(matchedMenuItems)

    return matchedMenuItems;
}

export default matchOrdersWithMenuItems;