// App.tsx
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginScreen from "./Screens/Staff/LoginScreen.tsx";
import MainAdminScreen from "./Screens/Staff/MainAdminScreen.tsx";
import MenuEditorScreen from "./Screens/Staff/MenuEditor/MenuEditorScreen.tsx";
import OrdersViewScreen from "./Screens/Staff/OrdersViewScreen.tsx";
import TableViewScreen from "./Screens/Staff/TableViewScreen.tsx";
import RegistrationScreen from "./Screens/Customer/RegistrationScreen.tsx";
import MenuScreen from "./Screens/Customer/MenuScreen.tsx";
import SummaryScreen from "./Screens/Customer/SummaryScreen.tsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RegistrationScreen/>}/>
                <Route path="/login" element={<LoginScreen/>}/>
                <Route path="/home-admin" element={<MainAdminScreen/>}/>
                <Route path="/menu-editor-admin" element={<MenuEditorScreen/>}/>
                <Route path="/order-view-admin" element={<OrdersViewScreen/>}/>
                <Route path="/table-view-admin" element={<TableViewScreen/>}/>
                <Route path="/registration" element={<RegistrationScreen/>}/>
                <Route path="/menu" element={<MenuScreen/>}/>
                <Route path="/summary" element={<SummaryScreen/>}/>
            </Routes>
        </Router>
    );
}

export default App;
