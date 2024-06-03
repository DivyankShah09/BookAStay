/**
 * Name: Nikunj Lalitkumar Hudka
 * Banner ID: B00959783
 */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PendingRequests = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [approvalStatus, setApprovalStatus] = useState(false); // State to track approval status
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token === null) {
            console.log("token: ", token);
            navigate("/login");
        }
    }, [token, navigate]);

    useEffect(() => {
        fetchPendingRequests();
    }, [approvalStatus]); // useEffect will now depend on approvalStatus

    const fetchPendingRequests = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/admin/pendingVerifications`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleApproveUser = async (id) => {
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/admin/approveUser/${id}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setApprovalStatus(!approvalStatus); // Toggle approvalStatus to trigger useEffect
        } catch (error) {
            console.error("Error approving user:", error);
        }
    };

    const handleRejectUser = async (id) => {
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/admin/rejectUser/${id}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setApprovalStatus(!approvalStatus); // Toggle approvalStatus to trigger useEffect
        } catch (error) {
            console.error("Error rejecting user:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />

                <div className="flex w-full">
                    <div className="relative flex w-full flex-grow flex-col overflow-x-auto sm:w-80">
                        <h1 className="mx-[24px] mb-4 text-2xl font-bold sm:m-10">
                            Pending Requests
                        </h1>
                        <hr className="mb-4 border-gray-300" />
                        <div className="flex items-center sm:mx-10">
                            <div className="relative items-center overflow-x-auto shadow-md sm:w-full sm:rounded-lg">
                                <table className="w-full text-left text-sm text-gray-700 rtl:text-right ">
                                    <thead className="cursor-pointer bg-gray-300 text-justify text-xs uppercase sm:text-base">
                                        <tr>
                                            <th className="px-4 py-2 text-gray-800">Name</th>
                                            <th className="px-4 py-2 text-gray-800">Email</th>
                                            <th className="px-4 py-2 text-gray-800">Location</th>
                                            <th className="px-4 py-2 text-gray-800">
                                                Phone Number
                                            </th>
                                            <th className="px-4 py-2 text-gray-800">Action</th>
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
                                                <td className="px-4 py-3">
                                                    <button
                                                        className="mr-2 rounded-lg bg-green-500 px-3 py-1 text-white"
                                                        onClick={() => handleApproveUser(user._id)}
                                                    >
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </button>
                                                    <button
                                                        className="rounded-lg bg-red-500 px-3 py-1 text-white"
                                                        onClick={() => handleRejectUser(user._id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PendingRequests;
