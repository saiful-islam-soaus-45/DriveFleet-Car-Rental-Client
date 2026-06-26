"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const BookingModal = ({ car, userEmail }) => { // 👈 প্রপস হিসেবে userEmail রিসিভ করা হলো
    const [isOpen, setIsOpen] = useState(false);
    const [driverNeeded, setDriverNeeded] = useState("Yes");
    const [specialNote, setSpecialNote] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleConfirmBooking = async (e) => {
        e.preventDefault();
        setLoading(true);

        const bookingInfo = {
            carId: car._id,
            carName: car.carName,
            dailyRentPrice: car.dailyRentPrice,
            imageUrl: car.imageUrl,
            pickupLocation: car.pickupLocation || "Uttara, Dhaka",
            driverNeeded: driverNeeded,
            specialNote: specialNote,
            bookedAt: new Date().toLocaleString(),
            email: userEmail, // 👈 ব্যাকএন্ডের রিকোয়ারমেন্ট অনুযায়ী ইউজারের ইমেইল যোগ করা হলো
        };

        try {

            const {data:tokenData} = await authClient.token()
            const res = await fetch('http://localhost:5000/bookings', {
                method: 'POST',
                headers: {
                     'Content-Type': 'application/json',
                      authorization: `Bearer ${tokenData?.token}`
                     },
                body: JSON.stringify(bookingInfo)
            });

            if (res.ok) {
                setIsOpen(false);
                router.push('/my-bookings'); 
                router.refresh();
            }
        } catch (error) {
            console.error("Booking error:", error);
        } finally {
            setLoading(false); // 👈 এখানে ভুলটি সংশোধন করা হয়েছে (loading থেকে setLoading করা হলো)
        }
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                className="w-full bg-[#1c2e24] hover:bg-black text-white hover:text-[#c1f05d] font-black py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 text-sm tracking-widest uppercase cursor-pointer text-center flex items-center justify-center gap-2 group"
            >
                <span>Proceed to Booking</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

                    <div className="relative bg-white w-full max-w-md rounded-[2rem] p-8 shadow-2xl z-10 font-sans">
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-xs font-black bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
                        >
                            Close
                        </button>

                        <div className="mt-2">
                            <span className="text-[10px] font-black tracking-widest text-[#82ab24] uppercase">
                                Booking Form
                            </span>
                            <h3 className="text-3xl font-black text-[#1c2e24] tracking-tight mt-1">
                                {car.carName}
                            </h3>
                        </div>

                        <form onSubmit={handleConfirmBooking} className="mt-6 space-y-5">
                            <div>
                                <label className="block text-xs font-black text-gray-800 mb-1.5">Driver Needed</label>
                                <select 
                                    value={driverNeeded}
                                    onChange={(e) => setDriverNeeded(e.target.value)}
                                    className="w-full bg-[#f7f5f0] border border-gray-200 rounded-xl px-4 py-3 text-xs font-bold text-gray-700 focus:outline-none appearance-none"
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-800 mb-1.5">Special Note</label>
                                <textarea 
                                    value={specialNote}
                                    onChange={(e) => setSpecialNote(e.target.value)}
                                    rows="3"
                                    className="w-full bg-[#f7f5f0] border border-gray-200 rounded-xl px-4 py-3 text-xs font-bold text-gray-700 focus:outline-none resize-none"
                                    placeholder="Any special requests..."
                                />
                            </div>
                            
                            <div className="pt-2">
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full bg-[#d4f77a] hover:bg-[#bce657] disabled:bg-[#e4fbc2] disabled:cursor-not-allowed text-[#1c2e24] font-black py-4 px-4 rounded-full shadow-md transition-all duration-300 text-xs tracking-wider uppercase cursor-pointer flex items-center justify-center gap-2"
                                >
                                    {/* 🔄 লোডিং ট্রু হলে এই স্পিনারটি দেখাবে */}
                                    {loading && (
                                        <svg className="animate-spin h-4 w-4 text-[#1c2e24]" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    )}

                                    <span>{loading ? "Booking..." : "Book Now"}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingModal;