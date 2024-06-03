/**
 * Created By: Divyank Mayankkumar Shah
 * BannerId : B00966377
 */

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
    var nameRegex = /^[A-Za-z]+$/;

    const navigate = useNavigate();

    const validateForm = () => {
        if (firstName === "") {
            toast.error("First Name is required");
            return false;
        } else if (!nameRegex.test(firstName)) {
            toast.error("First Name can only have alphabets");
            return false;
        } else if (!lastName) {
            toast.error("Last Name is required");
            return false;
        } else if (!nameRegex.test(lastName)) {
            toast.error("Last Name can only have alphabets");
            return false;
        } else if (!email) {
            toast.error("Email is required");
            return false;
        } else if (!emailRegex.test(email)) {
            toast.error("Email is not in valid format");
            return false;
        } else if (!userType || userType === "User Type") {
            toast.error("Select User Type");
            return false;
        } else if (!password) {
            toast.error("Password is required");
            return false;
        } else if (password.length < 7) {
            toast.error("Minimum length of password should be 8 characters.");
            return false;
        } else if (!passwordRegex.test(password)) {
            toast.error(
                <div>
                    <p>Password must fullfil following conditions: </p>
                    <ul>
                        <li>Minimum 1 uppercase alphabet.</li>
                        <li>Minimum 1 lowercase alphabet.</li>
                        <li>Minimum 1 number.</li>
                        <li>Minimum 1 special character (!@#$%^&*).</li>
                    </ul>
                </div>
            );
            return false;
        } else if (!confirmPassword) {
            toast.error("Confirm Password is required");
            return false;
        } else if (password !== confirmPassword) {
            toast.error("Password and Confirm Password do not match");
            return false;
        } else if (!termsAccepted) {
            toast.error("You must agree to Terms and Conditions");
            return false;
        }
        return true;
    };

    const callSignUp = async () => {
        try {
            if (validateForm()) {
                const userData = {
                    firstName: firstName,
                    lastName: lastName,
                    userType: userType.replace(" ", "_").toUpperCase(),
                    email: email,
                    password: password
                };
                const backend_signup_url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`;

                const response = await axios.post(backend_signup_url, userData);
                if (response.data.message === "User already exists") {
                    toast.error("User already exists");
                } else {
                    toast.success("Successfully signed up.");
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userType", userType);
                    localStorage.setItem("userId", response.data.userId);
                    if (userType === "User") {
                        // change to user route
                        navigate("/create-profile", { state: { firstName, lastName, email } });
                    } else {
                        // change to service provider route
                        navigate("/service-provider", { state: { firstName, lastName, email } });
                    }
                }
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="mt-20 text-center">
                <h1 className="text-primary text-2xl font-bold">Sign Up</h1>
                <div className="mx-auto my-6 w-3/4 p-2 text-center md:w-1/2 lg:w-1/4">
                    <div className="flex py-2">
                        <input
                            className="h-12 w-full rounded-md border-2 border-gray-400 px-2 disabled:border-gray-200"
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="flex py-2">
                        <input
                            className="h-12 w-full rounded-md border-2 border-gray-400 px-2 disabled:border-gray-200"
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="flex py-2">
                        <input
                            className="h-12 w-full rounded-md border-2 border-gray-400 px-2 disabled:border-gray-200"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
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
                        </select>
                    </div>
                    <div className="flex py-2">
                        <input
                            className="h-12 w-full rounded-md border-2 border-gray-400 px-2 disabled:border-gray-200"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex py-2">
                        <input
                            className="h-12 w-full rounded-md border-2 border-gray-400 px-2 disabled:border-gray-200"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex py-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={termsAccepted}
                                onChange={() => setTermsAccepted(!termsAccepted)}
                            />
                            <span className="text-sm">I agree to the Terms and Conditions</span>
                        </label>
                    </div>
                    <button
                        className="text-1xl z-5 my-3 h-12 w-fit rounded-lg bg-blue-500 px-8 py-2 text-white shadow-md hover:bg-blue-950 disabled:bg-blue-400"
                        onClick={callSignUp}
                    >
                        Sign Up
                    </button>
                    <p className="cursor-pointer text-center">
                        Already a User?{" "}
                        <Link to={"/login"}>
                            <span className="cursor-pointer underline hover:text-gray-400">
                                Login
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Signup;
