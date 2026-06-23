import Link from 'next/link';
import React from 'react';

const ExploreCarCard = ({ car }) => {
    const { 
        _id,
        carName, 
        dailyRentPrice, 
        carType, 
        imageUrl, 
        seatCapacity, 
        pickupLocation, 
        availabilityStatus 
    } = car;

    return (
        /* শ্যাডোর পরিমাণ (Spread ও Blur) বাড়ানো হলো এবং বর্ডারে শুধু #c1f05d এর হালকা শেড রাখা হলো */
        <div className="relative p-[2px] rounded-[2rem] bg-gradient-to-br from-[#c1f05d] via-[#d4f77a] to-[#c1f05d] shadow-[0_0_35px_rgba(193,240,93,0.55)] hover:shadow-[0_0_50px_rgba(193,240,93,0.85)] transition-all duration-500 group flex flex-col justify-between">
            
            {/* মেইন কার্ড কন্টেন্ট এরিয়া */}
            <div className="bg-white rounded-[1.9rem] p-4 w-full h-full flex flex-col justify-between">
                
                {/* ইমেজ এবং অ্যাভেইলেবিলিটি ব্যাজ */}
                <div className="relative w-full h-48 rounded-[1.5rem] overflow-hidden bg-gray-100">
                    <img 
                        src={imageUrl || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf"} 
                        alt={carName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Available Badge */}
                    {availabilityStatus && (
                        <span className="absolute top-3 left-3 bg-[#c1f05d] text-[#1c2e24] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider shadow-sm">
                            {availabilityStatus}
                        </span>
                    )}
                </div>

                {/* কার্ডের কন্টেন্ট এরিয়া */}
                <div className="mt-4 px-2 flex-grow flex flex-col justify-between">
                    
                    {/* টাইপ, নাম এবং প্রাইস সেকশন */}
                    <div>
                        <div className="flex justify-between items-start gap-2">
                            <div>
                                <p className="text-[11px] font-black tracking-widest text-[#1c2e24] uppercase">
                                    {carType || 'Car'}
                                </p>
                                <h3 className="text-xl font-black text-[#1c2e24] tracking-tight mt-0.5 leading-tight">
                                    {carName}
                                </h3>
                            </div>
                            
                            {/* প্রাইস বক্স */}
                            <div className="bg-[#c1f05d] text-[#1c2e24] px-3 py-2 rounded-xl text-center min-w-[65px] flex flex-col justify-center items-center shadow-sm">
                                <span className="text-base font-black">${dailyRentPrice}</span>
                                <span className="text-[8px] opacity-60 font-medium -mt-1">per day</span>
                            </div>
                        </div>

                        
                    </div>

                    {/* লোকেশন, সিট এবং বাটন সেকশন */}
                    <div className="mt-5 space-y-4">
                        {/* আইকন ইনফো */}
                        <div className="space-y-1.5 text-xs text-gray-500 font-bold">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <span>{pickupLocation}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>
                                <span>{seatCapacity} seats</span>
                            </div>
                        </div>

                        {/* View Details Button */}
                        <Link href={`/explore-cars/${_id}`}>
                        <button className="w-full bg-[#c1f05d] hover:bg-[#b0dc4b] text-[#1c2e24] font-black py-3 px-4 rounded-xl shadow-md transition-all duration-300 text-xs tracking-wider uppercase cursor-pointer text-center">
                            View Details
                        </button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ExploreCarCard;