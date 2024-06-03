/**
 * Name: Nikunj Lalitkumar Hudka
 * Banner ID: B00959783
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const VerifiedUsers = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        // Fetch data from the API
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/verifiedUsers`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => response.data)
            .then((data) => {
                // Set the retrieved data to the state
                setUsers(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    return (
        <div className="flex w-full">
            <div className="relative flex w-full flex-grow flex-col overflow-x-auto sm:w-80">
                <h1 className="mx-[24px] mb-4 text-2xl font-bold sm:m-10">Hotel Representatives</h1>
                <hr className="mb-4 border-gray-300" />
                <div className="flex items-center sm:mx-10">
                    <div className="relative items-center overflow-x-auto shadow-md sm:w-full sm:rounded-lg">
                        <table className="w-full text-left text-sm text-gray-700 rtl:text-right ">
                            <thead className="cursor-pointer bg-gray-300 text-justify text-xs uppercase sm:text-base">
                                <tr>
                                    <th className="px-4 py-2 text-gray-800">Name</th>
                                    <th className="px-4 py-2 text-gray-800">Email</th>
                                    <th className="px-4 py-2 text-gray-800">Location</th>
                                    <th className="px-4 py-2 text-gray-800">Phone Number</th>
                                </tr>
                            </thead>
                            <tbody className=" divide-y divide-gray-200 bg-gray-100">
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td className="px-4 py-3">
                                            <Link to={`/admin/serviceProvider/${user._id}`}>
                                                {user.businessName} {user.businessLastName}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Link to={`/admin/serviceProvider/${user._id}`}>
                                                {user.businessEmail}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Link to={`/admin/serviceProvider/${user._id}`}>
                                                {user.businessAddress}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Link to={`/admin/serviceProvider/${user._id}`}>
                                                {user.mobileNumber}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifiedUsers;
