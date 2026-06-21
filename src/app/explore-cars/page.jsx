import ExploreCarCard from '@/components/ExploreCarCard';
import React from 'react';

const ExploreCar = async () => {
    // ডাটা ক্যাশিং এড়াতে এবং লেটেস্ট ডেটা পেতে Next.js এর জন্য cache সেটিংস রাখা যায়
    const res = await fetch('http://localhost:5000/explore-cars', { cache: 'no-store' });
    const data = await res.json();
    console.log(data);

    return (
        <div className="bg-green-50 min-h-screen py-16 px-4 sm:px-8 lg:px-16">
            
            {/* সেকশন হেডার */}
            <div className="max-w-7xl mx-auto mb-10">
                <p className="text-xs font-black tracking-widest text-[#1c2e24] opacity-50 uppercase mb-1">
                    Our Fleet
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1c2e24] tracking-tight uppercase">
                    Explore Cars
                </h2>
            </div>

            {/* ৩ কলাম বিশিষ্ট রেসপন্সিভ কার্ড গ্রিড লেআউট */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {
                    data?.map((car) => (
                        <ExploreCarCard
                            key={car._id} 
                            car={car} 
                        />
                    ))
                }
            </div>

            {/* কোনো গাড়ি না থাকলে ব্ল্যাঙ্ক স্টেট মেসেজ */}
            {data?.length === 0 && (
                <div className="text-center py-12 text-gray-500 font-bold">
                    No cars available at the moment.
                </div>
            )}
        </div>
    );
};

export default ExploreCar;