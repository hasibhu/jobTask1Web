// import React from 'react';
// import { Link } from 'react-router-dom';

// const AgentHome = () => {
//     return (
//         <div>
//             <div className="flex flex-col gap-4 mt-4">
//                 <h1 className='text-center'>Agent Home</h1>
//                 <div className="flex  justify-center items-center gap-4">
//                     <div className="w-[200px] bg-slate-700">
//                         <Link to='/dashboard/agentCurrentBalance'><h2 className="text-center">Current Balance</h2></Link>
                        
//                     </div>
//                     <div className="w-[200px] bg-blue-400">
//                         <Link to='agentTransactionManagement'><h2 className="text-center"> Transaction management</h2></Link>
//                     </div>
//                 </div>
//                 <div>
                  
//                     <div className="flex w-[200px] mx-auto justify-center items-center bg-slate-700 mt-4">
//                         <Link to='agentTransactionHistory'>   <h1> Transaction  History</h1></Link>

//                     </div>
//                 </div>

                

//             </div>
            
//         </div>
//     );
// };

// export default AgentHome;

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
                            {/* <RiMoneyEuroCircleLine className='text-4xl text-yellow-400 mx-auto' /> */}
                            <img src={balance} alt="" />
                            <h2 className="text-center text-white">Balance</h2></Link>
                    </div>
                    <div className="w-[100px] bg-blue-400 rounded-2xl p-2">
                        
                        <Link to={'/agentTransactionManagement'}>
                            {/* <GrTransaction className='text-4xl mx-auto' /> */}
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
import { RiMoneyEuroCircleLine } from "react-icons/ri";
