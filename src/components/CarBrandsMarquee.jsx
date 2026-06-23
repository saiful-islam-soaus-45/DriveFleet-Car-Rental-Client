"use client"
import React from 'react';
import Marquee from "react-fast-marquee";

const CarBrandsMarquee = () => {
    // অরিজিনাল ব্র্যান্ড লোগো এবং রেগুলার ফন্ট স্টাইল (ক্লিন ও রিয়ালিস্টিক কালার)
    const brands = [
        { 
            name: 'Toyota', 
            logo: (
                <svg className="w-10 h-10 text-[#EB0A1E]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 4.69 2 8s4.48 6 10 6 10-2.69 10-6-4.48-6-10-6zm0 1.5c3.84 0 7.5 1.5 7.5 3.5S15.84 10.5 12 10.5 4.5 9 4.5 7s3.66-3.5 7.5-3.5zm0 1.5c-2.48 0-4.5 1-4.5 2.25S9.52 9.5 12 9.5s4.5-1 4.5-2.25S14.48 5 12 5z"/>
                </svg>
            )
        },
        { 
            name: 'Honda', 
            logo: (
                <svg className="w-9 h-9 text-[#111111]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 3h20v18H2V3zm3.5 2.5v13h3.5v-4.5h6v4.5h3.5v-13h-3.5v5.5h-6v-5.5H5.5z"/>
                </svg>
            )
        },
        { 
            name: 'BMW', 
            logo: (
                <svg className="w-10 h-10" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="#000000"/>
                    <circle cx="12" cy="12" r="8" fill="#FFFFFF"/>
                    <path d="M12 4a8 8 0 0 1 8 8h-8V4z" fill="#0066B3"/>
                    <path d="M4 12a8 8 0 0 1 8-8v8H4z" fill="#FFFFFF"/>
                    <path d="M12 20a8 8 0 0 1-8-8h8v8z" fill="#0066B3"/>
                    <path d="M20 12a8 8 0 0 1-8 8v-8h8z" fill="#FFFFFF"/>
                </svg>
            )
        },
        { 
            name: 'Audi', 
            logo: (
                <svg className="w-14 h-8 text-[#000000]" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="4.5" cy="6" r="3.5" />
                    <circle cx="9.5" cy="6" r="3.5" />
                    <circle cx="14.5" cy="6" r="3.5" />
                    <circle cx="19.5" cy="6" r="3.5" />
                </svg>
            )
        },
        { 
            name: 'Mercedes', 
            logo: (
                <svg className="w-10 h-10 text-[#333333]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2v10M12 12l-8.66 5M12 12l8.66 5"/>
                </svg>
            )
        },
        { 
            name: 'Tesla', 
            logo: (
                <svg className="w-9 h-9 text-[#CC0000]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c.08 0 4.17.05 8.16.35.32.02.43.3.26.54L13.1 13.3c-.34.46-.86.46-1.2 0L4.58 3.19c-.17-.24-.06-.52.26-.54C8.83 2.05 12.92 2 12 2zm0 13c-.2 0-.39-.08-.53-.22L7.3 10.6c-.23-.23-.07-.63.26-.63h8.88c.33 0 .49.4.26.63l-4.17 4.18c-.14.14-.33.22-.53.22z"/>
                </svg>
            )
        },
        { 
            name: 'Hyundai', 
            logo: (
                <svg className="w-11 h-9 text-[#002C5F]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.14 14.13c-.15.42-.51.7-.94.7h-2.4c-.43 0-.79-.28-.94-.7l-1.52-4.25V16H6V8h2.34l1.52 4.25V8h2.28l1.52 4.25V8H16v8h-2.34z"/>
                </svg>
            )
        },
        { 
            name: 'Kia', 
            logo: (
                <svg className="w-14 h-6 text-[#05141F]" viewBox="0 0 24 8" fill="currentColor">
                    <path d="M2 1h2.5l3.5 3.2L11.5 1H14v6h-2.5V3.8L8.2 7H6.8L3.5 3.8V7H2V1zm13.5 0H18v6h-2.5V1zm5.5 0h2.5l.5 1.5h-1.5l-.3-1h-.4l-.3 1H20l.5-1.5zM18.5 3h4V7h-4V3z"/>
                </svg>
            )
        }
    ];

    return (
        <section className="bg-white py-24 overflow-hidden">
            {/* কন্টেইনারের সাইজ max-w-7xl দিয়ে আরও বড় করা হয়েছে */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center">
                
                {/* হেডিং সেকশন */}
                <div className="mb-16">
                    <span className="text-xs font-black tracking-widest text-[#82ab24] uppercase block mb-3">
                        Global Fleet Selection
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-black text-[#1c2e24] tracking-tight">
                        Car Brands We Offer
                    </h2>
                </div>

                {/* মার্কি র্যাপার - প্যাডিং বাড়িয়ে এরিয়া বড় করা হয়েছে এবং কন্টাক্ট ব্যাকগ্রাউন্ড ক্লিন করা হয়েছে */}
                <div className="relative w-full border-y border-gray-200/60 py-10 bg-[#f7f5f0]/30 rounded-[2rem]">
                    
                    {/* সাইডের ফেড ইফেক্ট */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden sm:block"></div>
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden sm:block"></div>

                    {/* react-fast-marquee */}
                    <Marquee 
                        speed={60} 
                        pauseOnHover={true} 
                        gradient={false}
                    >
                        {/* গ্যাপ বাড়িয়ে এলিমেন্টগুলোকে বড় স্পেস দেওয়া হয়েছে */}
                        <div className="flex items-center gap-24 pr-24">
                            {brands.map((brand, index) => (
                                <div 
                                    key={index} 
                                    className="flex items-center gap-4 text-[#1c2e24] select-none pointer-events-none"
                                >
                                    {/* অরিজিনাল কালার ব্র্যান্ড লোগো */}
                                    <div className="flex items-center justify-center">
                                        {brand.logo}
                                    </div>
                                    
                                    {/* ব্র্যান্ড নেম - নট ইটালিক (সোজা ফন্ট) এবং ডিপ ডার্ক গ্রিন */}
                                    <span className="text-2xl font-black tracking-tight uppercase">
                                        {brand.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Marquee>
                </div>

            </div>
        </section>
    );
};

export default CarBrandsMarquee;