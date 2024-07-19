import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic'
import ReturnButton from '../../components/ReturnButton';

const AgentCurrentBalance = () => {
    const [agentCurrentBalance, setAgentCurrentBalance] =  useState(null);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const id = localStorage.getItem('userID');
        if (!id) {
            navigate('/'); // Redirect to login if user ID is not found
            return;
        }

        const fetchUserRole = async () => {
            try {
                const response = await axiosPublic.get(`/api/agentBalance/${id}`);
                console.log(response);
                setAgentCurrentBalance(response.data.balance);
            } catch (error) {
                console.error('Failed to fetch user role:', error);
                navigate('/'); // Redirect to login on error
            }
        };

        fetchUserRole();
    }, [navigate]);
    return (
        <div>
            <h1 className='text-center'>   Current balance is {agentCurrentBalance} </h1>
            <ReturnButton></ReturnButton>
        </div>
    );
};

export default AgentCurrentBalance;