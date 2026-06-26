import BookingModal from '@/components/BookingModal';
import { auth } from "@/lib/auth"; // 👈 আপনার প্রজেক্টের Better-Auth কনফিগ ফাইলের সঠিক পাথ দিন
import { headers } from "next/headers";
import Link from 'next/link';
import React from 'react';

const DetailsPage = async ({ params }) => {
    const { id } = await params;
    const {token} = await auth.api.getToken({
        headers: await headers()
    })
    console.log(token);

    // ব্যাকএন্ড থেকে নির্দিষ্ট আইডির ডাটা ফেচ করা
    const res = await fetch(`http://localhost:5000/explore-cars/${id}`, {
        cache: 'no-store', // 👈 এখানে একটি কমা হবে
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const car = await res.json();

    // 🔒 Better-Auth সেশন থেকে কারেন্ট লগইন থাকা ইউজারের ডাটা আনা
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // সেশন থেকে আসল ইমেইলটি নেওয়া হলো
    const userEmail = session?.user?.email;

    if (!car) {
        return (
            <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center text-gray-500 font-bold">
                Car details not found!
            </div>
        );
    }

    const {
        carName,
        dailyRentPrice,
        carType,
        imageUrl,
        seatCapacity,
        pickupLocation,
        description,
        availabilityStatus,
        booking_count // 📊 ডাটাবেজ থেকে বুকিং কাউন্ট ফিল্ডটি নিয়ে আসা হলো
    } = car;

    return (
        <div className="min-h-screen bg-[#f7f5f0] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-5xl w-full">

                <Link href="/explore-cars" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#1c2e24] opacity-60 hover:opacity-100 transition-opacity mb-6">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Fleet
                </Link>

                <div className="relative p-[2px] rounded-[2.5rem] bg-gradient-to-br from-[#c1f05d] via-[#d4f77a] to-[#c1f05d] shadow-[0_0_40px_rgba(193,240,93,0.45)]">
                    <div className="bg-white rounded-[2.4rem] p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                        {/* বাম কলাম: বড় ইমেজ */}
                        <div className="relative w-full h-72 sm:h-96 lg:h-[400px] rounded-[2rem] overflow-hidden bg-gray-100 shadow-inner">
                            <img
                                src={imageUrl || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf"}
                                alt={carName}
                                className="w-full h-full object-cover"
                            />
                            {availabilityStatus && (
                                <span className="absolute top-4 left-4 bg-[#c1f05d] text-[#1c2e24] text-xs font-black uppercase px-4 py-1.5 rounded-full tracking-wider shadow-md">
                                    {availabilityStatus}
                                </span>
                            )}
                        </div>

                        {/* ডান কলাম: ইনফরমেশন টেক্সট */}
                        <div className="flex flex-col justify-between h-full py-2">
                            <div>
                                <span className="text-xs font-black tracking-widest text-[#82ab24] uppercase">
                                    {carType || 'Premium Vehicle'}
                                </span>

                                <div className="flex flex-wrap justify-between items-start gap-4 mt-2 mb-6">
                                    <h1 className="text-3xl sm:text-4xl font-black text-[#1c2e24] tracking-tight leading-tight">
                                        {carName}
                                    </h1>

                                    <div className="bg-[#c1f05d] text-[#1c2e24] px-5 py-3 rounded-2xl text-center shadow-md flex flex-col justify-center items-center min-w-[90px]">
                                        <span className="text-2xl font-black">${dailyRentPrice}</span>
                                        <span className="text-[10px] opacity-75 font-bold -mt-1">per day</span>
                                    </div>
                                </div>

                                <hr className="border-gray-100 my-4" />

                                <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed mb-6">
                                    {description || "Experience top-tier driving comfort and performance with our premium choice."}
                                </p>

                                {/* 📊 বুকিং কাউন্ট ডিসপ্লে ব্যাজ (ডিজাইন সামঞ্জস্য রেখে আপডেট করা হয়েছে) */}
                                <div className="flex items-center gap-3 bg-[#f7f5f0] p-3 rounded-xl border border-gray-100 w-full sm:w-max mb-6">
                                    {/* সাদা রঙের আইকন ব্যাকগ্রাউন্ড বক্স */}
                                    <div className="bg-white p-2 rounded-lg shadow-sm text-gray-500">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                        </svg>
                                    </div>
                                    <div>
                                        {/* ছোট সাব-টাইটেল */}
                                        <p className="text-[10px] uppercase font-black tracking-wider text-gray-400">Popularity</p>
                                        {/* মেইন কাউন্ট টেক্সট */}
                                        <p className="text-xs sm:text-sm font-bold text-[#1c2e24]">
                                            Booked by {booking_count || 0} users
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-center gap-3 bg-[#f7f5f0] p-3 rounded-xl border border-gray-100">
                                        <div className="bg-white p-2 rounded-lg shadow-sm text-gray-500">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black tracking-wider text-gray-400">Location</p>
                                            <p className="text-xs sm:text-sm font-bold text-[#1c2e24]">{pickupLocation}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 bg-[#f7f5f0] p-3 rounded-xl border border-gray-100">
                                        <div className="bg-white p-2 rounded-lg shadow-sm text-gray-500">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black tracking-wider text-gray-400">Capacity</p>
                                            <p className="text-xs sm:text-sm font-bold text-[#1c2e24]">{seatCapacity} Seats</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* মডালে আসল ইমেইলটি চলে যাচ্ছে */}
                            <button></button>
                            <BookingModal car={car} userEmail={userEmail} />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default DetailsPage;