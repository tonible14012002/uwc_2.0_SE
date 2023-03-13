import NoHeaderLayout from "./layouts/NoHeaderLayout/index.js";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Employee from "./views/Employee"
import RouteMap from "./views/RouteMap/index.js";

const privateRoutes = [
    {
        path: '',
        component: Dashboard,
    },
    {
        path: 'login',
        component: Login,
        layout: NoHeaderLayout
    },
    {
        path: 'employee',
        component: Employee 
    },
    {
        path: 'route-map',
        component: RouteMap
    }
    
];

export { privateRoutes };