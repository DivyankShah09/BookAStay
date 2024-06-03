import React, { useEffect, useState } from "react";
import ListingTable from "./ListingTable";
import axios from "axios";
import { Alert } from "@mui/material";

function ServiceDashboard() {
    const [listing, setListing] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const {data} = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/bookings/serviceProvider`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setListing(data);
                console.log("Booking service: ", data);
            } catch (error) {
                console.log("Error in fetching listing");
            }
        };
        fetchListings();
    }, [token]);
    return (
        <>
            <>
                <div style={{ marginTop: 70, padding: 20 }}>
                    <h1 className="text-5xl">Current Bookings</h1>
                    <br />
                    <br />
                    {listing && listing.length > 0 ? (
                        <ListingTable
                            listings={listing}
                            // onClickHandler={onBookingClickHandler}
                        />
                    ) : (
                        <Alert severity="error">No Current Bookings</Alert>
                    )}
                </div>
            </>
        </>
    );
}

export default ServiceDashboard;
