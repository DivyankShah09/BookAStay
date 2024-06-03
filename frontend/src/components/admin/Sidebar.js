/**
 * Name: Nikunj Lalitkumar Hudka
 * Banner ID: B00959783
 */
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div>
            <div className="flex h-screen bg-gray-300">
                <div className="hidden md:flex md:flex-shrink-0">
                    <div className="flex w-64 flex-col">
                        <div className="bg-gray mt-5 flex flex-grow flex-col border-r px-4">
                            <nav className="bg-gray flex-1 space-y-1">
                                <p className="px-4 pt-4 text-xs font-semibold uppercase text-gray-500">
                                    Admin
                                </p>
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
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
