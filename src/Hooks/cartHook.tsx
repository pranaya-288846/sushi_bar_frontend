import {createContext, ReactNode, useContext, useState} from 'react';
import {MenuData} from '../Api/types/MenuData.ts';

interface CartContextType {
    cart: MenuData[];
    addToCart: (item: MenuData) => void;
    removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: { children: ReactNode }) => {
    const [cart, setCart] = useState<MenuData[]>([]);

    const addToCart = (item: MenuData) => {
        setCart(prev => [...prev, item]);
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};