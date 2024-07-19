import React from 'react';
import { Link } from 'react-router-dom';

const ReturnButton = () => {
    return (
        <div className="text-center">
            <Link className="ml-2 rounded-md border-2 mt-10 inline-block border-white border-opacity-40 " to={"/dashboard"}>
                
                Go Back
            </Link>
        </div>
    );
};

export default ReturnButton;

