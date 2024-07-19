

// // import React, { useEffect, useState } from 'react';
// // import { Outlet, useNavigate } from 'react-router-dom';
// // import AdminHome from "./Admin/AdminHome";
// // import AgentHome from "./Agents/AgentHome";
// // import UserHome from "./Users/UserHome";
// // import useAxiosPublic from '../hooks/useAxiosPublic'

// // const Dashboard = () => {
// //     const [userRole, setUserRole] = useState(null);
// //     const navigate = useNavigate();
// //     const axiosPublic = useAxiosPublic();
  
// //     useEffect(() => {
// //         const id = localStorage.getItem('userID');
// //         if (!id) {
// //             navigate('/'); // Redirect to login if user ID is not found
// //             return;
// //         }

// //         const fetchUserRole = async () => {
// //             try {
// //                 const response = await axiosPublic.get(`/api/users/${id}`);
// //                 setUserRole(response.data.role);
// //             } catch (error) {
// //                 console.error('Failed to fetch user role:', error);
// //                 navigate('/'); // Redirect to login on error
// //             }
// //         };

// //         fetchUserRole();
// //     }, [navigate]);


// //     if (!userRole) {
// //         return <div>Loading...</div>;
// //     }

// //     const handleLogOut = () => {
// //         localStorage.removeItem('token'); // Remove JWT token from localStorage
// //         localStorage.removeItem('userID'); // Remove userRole from localStorage
// //         setUserRole(null); // Update state for immediate UI change
// //         navigate('/'); // Redirect to login after logout
// //     };


// //     return (
// //         <div>
// //             <div className="mt-4 lg:w-[490px] mx-auto">
// //                 <div className="bg-blue-500 h-[100px]">
// //                     <h1 className="text-center">Hello, {userRole}</h1>
// //                     <div className="flex float-end">
// //                         <button onClick={handleLogOut} className="bg-red-500 w-[76px] h-6 text-white rounded-xl font-bold">LogOut</button>
// //                     </div>
// //                 </div>

// //                 {userRole === 'admin' && <AdminHome />}
// //                 {userRole === 'agent' && <AgentHome />}
// //                 {userRole === 'user' && <UserHome />}
// //             </div>
// //             <Outlet></Outlet>
// //         </div>
// //     );
// // };

// // export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import AdminHome from "./Admin/AdminHome";
// import AgentHome from "./Agents/AgentHome";
// import UserHome from "./Users/UserHome";
// import useAxiosPublic from '../hooks/useAxiosPublic';

// const Dashboard = () => {
//     const [userRole, setUserRole] = useState(null);
//     const navigate = useNavigate();
//     const axiosPublic = useAxiosPublic();

//     useEffect(() => {
//         const id = localStorage.getItem('userID');
//         if (!id) {
//             navigate('/'); // Redirect to login if user ID is not found
//             return;
//         }

//         const fetchUserRole = async () => {
//             try {
//                 const response = await axiosPublic.get(`/api/users/${id}`);
//                 setUserRole(response.data.role);
//             } catch (error) {
//                 console.error('Failed to fetch user role:', error);
//                 navigate('/'); // Redirect to login on error
//             }
//         };

//         fetchUserRole();
//     }, [navigate, axiosPublic]);

//     if (!userRole) {
//         return <div>Loading...</div>;
//     }

//     // const handleLogOut = () => {
//     //     localStorage.removeItem('token'); // Remove JWT token from localStorage
//     //     localStorage.removeItem('userID'); // Remove userRole from localStorage
//     //     setUserRole(null); // Update state for immediate UI change
//     //     navigate('/'); // Redirect to login after logout
//     // };

//     return (
//         <div>
//             <div className="mt-4 lg:w-[490px] mx-auto">
                

//                 {userRole === 'admin' && <AdminHome />}
//                 {userRole === 'agent' && <AgentHome />}
//                 {userRole === 'user' && <UserHome />}
//             </div>
//             <Outlet /> {/* This will render the nested routes */}
//         </div>
//     );
// };

// export default Dashboard;




// src/Dashboards/Dashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminHome from "../Dashborads/Admin/AdminHome";
import AgentHome from "../Dashborads/Agents/AgentHome";
import UserHome from "../Dashborads/Users/UserHome";
import useAxiosPublic from '../hooks/useAxiosPublic';
import Header from '../components/Header';
import { AuthContext } from '../components/AuthContext';

const Dashboard = () => {
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const {  logout } = useContext(AuthContext);

    useEffect(() => {
        const id = localStorage.getItem('userID');
        if (!id) {
            navigate('/'); // Redirect to login if user ID is not found
            return;
        }

        const fetchUserRole = async () => {
            try {
                const response = await axiosPublic.get(`/api/users/${id}`);
                setUserRole(response.data.role);
            } catch (error) {
                console.error('Failed to fetch user role:', error);
                navigate('/'); // Redirect to login on error
            }
        };

        fetchUserRole();
    }, [navigate, axiosPublic]);

    if (!userRole) {
        return <div className='flex justify-center items-center'>Loading...</div>;
    }
    const handleLogOut = () => {
        logout();
        navigate('/');
    };


    return (
        <div className='bg-gradient-to-b from-fuchsia-900 to-slate-800 w-[576px] mx-auto rounded-xl'>
           
            <div className="lg:w-[490px] mx-auto">
                {userRole === 'admin' && <AdminHome />}
                {userRole === 'agent' && <AgentHome />}
                {userRole === 'user' && <UserHome />}
            </div>
            {/* <Outlet /> This will render the nested routes */}
            <div className="flex justify-center items-center mt-10 pb-10">
                {userRole && (
                    <button onClick={handleLogOut} className="btn btn-secondary w-[76px] h-6 text-white rounded-xl font-bold">LogOut</button>
                )}
            </div>
        </div>
    );
};

export default Dashboard;










