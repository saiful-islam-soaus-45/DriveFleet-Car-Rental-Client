import React from 'react';
import ExploreCarCard from './ExploreCarCard';

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
                    
                    {/* See All Cars বাটন (যা মেইন এক্সপ্লোর পেজে নিয়ে যাবে) */}
                    <a 
                        href="/explore-cars" 
                        className="inline-flex items-center gap-2 bg-[#1c2e24] hover:bg-black text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-md transition-all duration-300"
                    >
                        <span>See All Cars</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </a>
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