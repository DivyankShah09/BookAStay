import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Listing from "./components/listing/Listing";
import AddListing from "./components/listing/AddListing";
import UpdateListing from "./components/listing/UpdateListing";
import Home from "./components/home/Home";
import Footer from "./utils/Footer";
import Contact from "./utils/Contact";
import Faq from "./utils/Faq";
import NewUser from "./components/user/NewUser";
import "./input.css";
import UpdateUser from "./components/user/UpdateUser";
import Dashboard from "./components/admin/Dashboard";
import PendingRequests from "./components/admin/PendingRequests";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import { ToastContainer } from "react-toastify";
import CreateServiceProvider from "./components/serviceProvider/CreateServiceProvider";
import UpdateServiceProvider from "./components/serviceProvider/UpdateServiceProvider";
import ServiceProviderDetails from "./components/admin/ServiceProviderDetails";
import UserProfile from "./components/user/UserProfile";
import ServiceProfile from "./components/serviceProvider/ServiceProfile";
import Booking from "./components/listing/Booking";
import PublicListing from "./components/listing/PublicListing";
import BookingHistory from "./components/user/BookingHistory";
import PaymentResult from "./components/Payment/PaymentResult";
import ServiceDashboard from "./components/serviceProvider/ServiceDashboard";

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

function AppContent() {
    const location = useLocation();
    const [showNavbar, setShowNavbar] = useState(true);

    // Function to determine whether to show Navbar based on current location
    const shouldShowNavbar = () => {
        const { pathname } = location;
        return !(
            pathname === "/admin" ||
            pathname === "/pendingRequests" ||
            pathname.includes("/admin/serviceProvider")
        );
    };

    // Update showNavbar state based on current location
    useEffect(() => {
        setShowNavbar(shouldShowNavbar());
    }, [location]);

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                    {showNavbar && <Navbar />} {/* Conditionally render Navbar */}
                    <ToastContainer />
                </div>

                <Routes>
                    {/* <Route exact path="/" element={<Home />} /> */}
                    <Route exact path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/listings" element={<Listing />} />
                    <Route path="/add-listing" element={<AddListing />} />
                    <Route path="/update-listing/:id" element={<UpdateListing />} />
                    <Route path="/booking-details/:id" element={<Booking />} />
                    <Route path="/search" element={<PublicListing />} />
                    <Route exact path="/contactUs" element={<Contact />} />
                    <Route exact path="/faq" element={<Faq />} />
                    <Route exact path="/admin" element={<Dashboard />} />
                    <Route exact path="/pendingRequests" element={<PendingRequests />} />
                    <Route exact path="/create-profile" element={<NewUser />} />
                    <Route path="/update-user-profile" element={<UpdateUser />} />
                    <Route path="/service-provider" element={<CreateServiceProvider />} />
                    <Route path="/update-service-profile" element={<UpdateServiceProvider />} />
                    <Route path="/admin/serviceProvider/:id" element={<ServiceProviderDetails />} />
                    <Route path="/user-profile" element={<UserProfile />} />
                    <Route path="/service-profile" element={<ServiceProfile />} />
                    <Route path="/booking-history" element={<BookingHistory />} />
                    <Route
                        path="/payment/success"
                        element={
                            <PaymentResult message={"Payment Successful"} status={"success"} />
                        }
                    />
                    <Route
                        path="/payment/failure"
                        element={<PaymentResult message={"Payment Failed"} status={"failure"} />}
                    />
                    <Route path="/service-dashboard" element={<ServiceDashboard />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;
