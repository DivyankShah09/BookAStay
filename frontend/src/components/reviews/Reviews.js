import React, { useState } from "react";
import Pagination from "./Pagination";
import Loader from "../../utils/Loader";
import ReviewCard from "./ReviewCard";
import UserRating from "./UserRating";
import Overview from "./Overview";

const Reviews = ({ reviewData }) => {
    const [userRating, setUserRating] = useState(0);

    const [userReview, setUserReview] = useState("");

    const [shouldHideUserRatingsSelector, setShouldHideUserRatingsSelector] = useState(false);

    const [toastMessage, setToastMessage] = useState("");
    const [reviews, setReviews] = useState(reviewData);

    const handleRating = (rate) => {
        setUserRating(rate);
    };

    const handleReviewSubmit = async () => {
        if (userRating === 0) {
            setToastMessage({
                type: "error",
                message: "Please select a rating before submitting."
            });
            return;
        }

        setShouldHideUserRatingsSelector(false);
    };

    const handleUserReviewChange = (review) => {
        setUserReview(review);
    };

    const isEmpty = reviewData?.length === 0;

    return (
        <div className="flex flex-col border-t p-4">
            <h1 className="text-xl font-bold text-gray-700">User Reviews</h1>
            <div className="flex flex-col gap-6 bg-white py-4 shadow-sm md:flex-row">
            </div>
            <div>
                {isEmpty ? (
                    <h2 className="items-center">No data found</h2>
                ) : (
                    <div className="max-h-96 overflow-y-auto">
                        {reviewData?.map((review, index) => (
                            <ReviewCard
                                key={index}
                                reviewerName={review?.firstName + " " + review?.lastName}
                                reviewDate={review?.date
                                    ?.substring(0, 10)
                                    .split("-")
                                    .reverse()
                                    .join("-")}
                                review={review?.comment}
                                rating={review?.rating}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reviews;
