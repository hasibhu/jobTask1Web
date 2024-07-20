
import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext'; // Adjust the path as necessary
import logo from '../assets/tkLogo.png'
const Header = () => {
    const { userRole, logout } = useContext(AuthContext);
    

    return (
        <div className="bg-blue-500  lg:w-[576px] h-[100px] mx-auto rounded-xl flex flex-col justify-center items-center ">
            <img className='w-12 h-12' src={logo} alt="" />
            <h1 className="text-center text-4xl font-serif font-bold">TaKa</h1>
            
        </div>
    );
};

export default Header;
