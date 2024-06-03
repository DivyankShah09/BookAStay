/**
 * Auther: Shyamal Prajapati
 * Banner id: B00958501
 */

import React, { useState, useEffect } from "react";
import { differenceInCalendarDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import axios from "axios";

const BookingSidebar = ({ hotelCode }) => {
    const token = localStorage.getItem("token");
    const storedUserType = localStorage.getItem("userType");
    const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const navigate = useNavigate();

    // State for error message
    const [errorMessage, setErrorMessage] = useState("");

    // State for date range
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: "selection"
        }
    ]);

    // State for selected room, guests, and rooms
    const [selectedRoom, setSelectedRoom] = useState({
        value: "1 King Bed Standard Non Smoking",
        label: "1 King Bed Standard Non Smoking"
    });
    const [selectedGuests, setSelectedGuests] = useState({
        value: 2,
        label: "2 guests"
    });
    const [selectedRooms, setSelectedRooms] = useState({
        value: 1,
        label: "1 room"
    });

    // State for pricing and booking details
    const [total, setTotal] = useState(0);
    const [bookingPeriodDays, setBookingPeriodDays] = useState(1);
    const [bookingDetails, setBookingDetails] = useState({
        currentNightRate: hotelCode.price,
        maxGuestsAllowed: 4,
        maxRoomsAllowedPerGuest: 2,
        cancellationPolicy: "Cancellation policy details",
        name: hotelCode.name,
        checkInTime: "15:00",
        checkOutTime: "11:00"
    });
    const roomOptions = [
        {
            value: "1 King Bed Standard Non Smoking",
            label: "1 King Bed Standard Non Smoking"
        }
    ];
    const guestOptions = Array.from({ length: bookingDetails.maxGuestsAllowed }, (_, i) => ({
        value: i + 1,
        label: `${i + 1} guest`
    }));
    const roomNumberOptions = Array.from(
        { length: bookingDetails.maxRoomsAllowedPerGuest },
        (_, i) => ({ value: i + 1, label: `${i + 1} room` })
    );

    // Handlers for select changes
    const handleRoomTypeChange = (selectedOption) => {
        setSelectedRoom(selectedOption);
        calculatePrices();
    };
    const handleGuestsNumberChange = (selectedOption) => {
        setSelectedGuests(selectedOption);
    };
    const handleRoomsNumberChange = (selectedOption) => {
        setSelectedRooms(selectedOption);
        calculatePrices();
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (date > endDate) {
            setEndDate(date);
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const onDatePickerIconClick = () => {
        setisDatePickerVisible(!isDatePickerVisible);
    };

    const onDateChangeHandler = (ranges) => {
        const { startDate, endDate } = ranges.selection;
        setDateRange([ranges.selection]);
        const days = startDate && endDate ? differenceInCalendarDays(endDate, startDate) + 1 : 1;
        setBookingPeriodDays(days);
        calculatePrices();
    };

    const calculatePrices = () => {
        const days = startDate && endDate ? differenceInCalendarDays(endDate, startDate) + 1 : 1;
        setBookingPeriodDays(days);
        const pricePerNight = hotelCode.price * selectedRooms.value;
        const totalPrice = (pricePerNight * bookingPeriodDays).toFixed(2);
        setTotal(totalPrice);
    };
    // console.log("Booking id", hotelCode);
    const checkoutRequest = {
        listingId: hotelCode._id,
        price_amount: total ? total : hotelCode.price
    };
    console.log(checkoutRequest);
    const onBookingConfirm = async (res) => {
        console.log("url: ", process.env.REACT_APP_BACKEND_URL);
        res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/create-checkout-session`,
            checkoutRequest,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (res.status === 200) {
            window.location.href = res.data.url;
        }
    };

    const dismissError = () => {
        setErrorMessage("");
    };

    useEffect(() => {
        calculatePrices();
    }, [bookingPeriodDays, selectedRooms, selectedRoom, bookingDetails, endDate, startDate]);

    return (
        <>
            <div className="mx-2 mt-2 w-full overflow-hidden rounded-xl bg-white shadow-xl md:mt-0 md:w-[380px]">
                <div className="bg-blue-800 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">Booking Details</h2>
                </div>
                <div className="px-6 py-2 text-sm md:text-base">
                    {/* Total Price */}
                    <div className="mb-4">
                        <div className="mb-1 text-lg font-semibold text-gray-800">Total Price</div>
                        <div className="text-xl font-bold text-indigo-600">
                            {"$ "}
                            {total === null || isNaN(total) ? hotelCode?.price?.toFixed(2) : total}
                        </div>
                        <div className="text-sm text-green-600">
                            {bookingDetails.cancellationPolicy}
                        </div>
                    </div>
                    {/* Dates & Time */}
                    <div className="mb-4">
                        <div className="font-semibold text-gray-800">Dates & Time</div>
                        <div className="text-gray-600">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                className="mr-8 mt-1 block w-28 rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-4 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                                placeholderText="Select date start"
                            />
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                className="mr-2 mt-1 block w-28 rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-4 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                                placeholderText="Select date end"
                            />
                        </div>
                    </div>
                    {/* Reservation */}
                    <div className="mb-4">
                        <div className="mb-2 font-semibold text-gray-800">Reservation type</div>
                        <Select
                            value={selectedRooms}
                            onChange={handleRoomsNumberChange}
                            options={roomNumberOptions}
                            className="mb-4 cursor-pointer"
                        />
                        <Select
                            value={selectedGuests}
                            onChange={handleGuestsNumberChange}
                            options={guestOptions}
                        />
                    </div>

                    {/* Room Type */}
                    <div className="mb-4">
                        <div className="font-semibold text-gray-800">Room Type</div>
                        <Select
                            value={selectedRoom}
                            onChange={handleRoomTypeChange}
                            options={roomOptions}
                        />
                    </div>

                    {/* Per day rate */}
                    <div>
                        <div className="font-semibold text-gray-800">Per day rate</div>
                        <div className="text-gray-600">$ {hotelCode.price} / day</div>
                    </div>
                </div>
                <div className="bg-gray-50 px-6 pb-4">
                    {storedUserType === "Service Provider" ? (
                        <div></div>
                    ) : (
                        <button
                            onClick={onBookingConfirm}
                            className="w-full rounded bg-orange-600 py-2 text-white transition duration-300 hover:bg-orange-800"
                        >
                            Confirm Booking
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default BookingSidebar;
