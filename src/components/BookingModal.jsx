"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const BookingModal = ({ car }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [driverNeeded, setDriverNeeded] = useState("Yes");
    const [specialNote, setSpecialNote] = useState("No Need");
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
            bookedAt: new Date().toLocaleString(), // বর্তমান টাইমস্ট্যাম্প
        };

        try {
            const res = await fetch('http://localhost:5000/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingInfo)
            });

            if (res.ok) {
                setIsOpen(false);
                router.push('/my-bookings'); // সরাসরি মাই বুকিং রাউটে নিয়ে যাবে
                router.refresh();
            }
        } catch (error) {
            console.error("Booking error:", error);
        } finally {
            setLoading(false);
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

                    {/* মডাল বডি - স্ক্রিনশটের অবিকল ডিজাইন */}
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
                            {/* Driver Needed Dropdown */}
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

                            {/* Special Note Textarea */}
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
                                    className="w-full bg-[#d4f77a] hover:bg-[#bce657] text-[#1c2e24] font-black py-4 px-4 rounded-full shadow-md transition-all duration-300 text-xs tracking-wider uppercase cursor-pointer text-center"
                                >
                                    {loading ? "Booking..." : "Book Now"}
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