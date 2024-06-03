/**
 * Name: Dharmil Nareshkumar Shah
 * Banner ID: B00965853
 */
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function CreateServiceProvider() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const location = useLocation();
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
    const [website, setWebsite] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString().split("T")[0]);

    useEffect(() => {
        if (token === null) {
            console.log("token: ", token);
            navigate("/login");
        }
    }, [token, navigate]);

    useEffect(() => {
        if (location.state) {
            setFirstName(location.state.firstName || "");
            setLastName(location.state.lastName || "");
            setEmail(location.state.email || "");
            console.log("Location State: ", location.state);
        }
    }, [location]);

    const handleProfilePictureChange = (e) => {
        setBusinessLogo(e.target.files[0]);
    };

    const handleServiceKeyPress = (e) => {
        if (e.key === "Enter" && newService.trim() !== "") {
            e.preventDefault();
            setService([...service, newService.trim()]);
            setNewService("");
        }
    };

    const handlePaymentKeyPress = (e) => {
        if (e.key === "Enter" && newPayment.trim() !== "") {
            e.preventDefault();
            setPayment([...payment, newPayment.trim()]);
            setNewPayment("");
        }
    };

    const handlePhoneNumberChange = (e) => {
        const inputNumber = e.target.value;
        const formattedNumber = inputNumber.replace(/\D/g, "");
        setPhoneNumber(formattedNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split("T")[0];

        console.log("Form Submmision checks");

        if (firstName.trim() === "") {
            toast.error("First name is required!");
            return;
        }
        if (lastName.trim() === "") {
            toast.error("Last name is required!");
            return;
        }
        if (phoneNumber.length !== 10) {
            toast.error("Phone number must be 10 digits long!");
            return;
        }
        if (email.trim() === "" || email.indexOf("@") === -1) {
            toast.error("Please enter a valid email address!");
            return;
        }

        if (dateOfBirth > currentDate) {
            toast.error("Date of birth cannot be in the future!");
            return;
        }

        console.log("After Checks");

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/createServiceProfile`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        businessLogo: null,
                        businessName: firstName,
                        businessLastName: lastName,
                        businessEmail: email,
                        mobileNumber: phoneNumber,
                        businessAddress: address,
                        servicesOffered: service,
                        paymentMethods: payment,
                        businessWebsite: website
                    })
                }
            );

            console.log("Service Frontend Response: ", response);

            if (!response.ok) {
                throw new Error("Failed to create profile!");
            }

            const responseData = await response.json();
            console.log("Response Data: ", responseData.data);
            const userId = responseData.savedServiceProvider._id;
            console.log("Service Front ID ", userId);

            const file = businessLogo;
            console.log("File: ", file);
            const formData = new FormData();
            console.log("FormData: ", formData);
            formData.append("files", file);
            formData.append("id", userId);

            const profileUploadResponse = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/upload-service-photo`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Profile Upload Response: ", profileUploadResponse);

            const downloadUrl = profileUploadResponse.data.url;

            const updateProfilePictureResponse = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/updateServiceProfile`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        id: userId,
                        businessLogo: downloadUrl
                    })
                }
            );

            console.log("Download URL: ", downloadUrl);
            setBusinessLogo(downloadUrl);
            toast.success("Profile created successfully!");
            console.log("profileUploadResponse: ", profileUploadResponse);

            setFirstName("");
            setLastName("");
            setEmail("");
            setPhoneNumber("");
            setPayment([]);
            setService([]);
            setAddress("");
            setTimeout(() => {
                navigate("/listings");
            }, 3000);
        } catch (error) {
            console.log(error);
            toast.error("Failed to create profile!");
        }
    };

    return (
        <>
            <ToastContainer />
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
                        onChange={handleProfilePictureChange}
                    />
                </div>
                <div className="mx-auto w-full rounded-md bg-white p-8 shadow-md sm:mx-10">
                    <form className="space-y-6" method="post" onSubmit={handleSubmit}>
                        <h2 className="mb-4 text-2xl font-bold">Create Service Profile</h2>
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
                                    onChange={(e) => setFirstName(e.target.value)}
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
                                    onChange={(e) => setLastName(e.target.value)}
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
                                    // onChange={handleEmailChange}
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
                                    onChange={handlePhoneNumberChange}
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
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                    className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="website" className="block font-medium">
                                    Website
                                </label>
                                <input
                                    type="text"
                                    id="website"
                                    name="website"
                                    placeholder="Website"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
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
                                        onChange={(e) => setNewService(e.target.value)}
                                        onKeyPress={handleServiceKeyPress}
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
                                        onChange={(e) => setNewPayment(e.target.value)}
                                        onKeyPress={handlePaymentKeyPress}
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
                        <button
                            type="submit"
                            className="mx-auto flex w-fit rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateServiceProvider;
