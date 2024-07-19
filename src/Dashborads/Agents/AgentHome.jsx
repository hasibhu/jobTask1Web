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

const AgentHome = () => {
    return (
        <div>
            <div className="flex flex-col gap-4 mt-4">
                <h1 className='text-center'>Agent Home</h1>
                <div className="flex justify-center items-center gap-4">
                    <div className="w-[200px] bg-slate-700">
                        <Link to={'/agentCurrentBalance'}><h2 className="text-center text-white">Current Balance</h2></Link>
                    </div>
                    <div className="w-[200px] bg-blue-400">
                        <Link to={'/agentTransactionManagement'}><h2 className="text-center text-white">Transaction Management</h2></Link>
                    </div>
                </div>
                <div className="flex w-[200px] mx-auto justify-center items-center bg-slate-700 mt-4">
                    <Link to={'/agentTransactionHistory'}><h1 className="text-center text-white">Transaction History</h1></Link>
                </div>
            </div>
        </div>
    );
};

export default AgentHome;
