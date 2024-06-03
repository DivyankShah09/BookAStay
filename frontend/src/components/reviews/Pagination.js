import React from "react";

const Pagination = (props) => {
    const {
        currentPage,
        totalPages,
        handlePageChange,
        handlePreviousPageChange,
        handleNextPageChange
    } = props;

    const isNextDisabled = currentPage >= totalPages ? true : false;

    const isPreviousDisabled = currentPage <= 1 ? true : false;

    return (
        <div className="pagination flex justify-center border-t">
            <nav className="mt-2">
                <ul className="flex h-8 items-center -space-x-px text-sm">
                    <li>
                        <button
                            disabled={isPreviousDisabled ? true : false}
                            onClick={handlePreviousPageChange}
                            className={`${
                                isPreviousDisabled && "cursor-not-allowed"
                            } ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                                className="h-2.5 w-2.5 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 1 1 5l4 4"
                                />
                            </svg>
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i}>
                            <button
                                onClick={() => handlePageChange(i + 1)}
                                className={`${
                                    parseInt(currentPage) === i + 1
                                        ? "bg-brand text-white"
                                        : "bg-white text-gray-500"
                                }  flex h-8 items-center justify-center border border-gray-300  px-3 leading-tight hover:bg-gray-100 hover:text-gray-700`}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            disabled={isNextDisabled ? true : false}
                            onClick={handleNextPageChange}
                            className={`${
                                isNextDisabled && "cursor-not-allowed"
                            } flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="h-2.5 w-2.5 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
