/**
 * Name: Nikunj Lalitkumar Hudka
 * Banner ID: B00959783
 */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

    const toggleHamburgerMenu = () => {
        setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        localStorage.removeItem("userId");
        setIsMenuOpen(false);
        navigate("/");
    };

    return (
        <>
            <nav className="w-full border-b bg-black">
                <div className="relative flex w-full flex-row bg-black p-2 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
                    <div className="flex flex-row items-center justify-between lg:justify-start">
                        <button
                            className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white focus:text-white focus:outline-none md:hidden"
                            onClick={toggleHamburgerMenu}
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className="inline-flex"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                                <path
                                    className={`hidden ${isMenuOpen ? "" : "inline-flex"}`}
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                        <div className="flex cursor-pointer items-center gap-1 text-2xl font-bold">
                            <FontAwesomeIcon
                                icon={faHotel}
                                className="text-primary h-7 w-7 text-sky-600"
                            />
                            <span className="text-white">
                                <Link to={"/admin"}>
                                    Book<span className="text-orange-500">A</span>Stay
                                </Link>
                            </span>
                        </div>
                        {isHamburgerMenuOpen && (
                            <div
                                className={`fixed left-0 top-0 z-50 h-screen w-64 transform bg-gray-300 transition-transform duration-300 ease-in-out ${isHamburgerMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
                            >
                                <div className="flex h-full w-full flex-col overflow-y-auto">
                                    <div className="flex items-center justify-between bg-black p-3">
                                        <div className="flex cursor-pointer items-center gap-1 text-2xl font-bold">
                                            <FontAwesomeIcon
                                                icon={faHotel}
                                                className="text-primary h-7 w-7 text-sky-600"
                                            />
                                            <span className="text-white">
                                                <Link to={"/admin"}>
                                                    Book<span className="text-orange-500">A</span>
                                                    Stay
                                                </Link>
                                            </span>
                                        </div>
                                        <button
                                            className="text-xl text-white focus:outline-none"
                                            onClick={toggleHamburgerMenu}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    <ul>
                                        <li>
                                            <a
                                                className="focus:shadow-outline mt-1 inline-flex w-full transform items-center rounded-lg px-4 py-2 text-sm text-black transition duration-200 ease-in-out hover:scale-95 hover:bg-gray-100 hover:text-blue-500"
                                                href="/admin"
                                            >
                                                <Link
                                                    to="/admin"
                                                    className="focus:shadow-outline mt-1 inline-flex w-full transform items-center rounded-lg px-4 py-2 text-sm text-black transition duration-200 ease-in-out hover:scale-95 hover:bg-gray-100 hover:text-blue-500"
                                                >
                                                    <ion-icon
                                                        className="md hydrated h-4 w-4"
                                                        name="aperture-outline"
                                                        role="img"
                                                        aria-label="aperture outline"
                                                    ></ion-icon>
                                                    <span className="ml-4">Dashboard</span>
                                                </Link>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="focus:shadow-outline mt-1 inline-flex w-full transform items-center justify-center rounded-lg px-4 py-2 text-sm text-black transition duration-200 ease-in-out hover:scale-95 hover:bg-gray-100 hover:text-blue-500"
                                                href="/"
                                            >
                                                <Link
                                                    to="/pendingRequests"
                                                    className="focus:shadow-outline mt-1 inline-flex w-full transform items-center rounded-lg px-4 py-2 text-sm text-black transition duration-200 ease-in-out hover:scale-95 hover:bg-gray-100 hover:text-blue-500"
                                                >
                                                    <ion-icon
                                                        className="md hydrated h-4 w-4"
                                                        name="trending-up-outline"
                                                        role="img"
                                                        aria-label="trending up outline"
                                                    ></ion-icon>
                                                    <span className="ml-4">Pending Requests</span>
                                                </Link>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                    <nav className="flex w-full flex-grow flex-col items-center sm:flex sm:flex-row sm:pb-0">
                        <div className="ml-auto inline-flex list-none items-center sm:ml-auto">
                            <button
                                type="button"
                                className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                id="user-menu-button"
                                aria-expanded={isMenuOpen}
                                aria-haspopup="true"
                                onClick={toggleMenu}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full object-cover"
                                    src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80"
                                    alt=""
                                />
                            </button>

                            {isMenuOpen && (
                                <div
                                    className="absolute right-0 z-10 mr-10 mt-24 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                    tabindex="-1"
                                >
                                    <li className="px-4 py-2">
                                        <button onClick={handleLogout} className="text-gray-800">
                                            Logout
                                        </button>
                                    </li>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
