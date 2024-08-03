import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ReturnButton from "../../components/ReturnButton";

const CurrentBalance = () => {
  const [userCurrentBalance, setUserCurrentBalance] = useState(null);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const id = localStorage?.getItem("userID");
    if (!id) {
      navigate("/"); // Redirect to login if user ID is not found
      return;
    }

    const fetchUserRole = async () => {
      try {
        const response = await axiosPublic.get(`/api/userCurrentBalance/${id}`);
        console.log(response);
        setUserCurrentBalance(response?.data?.balance);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
        navigate("/"); // Redirect to login on an error
      }
    };

    fetchUserRole();
  }, [navigate]);

  if (!userCurrentBalance) {
    return (
      <div className="flex justify-center items-center text-4xl text-green-600 mt-32">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <ReturnButton></ReturnButton>
      <h1 className="text-center">Current Balance Is </h1>
      <h1 className="text-center">{userCurrentBalance}</h1>
    </div>
  );
};

export default CurrentBalance;
