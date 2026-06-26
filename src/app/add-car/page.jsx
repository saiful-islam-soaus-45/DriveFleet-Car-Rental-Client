'use client';

import React, { useState } from 'react';
// ✅ Better-Auth সেশন হুক ব্যবহারের জন্য authClient ইম্পোর্ট করা হলো
import { authClient } from "@/lib/auth-client";
import { useRouter } from 'next/navigation'; // রিডাইরেক্ট করার জন্য useRouter আনা হলো

export default function AddCarForm() {
    // 👤 লগইন করা ইউজারের সেশন ডাটা নেওয়া হচ্ছে
    const { data: session } = authClient.useSession();
    const router = useRouter();

    // 🔄 বাটনে স্পিনার দেখানোর জন্য লোডিং স্টেট
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        carName: '',
        dailyRentPrice: '',
        carType: '',
        imageUrl: '',
        seatCapacity: '',
        pickupLocation: '',
        description: '',
        availabilityStatus: ''
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🚨 সেশন থেকে ইমেইল চেক করা হচ্ছে
        const userEmail = session?.user?.email;

        if (!userEmail) {
            alert("Please log in first before adding a car!");
            return;
        }

        setLoading(true);

        // 🔄 সাবমিট করার অবজেক্টের সাথে ইউজারের email এবং ডিফল্ট booking_count যুক্ত করা হচ্ছে
        const submissionData = {
            ...formData,
            email: userEmail,
            booking_count: 0
        };

        try {
            const { data: tokenData } = await authClient.token()

            const res = await fetch('http://localhost:5000/add-car', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     authorization: `Bearer ${tokenData?.token}`

                },
                body: JSON.stringify(submissionData)
            });

            if (res.ok) {
                // 🧹 ফর্ম রিসেট করা হচ্ছে
                setFormData({
                    carName: '',
                    dailyRentPrice: '',
                    carType: '',
                    imageUrl: '',
                    seatCapacity: '',
                    pickupLocation: '',
                    description: '',
                    availabilityStatus: ''
                });

                // 🚀 সফলভাবে অ্যাড হওয়ার পর '/my-added-cars' পেজে নিয়ে যাওয়া হচ্ছে
                router.push('/my-added-cars');
                router.refresh();
            } else {
                alert("Failed to add car data.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f5f0] py-12 px-4 sm:px-6 flex flex-col justify-center items-center font-sans pt-28">

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1c2e24] mb-8 tracking-tight uppercase text-center">
                Add a Car Listing.
            </h1>

            <div className="w-full max-w-2xl relative p-[2px] rounded-[2.5rem] bg-gradient-to-br from-[#c1f05d] via-[#d4f77a] to-[#c1f05d] shadow-[0_0_40px_rgba(193,240,93,0.35)]">

                <div className="bg-white p-8 sm:p-12 rounded-[2.4rem] shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* 1. Car Name */}
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-black text-[#1c2e24] uppercase tracking-wider">Car Name</label>
                            <input
                                type="text"
                                name="carName"
                                value={formData.carName}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 rounded-xl bg-[#f7f5f0] border border-gray-100 focus:border-[#c1f05d] focus:bg-white text-[#1c2e24] font-bold outline-none transition-all text-sm shadow-inner"
                                required
                            />
                        </div>

                        {/* 2. Daily Rent Price */}
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-black text-[#1c2e24] uppercase tracking-wider">Daily Rent Price ($)</label>
                            <input
                                type="number"
                                name="dailyRentPrice"
                                value={formData.dailyRentPrice || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 rounded-xl bg-[#f7f5f0] border border-gray-100 focus:border-[#c1f05d] focus:bg-white text-[#1c2e24] font-bold outline-none transition-all text-sm shadow-inner"
                                required
                            />
                        </div>

                        {/* 3. Car Type */}
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-black text-[#1c2e24] uppercase tracking-wider">Car Type (SUV, Sedan, Luxury, Electric)</label>
                            <input
                                type="text"
                                name="carType"
                                value={formData.carType}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 rounded-xl bg-[#f7f5f0] border border-gray-100 focus:border-[#c1f05d] focus:bg-white text-[#1c2e24] font-bold outline-none transition-all text-sm shadow-inner"
                                required
                            />
                        </div>

                        {/* 4. Image URL */}
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-black text-[#1c2e24] uppercase tracking-wider">Image URL</label>
                            <input
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 rounded-xl bg-[#f7f5f0] border border-gray-100 focus:border-[#c1f05d] focus:bg-white text-[#1c2e24] font-bold outline-none transition-all text-sm shadow-inner"
                                required
                            />
                        </div>

                        {/* 5. Seat Capacity */}
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-black text-[#1c2e24] uppercase tracking-wider">Seat Capacity</label>
                            <input
                                type="number"
                                name="seatCapacity"
                                value={formData.seatCapacity || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 rounded-xl bg-[#f7f5f0] border border-gray-100 focus:border-[#c1f05d] focus:bg-white text-[#1c2e24] font-bold outline-none transition-all text-sm shadow-inner"
                                required
                            />
                        </div>

                        {/* 6. Pickup Location */}
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-black text-[#1c2e24] uppercase tracking-wider">Pickup Location</label>
                            <input
                                type="text"
                                name="pickupLocation"
                                value={formData.pickupLocation}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 rounded-xl bg-[#f7f5f0] border border-gray-100 focus:border-[#c1f05d] focus:bg-white text-[#1c2e24] font-bold outline-none transition-all text-sm shadow-inner"
                                required
                            />
                        </div>

                        {/* 7. Description */}
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-black text-[#1c2e24] uppercase tracking-wider">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-3.5 rounded-xl bg-[#f7f5f0] border border-gray-100 focus:border-[#c1f05d] focus:bg-white text-[#1c2e24] font-bold outline-none transition-all text-sm resize-none shadow-inner"
                                required
                            ></textarea>
                        </div>

                        {/* 8. Availability Status */}
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-black text-[#1c2e24] uppercase tracking-wider">Availability Status</label>
                            <select
                                name="availabilityStatus"
                                value={formData.availabilityStatus}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 rounded-xl bg-[#f7f5f0] border border-gray-100 focus:border-[#c1f05d] focus:bg-white text-[#1c2e24] font-bold outline-none transition-all text-sm cursor-pointer"
                                required
                            >
                                <option value="" disabled hidden>Select Status</option>
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#c1f05d] hover:bg-[#b0dc4b] disabled:bg-[#e4fbc2] disabled:cursor-not-allowed text-[#1c2e24] font-black py-4 px-4 rounded-xl shadow-md transition-all duration-300 text-xs tracking-wider uppercase cursor-pointer flex items-center justify-center gap-2"
                            >
                                {loading && (
                                    <svg className="animate-spin h-4 w-4 text-[#1c2e24]" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                )}
                                <span>{loading ? "Adding Car..." : "Add Car"}</span>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}