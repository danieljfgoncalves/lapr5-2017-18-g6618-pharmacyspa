import Dashboard from 'views/Dashboard/Dashboard.jsx';
import Buttons from 'views/Components/Buttons.jsx';
import GridSystem from 'views/Components/GridSystem.jsx';
import Panels from 'views/Components/Panels.jsx';
import SweetAlert from 'views/Components/SweetAlertPage.jsx';
import Notifications from 'views/Components/Notifications.jsx';
import Icons from 'views/Components/Icons.jsx';
import Typography from 'views/Components/Typography.jsx';
import RegularForms from 'views/Forms/RegularForms.jsx';
import ExtendedForms from 'views/Forms/ExtendedForms.jsx';
import ValidationForms from 'views/Forms/ValidationForms.jsx';
import Wizard from 'views/Forms/Wizard/Wizard.jsx';
import RegularTables from 'views/Tables/RegularTables.jsx';
import ExtendedTables from 'views/Tables/ExtendedTables.jsx';
import DataTables from 'views/Tables/DataTables.jsx';
import GoogleMaps from 'views/Maps/GoogleMaps.jsx';
import FullScreenMap from 'views/Maps/FullScreenMap.jsx';
import VectorMap from 'views/Maps/VectorMap.jsx';
import Charts from 'views/Charts/Charts.jsx';
import Calendar from 'views/Calendar/Calendar.jsx';
import UserPage from 'views/Pages/UserPage.jsx';
import Insert from 'views/Stocks/Insert.jsx';
import NewSale from 'views/Sales/NewSale.jsx';
import Check from 'views/Stocks/Check.jsx';
import ConsultStocks from 'views/Stocks/Consult';
import ConsultSales from 'views/Sales/Consult';
import ConsultOrders from 'views/Orders/Consult';

import pagesRoutes from './pages.jsx';


var pages = [{ path: "/pages/user-page", name: "User Page", mini: "UP", component: UserPage }].concat(pagesRoutes);

var dashRoutes = [
    { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    {
        collapse: true, path: "/stocks", name: "Stocks", state: "openStocks", icon: "pe-7s-plugin", views: [
            { path: "/stocks/insert", name: "Insert Stocks", mini: "I", component: Insert },
            { path: "/stocks/check", name: "Check Stocks", mini: "C", component: Check },
            { path: "/stocks/consult", name: "Consult Logs", mini: "CL", component: ConsultStocks }]
    },
    {
        collapse: true, path: "/sales", name: "Sales", state: "openSales", icon: "pe-7s-gift", views:
            [{ path: "/sales/new", name: "New Sale", mini: "NS", component: NewSale },
            { path: "/sales/consult", name: "Consult Logs", mini: "CL", component: ConsultSales }]
    },
    {
        collapse: true, path: "/orders", name: "Orders", state: "openOrders", icon: "pe-7s-plugin", views: [
            { path: "/orders/consult", name: "Consult logs", mini: "CL", component: ConsultOrders }]
    },
    {
        collapse: true, path: "/pages", name: "Pages", state: "openPages", icon: "pe-7s-gift", views:
            pagesRoutes
    },
    { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
