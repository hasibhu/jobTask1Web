import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
  // const { createUser, updateUserProfile } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const balance = 0;

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      role: data.role,
      status: "pending",
      currentBalance: balance,
    };
    console.log(userInfo);

    axiosPublic.post("/users", userInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You are registered successfully.",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/");
      }
    });
  };

  return (
    // <div className="hero min-h-screen mx-auto bg-base-200">
    <div className="hero  ">
      <div className="hero-content flex-col rounded-xl bg-yellow-500 lg:w-[576px] pb-28">
        <div className="text-center lg:w-[576px] ">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">Please insert your credentials below.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          {/* form starts here  */}

          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            {/* email  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            {/* Phone number  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="phoneNumber"
                {...register("phoneNumber", { required: true })}
                placeholder="Phone Number"
                className="input input-bordered"
              />
              {errors.phoneNumber && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            {/* password  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 5,
                  maxLength: 5,
                })}
                placeholder="Password"
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            {/* user type  */}
            <div className="form-control">
              <h1 className="label-text mt-2 p-2">Account Type</h1>
              <select
                {...register("role", { required: true })}
                className="select select-bordered w-full max-w-xs"
              >
                <option value="" disabled selected>
                  Select Account Type Here
                </option>
                <option value="agent">Agent</option>
                <option value="user">User</option>
              </select>
              {errors.role && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            {/* register button */}
            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Register"
              />
            </div>
          </form>

          <div>
            <h1 className="text-center pb-16">
              Already Registered?{" "}
              <Link to="/">
                <button>
                  <span className="text-purple-500">Login Here</span>
                </button>
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
