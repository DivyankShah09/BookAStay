/**
 * Name: Dharmil Nareshkumar Shah
 * Banner ID: B00965853
 */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function ServiceProfile() {
    const token = localStorage.getItem("token");
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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/getServiceProfile`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setBusinessUser(response.data);
                setFirstName(response.data.businessName);
                setLastName(response.data.businessLastName);
                setEmail(response.data.businessEmail);
                setPhoneNumber(response.data.mobileNumber);
                setAddress(response.data.businessAddress);
                setBusinessLogo(response.data.businessLogo);
                setPayment(response.data.paymentMethods || []);
                setService(response.data.servicesOffered || []);
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchUserData();
        }
    }, [token]);

    useEffect(() => {
        if (token === null) {
            console.log("token: ", token);
            navigate("/login");
        }
    }, [token, navigate]);

    return (
        <>
            <div className="mt-16 flex flex-col p-8 sm:flex sm:flex-row">
                <div className="mb-8 h-fit rounded-lg bg-white p-8 shadow-md">
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
                    <input
                        type="file"
                        id="profile_picture"
                        name="profile_picture"
                        accept="image/*"
                        className="mt-2 block w-full"
                    />
                </div>
                <div className="mx-auto w-full rounded-md bg-white p-8 shadow-md sm:mx-10">
                    <form className="space-y-6" method="post">
                        <h2 className="mb-4 text-2xl font-bold">Service Profile</h2>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                            <div className="flex flex-col">
                                <label htmlFor="first_name" className="block font-medium">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    placeholder="First Name"
                                    value={firstName}
                                    className="mt-1 block w-[70%] rounded-md border-black shadow-sm"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="last_name" className="block font-medium">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Last Name"
                                    value={lastName}
                                    className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="block font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={email}
                                    className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="phone" className="block font-medium">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone Number"
                                    required
                                    value={phoneNumber}
                                    className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="address" className="block font-medium">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Address"
                                    value={address}
                                    required
                                    className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>

                            <div className="relative flex flex-col">
                                <label htmlFor="services_offered" className="block font-medium">
                                    Services Offered
                                </label>
                                <div className="mt-1 flex w-[70%] flex-wrap rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    {service.map((destination, index) => (
                                        <div
                                            key={index}
                                            className="m-1 flex items-center rounded-md bg-gray-100 px-2 py-1"
                                        >
                                            {destination}
                                            <button
                                                type="button"
                                                className="ml-2 text-red-600"
                                                onClick={() => {
                                                    setService(
                                                        service.filter((_, i) => i !== index)
                                                    );
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <input
                                        type="text"
                                        id="services_offered"
                                        name="services_offered"
                                        placeholder="Press Enter to add a service"
                                        value={newService}
                                        className="flex-grow"
                                    />
                                </div>
                            </div>

                            <div className="relative flex flex-col">
                                <label htmlFor="payment_methods" className="block font-medium">
                                    Payment Methods
                                </label>
                                <div className="mt-1 flex w-[70%] flex-wrap rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    {payment.map((destination, index) => (
                                        <div
                                            key={index}
                                            className="m-1 flex items-center rounded-md bg-gray-100 px-2 py-1"
                                        >
                                            {destination}
                                            <button
                                                type="button"
                                                className="ml-2 text-red-600"
                                                onClick={() => {
                                                    setPayment(
                                                        payment.filter((_, i) => i !== index)
                                                    );
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <input
                                        type="text"
                                        id="payment_methods"
                                        name="payment_methods"
                                        placeholder="Press Enter to add a payment method"
                                        value={newPayment}
                                        className="flex-grow"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="subscribe"
                                    name="subscribe"
                                    className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="subscribe" className="ml-2">
                                    Subscribe to our newsletters
                                </label>
                            </div>
                        </div>
                        <div>
                            <Link to="/update-service-profile">
                                <button className="rounded-lg bg-black px-4 py-2 text-white">
                                    Edit Profile
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ServiceProfile;
