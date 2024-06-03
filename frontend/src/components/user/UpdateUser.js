/**
 * Name: Dharmil Nareshkumar Shah
 * Banner ID: B00965853
 */
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UpdateUser() {
    const [travelDestinations, setTravelDestinations] = useState([]);
    const [newDestination, setNewDestination] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [interests, setInterests] = useState("");
    const [occupation, setOccupation] = useState("");
    const [socialMediaLinks, setSocialMediaLinks] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    );
    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [user, setUser] = useState({});
    const [address, setAddress] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
            console.log("token: ", token);
            navigate("/login");
        }
    }, [token, navigate]);

    const handleDestinationKeyPress = (e) => {
        if (e.key === "Enter" && newDestination.trim() !== "") {
            e.preventDefault();
            setTravelDestinations([...travelDestinations, newDestination.trim()]);
            setNewDestination("");
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/getUserProfile`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setUser(response.data);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setPhoneNumber(response.data.mobileNumber);
                setAddress(response.data.address);
                setCountry(response.data.country);
                setProfilePicture(response.data.img);
                setTravelDestinations(response.data.travelDestinations || []);
                // Add other fields as necessary
            } catch (error) {
                console.error(error);
            }
        };
        if (token) {
            fetchUserData();
        }
    }, [token]);

    console.log("User ID: ", user._id);

    const handleDestinationChange = (e) => {
        setTravelDestinations(e.target.value.split(","));
    };

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handlePhoneNumberChange = (e) => {
        const inputNumber = e.target.value;
        const formattedNumber = inputNumber.replace(/\D/g, "");
        setPhoneNumber(formattedNumber);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (firstName.length === 0) {
            toast.error("First name is required!");
            return;
        }
        if (lastName.length === 0) {
            toast.error("Last name is required!");
            return;
        }
        if (phoneNumber.length !== 10) {
            toast.error("Phone number must be 10 digits long!");
            return;
        }
        if (email.length === 0 || email.indexOf("@") === -1) {
            toast.error("Please enter a valid email address!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/updateUserProfile/${user._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        img: null,
                        firstName,
                        lastName,
                        email,
                        mobileNumber: phoneNumber,
                        address,
                        country,
                        travelDestinations,
                        password: confirmPassword
                    })
                }
            );

            const file = profilePicture;
            if (file) {
                console.log("File: ", file);
                const formData = new FormData();
                formData.append("files", file);
                formData.append("id", user._id);
                console.log("ID ", user._id);

                const profileUploadResponse = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/upload-user-photo`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                toast.success("Updated user profile successfully");

                const updatedImageUrl = profileUploadResponse.data.url;

                const updateProfileResponse = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/updateUserProfile/${user._id}`,
                    {
                        id: user._id,
                        img: updatedImageUrl
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

            if (response.ok) {
                const data = await response.json();
                console.log("Data: ", data);
                if (data.msg) {
                    toast.success(data.msg);
                    setUser({
                        ...user,
                        img: profilePicture,
                        firstName,
                        lastName,
                        email,
                        phoneNumber,
                        address,
                        country,
                        travelDestinations,
                        password: confirmPassword
                    });
                    setPassword("");
                    setConfirmPassword("");
                } else {
                    toast.error("An error occurred. Please try again later.");
                }
            }
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <>
            <ToastContainer />
            <div className="mt-16 flex flex-col p-8 sm:flex sm:flex-row">
                <div className="mb-8 h-fit rounded-lg bg-white p-8 shadow-md">
                    <h2 className="mb-4 text-2xl font-bold">Profile Picture</h2>
                    {profilePicture && (
                        <div className="mt-4">
                            <img
                                src={profilePicture}
                                onChange={(e) => setProfilePicture(e.target.value)}
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
                    <h2 className="mb-4 text-2xl font-bold">Update your profile</h2>
                    <form
                        action="https://send.pageclip.co/WtsYuUOFwq2KXLgdGZ4kXkl6vUZCsY0k/hotel-booking-website"
                        className="space-y-6"
                        method="post"
                        onSubmit={handleUpdate}
                    >
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
                                    required
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
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="gender" className="block font-medium">
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    required
                                    value={user.gender}
                                    className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="" disabled selected>
                                        Select your gender
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
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
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="dob" className="block font-medium">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    required
                                    disabled
                                    value={user.dob}
                                    className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="relative flex flex-col">
                                <label htmlFor="travel_destinations" className="block font-medium">
                                    Travel Destinations
                                </label>
                                <div className="mt-1 flex w-[70%] flex-wrap rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    {travelDestinations.map((destination, index) => (
                                        <div
                                            key={index}
                                            className="m-1 flex items-center rounded-md bg-gray-100 px-2 py-1"
                                        >
                                            {destination}
                                            <button
                                                type="button"
                                                className="ml-2 text-red-600"
                                                onClick={() => {
                                                    setTravelDestinations(
                                                        travelDestinations.filter(
                                                            (_, i) => i !== index
                                                        )
                                                    );
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <input
                                        type="text"
                                        id="travel_destinations"
                                        name="travel_destinations"
                                        placeholder="Press Enter to add a destination"
                                        value={travelDestinations}
                                        onChange={handleDestinationChange}
                                        onKeyPress={handleDestinationKeyPress}
                                        className="flex-grow"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="password" className="block font-medium">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="confirm_password" className="block font-medium">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirm_password"
                                    name="confirm_password"
                                    placeholder="Confirm Password"
                                    className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="country" className="block font-medium">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    placeholder="Country"
                                    className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="interests" className="block font-medium">
                                    Interests
                                </label>
                                <input
                                    type="text"
                                    id="interests"
                                    name="interests"
                                    placeholder="Interests"
                                    className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={interests}
                                    onChange={(e) => setInterests(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="occupation" className="block font-medium">
                                    Occupation
                                </label>
                                <input
                                    type="text"
                                    id="occupation"
                                    name="occupation"
                                    placeholder="Occupation"
                                    className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={occupation}
                                    onChange={(e) => setOccupation(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="social_media_links" className="block font-medium">
                                    Social Media Links
                                </label>
                                <input
                                    type="text"
                                    id="social_media_links"
                                    name="social_media_links"
                                    placeholder="Social Media Links"
                                    className="mt-1 block w-[70%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={socialMediaLinks}
                                    onChange={(e) => setSocialMediaLinks(e.target.value)}
                                />
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
                        <div className="buttons flex">
                            <Link
                                to="/user-profile"
                                type=""
                                className="mr-5 flex w-fit rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className=" flex w-fit rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateUser;
