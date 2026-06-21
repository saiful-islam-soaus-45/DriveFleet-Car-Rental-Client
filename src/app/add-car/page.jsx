'use client';

import React, { useState } from 'react';

export default function AddCarForm() {
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
        console.log('Car Form Data:', formData);

      const res = await  fetch('http://localhost:5000/add-car', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        
        })
        const data = await res.json();
        console.log(data);
    };

    return (
        <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 flex flex-col justify-center items-center font-sans pt-32">
            
            <h1 className="text-4xl sm:text-4xl lg:text-5xl font-black text-[#1c2e24] mb-8 tracking-tight uppercase text-center">
                Add a Car Listing.
            </h1>
            
            <div className="w-full max-w-2xl bg-yellow-100 p-8 sm:p-12 rounded-[2rem] shadow-sm border border-[#e8e4da]">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* 1. Car Name */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-extrabold text-[#1c2e24] tracking-tight">Car Name</label>
                        <input
                            type="text"
                            name="carName"
                            value={formData.carName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-green-100 border border-[#e8e4da] focus:border-[#1c2e24] focus:bg-white text-[#1c2e24] font-bold outline-none transition-all text-sm shadow-inner"
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-extrabold text-[#1c2e24] tracking-tight">Daily Rent Price</label>
                        <input
                            type="number"
                            name="dailyRentPrice"
                            value={formData.dailyRentPrice || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-green-100 border border-[#e8e4da] focus:border-[#1c2e24] focus:bg-white text-[#1c2e24] font-bold outline-none transition-all text-sm shadow-inner"
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-extrabold text-[#1c2e24] tracking-tight">Car Type (e.g., SUV, Sedan, Luxury)</label>
                        <input
                            type="text"
                            name="carType"
                            placeholder=""
                            value={formData.carType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-green-100 border border-[#e8e4da] focus:border-[#1c2e24] focus:bg-white text-[#1c2e24] font-bold outline-none transition-all text-sm shadow-inner"
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-extrabold text-[#1c2e24] tracking-tight">Image URL (imgbb/postimage)</label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-green-100 border border-[#e8e4da] focus:border-[#1c2e24] focus:bg-white text-[#1c2e24] font-bold outline-none transition-all text-sm shadow-inner"
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-extrabold text-[#1c2e24] tracking-tight">Seat Capacity</label>
                        <input
                            type="number"
                            name="seatCapacity"
                            value={formData.seatCapacity || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-green-100 border border-[#e8e4da] focus:border-[#1c2e24] focus:bg-white text-[#1c2e24] font-bold outline-none transition-all text-sm shadow-inner"
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-extrabold text-[#1c2e24] tracking-tight">Pickup Location</label>
                        <input
                            type="text"
                            name="pickupLocation"
                            value={formData.pickupLocation}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-green-100 border border-[#e8e4da] focus:border-[#1c2e24] focus:bg-white text-[#1c2e24] font-bold outline-none transition-all text-sm shadow-inner"
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-extrabold text-[#1c2e24] tracking-tight">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 rounded-xl bg-green-100 border border-[#e8e4da] focus:border-[#1c2e24] focus:bg-white text-[#1c2e24] font-bold outline-none transition-all text-sm resize-none shadow-inner"
                            required
                        ></textarea>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-extrabold text-[#1c2e24] tracking-tight">Availability Status (e.g., Available, Unavailable)</label>
                        <input
                            type="text"
                            name="availabilityStatus"
                            placeholder=""
                            value={formData.availabilityStatus}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-green-100 border border-[#e8e4da] focus:border-[#1c2e24] focus:bg-white text-[#1c2e24] font-bold outline-none transition-all text-sm shadow-inner"
                            required
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-[#c1f05d] hover:bg-[#b0dc4b] text-[#1c2e24] font-bold py-3.5 px-4 rounded-xl shadow-md transition-all duration-300 text-sm tracking-wide uppercase cursor-pointer"
                        >
                            Add Car
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}