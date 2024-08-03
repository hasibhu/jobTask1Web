import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { format } from "date-fns";
import ReturnButton from "../../components/ReturnButton";

const Cashin = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm();
  const navigate = useNavigate();
  const [userPhoneNumber, setUserPhoneNumber] = useState(null);
  const watchAgentPhoneNumber = watch("agentPhoneNumber");

  const onSubmit = async (data) => {
    let amount = parseFloat(data.amount);

    if (data.type === "CashOut") {
      const additionalFee = amount * 0.015;
      amount += additionalFee;
    }

    const userInfo = {
      agentPhoneNumber: data.agentPhoneNumber,
      userPhoneNumber: userPhoneNumber,
      amount: amount,
      status: "pending",
      date: format(new Date(), "dd.MM.yyyy"),
      type: data.type,
    };
    console.log(userInfo);

    try {
      const res = await axiosPublic.post("/sendRequest", userInfo);
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Request has been sent successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Failed to send request:", error);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("userID");

    const fetchUserNumber = async () => {
      try {
        const response = await axiosPublic.get(`/api/user/${id}`);
        setUserPhoneNumber(response.data.phoneNumber);
      } catch (error) {
        console.error("Failed to fetch user phone number:", error);
        navigate("/"); // Redirect to login on error
      }
    };

    fetchUserNumber();
  }, [navigate]);

  useEffect(() => {
    if (watchAgentPhoneNumber) {
      const fetchAgentNumber = async () => {
        try {
          const response = await axiosPublic.get(
            `/users/phone/${watchAgentPhoneNumber}`
          );
          if (response.data && response.data.role === "agent") {
            clearErrors("agentPhoneNumber");
          } else {
            setError("agentPhoneNumber", {
              type: "manual",
              message: "Agent phone number not found or is not an agent",
            });
          }
        } catch (error) {
          setError("agentPhoneNumber", {
            type: "manual",
            message: "Agent phone number not found",
          });
          console.error("Failed to fetch agent phone number:", error);
        }
      };
      fetchAgentNumber();
    }
  }, [watchAgentPhoneNumber, setError, clearErrors, axiosPublic]);

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
        <ReturnButton></ReturnButton>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Agent Phone Number</span>
            </label>
            <input
              type="text"
              name="agentPhoneNumber"
              placeholder="Agent Phone Number"
              className="input input-bordered"
              {...register("agentPhoneNumber", {
                required: "Agent phone number is required",
                // validate: (value) => {
                //     const phonePattern = /^\+?[1-9]\d{1,14}$/;
                //     return phonePattern.test(value) || "Please enter a valid phone number";
                // }
              })}
            />
            {errors.agentPhoneNumber && (
              <span className="text-red-600">
                {errors.agentPhoneNumber.message}
              </span>
            )}
          </div>

          {/* amount  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Amount</span>
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Insert Your Desired Amount"
              className="input input-bordered"
              {...register("amount", {
                required: "Amount is required",
                min: {
                  value: 50,
                  message: "Amount must be at least 50",
                },
              })}
            />
            {errors.amount && (
              <span className="text-red-600">{errors.amount.message}</span>
            )}
          </div>

          {/* request type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Type</span>
            </label>
            <select
              name="type"
              className="input input-bordered"
              {...register("type", {
                required: "Type is required",
              })}
            >
              <option value="">Select Transaction Type</option>
              <option value="CashIn">CashIn</option>
              <option value="CashOut">CashOut</option>
            </select>
            {errors.type && (
              <span className="text-red-600">{errors.type.message}</span>
            )}
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Request Cash In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cashin;

// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import useAxiosPublic from '../../hooks/useAxiosPublic';
// import Swal from 'sweetalert2';
// import { format } from 'date-fns';

// const Cashin = () => {
//     const axiosPublic = useAxiosPublic();
//     const { register, handleSubmit, formState: { errors }, watch } = useForm();
//     const navigate = useNavigate();
//     const [userPhoneNumber, setUserPhoneNumber] = useState(null);
//     const [agentPhoneNumber, setAgentPhoneNumber] = useState(null);

//     const watchAgentPhoneNumber = watch('agentPhoneNumber');

//     const onSubmit = async (data) => {
//         const userInfo = {
//             agentPhoneNumber: data.agentPhoneNumber,
//             userPhoneNumber: userPhoneNumber,
//             amount: data.amount,
//             status: 'pending',
//             date: format(new Date(), 'dd.MM.yyyy'),
//             type: data.type
//         };
//         console.log(userInfo);

//         try {
//             const res = await axiosPublic.post('/sendRequest', userInfo);
//             if (res.data.insertedId) {
//                 Swal.fire({
//                     position: "center",
//                     icon: "success",
//                     title: "Request has been sent successfully.",
//                     showConfirmButton: false,
//                     timer: 1500
//                 });
//                 navigate('/dashboard');
//             }
//         } catch (error) {
//             console.error('Failed to send request:', error);
//         }
//     };

//     useEffect(() => {
//         const id = localStorage.getItem('userID');

//         const fetchUserNumber = async () => {
//             try {
//                 const response = await axiosPublic.get(`/api/user/${id}`);
//                 setUserPhoneNumber(response.data.phoneNumber);
//             } catch (error) {
//                 console.error('Failed to fetch user phone number:', error);
//                 navigate('/'); // Redirect to login on error
//             }
//         };

//         fetchUserNumber();
//     }, [navigate]);

//     useEffect(() => {
//         if (watchAgentPhoneNumber) {
//             const fetchAgentNumber = async () => {
//                 try {
//                     const response = await axiosPublic.get(`/users/phone/${watchAgentPhoneNumber}`);
//                     setAgentPhoneNumber(response.data.phoneNumber);
//                 } catch (error) {
//                     console.error('Failed to fetch agent phone number:', error);
//                 }
//             };

//             fetchAgentNumber();
//         }
//     }, [watchAgentPhoneNumber, axiosPublic]);

//     return (
//         <div>
//             <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
//                 <form onSubmit={handleSubmit(onSubmit)} className="card-body">
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Agent Phone Number</span>
//                         </label>
//                         <input
//                             type="text"
//                             name="agentPhoneNumber"
//                             placeholder="Agent Phone Number"
//                             className="input input-bordered"
//                             {...register("agentPhoneNumber", {
//                                 required: "Agent phone number is required",
//                                 validate: value => {
//                                     const phonePattern = /^\+?[1-9]\d{1,14}$/;
//                                     return phonePattern.test(value) || "Please enter a valid phone number";
//                                 }
//                             })}
//                         />
//                         {errors.agentPhoneNumber && (
//                             <span className="text-red-600">
//                                 {errors.agentPhoneNumber.message}
//                             </span>
//                         )}
//                     </div>

//                     {/* amount  */}
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Amount</span>
//                         </label>
//                         <input
//                             type="number"
//                             name="amount"
//                             placeholder="Insert Your Desired Amount"
//                             className="input input-bordered"
//                             {...register("amount", {
//                                 required: "Amount is required",
//                                 min: {
//                                     value: 50,
//                                     message: "Amount must be at least 50"
//                                 }
//                             })}
//                         />
//                         {errors.amount && (
//                             <span className="text-red-600">
//                                 {errors.amount.message}
//                             </span>
//                         )}
//                     </div>

//                     {/* request type  */}
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Type</span>
//                         </label>
//                         <select
//                             name="type"
//                             className="input input-bordered"
//                             {...register("type", {
//                                 required: "Type is required",
//                             })}
//                         >
//                             <option value="">Select Transaction Type</option>
//                             <option value="CashIn">CashIn</option>
//                             <option value="CashOut">CashOut</option>
//                         </select>
//                         {errors.type && (
//                             <span className="text-red-600">
//                                 {errors.type.message}
//                             </span>
//                         )}
//                     </div>

//                     <div className="form-control mt-6">
//                         <button className="btn btn-primary">Request Cash In</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Cashin;

// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import useAxiosPublic from '../../hooks/useAxiosPublic';
// import Swal from 'sweetalert2';
// import { format } from 'date-fns';

// const Cashin = () => {
//     const axiosPublic = useAxiosPublic
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const navigate = useNavigate();
//     const [userPhoneNumber, setUserPhoneNumber] = useState(null);

//     const onSubmit = async (data) => {
//         const userInfo = {
//             agentPhoneNumber: data.phoneNumber,
//             userPhoneNumber: userPhoneNumber,
//             amount: data.amount,
//             status: 'pending',
//             date: format(new Date(), 'dd.MM.yyyy'),
//         }
//         console.log(userInfo);

//         axiosPublic.post('/sendRequest', userInfo)
//             .then(res => {
//                 if (res.data.insertedId) {
//                     Swal.fire({
//                         position: "center",
//                         icon: "success",
//                         title: "Request has been sent successfully.",
//                         showConfirmButton: false,
//                         timer: 1500
//                     });

//                     navigate('/dashboard')

//                 }
//             })

//     };

//     useEffect(() => {
//         const id = localStorage.getItem('userID');

//         const fetchUserNumber = async () => {
//             try {
//                 const response = await axiosPublic.get(`/api/users/${id}`);
//                 setUserPhoneNumber(response.data.phoneNumber);
//             } catch (error) {
//                 console.error('Failed to fetch user role:', error);
//                 navigate('/'); // Redirect to login on error
//             }
//         };

//         fetchUserNumber();
//     }, [userPhoneNumber]);

//     return (
//         <div>
//             <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
//                 <form onSubmit={handleSubmit(onSubmit)} className="card-body">

//                 <div className="form-control">
//                     <label className="label">
//                         <span className="label-text">Agent Phone Number</span>
//                     </label>
//                     <input
//                         type="text"
//                         name="agentPhoneNumber"
//                         placeholder="Agent Phone Number"
//                         className="input input-bordered"
//                             {...register("agentPhoneNumber", {
//                             required: true,
//                             validate: value => {
//                                 const phonePattern = /^\+?[1-9]\d{1,14}$/;
//                                 return  phonePattern.test(value);
//                             }
//                         })}
//                     />
//                         {errors.agentPhoneNumber && (
//                         <span className="text-red-600">
//                                 {errors.agentPhoneNumber.type === 'required'
//                                 ? "Email or phone number is required"
//                                 : "Please enter a valid email or phone number"}
//                         </span>
//                     )}
//                     </div>

//                     {/* amount  */}
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Amount</span>
//                         </label>
//                         <input
//                             type="number"
//                             name="amount"
//                             placeholder="Insert Your Desired Amount"
//                             className="input input-bordered"
//                             {...register("amount", {
//                                 required: "Amount is required",
//                                 min: {
//                                     value: 50,
//                                     message: "Amount must be at least 50"
//                                 }
//                             })}
//                         />
//                         {errors.amount && (
//                             <span className="text-red-600">
//                                 {errors.amount.message}
//                             </span>
//                         )}
//                     </div>

//                     {/* reuest type  */}
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Type</span>
//                         </label>
//                         <select
//                             name="type"
//                             className="input input-bordered"
//                             {...register("type", {
//                                 required: true,
//                             })}
//                         >
//                             <option value="">Select Transaction Type</option>
//                             <option value="CashIn">CashIn</option>
//                             <option value="CashOut">CashOut</option>
//                         </select>
//                         {errors.type && (
//                             <span className="text-red-600">
//                                 {errors.type.type === 'required'
//                                     ? "Type is required"
//                                     : "Please select a valid transaction type"}
//                             </span>
//                         )}
//                     </div>

//                 <div className="form-control mt-6">
//                     <button className="btn btn-primary">Request Cash In</button>
//                 </div>
//                 </form>
//             </div>
//         </div>

//     );
// };

// export default Cashin;
