/**
 * Created By: Divyank Mayankkumar Shah
 * BannerId : B00966377
 */

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");

    const navigate = useNavigate();

    const validateForm = () => {
        if (!email) {
            toast.error("Email is required");
            return false;
        } else if (!password) {
            toast.error("Password is required");
            return false;
        } else if (!userType || userType === "User Type") {
            toast.error("Select User Type");
            return false;
        }
        return true;
    };

    const callLogin = async () => {
        if (validateForm()) {
            const userData = {
                email: email,
                password: password,
                userType: userType
            };
            const backend_login_url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`;

            const response = await axios.post(backend_login_url, userData);
            if (response.data.message === "Invalid Credentials") {
                toast.error("Invalid Credentials");
            } else {
                toast.success("Login successful");
                // Store the JWT token in local storage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userType", response.data.userType);
                localStorage.setItem("userId", response.data.userId);

                if (response.data.userType.toLowerCase() === "admin") {
                    // change to admin route
                    navigate("/admin");
                } else if (response.data.userType === "Customer") {
                    // change to customer route
                    navigate("/");
                } else {
                    // change to service provider route
                    navigate("/");
                }
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="mt-20 text-center">
                <h1 className="text-primary text-2xl font-bold">Login</h1>
                <div className="mx-auto my-2 w-3/4 p-2 text-center md:w-1/2 lg:w-1/4">
                    <div className="flex flex-col py-2">
                        <input
                            className="mb-2 h-12 w-full rounded-md border-2 border-gray-400 px-2 disabled:border-gray-200"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="h-12 w-full rounded-md border-2 border-gray-400 px-2 disabled:border-gray-200"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="flex py-2">
                            <select
                                placeholder="User Type"
                                className="h-12 w-full rounded-md border-2 border-gray-400 px-2 disabled:border-gray-200"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option name="ut"> User Type</option>
                                <option name="customer">User</option>
                                <option name="serviceProvider">Service Provider</option>
                                <option name="admin">Admin</option>
                            </select>
                        </div>
                        <button
                            className="text-1xl z-5 h-12 w-full rounded-lg bg-blue-500 px-8 py-2 text-white shadow-md hover:bg-blue-950 disabled:bg-blue-400"
                            onClick={callLogin}
                        >
                            Login
                        </button>
                    </div>
                    <p className="cursor-pointer text-center">
                        Do not have an account?{" "}
                        <Link to={"/signup"}>
                            <span className="cursor-pointer underline hover:text-gray-400">
                                Register Here
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
