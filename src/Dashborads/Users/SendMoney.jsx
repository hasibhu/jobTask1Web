import { useForm } from "react-hook-form";
import ReturnButton from "../../components/ReturnButton";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SendMoney = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isUserValid, setIsUserValid] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm();

  const watchReceiverPhoneNumber = watch("receiverPhoneNumber");

  const onSubmit = async (data) => {
    if (!isUserValid) {
      setError("form", {
        type: "manual",
        message: "You are not allowed to send money.",
      });
      return;
    }
    console.log(data.receiverPhoneNumber);
    const amount = parseFloat(data.amount);
    const fee = amount > 100 ? 5 : 0;
    const totalAmount = amount + fee;
    console.log(typeof totalAmount);

    if (user.balance < totalAmount) {
      setError("amount", {
        type: "manual",
        message: "Insufficient balance.",
      });
      return;
    }

    try {
      const receiverResponse = await axiosPublic.get(
        `/users/phone/${data.receiverPhoneNumber}`
      );
      const receiver = receiverResponse.data;

      if (!receiver || receiver.role !== "user") {
        setError("receiverPhoneNumber", {
          type: "manual",
          message: "Receiver phone number not found or is not a valid user.",
        });
        return;
      }

      // Perform transaction
      await axiosPublic.post("/sendMoney", {
        senderId: user.id,
        receiverId: receiver._id, // Updated to use _id instead of id
        amount: amount,
        fee: fee,
        totalAmount: totalAmount,
      });

      // Update the user's balance and navigate back to a relevant page
      setUser((prevUser) => ({
        ...prevUser,
        balance: prevUser.balance - totalAmount,
      }));
      //   navigate("/"); // Redirect after successful transaction
    } catch (error) {
      console.error("Failed to send money:", error);
      setError("form", {
        type: "manual",
        message: "Failed to complete the transaction. Please try again.",
      });
    }
  };

  useEffect(() => {
    const senderId = localStorage.getItem("userID");
    // console.log("Sender ID from localStorage:", senderId); // Debugging line

    if (!senderId) {
      console.error("No sender ID found in localStorage.");
      return; // Exit early if senderId is not found
    }

    const fetchSenderDetails = async () => {
      try {
        const response = await axiosPublic.get(`/api/sender/${senderId}`);
        const senderData = response.data;
        setUser(senderData);

        if (senderData.role === "user") {
          setIsUserValid(true);
        } else {
          setIsUserValid(false);
          // Handle invalid user scenario
        }
      } catch (error) {
        console.error("Failed to fetch sender details:", error);
        // Handle error, possibly redirect to login
      }
    };

    fetchSenderDetails();
  }, [navigate, axiosPublic]);

  useEffect(() => {
    if (watchReceiverPhoneNumber) {
      const fetchReceiverDetails = async (phoneNumber) => {
        try {
          const response = await axiosPublic.get(
            `/api/receiver/phone/${phoneNumber}`
          );
          const receiverData = response.data;

          if (receiverData && receiverData.role === "user") {
            clearErrors("receiverPhoneNumber");
          } else {
            setError("receiverPhoneNumber", {
              type: "manual",
              message:
                "Receiver phone number not found or is not a valid user.",
            });
          }
        } catch (error) {
          setError("receiverPhoneNumber", {
            type: "manual",
            message: "Failed to fetch receiver phone number.",
          });
          console.error("Failed to fetch receiver phone number:", error);
        }
      };

      fetchReceiverDetails();
    }
  }, [watchReceiverPhoneNumber, setError, clearErrors, axiosPublic]);

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
        <ReturnButton></ReturnButton>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Receiver Phone Number</span>
            </label>
            <input
              type="number"
              name="receiverPhoneNumber"
              placeholder="Receiver Phone Number"
              className="input input-bordered"
              {...register("receiverPhoneNumber", {
                required: "Receiver phone number is required",
              })}
            />
            {errors.receiverPhoneNumber && (
              <span className="text-red-600">
                {errors.receiverPhoneNumber.message}
              </span>
            )}
          </div>

          {/* amount */}
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

          {errors.form && (
            <div className="form-control">
              <span className="text-red-600">{errors.form.message}</span>
            </div>
          )}

          <div className="form-control mt-6">
            <button className="btn btn-primary" disabled={!isUserValid}>
              Send Money
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
