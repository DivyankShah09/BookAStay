import React, { useState } from "react";
import backgroundImage from "../../assets/hotel2.jpg";
import Card from "../../utils/Card";
import { dummyDetails, cities } from "../../utils/data";
import Testimonials from "./Testimonials";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const Home = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (date > endDate) {
            setEndDate(date);
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    // Function to handle the change of location
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };


    return (
        <>
            <section
                style={{
                    backgroundImage: `linear-gradient(rgba(0,  0,  0,  0.2), rgba(0,  0,  0,  0.8)), url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    width: "100%",
                    margin: "0",
                    padding: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center"
                }}
            >
                <div class="mx-auto max-w-7xl items-center px-8 py-12 md:px-12 lg:px-16 lg:py-24">
                    <div class="max-auto w-full justify-center text-center lg:p-10">
                        <div class="mx-auto w-full justify-center">
                            <span class="mt-8 text-5xl font-medium tracking-tighter text-white">
                                Discover Luxury Living at <br />
                                <span className="bg-gradient-to-r from-red-500 to-sky-600 bg-clip-text text-5xl text-transparent md:text-7xl lg:text-7xl">
                                    {" "}
                                    Book-A-Stay
                                </span>
                            </span>
                            <br />
                            <span class="mx-auto mt-2 max-w-xl pt-20 text-2xl tracking-tight text-white">
                                Where luxury meets comfort
                            </span>
                        </div>

                        {/* INPUT COMPONENT */}
                        <div className="mt-10 flex flex-col rounded-xl bg-white bg-opacity-40 p-8 backdrop-blur-md md:flex-row">
                            <div className="relative md:w-auto flex flex-col mr-10 mb-2" style={{ width: windowWidth <= 480 ? "100%" : "auto" }}>
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

                            <div className="relative md:w-auto flex flex-col mr-10 mb-2" style={{ width: windowWidth <= 480 ? "100%" : "auto" }}>
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
                            
                            <div className="relative md:w-auto flex flex-col mr-10 mb-2" style={{ width: windowWidth <= 480 ? "100%" : "auto" }}>
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
                                    {
                                        cities.map((city) => (
                                            <option key={city} value={city}>{city}</option>
                                        ))
                                    }

                                </select>
                            </div>

                            <Link
                                to={"/search?" + new URLSearchParams({ startDate, endDate, location })}
                                className="mt-8 h-8 btn rounded bg-orange-500 px-3 py-1 font-semibold text-white duration-500 hover:bg-orange-700 md:static"
                            >
                                Search
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* LISTING COMPONENT */}
            <div>
                <h1 className="my-4 ml-10 text-3xl font-bold xl:mt-6">
                    Famous Hotels in your area
                </h1>
            </div>
            {/* Cards for of famous hotels */}
            <div className="min-w-screen mx-6 grid grid-cols-1 items-center justify-center gap-6 overflow-x-auto outline-none focus:outline-none sm:grid-cols-2 xl:grid-cols-4">
                {dummyDetails.slice(0, 4).map((detail) => (
                    <Card key={detail.id} {...detail} />
                ))}
            </div>

            <div class="mt-10 flex items-center justify-center">
                <button
                    type="button"
                    class="mb-10 inline-flex w-52 items-center justify-center rounded-lg bg-sky-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
                >
                    See More!
                    <svg
                        class="ml-2 h-3.5 w-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0  0  14  10"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1  5h12m0  0L9  1m4  4L9  9"
                        />
                    </svg>
                </button>
            </div>

            {/* TESTIMONIALS */}
            <div className="flex w-full items-center justify-center">
                <hr className="w-1/2 border-2" />
            </div>
            <div className="flex items-center justify-center">
                <h1 className="text-center text-4xl font-bold xl:mt-10">
                    What our customers have to say...
                </h1>
            </div>
            <Testimonials />
        </>
    );
};

export default Home;
