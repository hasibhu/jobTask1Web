import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

import { AuthProvider } from '../components/AuthContext';

const Layout = () => {
    return (
        <div>
            <AuthProvider>
                <Header></Header>
            
                <Outlet></Outlet>
            </AuthProvider>
        </div>
    );
};

export default Layout;