
import {  FaHome, FaList, FaUsers } from 'react-icons/fa';

import { NavLink } from 'react-router-dom';
import { MdOutlineCurrencyExchange } from "react-icons/md";


const AdminMenu = () => {
    return (
        <div>
            <NavLink className='flex justify-center items-center' to='/dashboard/adminHome'><FaHome className="mr-2" />Admin Home</NavLink>

            <NavLink className='flex justify-center items-center' to='/dashboard/userManagement'><FaList className="m-2" /> User Management</NavLink>
            
            <NavLink className='flex justify-center items-center' to='/dashboard/allPaymentHistory'><MdOutlineCurrencyExchange className='text-xl mr-2' /> All Payment History</NavLink>

        </div>
    );
};

export default AdminMenu;
