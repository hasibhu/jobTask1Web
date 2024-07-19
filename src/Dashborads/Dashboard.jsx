
import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminHome from "../Dashborads/Admin/AdminHome";
import AgentHome from "../Dashborads/Agents/AgentHome";
import UserHome from "../Dashborads/Users/UserHome";
import useAxiosPublic from '../hooks/useAxiosPublic';
import Header from '../components/Header';
import { AuthContext } from '../components/AuthContext';

const Dashboard = () => {
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const {  logout } = useContext(AuthContext);

    useEffect(() => {
        const id = localStorage.getItem('userID');
        if (!id) {
            navigate('/'); // Redirect to login if user ID is not found
            return;
        }

        const fetchUserRole = async () => {
            try {
                const response = await axiosPublic.get(`/api/users/${id}`);
                setUserRole(response.data.role);
            } catch (error) {
                console.error('Failed to fetch user role:', error);
                navigate('/'); // Redirect to login on error
            }
        };

        fetchUserRole();
    }, [navigate, axiosPublic]);

    if (!userRole) {
        return <div className='flex justify-center items-center text-4xl text-green-600 mt-32'>Loading...</div>;
    }
    const handleLogOut = () => {
        logout();
        navigate('/');
    };


    return (
        <div className='bg-gradient-to-b from-fuchsia-900 to-slate-800 lg:w-[576px] mx-auto rounded-xl'>
           
            <div className="lg:w-[490px] mx-auto">
                {userRole === 'admin' && <AdminHome />}
                {userRole === 'agent' && <AgentHome />}
                {userRole === 'user' && <UserHome />}
            </div>
            {/* <Outlet /> This will render the nested routes */}
            <div className="flex justify-center items-center mt-10 pb-10">
                {userRole && (
                    <button onClick={handleLogOut} className="btn btn-secondary w-[76px] h-6 text-white rounded-xl font-bold">LogOut</button>
                )}
            </div>
        </div>
    );
};

export default Dashboard;










