import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

import ReturnButton from '../../components/ReturnButton'
const AgentTransactionHistory = () => {
    const [agentHistory, setAgentHistory] = useState(null)
    const { userId, formatDate } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();




    useEffect(() => {
        
        if (!userId) {
            // navigate('/dashboard'); // Redirect to login if user ID is not found
            return;
        }

        const fetchUserRole = async () => {
            try {
                const response = await axiosPublic.get(`/api/agentHistory/${userId}`);
                console.log(response);
                setAgentHistory(response?.data?.transactions);
            } catch (error) {
                console.error('Failed to fetch agent transaction history:', error);
                // navigate('/dashboard'); // Redirect to dashboard on error
            }
        };

        fetchUserRole();
    }, [userId]);


    return (
        <div className='bg-gradient-to-b from-fuchsia-900 to-slate-800 lg:w-[576px] mx-auto rounded-xl text-white pb-10'>
            <div className='flex flex-initial'>
                <ReturnButton ></ReturnButton>
            </div>
            <h1 className='text-center text-2xl font-serif mb-4'>AgentTransaction History</h1>
            <div className="overflow-x-auto">
                <table className="table  w-full">
                    <thead className=' w-full'>
                        <tr className='text-center  font-bold text-white'>
                            <th className="px-2 py-1">Person</th>
                            <th className="px-2 py-1">Amount</th>
                            <th className="px-2 py-1">Date</th>
                            <th className="px-2 py-1">Type</th>
                            <th className="px-2 py-1">Direction</th>
                        </tr>
                    </thead>
                    <tbody className=' w-full' >
                        {agentHistory?.map((transaction) => (
                            <tr key={transaction._id} className='text-center '>
                                <td className="px-1 py-1">{transaction?.senderName}</td>
                                <td className="px-1 py-1">{transaction?.amount}</td>
                                <td className="px-1 py-1">{formatDate(transaction?.date)}</td>
                                <td className="px-1 py-1">{transaction?.type}</td>
                                <td className="px-1 py-1 flex justify-center gap-2">
                                    {transaction?.direction}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgentTransactionHistory;