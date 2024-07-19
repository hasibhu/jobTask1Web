

import React from 'react';
import { Link } from 'react-router-dom';

import { GrTransaction } from "react-icons/gr";
import history from '../../assets/payment-history.png'
import balance from '../../assets/balance.png'
import transaction from '../../assets/transaction.png'

const AgentHome = () => {
    return (
        <div>
            <div className="flex flex-col gap-4 pt-16">
                <h1 className='text-center'>Agent Home</h1>
                <div className="flex justify-center items-center gap-8">
                    <div className="w-[100px] bg-blue-400 rounded-2xl p-2">
                        <Link to={'/agentCurrentBalance'}>
                           <img src={balance} alt="" />
                            <h2 className="text-center text-white">Balance</h2></Link>
                    </div>
                    <div className="w-[100px] bg-blue-400 rounded-2xl p-2">
                        
                        <Link to={'/agentTransactionManagement'}>
                          <img src={transaction} alt="" />
                            <h2 className="text-center text-white">Transaction</h2></Link>
                    </div>
                </div>


                <div className="flex w-[100px] mx-auto justify-center items-center bg-blue-400 mt-4 rounded-2xl p-">
                    <Link to={'/agentTransactionHistory'}>
                        <img className='mx-auto' src={history} alt="" />
                        <h1 className="text-center text-white"> History</h1></Link>
                </div>
            </div>
        </div>
    );
};

export default AgentHome;

