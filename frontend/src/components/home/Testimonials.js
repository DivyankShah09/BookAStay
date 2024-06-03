import React from "react";
import { testimonials } from "../../utils/data";

const Testimonials = () => {
    return (
        <>
            <section>
                <div class="relative mx-auto w-full max-w-7xl cursor-pointer items-center px-5 py-12 md:px-12 lg:px-20">
                    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {testimonials.map((person) => (
                            <div class="mx-auto inline-block transform rounded-2xl bg-gray-100 p-4 text-left align-bottom transition-all sm:p-8 sm:align-middle">
                                <div class="mb-4 flex w-full">
                                    <div class="overflow-hidden">
                                        <img
                                            alt=""
                                            class="inline-block h-9 w-9 rounded-full object-cover"
                                            src={person.imgUrl}
                                        />
                                    </div>
                                    <div class="flex-grow pl-3">
                                        <h6 class="text-lg font-medium leading-6 text-black">
                                            {person.name}
                                        </h6>
                                        <p class="text-base text-gray-500">{person.handle}</p>
                                    </div>
                                </div>
                                <div class="mb-4 w-full">
                                    <p class="text-base text-gray-500">{person.review}</p>
                                </div>
                                <div class="text w-full">
                                    <a
                                        href="#_"
                                        class="text-right text-xs text-blue-500 hover:text-black"
                                    >
                                        {person.hotelName}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Testimonials;
