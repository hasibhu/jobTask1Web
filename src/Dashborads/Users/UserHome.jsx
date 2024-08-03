import React from "react";
import { Link } from "react-router-dom";

const UserHome = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 mt-4">
        <h1 className="text-center">User Home</h1>
        <div className="flex  justify-center items-center gap-4">
          <div className="w-[200px] bg-slate-700">
            <Link to={"/currentBalance"}>
              <h2 className="text-center">Current Balance</h2>
            </Link>
          </div>
        </div>

        <div className="flex  justify-center items-center gap-4">
          <div className="w-[200px] bg-slate-700">
            <Link to={"/sendMoney"}>
              {" "}
              <h1 className="text-center">Send Money</h1>
            </Link>
          </div>

          <div className="w-[200px] bg-blue-400">
            <Link to={"/cashIn"}>
              {" "}
              <h1 className="text-center">Cash In/Out</h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-[200px] mx-auto justify-center items-center bg-slate-700 mt-4">
        <Link to={"/userHistory"}>
          <h1> History</h1>
        </Link>
      </div>
    </div>
  );
};

export default UserHome;
