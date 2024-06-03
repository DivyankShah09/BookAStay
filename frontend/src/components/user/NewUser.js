/**
 * Name: Dharmil Nareshkumar Shah
 * Banner ID: B00965853
 */
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function NewUser(props) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    console.log(token);

    const location = useLocation();
    const [profilePicture, setProfilePicture] = useState(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    );
    const [travelDestinations, setTravelDestinations] = useState([]);
    const [newDestination, setNewDestination] = useState("");
    const [interests, setInterests] = useState("");
    const [occupation, setOccupation] = useState("");
    const [socialMediaLinks, setSocialMediaLinks] = useState("");
    const [country, setCountry] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString().split("T")[0]);
    const regex = /^[a-zA-Z\s]*$/;

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
        }
    }, [location]);

    const handleDestinationChange = (e) => {
        setNewDestination(e.target.value);
    };

    const handleDestinationKeyPress = (e) => {
        if (e.key === "Enter" && newDestination.trim() !== "") {
            e.preventDefault();
            setTravelDestinations([...travelDestinations, newDestination.trim()]);
            setNewDestination("");
        }
    };

    const handlePhoneNumberChange = (e) => {
        const inputNumber = e.target.value;
        // Remove any non-digit characters from the input
        const formattedNumber = inputNumber.replace(/\D/g, "");
        setPhoneNumber(formattedNumber);
    };

    const handleFirstNameChange = (e) => {
        if (!e.target.value.match(regex)) {
            toast.error("Invalid Name format");
            return;
        }
        setFirstName(e.target.value);
    };
    const handleLastNameChange = (e) => {
        if (!e.target.value.match(regex)) {
            toast.error("Invalid Name format");
            return;
        }
        setLastName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().split("T")[0];

        console.log("Form Submission checks");

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
            // Create the user profile
            const createUserProfileResponse = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/createUserProfile`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        img: null,
                        firstName,
                        lastName,
                        email,
                        gender,
                        dateOfBirth,
                        phoneNumber,
                        address,
                        country,
                        travelDestinations
                    })
                }
            );

            if (!createUserProfileResponse.ok) {
                throw new Error("Failed to create profile");
            }

            const createUserProfileData = await createUserProfileResponse.json();

            console.log("createUserProfileResponse: ", createUserProfileResponse);
            console.log("createUserProfileResponse data: ", createUserProfileData);

            const userId = createUserProfileData.updatedUser._id;

            // Upload the profile picture
            const file = profilePicture;
            console.log("File: ", file);
            const formData = new FormData();
            formData.append("files", file);
            formData.append("id", userId);
            console.log("ID ", userId);

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

            const downloadUrl = profileUploadResponse.data.url;

            // update the img field in the user profile with the new image url
            const updateProfilePictureResponse = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/updateUserProfile`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        id: userId,
                        img: downloadUrl
                    })
                }
            );
            setProfilePicture(downloadUrl);

            toast.success("Profile created successfully!");
            console.log("profileUploadResponse: ", profileUploadResponse);

            // Reset form fields or navigate as needed
            setCountry("");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhoneNumber("");
            setProfilePicture("");
            setTravelDestinations([]);
            setNewDestination("");
            setInterests("");
            setOccupation("");
            setSocialMediaLinks("");
            setAddress("");
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (err) {
            console.error(err);
            toast.error("Failed to create profile or upload image!");
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
                        <h2 className="mb-4 text-2xl font-bold">Create Profile</h2>
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
                                    onChange={handleFirstNameChange}
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
                                    onChange={handleLastNameChange}
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
                                    onChange={(e) => setGender(e.target.value)}
                                    required
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
                                    value={email}
                                    onChange={handleEmailChange}
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
                                <label htmlFor="dob" className="block font-medium">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    required
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
                                        value={newDestination}
                                        onChange={handleDestinationChange}
                                        onKeyPress={handleDestinationKeyPress}
                                        className="flex-grow"
                                    />
                                </div>
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

export default NewUser;
