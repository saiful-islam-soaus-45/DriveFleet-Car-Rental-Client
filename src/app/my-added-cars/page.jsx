"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ✅ রিডাইরেক্ট করার জন্য useRouter ইম্পোর্ট করা হলো
import { authClient } from "@/lib/auth-client"; 

const MyAddedCarsPage = () => {
    const router = useRouter();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    // Better-Auth হুক ব্যবহার করে সেশন এবং লোডিং স্টেট নেওয়া হচ্ছে
    const { data: session, isPending: sessionLoading } = authClient.useSession();

    // মডাল স্টেটসমূহ
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    // এডিট ফর্ম স্টেট
    const [editForm, setEditForm] = useState({
        dailyRentPrice: '',
        carType: '',
        imageUrl: '',
        pickupLocation: '',
        description: '',
        availabilityStatus: ''
    });

    // ডাটা লোড করার ফাংশন
    const fetchMyCars = async () => {
        const userEmail = session?.user?.email;

        if (!userEmail) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`http://localhost:5000/my-cars?email=${userEmail}`);
            if (res.ok) {
                const data = await res.json();
                setCars(data);
            }
        } catch (error) {
            console.error("Error fetching my cars:", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ সেশন চেক এবং ডাটা ফেচ করার লজিক ঠিক করা হলো
    useEffect(() => {
        if (!sessionLoading) {
            if (!session) {
                // সেশন না থাকলে সরাসরি লগইন পেজে নিয়ে যাবে
                router.push('/login'); 
            } else {
                // সেশন থাকলে ডাটা ফেচ করবে
                fetchMyCars();
            }
        }
    }, [session, sessionLoading, router]);

    // এডিট বাটন ক্লিক হ্যান্ডলার
    const openEditModal = (car) => {
        setSelectedCar(car);
        setEditForm({
            dailyRentPrice: car.dailyRentPrice || '',
            carType: car.carType || 'SUV',
            imageUrl: car.imageUrl || '',
            pickupLocation: car.pickupLocation || '',
            description: car.description || '',
            availabilityStatus: car.availabilityStatus || 'Available'
        });
        setIsEditOpen(true);
    };

    // এডিট সাবমিট হ্যান্ডলার
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/explore-cars/${selectedCar._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });

            if (res.ok) {
                setIsEditOpen(false);
                fetchMyCars(); 
            } else {
                alert("Failed to update car info");
            }
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    // ডিলিট বাটন ক্লিক হ্যান্ডলার
    const openDeleteModal = (car) => {
        setSelectedCar(car);
        setIsDeleteOpen(true);
    };

    // ডিলিট কনফার্ম হ্যান্ডলার
    const handleDeleteConfirm = async () => {
        try {
            const res = await fetch(`http://localhost:5000/explore-cars/${selectedCar._id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setIsDeleteOpen(false);
                fetchMyCars(); 
            } else {
                alert("Failed to delete car");
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    // ✅ শুধুমাত্র অথেনটিকেশন লোডিং অথবা ডাটা ফেচিং লোডিং এর সময় লোডার দেখাবে
    if (sessionLoading || (loading && session)) {
        return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Loading your fleet...</div>;
    }

    // ✅ সেশন না থাকলে বা লগআউট করলে কন্টেন্ট শো করবে না (সরাসরি রিডাইরেক্ট হতে সাহায্য করবে)
    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#f7f5f0] py-16 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto">
                
                {/* হেডার সেকশন */}
                <div className="mb-8">
                    <span className="text-[10px] font-black tracking-widest text-[#82ab24] uppercase">
                        Manage Fleet
                    </span>
                    <h1 className="text-5xl font-black text-[#1c2e24] tracking-tight mt-1">
                        My Listings
                    </h1>
                </div>

                {/* কার লিস্টের প্রধান কন্টেইনার */}
                {cars.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center text-gray-400 font-bold shadow-sm">
                        You have not added any cars yet!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cars.map((car) => (
                            <div 
                                key={car._id} 
                                className="bg-white rounded-[2rem] p-5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100"
                            >
                                <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
                                    <img 
                                        src={car.imageUrl || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf"} 
                                        alt={car.carName} 
                                        className="w-full sm:w-36 h-24 object-cover rounded-2xl bg-gray-50"
                                    />
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-xl font-black text-[#1c2e24] tracking-tight">
                                            {car.carName}
                                        </h3>
                                        <div className="flex flex-col gap-1 mt-1.5 text-gray-400 font-bold text-[11px]">
                                            <span className="flex items-center justify-center sm:justify-start gap-1">
                                                Location: {car.pickupLocation || "N/A"}
                                            </span>
                                            <span className="flex items-center justify-center sm:justify-start gap-1">
                                                Price: ${car.dailyRentPrice}/day
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* অ্যাকশন বাটনসমূহ */}
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => openEditModal(car)}
                                        className="bg-gray-100 hover:bg-[#c1f05d] text-[#1c2e24] font-black text-sm px-5 py-2.5 rounded-xl transition-all duration-300 cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => openDeleteModal(car)}
                                        className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-black text-sm px-5 py-2.5 rounded-xl transition-all duration-300 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* EDIT MODAL */}
            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-[#f7f5f0] w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="text-center mb-6">
                            <h2 className="text-4xl font-black text-[#1c2e24] tracking-tight">Update Car</h2>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-black text-[#1c2e24] mb-1 uppercase tracking-wider">Daily Rent Price</label>
                                <input 
                                    type="number" 
                                    value={editForm.dailyRentPrice}
                                    onChange={(e) => setEditForm({...editForm, dailyRentPrice: e.target.value})}
                                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-bold text-[#1c2e24] focus:outline-none" 
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-[#1c2e24] mb-1 uppercase tracking-wider">Car Type</label>
                                <select 
                                    value={editForm.carType}
                                    onChange={(e) => setEditForm({...editForm, carType: e.target.value})}
                                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-bold text-[#1c2e24] focus:outline-none"
                                >
                                    <option value="SUV">SUV</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="Hatchback">Hatchback</option>
                                    <option value="Crossover">Crossover</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-[#1c2e24] mb-1 uppercase tracking-wider">Image URL</label>
                                <input 
                                    type="text" 
                                    value={editForm.imageUrl}
                                    onChange={(e) => setEditForm({...editForm, imageUrl: e.target.value})}
                                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-medium text-gray-500 truncate focus:outline-none" 
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-[#1c2e24] mb-1 uppercase tracking-wider">Pickup Location</label>
                                <input 
                                    type="text" 
                                    value={editForm.pickupLocation}
                                    onChange={(e) => setEditForm({...editForm, pickupLocation: e.target.value})}
                                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-bold text-[#1c2e24] focus:outline-none" 
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-[#1c2e24] mb-1 uppercase tracking-wider">Description</label>
                                <textarea 
                                    rows="3"
                                    value={editForm.description}
                                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-medium text-gray-600 focus:outline-none resize-none"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-[#1c2e24] mb-1 uppercase tracking-wider">Availability Status</label>
                                <select 
                                    value={editForm.availabilityStatus}
                                    onChange={(e) => setEditForm({...editForm, availabilityStatus: e.target.value})}
                                    className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm font-bold text-[#1c2e24] focus:outline-none"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Unavailable">Unavailable</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button 
                                    type="button" 
                                    onClick={() => setIsEditOpen(false)}
                                    className="bg-white hover:bg-gray-200 text-gray-700 font-bold px-6 py-2.5 rounded-xl text-sm cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-[#1c2e24] hover:bg-black text-white font-bold px-6 py-2.5 rounded-xl text-sm cursor-pointer"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRM MODAL */}
            {isDeleteOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl text-center">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">Delete listing?</h3>
                        <p className="text-xs text-gray-400 font-semibold px-4 mb-6 leading-relaxed">
                            This removes the car from your listings and the marketplace.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button 
                                onClick={() => setIsDeleteOpen(false)}
                                className="bg-gray-100 hover:bg-gray-200 text-slate-700 font-bold px-5 py-2.5 rounded-full text-xs transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDeleteConfirm}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-full text-xs transition-all shadow-md shadow-red-100 cursor-pointer"
                            >
                                Delete listing
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAddedCarsPage;