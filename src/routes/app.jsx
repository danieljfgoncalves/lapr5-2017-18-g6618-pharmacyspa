import Pages from 'containers/Pages/Pages.jsx';
import Dash from 'containers/Dash/Dash.jsx';

var appRoutes = [
    { path: "/pages/login-page", name: "Home", component: Pages },
    { path: "/", name: "Dash", component: Dash }
];

export default appRoutes;
