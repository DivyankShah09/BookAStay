import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWifi,
    faTemperatureArrowUp,
    faTv,
    faStar,
    faEdit,
    faFan,
    faDeleteLeft,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import noHotelImg from "../assets/hotelPlaceholder.png";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Card = ({ _id, name, img, price, rating, description, utilities, updateListings }) => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    const navigate = useNavigate();
    const handleUpdateClick = () => {
        navigate(`/update-listing/${_id}`);
    };
    const handleCardClick = () => {
        navigate(`/booking-details/${_id}`); // Navigate to the booking details page with _id as URL parameter
    };
    const handleDelete = async (index) => {
        try {
            // Make API call to delete the item at the given index
            await axios.delete(
                `${process.env.REACT_APP_BACKEND_URL}/api/listings/deleteServiceProvider/${_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            updateListings(_id);
            // Update the state to reflect the deletion
            // const updatedItems = [...items.slice(0, index), ...items.slice(index + 1)];
            // setItems(updatedItems);
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };
    return (
        <>
            <div
                key={_id}
                className="relative z-0 flex w-full max-w-[24rem] cursor-pointer flex-col rounded-lg border-2 bg-stone-50 bg-clip-border text-gray-700 shadow-xl xl:mx-2 xl:mb-10 xl:mt-6"
            >
                {/* CARD STARTING */}
                <div className="bg-blue-gray-500 shadow-blue-gray-500/40 relative mx-4 mt-4 overflow-hidden rounded-xl bg-clip-border text-white shadow-lg">
                    <img className="h-48 w-full" src={img?.[0] ? img[0] : noHotelImg} alt={name} />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                    {/* Update button */}
                    {userType === "Service Provider" ? (
                        <div>
                            <button
                                className="absolute right-16 top-4 z-10 h-8 w-10 rounded-full bg-white text-center align-middle font-medium text-blue-600"
                                type="button"
                                onClick={handleUpdateClick}
                            >
                                <FontAwesomeIcon icon={faEdit} className="h-6 w-6 text-blue-600" />
                            </button>
                            <button
                                className="absolute right-4 top-4 z-10 h-8 w-10 rounded-full bg-white text-center align-middle font-medium text-blue-600"
                                type="button"
                                onClick={handleDelete}
                            >
                                <FontAwesomeIcon icon={faTrash} className="h-6 w-6 text-blue-600" />
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                {/* FEATURES */}
                <div className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <h5 className="text-blue-gray-900 block font-sans text-xl font-bold leading-snug tracking-normal antialiased">
                            {name}
                        </h5>
                        <p className="text-blue-gray-900 flex items-center gap-1.5 text-base font-medium leading-relaxed antialiased">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                            {Math.ceil(rating * 10) / 10 || 0}
                        </p>
                    </div>
                    <span className="font-bold">${price}</span>
                    <p className="block font-sans text-base font-light leading-tight text-gray-700 antialiased">
                        {description.split(" ").slice(0, 10).join(" ")}
                    </p>
                    <div className="group mt-2 inline-flex flex-wrap items-center gap-5">
                        {
                            // if utilities include heater then show heater icon
                            utilities && utilities.includes("heater") ? (
                                <span
                                    data-tooltip-target="heater"
                                    className="cursor-pointer rounded-full border border-red-800/5 bg-red-800/5 p-3 text-sky-600 transition-colors hover:border-red-800/10 hover:bg-red-800/10 hover:!opacity-100 group-hover:opacity-70"
                                >
                                    <FontAwesomeIcon icon={faTemperatureArrowUp} />
                                </span>
                            ) : (
                                <></>
                            )
                        }
                        {
                            // if utilities include wifi then show wifi icon
                            utilities && utilities.includes("Wifi") ? (
                                <span
                                    data-tooltip-target="wifi"
                                    className="cursor-pointer rounded-full border border-red-800/5 bg-red-800/5 p-3 text-sky-600 transition-colors hover:border-red-800/10 hover:bg-red-800/10 hover:!opacity-100 group-hover:opacity-70"
                                >
                                    <FontAwesomeIcon icon={faWifi} />
                                </span>
                            ) : (
                                <></>
                            )
                        }
                        {
                            // fan
                            utilities && utilities.includes("AC") ? (
                                <span
                                    data-tooltip-target="fan"
                                    className="cursor-pointer rounded-full border border-red-800/5 bg-red-800/5 p-3 text-sky-600 transition-colors hover:border-red-800/10 hover:bg-red-800/10 hover:!opacity-100 group-hover:opacity-70"
                                >
                                    <FontAwesomeIcon icon={faFan} />
                                </span>
                            ) : (
                                <></>
                            )
                        }
                        {
                            //tv
                            utilities && utilities.includes("TV") ? (
                                <span
                                    data-tooltip-target="tv"
                                    className="cursor-pointer rounded-full border border-red-800/5 bg-red-800/5 p-3 text-sky-600 transition-colors hover:border-red-800/10 hover:bg-red-800/10 hover:!opacity-100 group-hover:opacity-70"
                                >
                                    <FontAwesomeIcon icon={faTv} />
                                </span>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                </div>
                {/* SUBMIT */}
                <div className="p-6 pt-2">
                    <button
                        type="button"
                        onClick={handleCardClick}
                        class="mb-2 mr-2 block w-full rounded-lg bg-sky-600 bg-gradient-to-r px-5 py-3.5 text-center align-middle text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-sky-800"
                    >
                        VIEW DETAILS
                    </button>
                </div>
            </div>
        </>
    );
};

export default Card;
