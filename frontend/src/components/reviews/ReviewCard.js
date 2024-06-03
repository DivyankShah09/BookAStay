import React from "react";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReviewCard = (props) => {
    const { reviewerName, reviewDate, review, rating } = props;
    return (
        <div className="border-t py-3">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faUserCircle} className="mr-2 text-2xl text-gray-300" />
                    <h4 className="font-semibold text-gray-700">{reviewerName} </h4>
                </div>
                <div className="mt-4 flex items-center">
                    <p className="text-md text-yellow-500">{rating}</p>
                    <svg
                        className="ml-1 h-4 w-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 12.585l-4.95 3.563 1.9-5.85L2.1 7.852l5.95-.435L10 2l2.95 5.417 5.95.435-4.85 3.563 1.9 5.85L10 12.585z" />
                    </svg>
                </div>
            </div>
            <p className="text-sm text-gray-500">{reviewDate}</p>
            <p className="mt-2">{review}</p>
        </div>
    );
};

export default ReviewCard;
