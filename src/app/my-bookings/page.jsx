import React from 'react';

const MyBookingsPage = async () => {
    let bookings = [];

    try {
        const res = await fetch('http://localhost:5000/bookings', { cache: 'no-store' });
        if (res.ok) {
            bookings = await res.json();
        }
    } catch (error) {
        console.error("Error fetching bookings:", error);
    }

    return (
        <div className="min-h-screen bg-[#f7f5f0] py-16 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <span className="text-[10px] font-black tracking-widest text-[#82ab24] uppercase">
                        Private Layout
                    </span>
                    <h1 className="text-5xl font-black text-[#1c2e24] tracking-tight mt-1">
                        My Bookings
                    </h1>
                </div>

                {bookings.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center text-gray-400 font-bold shadow-sm">
                        You haven,t booked any cars yet!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            /* ২ নম্বর স্ক্রিনশটের অবিকল হরাইজন্টাল কার্ড ডিজাইন */
                            <div 
                                key={booking._id} 
                                className="bg-white rounded-[2rem] p-5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100"
                            >
                                <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
                                    {/* কার ইমেজ */}
                                    <img 
                                        src={booking.imageUrl || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf"} 
                                        alt={booking.carName} 
                                        className="w-full sm:w-36 h-24 object-cover rounded-2xl bg-gray-50"
                                    />
                                    {/* কন্টেন্ট পার্ট */}
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-xl font-black text-[#1c2e24] tracking-tight">
                                            {booking.carName}
                                        </h3>
                                        <div className="flex flex-col gap-1 mt-1.5 text-gray-400 font-bold text-[11px]">
                                            <span className="flex items-center justify-center sm:justify-start gap-1">
                                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                </svg>
                                                {booking.pickupLocation}
                                            </span>
                                            <span className="flex items-center justify-center sm:justify-start gap-1">
                                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                                </svg>
                                                {booking.bookedAt}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* প্রাইস ব্যাজ */}
                                <div className="bg-[#1c2e24] text-white font-black text-lg px-6 py-3 rounded-2xl min-w-[90px] text-center shadow-sm">
                                    ${booking.dailyRentPrice}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookingsPage;