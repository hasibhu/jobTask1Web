import React from 'react';

const UserTableRow = ({ data, index }) => {
    return (
        <tr className='text-center'>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.phoneNumber}</td>
            <td>{data.role}</td>
            <td>
                <button
                    onClick={() => handleUserStatusChange(user)}
                    className={`btn ${data.status === 'active' ? 'btn-accent' : 'bg-yellow-600'}`}
                >
                    {data.status === 'active' ? 'Active' : 'Pending'}
                </button>
            </td>
        </tr>
    );
};

export default UserTableRow;
