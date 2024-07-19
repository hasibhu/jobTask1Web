
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "./ErrorPage";
import Register from '../components/Register';
import Login from "./Login";
import Dashboard from "../Dashborads/Dashboard";
import UserManagement from "../Dashborads/Admin/UserManagement";
import SystemMonitor from "../Dashborads/Admin/SystemMonitor";
import UserHistory from "../Dashborads/Users/UserHistory";
import Cashin from "../Dashborads/Users/Cashin";
import SendMoney from "../Dashborads/Users/SendMoney";
import CashOut from "../Dashborads/Users/CashOut";
import CurrentBalance from "../Dashborads/Users/CurrentBalance";
import AgentTransactionManagement from '../Dashborads/Agents/AgentTransactionManagement';
import AgentTransactionHistory from "../Dashborads/Agents/AgentTransactionHistory";
import AgentCurrentBalance from "../Dashborads/Agents/AgentCurrentBalance";
import Layout from "../Layout/Layout";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: 'userManagement',
                element: <UserManagement />
            },
            {
                path: 'systemMonitor',
                element: <SystemMonitor />
            },
            {
                path: 'currentBalance',
                element: <CurrentBalance />
            },
            {
                path: 'cashOut',
                element: <CashOut />
            },
            {
                path: 'sendMoney',
                element: <SendMoney />
            },
            {
                path: 'cashIn',
                element: <Cashin />
            },
            {
                path: 'userHistory',
                element: <UserHistory />
            },
            {
                path: 'agentCurrentBalance',
                element: <AgentCurrentBalance />
            },
            {
                path: 'agentTransactionManagement',
                element: <AgentTransactionManagement />
            },
            {
                path: 'agentTransactionHistory',
                element: <AgentTransactionHistory />
            }
        ]
    },
    
]);

export default Router;
