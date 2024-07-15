import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "./ErrorPage";
import Register from '../components/Register'
import Login from "./Login";
import Dashboard from "../Dashborads/Dashboard";
import AdminHome from '../Dashborads/Admin/AdminHome'
import UserManagement from "../Dashborads/Admin/UserManagement";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Login></Login>

            },
            {
                path: '/register',
                element: <Register></Register>

            },
        ]
        
    },
     {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'adminHome',
                element: <AdminHome></AdminHome>
            },
            {
                path: 'userManagement',
                element: <UserManagement></UserManagement>
            }



        ]
    }
])

export default Router;