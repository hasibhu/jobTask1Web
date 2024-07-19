// src/components/Login.jsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../components/AuthContext';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { login } = useContext(AuthContext);

    const onSubmit = async (data) => {
        const { emailOrPhone, password } = data;

        try {
            const response = await axiosPublic.post('/api/authenticate', {
                emailOrPhone,
                password,
            });

            if (response.status === 200) {
                const { token, id, role } = response.data;

                localStorage.setItem('token', token);
                localStorage.setItem('userID', id);
                localStorage.setItem('userRole', role);

                login(role);
                navigate('/dashboard');
            } else {
                alert(response.data.message || 'Invalid email/phone number or password');
            }
        } catch (error) {
            console.error('Error during authentication', error);
            alert('An error occurred during authentication. Please try again.');
        }
    };

    return (
        <div className="hero bg-base-200 ">
            <div className="hero-content flex-col bg-yellow-400 rounded-xl">
                <div className="text-center lg:text-left">
                    <p className="py-6 text-5xl text-center">Welcome to Taka</p>
                    <h1 className="text-3xl text-center font-bold">Login now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email/Phone Number</span>
                            </label>
                            <input
                                type="text"
                                name="emailOrPhone"
                                placeholder="Email or Phone Number"
                                className="input input-bordered"
                                {...register("emailOrPhone", {
                                    required: true,
                                    validate: value => {
                                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                        const phonePattern = /^\+?[1-9]\d{1,14}$/;
                                        return emailPattern.test(value) || phonePattern.test(value);
                                    }
                                })}
                            />
                            {errors.emailOrPhone && (
                                <span className="text-red-600">
                                    {errors.emailOrPhone.type === 'required'
                                        ? "Email or phone number is required"
                                        : "Please enter a valid email or phone number"}
                                </span>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                {...register("password", { required: true })} />
                            <span className="ml-72 text-2xl -mt-9 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <BsEyeSlash /> : <BsEye />}
                            </span>
                            {errors.password && <span className="text-red-600"> Password is required</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt mt-3 link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p className="text-center pt-8"> Do not Have an account? <Link className="text-blue-600" to='/register'>Register</Link> Here</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;




























// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { BsEye, BsEyeSlash } from 'react-icons/bs';
// import useAxiosPublic from '../hooks/useAxiosPublic';
// import { AuthContext } from '../components/AuthContext';

// const Login = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();
//     const axiosPublic = useAxiosPublic();
//     const { login } = useContext(AuthContext);

//     const onSubmit = async (data) => {
//         const { emailOrPhone, password } = data;

//         try {
//             const response = await axiosPublic.post('/api/authenticate', {
//                 emailOrPhone,
//                 password,
//             });

//             if (response.status === 200) {
//                 const { token, id, role } = response.data;

//                 localStorage.setItem('token', token);
//                 localStorage.setItem('userID', id);
//                 localStorage.setItem('userRole', role);

//                 login(role);
//                 navigate('/dashboard');
//             } else {
//                 alert(response.data.message || 'Invalid email/phone number or password');
//             }
//         } catch (error) {
//             console.error('Error during authentication', error);
//             alert('An error occurred during authentication. Please try again.');
//         }
//     };

//     // const onSubmit = async data => {
//     //     const { emailOrPhone, password } = data;

//     //     try {
//     //         const response = await axiosPublic.post('/api/authenticate', {
//     //             emailOrPhone,
//     //             password
//     //         });

//     //         if (response.status === 200) {
//     //             console.log(response.status);
//     //             const { token, id, role } = response.data;

//     //             // Store JWT token and user role in localStorage
//     //             localStorage.setItem('token', token);
//     //             // localStorage.setItem('userRole', role);
//     //             localStorage.setItem('userID', id);
//     //             localStorage.setItem('userRole', role);

//     //             // Navigate to dashboard
//     //             navigate('/dashboard');
//     //         } else {
//     //             alert(response.data.message || 'Invalid email/phone number or password');
//     //         }
//     //     } catch (error) {
//     //         console.error('Error during authentication', error);
//     //         alert('An error occurred during authentication. Please try again.');
//     //     }
//     // };

//     return (
//         <div className="hero bg-base-200 min-h-screen ">
//             <div className="hero-content flex-col bg-yellow-400 rounded-xl ">
//                 <div className="text-center lg:text-left">
//                     <p className="py-6 text-5xl text-center">Welcome to Euro</p>
//                     <h1 className="text-3xl text-center font-bold">Login now!</h1>
//                 </div>
//                 <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//                     <form onSubmit={handleSubmit(onSubmit)} className="card-body">
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Email/Phone Number</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 name="emailOrPhone"
//                                 placeholder="Email or Phone Number"
//                                 className="input input-bordered"
//                                 {...register("emailOrPhone", {
//                                     required: true,
//                                     validate: value => {
//                                         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                                         const phonePattern = /^\+?[1-9]\d{1,14}$/;
//                                         return emailPattern.test(value) || phonePattern.test(value);
//                                     }
//                                 })}
//                             />
//                             {errors.emailOrPhone && (
//                                 <span className="text-red-600">
//                                     {errors.emailOrPhone.type === 'required'
//                                         ? "Email or phone number is required"
//                                         : "Please enter a valid email or phone number"}
//                                 </span>
//                             )}
//                         </div>

//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Password</span>
//                             </label>
//                             <input type={showPassword ? "text" : "password"}
//                                 name="password"
//                                 placeholder="password"
//                                 className="input input-bordered"
//                                 {...register("password", { required: true })} />
//                             <span className=" ml-72 text-2xl -mt-9 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
//                                 {showPassword ? <BsEyeSlash /> : <BsEye />}
//                             </span>
//                             {errors.password && <span className="text-red-600"> Password is required</span>}
//                             <label className="label">
//                                 <a href="#" className="label-text-alt mt-3 link link-hover">Forgot password?</a>
//                             </label>
//                         </div>
//                         <div className="form-control mt-6">
//                             <button className="btn btn-primary">Login</button>
//                         </div>
//                         <p className="text-center pt-8"> Do not Have an account? <Link className="text-blue-600" to='/register'>Register</Link> Here</p>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
























































// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// import { useForm } from 'react-hook-form';
// import { BsEye, BsEyeSlash } from 'react-icons/bs';
// import useAxiosPublic from '../hooks/useAxiosPublic';

// const Login = () => {


//     const { register, handleSubmit, formState: { errors } } = useForm()
//     const [showPassword, setShowPassword] = useState(false);
//     const axiosPublic = useAxiosPublic();
//     const navigate = useNavigate();
    

//     // const onSubmit = data => {
//     //     const { emailOrPhone, password } = data;
//     //     console.log(data);
//     //     // Find user matching email or phone number and password
//     //     const user = users?.find(user =>
//     //         (user?.email === emailOrPhone || user?.phoneNumber === emailOrPhone) && user?.password === password
//     //     );

//     //     //  todo : find user role
     

//     //     if (user) {
//     //         // todo: send user role in localStorage
//     //         // Navigate to dashboard if user is found
//     //         navigate('/dashboard');

//     //     } else {
//     //         // Handle invalid credentials
//     //         alert('Invalid email/phone number or password');
//     //     }
//     // }
    
//     const onSubmit = async data => {
//         const { emailOrPhone, password } = data;
//         console.log(data);

//         try {
//             const response = await axiosPublic.post('/api/authenticate', {
//                 emailOrPhone,
//                 password
//             });

//             if (response.status === 200) {
//                 const { user, role } = response.data;

//                 // Store user role in localStorage
//                 localStorage.setItem('userRole', role);

//                 // Navigate to dashboard
//                 navigate('/dashboard');
//             } else {
//                 // Handle invalid credentials
//                 alert(response.data.message || 'Invalid email/phone number or password');
//             }
//         } catch (error) {
//             console.error('Error during authentication', error);
//             alert('An error occurred during authentication. Please try again.');
//         }
//     }



//     return (
//         <div className="hero bg-base-200 min-h-screen">
//             <div className="hero-content flex-col ">
//                 <div className="text-center lg:text-left">
//                     <p className="py-6 text-5xl  text-center">Welcome to Bikash</p>
//                     <h1 className="text-3xl  text-center font-bold">Login now!</h1>
//                 </div>
//                 <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

//                     {/* Form starts here  */}
//                     <form onSubmit={handleSubmit(onSubmit)} className="card-body">


//                         {/* Email field */}
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Email/Phone Number</span>
//                             </label>

                           
//                             <input
//                                 type="text" // Changed to "text" to accept both email and phone number
//                                 name="emailOrPhone"
//                                 placeholder="Email or Phone Number"
//                                 className="input input-bordered"
//                                 {...register("emailOrPhone", {
//                                     required: true,
//                                     validate: value => {
//                                         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                                         const phonePattern = /^\+?[1-9]\d{1,14}$/; // E.164 international phone number format
//                                         return emailPattern.test(value) || phonePattern.test(value);
//                                     }
//                                 })}
//                             />

//                             {errors.emailOrPhone && (
//                                 <span className="text-red-600">
//                                     {errors.emailOrPhone.type === 'required'
//                                         ? "Email or phone number is required"
//                                         : "Please enter a valid email or phone number"}
//                                 </span>
//                             )}

//                         </div>

//                         {/* Password field */}
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Password</span>
//                             </label>
//                             <input type={showPassword ? "text" : "password"}
//                                 name="password"
//                                 placeholder="password"
//                                 className="input input-bordered"
//                                 {...register("password", { required: true })} />
//                             <span className=" ml-72 text-2xl -mt-9 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
//                                 {showPassword ? <BsEyeSlash /> : <BsEye />}
//                             </span>
//                             {errors.password && <span className="text-red-600"> Pssword is required</span>}

//                             <label className="label">
//                                 <a href="#" className="label-text-alt mt-3 link link-hover">Forgot password?</a>
//                             </label>
//                         </div>
//                         <div className="form-control mt-6">
//                             <button className="btn btn-primary">Login</button>
//                         </div>


//                         <p className="text-center pt-8"> Do not Have an account? <Link className="text-blue-600" to='/register'>Register</Link> Here</p>
//                     </form>



//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;