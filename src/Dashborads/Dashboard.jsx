import React from 'react';
import AdminMenu from './Admin/AdmiMenu';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='flex '>
           
            <div>
               
                <AdminMenu></AdminMenu>
            </div>
            

            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;