// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem('userID');
        if (id) {
            setUserId(id);
        }
    }, []);

    const login = (role) => {
        setUserId(role);
        localStorage.setItem('userRole', role);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        localStorage.removeItem('userRole');
        setUserId(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <AuthContext.Provider value={{ userId, login, logout, formatDate }}>
            {children}
        </AuthContext.Provider>
    );
};
