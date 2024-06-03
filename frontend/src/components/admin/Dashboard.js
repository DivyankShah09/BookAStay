/**
 * Name: Nikunj Lalitkumar Hudka
 * Banner ID: B00959783
 */
import React, { useEffect } from "react";
import VerifiedUsers from "./VerifiedUsers";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token === null) {
            console.log("token: ", token);
            navigate("/login");
        }
    }, [token, navigate]);
    return (
        <>
            <Navbar />
            <div className="flex">
                {/* SIDEBAR */}
                <Sidebar />
                {/* TABLE COMPONENT */}
                <VerifiedUsers />
            </div>
        </>
    );
};

export default Dashboard;
