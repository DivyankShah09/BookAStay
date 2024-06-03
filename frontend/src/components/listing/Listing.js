/**
 * Auther: Shyamal Prajapati
 * Banner id: B00958501
 */

import React, { useEffect, useState } from "react";
import Card from "../../utils/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Listing = () => {
    const userType = localStorage.getItem("userType");
    const token = localStorage.getItem("token");
    const userId = token.userId;
    const [showVerificationModal, setShowVerificationModal] = useState(false);

    const navigate = useNavigate();
    const handleAddListing = () => {
        console.log("***********");
        if (user.isVerified === "approved"){ 
            navigate("/add-listing");
        }
        else {
            console.log("!@@@@@########");
            setShowVerificationModal(true);
        }
    };
    const handleUpdateListing = () => {
        navigate("/update-listing");
    };

    const [user, setUser] = useState();

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/getServiceProfile`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUserDetails()
    },[]);

    const [listings, setListings] = useState([]);
    let updatedListings = [];

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/listings/listings`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (JSON.stringify(response.data) !== JSON.stringify(listings)) {
                    setListings(response.data);
                }
            } catch (error) {
                console.error("Error fetching listings:", error);
            }
        };

        fetchListings();
    }, []);

    const updateListings = (deletedListingId) => {
        // Filter out the deleted listing from the listings array
        const updatedListings = listings.filter((listing) => listing._id !== deletedListingId);
        // Update the listings state with the filtered array
        setListings(updatedListings);
    };

    return (
        <>
            <div className="grid sm:flex sm:justify-between">
                <div>
                    <h1 className="relative top-20 mb-6 ml-14 mt-10 grid-rows-1 text-3xl font-bold text-gray-800 underline">
                        My Listings
                    </h1>
                </div>
                <div className="mx-auto mb-10 mt-16 flex flex-col sm:mr-6 sm:mt-32 sm:grid-rows-2 sm:flex-row sm:items-center sm:justify-end">
                    <button
                        onClick={handleAddListing}
                        className="mb-2 w-full rounded bg-orange-600 px-4 py-2 font-bold text-white hover:bg-orange-700 sm:mb-0 sm:mr-2 sm:w-auto"
                    >
                        Add Listing
                    </button>
                    {showVerificationModal && (
                        <div
                            id="static-modal"
                            data-modal-backdrop="static"
                            tabIndex="-1"
                            aria-hidden="true"
                            className="fixed left-0 right-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50"
                        >
                            <div className="relative rounded-lg bg-white shadow">
                                <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        Book A Stay
                                    </h3>
                                    <button
                                        type="button"
                                        className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => setShowVerificationModal(false)}
                                    >
                                        <svg
                                            className="h-3 w-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="space-y-4 p-4 md:p-5">
                                    <p className="text-base leading-relaxed text-red-500 dark:text-gray-400">
                                        Account is still under verification!
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="min-w-screen mx-6 grid grid-cols-1 items-center justify-center gap-6 overflow-x-auto outline-none focus:outline-none sm:grid-cols-2 xl:grid-cols-4">
                {listings.map((detail) => (
                    <Card key={detail.id} {...detail} updateListings={updateListings} />
                ))}
            </div>
        </>
    );
};

export default Listing;
