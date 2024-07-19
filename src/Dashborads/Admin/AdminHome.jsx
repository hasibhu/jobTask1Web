// import React from 'react';
// import { Link} from 'react-router-dom';
// const AdminHome = () => {
//     return (
//         <div>
//             <div className="flex flex-col gap-4 mt-4">
//                 <h1 className='text-center'>Admin Home</h1>
//                 <div className="flex  justify-center items-center gap-4">
//                     <div className="w-[200px] bg-slate-700">
                       
//                         <Link to='userManagement'> <h2 className="text-center">User Management</h2></Link>
//                     </div>
//                     <div className="w-[200px] bg-slate-700">
                       
//                         <Link to='systemMonitor'> <h2 className="text-center">System Monitoring</h2></Link>
//                     </div>
                    
//                 </div>

                
//                 {/* todo: cash in request  */}

//             </div>
            
//         </div>
//     );
// };

// export default AdminHome;

import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    return (
        <div>
            <div className="flex flex-col gap-4 mt-4">
                <h1 className='text-center'>Admin Home</h1>
                <div className="flex justify-center items-center gap-4">
                    <div className="w-[200px] bg-slate-700">
                        <Link to={'/userManagement'}>
                            <h2 className="text-center">User Management</h2>
                        </Link>
                    </div>
                    <div className="w-[200px] bg-slate-700">
                        <Link to={'/systemMonitor'}>
                            <h2 className="text-center">System Monitoring</h2>
                        </Link>
                    </div>
                </div>
                {/* todo: cash in request  */}
            </div>
        </div>
    );
};

export default AdminHome;
