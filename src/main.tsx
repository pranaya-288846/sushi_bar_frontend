import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {CartProvider} from "./Hooks/cartHook.tsx";
import RegistrationScreen from "./Screens/Customer/RegistrationScreen.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CartProvider>
            <RegistrationScreen/>
        </CartProvider>
    </StrictMode>,
)
