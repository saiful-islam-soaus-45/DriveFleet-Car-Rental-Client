import React from 'react';
import ExploreCarCard from './ExploreCarCard';
import Link from 'next/link';

const AvailableCar = async () => {
    // ব্যাকএন্ডের GET API থেকে সব ডাটা নিয়ে আসা
    const res = await fetch('http://localhost:5000/explore-cars', { cache: 'no-store' });
    const allCars = await res.json();

    // ডাটাবেজে যত গাড়িই থাকুক, প্রথম ৬টি গাড়ি আলাদা করে নেওয়া হলো
    const featuredCars = allCars?.slice(0, 6) || [];

    return (
        <div className="bg-[#f7f5f0] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* সেকশন হেডার এবং টাইটেল */}
                <div className="mb-12 text-center sm:text-left flex flex-col sm:flex-row justify-between items-end gap-4">
                    <div>
                        <span className="text-xs font-black tracking-widest text-[#82ab24] uppercase">
                            Handpicked Fleet
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#1c2e24] tracking-tight mt-1">
                            Available Vehicles
                        </h2>
                    </div>

                    <Link
                        href="/explore-cars"
                        className="group inline-flex items-center gap-2 bg-[#c1f05d] hover:bg-[#b0df4c] text-[#1c2e24] font-extrabold px-7 py-3.5 rounded-full transition-all duration-300 text-sm shadow-sm cursor-pointer"
                    >
                        See All Cars
                        {/* ➡️ অ্যারো আইকন যা হোভার করলে ডানপাশে সরবে */}
                        <svg
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform stroke-[2.5]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>

                </div>

                {/* কার্ড গ্রিড লেআউট (এখানে সর্বোচ্চ ৬টি কার্ড রেন্ডার হবে) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        featuredCars.map((car) => (
                            <ExploreCarCard
                                key={car._id}
                                car={car}
                            />
                        ))
                    }
                </div>

                {/* ডাটাবেজে কোনো গাড়ি না থাকলে সেফটি মেসেজ */}
                {featuredCars.length === 0 && (
                    <div className="text-center py-10 text-gray-400 font-bold">
                        No cars available at the moment!
                    </div>
                )}

            </div>
        </div>
    );
};

export default AvailableCar;