/**
 * Auther: Shyamal Prajapati
 * Banner id: B00958501
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

const AddListing = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        address: "",
        utilities: "",
        price: "",
        category: "",
        location: "",
        numberOfRooms: 0,
        img: [],
        startDate: "",
        endDate: ""
    });

    const [profilePicture, setProfilePicture] = useState([]);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (token === null) {
            console.log("token: ", token);
            navigate("/login");
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setFormData({ ...formData, startDate: date });
    };

    const handleEndDateChange = (date) => {
        if (date < startDate) {
            toast.error("End date cannot be before start date.");
        } else {
            setEndDate(date);
            setFormData({ ...formData, endDate: date });
        } // Update endDate in formData
    };

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files);
        setFormData({ ...formData, images: e.target.files[0] });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validation rules can be implemented here based on your schema

        // Example: Check if required fields are empty
        if (!formData.name) {
            newErrors.name = "Name is required";
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
            newErrors.name = "Name should only contain letters and spaces";
            isValid = false;
        }
        if (!formData.description) {
            newErrors.description = "Description is required";
            isValid = false;
        }
        if (!formData.address) {
            newErrors.address = "Address is required";
            isValid = false;
        }
        if (!formData.price) {
            newErrors.price = "Price is required";
            isValid = false;
        } else if (!/^\d+$/.test(formData.price)) {
            newErrors.price = "Price should only contain digits";
            isValid = false;
        }
        if (!formData.location) {
            newErrors.location = "Location is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm) {
            try {
                // send files along with other data
                const formDataToSend = formData;
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/listings/create-listing`,
                    formDataToSend,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.status === 200) console.log(response.data);
                const formDataRequest = new FormData();
                const file = profilePicture;
                for (let images of profilePicture) {
                    formDataRequest.append("files", images);
                }
                formDataRequest.append("id", response.data._id);
                const uploadImagesResponse = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/listing/upload-photo`,
                    formDataRequest,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                navigate("/listings");
                toast.success("Successfully added listing.");
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            toast.error("Please fill in all required fields.");
        }
    };

    const inputFields = [
        { name: "name", label: "Property Name", placeholder: "Hotel XYZ" },
        { name: "description", label: "Description", placeholder: "Enter description" },
        { name: "address", label: "Address", placeholder: "Enter address" },
        { name: "price", label: "Price", placeholder: "Enter price" },
        { name: "utilities", label: "Utilities", placeholder: "Enter list of utilities" },
        { name: "location", label: "Location", placeholder: "Enter location" },
        { name: "numberOfRooms", label: "Number of Rooms", placeholder: "Enter number of rooms" }
    ];

    return (
        <>
            <ToastContainer />
            <div className="relative mx-auto mt-16 w-full max-w-7xl items-center px-5 py-12 md:px-12 lg:px-20">
                <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
                    <div className="flex flex-col">
                        <div className="items-center justify-center">
                            <h2 className="text-4xl text-black ">Add Listing</h2>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4 space-y-2">
                            {inputFields.map((field, index) => (
                                <div key={index} className="col-span-full">
                                    <label
                                        className="text-12 mb-2 block font-medium text-gray-600"
                                        htmlFor={`property-${index}`}
                                    >
                                        {field.label}
                                    </label>
                                    <input
                                        id={`property-${index}`}
                                        className={`block w-full appearance-none rounded-xl border-2 border-gray-200 bg-white px-6 py-3 text-black placeholder:text-gray-400 focus:border-green-500 sm:text-sm ${
                                            errors[field.name] ? "border-red-500" : ""
                                        }`}
                                        placeholder={field.placeholder}
                                        autoComplete="off"
                                        type="text"
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                    />
                                    {errors[field.name] && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors[field.name]}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <label
                                htmlFor="startDate"
                                className="text-md block text-left font-semibold text-gray-700"
                            >
                                Check-in Date
                            </label>
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                                placeholderText="Select date start"
                            />
                            <label
                                htmlFor="endDate"
                                className="text-md block text-left font-semibold text-gray-700"
                            >
                                Check-out Date
                            </label>
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                className="mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                                placeholderText="Select date end"
                            />
                            <div className="flex w-full items-center justify-center">
                                <label
                                    htmlFor="dropzone-file"
                                    className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                                >
                                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                        <svg
                                            className="mb-4 h-8 w-8 text-gray-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            ></path>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span>{" "}
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                                        </p>
                                    </div>
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        className="hidden"
                                        name="profile_picture"
                                        accept="image/*"
                                        onChange={handleProfilePictureChange}
                                        multiple
                                    />
                                </label>
                            </div>
                            <div className="col-span-full mt-10">
                                <button
                                    className="nline-flex w-full items-center justify-center rounded-xl border-2 border-black bg-sky-700 px-6 py-2.5 text-center text-sm text-white hover:bg-sky-800"
                                    type="submit"
                                >
                                    Add Listing
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddListing;
