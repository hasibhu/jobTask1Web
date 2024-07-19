// import React, { useEffect, useState } from 'react';
// import {  useNavigate } from 'react-router-dom';

// const Header = () => {
//     const [userRole, setUserRole] = useState();
//     const navigate = useNavigate();


//     useEffect(() => {
//         const role = localStorage.getItem('userRole');
//         if (role) {
//             setUserRole(role);
//         }
//     }, [userRole]);
//     const handleLogOut = () => {
//         localStorage.removeItem('token'); // Remove JWT token from localStorage
//         localStorage.removeItem('userID'); // Remove userRole from localStorage
//         setUserRole(null); // Update state for immediate UI change
//         navigate('/'); // Redirect to login after logout
//     };
//     return (
//         <div className="bg-blue-500 h-[100px]">
//             <h1 className="text-center">Hello {userRole ? userRole : ''}</h1>
//             <div className="flex float-end">
//                 {userRole && (
//                     <button onClick={handleLogOut} className="bg-red-500 w-[76px] h-6 text-white rounded-xl font-bold">LogOut</button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Header;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Header = () => {
//     const [userRole, setUserRole] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const role = localStorage.getItem('userRole');
//         if (role) {
//             setUserRole(role);
//         }
//     }, []);

//     const handleLogOut = () => {
//         localStorage.removeItem('token'); // Remove JWT token from localStorage
//         localStorage.removeItem('userID'); // Remove userID from localStorage
//         localStorage.removeItem('userRole'); // Remove userRole from localStorage
//         setUserRole(null); // Update state for immediate UI change
//         navigate('/'); // Redirect to login after logout
//     };

//     return (
//         <div className="bg-blue-500 h-[100px]">
//             <h1 className="text-center">Hello {userRole ? userRole : ''}</h1>
//             <div className="flex float-end">
//                 {userRole && (
//                     <button onClick={handleLogOut} className="bg-red-500 w-[76px] h-6 text-white rounded-xl font-bold">LogOut</button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Header;




// src/components/Header.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext'; // Adjust the path as necessary
import logo from '../assets/tkLogo.png'
const Header = () => {
    const { userRole, logout } = useContext(AuthContext);
    

    return (
        <div className="bg-blue-500  w-[576px] mx-auto rounded-xl flex flex-col justify-center items-center ">
            <img className='w-12 h-12' src={logo} alt="" />
            <h1 className="text-center">Taka</h1>
            {/* <div className="flex float-end">
                {userRole && (
                    <button onClick={handleLogOut} className="bg-red-500 w-[76px] h-6 text-white rounded-xl font-bold">LogOut</button>
                )}
            </div> */}
        </div>
    );
};

export default Header;
