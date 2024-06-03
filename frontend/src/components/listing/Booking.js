/**
 * Auther: Shyamal Prajapati
 * Banner id: B00958501
 */

import React, { useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import BookingSidebar from "./BookingSidebar";
import Reviews from "../reviews/Reviews";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Booking = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const userId = localStorage.getItem("userId");
    const [hotelDetails, setHotelDetails] = useState({});
    const [image, setImage] = useState([]);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [rating, setRating] = useState();
    const [comment, setComment] = useState();
    const token = localStorage.getItem("token");
    const fetchHotelDetails = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/listings/listings/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setHotelDetails(response.data);
        } catch (error) {
            console.error("Error fetching hotel details:", error);
        }
    };

    useEffect(() => {
        if (token === null) {
            console.log("token: ", token);
            navigate("/login");
        }
    }, [token, navigate]);

    useEffect(() => {
        fetchHotelDetails();
    }, []);

    const add_review_url = `${process.env.REACT_APP_BACKEND_URL}/api/listings/add_review`;
    // add review submit api call to backend
    const callReviewSubmit = async () => {
        const reviewData = {
            listingId: id,
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            rating: rating,
            comment: comment
        };

        const response = await axios.post(add_review_url, reviewData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setFirstName("");
        setLastName("");
        setRating("");
        setComment("");
        fetchHotelDetails();
    };

    const images = hotelDetails?.img?.map((image) => ({
        original: image,
        thumbnail: image,
        thumbnailClass: "h-[80px]",
        thumbnailLoading: "lazy"
    }));

    const [reviewData, setReviewData] = useState({
        isLoading: true,
        data: []
    });

    return (
        <div className="container mx-auto mt-20 flex flex-wrap items-start justify-center p-4 md:flex-nowrap">
            <div className="w-[800px] overflow-hidden rounded-lg bg-white shadow-lg">
                <div>
                    <div className="relative w-full">
                        <ReactImageGallery
                            items={images ?? []}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            infinite={true}
                            lazyLoad={true}
                            autoPlay={true}
                            showNav={false}
                            className="max-h-48"
                        />
                    </div>
                    <div className="p-4">
                        <h2 className="mb-2 text-3xl font-semibold text-gray-800">
                            {hotelDetails.name}
                        </h2>
                        <p className="mb-4 text-sm text-gray-600">
                            Address: {hotelDetails.address}
                        </p>
                        <p className="mb-4 text-base text-gray-600">{hotelDetails.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                            <div>
                                {hotelDetails.utilities && hotelDetails.utilities.length > 0 && (
                                    <div>
                                        <p className="text-base text-gray-600">
                                            Features include: {hotelDetails.utilities.join(" | ")}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t p-4">
                    <h1 className="mt-2 text-xl font-bold text-gray-700">Add Review</h1>
                    <div className="md:w-100 w-1/2 text-center lg:w-1/2">
                        <input
                            className="my-2 h-12 w-full rounded-md border-2 border-gray-400 px-2 disabled:border-gray-200"
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            className="my-2 h-12 w-full rounded-md border-2 border-gray-400 px-2 disabled:border-gray-200"
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            className="my-2 h-12 w-full rounded-md border-2 border-gray-400 px-2 disabled:border-gray-200"
                            type="number"
                            placeholder="Rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                        <input
                            className="my-2 h-12 w-full rounded-md border-2 border-gray-400 px-2 disabled:border-gray-200"
                            type="text"
                            placeholder="Comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            className="text-1xl z-5 my-3 h-12 w-full rounded-lg bg-blue-500 px-8 py-2 text-white shadow-md hover:bg-blue-950 disabled:bg-blue-400"
                            onClick={callReviewSubmit}
                        >
                            Submit Review
                        </button>
                    </div>
                </div>

                <Reviews reviewData={hotelDetails?.reviews} />
            </div>

            <BookingSidebar hotelCode={{ ...hotelDetails }} />
        </div>
    );
};

export default Booking;
