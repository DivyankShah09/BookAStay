/**
 * Name: Nikunj Lalitkumar Hudka
 * Banner ID: B00959783
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ServiceProviderDetails = () => {
    const token = localStorage.getItem("token");
    const { id } = useParams();
    const navigate = useNavigate;
    const [businessLogo, setBusinessLogo] = useState(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    );
    const [service, setService] = useState([]);
    const [newService, setNewService] = useState("");
    const [payment, setPayment] = useState([]);
    const [newPayment, setNewPayment] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [businessUser, setBusinessUser] = useState("");
    const [website, setWebsite] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString().split("T")[0]);
    const [isVerified, setIsVerified] = useState("pending");

    // useEffect(() => {
    // if (token === null) {
    //     console.log("token: ", token);
    //     navigate("/login");
    // }
    // }, [token, navigate]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/getServiceProvider/${id}`,
                    {
                        params: {
                            id: id
                        },
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setBusinessUser(response.data);
                setFirstName(response.data.businessName);
                setLastName(response.data.businessLastName);
                setEmail(response.data.businessEmail);
                setPhoneNumber(response.data.mobileNumber);
                setAddress(response.data.businessAddress);
                setBusinessLogo(
                    response.data.businessLogo ? response.data.businessLogo : businessLogo
                );
                setPayment(response.data.paymentMethods || []);
                setService(response.data.servicesOffered || []);
                setIsVerified(response.data.isVerified);
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchUserData();
        }
    }, [id, token]);
    const handleApprove = async () => {
        axios
            .post(`/api/admin/approveUser/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                if (response.ok) {
                    navigate("/pendingRequests"); // Reload data after approval
                } else {
                    console.error("Error approving user:", response.statusText);
                }
            })
            .catch((error) => {
                console.error("Error approving user:", error);
            });
    };

    const handleReject = async () => {
        axios
            .post(`/api/admin/rejectUser/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                if (response.ok) {
                    navigate("/pendingRequests"); // Reload data after rejection
                } else {
                    console.error("Error rejecting user:", response.statusText);
                }
            })
            .catch((error) => {
                console.error("Error rejecting user:", error);
            });
    };

    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="mt-16 flex w-full flex-col justify-center p-8 sm:flex sm:flex-row">
                    <div className="mb-8 h-fit w-full rounded-lg bg-white p-8 shadow-md md:w-1/2">
                        <h2 className="mb-4 text-2xl font-bold">Profile Picture</h2>
                        {businessLogo && (
                            <div className="mt-4">
                                <img
                                    src={businessLogo}
                                    alt="Profile"
                                    className="mx-auto h-[200px] w-[200px] rounded-[6.5rem] object-cover"
                                />
                            </div>
                        )}
                    </div>
                    <div className="mx-auto w-full rounded-md bg-white p-8 shadow-md sm:mx-10">
                        <div className="space-y-6">
                            <h2 className="mb-4 text-2xl font-bold">
                                Service Provider Information
                            </h2>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                                <div className="flex flex-col">
                                    <label htmlFor="first_name" className="block font-medium">
                                        First Name
                                    </label>
                                    <p className="mt-1 block w-[70%] rounded-md border-black shadow-sm">
                                        {firstName}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="last_name" className="block font-medium">
                                        Last Name
                                    </label>
                                    <p className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm">
                                        {lastName}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="block font-medium">
                                        Email
                                    </label>
                                    <p className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm">
                                        {email}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="phone" className="block font-medium">
                                        Phone Number
                                    </label>
                                    <p className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm">
                                        {phoneNumber}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="address" className="block font-medium">
                                        Address
                                    </label>
                                    <p className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm">
                                        {address}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="services_offered" className="block font-medium">
                                        Services Offered
                                    </label>
                                    <div className="mt-1 flex w-[70%] flex-wrap rounded-md border-gray-300 shadow-sm">
                                        {service.map((destination, index) => (
                                            <div
                                                key={index}
                                                className="m-1 flex items-center rounded-md bg-gray-100 px-2 py-1"
                                            >
                                                {destination}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="payment_methods" className="block font-medium">
                                        Payment Methods
                                    </label>
                                    <div className="mt-1 flex w-[70%] flex-wrap rounded-md border-gray-300 shadow-sm">
                                        {payment.map((destination, index) => (
                                            <div
                                                key={index}
                                                className="m-1 flex items-center rounded-md bg-gray-100 px-2 py-1"
                                            >
                                                {destination}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {isVerified === "pending" && (
                                    <div className="mt-4 flex justify-between">
                                        <button
                                            onClick={handleApprove}
                                            className="rounded-md bg-green-500 px-3 py-1 text-white"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={handleReject}
                                            className="mx-auto rounded-md bg-red-500 px-4  py-2 text-white"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceProviderDetails;
