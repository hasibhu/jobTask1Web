import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        if (role) {
            setUserRole(role);
        }
    }, []);

    const login = (role) => {
        setUserRole(role);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        localStorage.removeItem('userRole');
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
