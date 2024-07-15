import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <p className="py-6 text-5xl  text-center">Welcome to Bikash</p>
                    <h1 className="text-3xl  text-center font-bold">Login now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">
                                <Link to='/dashboard'>Login</Link>
                            </button>
                        </div>
                        <hr className='mt-4 mb-4' />
                        <h1 className='text-center'>Do not have an account? <span className='text-purple-600'>
                            <Link to={'/register'}>Register</Link>
                        </span> Here</h1>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;