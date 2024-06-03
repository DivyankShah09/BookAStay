import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

const UserRating = ({
    userRating,
    handleRating,
    isEmpty,
    userReview,
    handleReviewSubmit,
    handleUserReviewChange
}) => {
    <div
        className={`${
            isEmpty ? "md:w-full" : "md:w-2/5"
        } flex flex-col items-center justify-center pl-0 md:border-l md:pl-4`}
    >
        <div className="text-lg font-semibold text-gray-700">Your Rating</div>
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                    key={star}
                    icon={star <= userRating ? fasStar : farStar}
                    className={`mx-1 cursor-pointer text-2xl ${
                        star <= userRating ? "text-yellow-400" : "text-gray-400"
                    }`}
                    onClick={() => handleRating(star)}
                />
            ))}
        </div>
        <textarea
            rows={3}
            className="my-2 w-full border p-2"
            value={userReview}
            onChange={(e) => handleUserReviewChange(e.target.value)}
        />
        <button
            className="bg-brand focus:shadow-outline my-2 w-full rounded px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            onClick={handleReviewSubmit}
        >
            Submit
        </button>
    </div>;
};

export default UserRating;
