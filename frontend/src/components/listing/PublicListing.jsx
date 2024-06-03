/**
 * Name: Aman Harishkumar Desai
 * Banner ID: B00965752
 */
import { React, useEffect, useState } from "react";
import Card from "../../utils/Card";
import { amenitiesData, cities, sortingOptions } from "../../utils/data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Checkbox from "../../utils/CheckBox";
import axios from "axios";
import { toast } from "react-toastify";
import { urlBuilder } from "../../utils/SearchUrlBuilder";

const PublicListing = () => {
    const [searchText, setSearchText] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [sort, setSort] = useState("priceAsc");
    const [isActive, setIsActive] = useState(false);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [selectedRating, setSelectedRating] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [listingData, setListingData] = useState([]);
    let updatedListings = [];

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");
    console.log("User type:", userType);

    if (userType === "Service Provider") {
        updatedListings = listingData.filter((listing) => listing.owner === userId);
    } else {
        updatedListings = null;
    }

    const fetchFilteredData = async (loc) => {
        // const token = localStorage.getItem("token");
        setIsLoading(true);
        setListingData([]);
        var baseUrl = process.env.REACT_APP_BACKEND_URL;

        const filterDataApi = urlBuilder(
            baseUrl,
            startDate,
            endDate,
            searchText,
            loc,
            location,
            sort,
            selectedAmenities,
            selectedRating
        );

        try {
            const response = await axios.get(filterDataApi, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.message === "Success") {
                console.log("Filtered data:", response.data.data);
                setListingData(response.data.data);
            }
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const handleRatingChange = (event) => {
        const rating = parseInt(event);
        const updatedRating = selectedRating.includes(rating)
            ? selectedRating.filter((item) => item !== rating)
            : [...selectedRating, rating];
        setSelectedRating(updatedRating);
    };

    const handleAmenitiesChange = (amenityName, isChecked) => {
        const updatedAmenities = isChecked
            ? [...selectedAmenities, amenityName]
            : selectedAmenities.filter((item) => item !== amenityName);
        setSelectedAmenities(updatedAmenities);
    };

    const toggleModal = (event) => {
        setIsActive(event);
    };

    useEffect(() => {
        // get date from the url
        const url = new URL(window.location.href);
        const startDate = url.searchParams.get("startDate");
        const endDate = url.searchParams.get("endDate");
        const location = url.searchParams.get("location");
        console.log("Location from url", location);

        // set the date
        setStartDate(startDate ? new Date(startDate) : new Date());
        setEndDate(endDate ? new Date(endDate) : new Date());
        setLocation(location ? location : "");

        fetchFilteredData(location);
    }, []);

    // Function to handle the change of start date
    const handleStartDateChange = (date) => {
        setStartDate(date);
        // Optionally, you can also set the endDate to be at least the startDate
        if (date > endDate) {
            setEndDate(date);
        }
    };

    // Function to handle the change of end date
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    // Function to handle the change of location
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const getContentStyle = () => {
        if (windowWidth <= 768) {
            return {
                width: "90%",
                // height: '70%',
                borderRadius: "20px",
                padding: "20px",
                border: "none",
                background: "#F0F0F0"
            };
        } else if (windowWidth <= 480) {
            return {
                width: "95%",
                // height: '60%',
                borderRadius: "20px",
                padding: "20px",
                border: "none",
                background: "#F0F0F0"
            };
        } else {
            return {
                width: "35%",
                // height: '80%',
                borderRadius: "20px",
                padding: "20px",
                border: "none",
                background: "#F0F0F0"
            };
        }
    };
    const handleApplyFilters = () => {
        // Apply filters logic here, e.g., make API call with selectedAmenities and selectedRating
        console.log("Selected Amenities:", selectedAmenities);
        console.log("Selected Rating:", selectedRating);
        fetchFilteredData();
        // Close the popup
        toggleModal(false);
        setIsActive(false);
    };

    useEffect(() => {
        console.log("Selected active:", isActive);
    }, [isActive]);
    return (
        <div className="relative w-full flex-col items-center justify-center">
            <div
                className="mt-20 flex flex-wrap"
                style={{ marginLeft: windowWidth <= 1262 ? "25px" : "36px" }}
            >
                <div
                    className="relative mb-2 mr-10 flex flex-col md:w-auto"
                    style={{ width: windowWidth <= 480 ? "100%" : "auto" }}
                >
                    <label
                        htmlFor="searchText"
                        className="text-md text-left font-semibold text-gray-700"
                    >
                        Search
                    </label>
                    <input
                        type="text"
                        id="searchText"
                        name="searchText"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="mt-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                        placeholder="Search for a listing"
                    />
                </div>
                <div
                    className="relative mb-2 mr-10 flex flex-col md:w-auto"
                    style={{ width: windowWidth <= 480 ? "100%" : "auto" }}
                >
                    <label
                        htmlFor="startDate"
                        className="text-md text-left font-semibold text-gray-700"
                    >
                        Check-in Date
                    </label>
                    <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                        placeholderText="Select date start"
                    />
                </div>
                <div
                    className="relative mb-2 mr-10 flex flex-col md:w-auto"
                    style={{ width: windowWidth <= 480 ? "100%" : "auto" }}
                >
                    <label
                        htmlFor="endDate"
                        className="text-md text-left font-semibold text-gray-700"
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
                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                        placeholderText="Select date end"
                    />
                </div>
                <div
                    className="relative mb-2 mr-10 flex flex-col md:w-auto"
                    style={{ width: windowWidth <= 480 ? "100%" : "auto" }}
                >
                    <label
                        htmlFor="location"
                        className="text-md text-left font-semibold text-gray-700"
                    >
                        Location
                    </label>
                    <select
                        className="mt-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                        value={location}
                        onChange={handleLocationChange}
                    >
                        <option value="">Select location</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
                <div
                    className="relative mb-2 mr-10 flex flex-col md:w-auto"
                    style={{ width: windowWidth <= 480 ? "100%" : "auto" }}
                >
                    <label htmlFor="sort" className="text-md text-left font-semibold text-gray-700">
                        Sort by
                    </label>
                    <select
                        className="mt-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                        value={sort}
                        onChange={handleSortChange}
                    >
                        {sortingOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <Popup
                    open={isActive}
                    trigger={
                        <div
                            className="relative mb-2 mr-10 flex flex-col md:w-auto"
                            style={{ width: windowWidth <= 480 ? "100%" : "auto" }}
                        >
                            <label htmlFor="filter" className="text-md text-left font-semibold">
                                Apply Filters
                            </label>

                            <button
                                className="mt-1 inline-flex items-center rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                                onClick={() => toggleModal(true)}
                            >
                                <svg
                                    className="text-gray-800"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M10.83 5a3.001 3.001 0 0 0-5.66 0H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17ZM4 11h9.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2Zm1.17 6H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17a3.001 3.001 0 0 0-5.66 0Z" />
                                </svg>

                                <span className="ml-2">Filter Options</span>
                            </button>
                        </div>
                    }
                    modal
                    contentStyle={getContentStyle()}
                >
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-start">
                            <div className="mb-2 text-lg font-semibold text-gray-700">
                                Select Amenities
                            </div>
                            <div className="flex flex-wrap justify-start">
                                {amenitiesData.map((amenity) => (
                                    <label
                                        key={amenity.toLowerCase()}
                                        className="mb-2 inline-flex w-1/3 items-center md:w-1/4"
                                    >
                                        <Checkbox
                                            id={amenity.toLowerCase()}
                                            value={amenity}
                                            label={amenity}
                                            onChanged={handleAmenitiesChange}
                                            propsIsChecked={selectedAmenities.includes(amenity)}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Rating Selection */}
                        <div className="flex flex-col items-start">
                            <div>
                                <div className="mb-4 text-lg font-semibold  text-gray-700">
                                    Select Rating
                                </div>
                                <div className="flex flex-wrap justify-start">
                                    {Array.from({ length: 6 }, (_, index) => (
                                        <div
                                            key={`rating-container-${index + 1}`}
                                            className="mb-2 inline-flex flex-wrap items-center"
                                            style={{ width: "30%" }}
                                        >
                                            {index + 1 === 6 ? (
                                                <div className=" mb-2 items-center" />
                                            ) : (
                                                <Checkbox
                                                    id={`rating-${index + 1}`}
                                                    value={index + 1}
                                                    label={`${index + 1} Star`}
                                                    onChanged={handleRatingChange}
                                                    propsIsChecked={selectedRating.includes(
                                                        index + 1
                                                    )}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buttons to Apply or Close */}
                    <div className="mt-2 flex justify-center">
                        <button
                            className="btn rounded bg-orange-500 px-3 py-1 font-semibold text-white duration-500 hover:bg-orange-700 md:static"
                            onClick={handleApplyFilters}
                        >
                            Apply
                        </button>
                        <div className="ml-4" />
                        <button
                            className="btn rounded bg-orange-500 px-3 py-1 font-semibold text-white duration-500 hover:bg-orange-700 md:static"
                            onClick={() => toggleModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </Popup>

                <div
                    className="relative mb-2 mr-10 flex flex-col md:w-auto"
                    style={{ width: windowWidth <= 480 ? "100%" : "auto" }}
                >
                    <label
                        htmlFor="filter"
                        className="text-md text-left font-semibold text-transparent"
                        style={{ display: windowWidth <= 480 ? "none" : "inline" }}
                    >
                        Search button
                    </label>
                    <button
                        className="btn mt-2 rounded bg-orange-500 px-3 py-1 font-semibold text-white duration-500 hover:bg-orange-700 md:static"
                        onClick={(_) => fetchFilteredData()}
                    >
                        Search
                    </button>
                </div>
            </div>
            {isLoading ? (
                <div className="flex w-screen items-center justify-center">
                    <div className="mt-20 text-2xl font-semibold text-gray-700">Loading...</div>
                </div>
            ) : listingData.length === 0 ? (
                <div className="flex w-screen items-center justify-center">
                    <div className="mt-20 text-2xl font-semibold text-gray-700">
                        No listings found <br /> <span>Please change your preferences for finding listings</span>
                    </div>
                </div>
            ) : (
                <div className="min-w-screen mx-6 grid grid-cols-1 items-center justify-center gap-6 overflow-x-auto outline-none focus:outline-none sm:grid-cols-2 xl:grid-cols-4">
                    {userType === "Service Provider"
                        ? updatedListings.map((detail) => <Card key={detail.id} {...detail} />)
                        : listingData.map((detail) => <Card key={detail.id} {...detail} />)}
                </div>
            )}
        </div>
    );
};

export default PublicListing;
