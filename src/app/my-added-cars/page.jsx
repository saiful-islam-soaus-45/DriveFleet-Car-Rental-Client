"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { authClient } from "@/lib/auth-client"; 

const MyAddedCarsPage = () => {
    const router = useRouter();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const { data: session, isPending: sessionLoading } = authClient.useSession();

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    const [editLoading, setEditLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // 🛠️ ডাটাবেজের স্কিমা অনুযায়ী carType বদলে vehicleType করা হলো
    const [editForm, setEditForm] = useState({
        dailyRentPrice: '',
        vehicleType: 'SUV', 
        imageUrl: '',
        pickupLocation: '',
        description: '',
        availabilityStatus: 'Available'
    });

    const clearFormValues = () => {
        setEditForm({
            dailyRentPrice: '',
            vehicleType: 'SUV',
            imageUrl: '',
            pickupLocation: '',
            description: '',
            availabilityStatus: 'Available'
        });
        setSelectedCar(null);
    };

    const fetchMyCars = async () => {
        const userEmail = session?.user?.email;

        if (!userEmail) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-cars?email=${userEmail}`);
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

    useEffect(() => {
        if (!sessionLoading) {
            if (!session) {
                router.push('/login'); 
            } else {
                fetchMyCars();
            }
        }
    }, [session, sessionLoading, router]);

    const openEditModal = (car) => {
        setSelectedCar(car); 
        setEditForm({
            dailyRentPrice: car.dailyRentPrice || '',
            vehicleType: car.vehicleType || 'SUV', 
            imageUrl: car.imageUrl || '',
            pickupLocation: car.pickupLocation || '',
            description: car.description || '',
            availabilityStatus: car.availabilityStatus || 'Available'
        });
        setIsEditOpen(true);
    };

    const closeEditModal = () => {
        setIsEditOpen(false);
        clearFormValues();
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setEditLoading(true); 
        try {
            const { data: tokenData } = await authClient.token();
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/explore-cars/${selectedCar._id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(editForm)
            });

            if (res.ok) {
                setIsEditOpen(false);
                clearFormValues(); 
                fetchMyCars(); 
            } else {
                alert("Failed to update car info");
            }
        } catch (error) {
            console.error("Update error:", error);
        } finally {
            setEditLoading(false); 
        }
    };

    const openDeleteModal = (car) => {
        setSelectedCar(car);
        setIsDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        setDeleteLoading(true); 
        try {
            const { data: tokenData } = await authClient.token();
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/explore-cars/${selectedCar._id}`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`
                },
            });

            if (res.ok) {
                setIsDeleteOpen(false);
                setSelectedCar(null);
                fetchMyCars(); 
            } else {
                alert("Failed to delete car");
            }
        } catch (error) {
            console.error("Delete error:", error);
        } finally {
            setDeleteLoading(false); 
        }
    };

    if (sessionLoading || (loading && session)) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center font-black text-[#1c2e24] bg-[#f7f5f0] gap-3">
                <svg className="animate-spin h-8 w-8 text-[#82ab24]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-xs uppercase tracking-widest">Loading your fleet...</span>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#f7f5f0] py-28 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto">
                
                <div className="mb-8 text-center sm:text-left">
                    <span className="text-[10px] font-black tracking-widest text-[#82ab24] uppercase">
                        Manage Fleet
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black text-[#1c2e24] tracking-tight mt-1 uppercase">
                        My Listings
                    </h1>
                </div>

                {cars.length === 0 ? (
                    <div className="bg-white rounded-[2rem] p-12 text-center text-gray-400 font-bold shadow-sm border border-gray-100">
                        You have not added any cars yet!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cars.map((car) => (
                            <div 
                                key={car._id} 
                                className="bg-white rounded-[2rem] p-5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100"
                            >
                                <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
                                    <img 
                                        src={car.imageUrl || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf"} 
                                        alt={car.carModel} 
                                        className="w-full sm:w-36 h-24 object-cover rounded-2xl bg-gray-50"
                                    />
                                    <div className="text-center sm:text-left">
                                        {/* 🛠️ car.carName পরিবর্তন করে car.carModel করা হলো */}
                                        <h3 className="text-xl font-black text-[#1c2e24] tracking-tight">
                                            {car.carModel}
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

                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => openEditModal(car)}
                                        className="bg-gray-100 hover:bg-[#c1f05d] text-[#1c2e24] font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-300 cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => openDeleteModal(car)}
                                        className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-300 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-lg relative p-[2px] rounded-[2.5rem] bg-gradient-to-br from-[#c1f05d] via-[#d4f77a] to-[#c1f05d] shadow-[0_0_40px_rgba(193,240,93,0.35)] max-h-[90vh] overflow-y-auto">
                        <div className="bg-white w-full rounded-[2.4rem] p-8 sm:p-10 font-sans">
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-black text-[#1c2e24] tracking-tight uppercase">Update Car</h2>
                            </div>

                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div className="flex flex-col space-y-1.5">
                                    <label className="block text-xs font-black text-[#1c2e24] uppercase tracking-wider">Daily Rent Price ($)</label>
                                    <input 
                                        type="number" 
                                        value={editForm.dailyRentPrice}
                                        onChange={(e) => setEditForm({...editForm, dailyRentPrice: e.target.value})}
                                        className="w-full bg-[#f7f5f0] border border-gray-100 focus:border-[#c1f05d] focus:bg-white rounded-xl p-3.5 text-sm font-bold text-[#1c2e24] outline-none transition-all shadow-inner" 
                                        required
                                    />
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <label className="block text-xs font-black text-[#1c2e24] uppercase tracking-wider">Car Type</label>
                                    {/* 🛠️ carType এর বদলে vehicleType হ্যান্ডেল করা হয়েছে */}
                                    <select 
                                        value={editForm.vehicleType}
                                        onChange={(e) => setEditForm({...editForm, vehicleType: e.target.value})}
                                        className="w-full bg-[#f7f5f0] border border-gray-100 focus:border-[#c1f05d] focus:bg-white rounded-xl p-3.5 text-sm font-bold text-[#1c2e24] outline-none transition-all cursor-pointer"
                                    >
                                        <option value="SUV">SUV</option>
                                        <option value="Sedan">Sedan</option>
                                        <option value="Luxury">Luxury</option>
                                        <option value="Electric">Electric</option>
                                    </select>
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <label className="block text-xs font-black text-[#1c2e24] uppercase tracking-wider">Image URL</label>
                                    <input 
                                        type="text" 
                                        value={editForm.imageUrl}
                                        onChange={(e) => setEditForm({...editForm, imageUrl: e.target.value})}
                                        className="w-full bg-[#f7f5f0] border border-gray-100 focus:border-[#c1f05d] focus:bg-white rounded-xl p-3.5 text-sm font-bold text-[#1c2e24] outline-none transition-all shadow-inner" 
                                        required
                                    />
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <label className="block text-xs font-black text-[#1c2e24] uppercase tracking-wider">Pickup Location</label>
                                    <input 
                                        type="text" 
                                        value={editForm.pickupLocation}
                                        onChange={(e) => setEditForm({...editForm, pickupLocation: e.target.value})}
                                        className="w-full bg-[#f7f5f0] border border-gray-100 focus:border-[#c1f05d] focus:bg-white rounded-xl p-3.5 text-sm font-bold text-[#1c2e24] outline-none transition-all shadow-inner" 
                                        required
                                    />
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <label className="block text-xs font-black text-[#1c2e24] uppercase tracking-wider">Description</label>
                                    <textarea 
                                        rows="3"
                                        value={editForm.description}
                                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                                        className="w-full bg-[#f7f5f0] border border-gray-100 focus:border-[#c1f05d] focus:bg-white rounded-xl p-3.5 text-sm font-bold text-[#1c2e24] outline-none transition-all resize-none shadow-inner"
                                        required
                                    ></textarea>
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <label className="block text-xs font-black text-[#1c2e24] uppercase tracking-wider">Availability Status</label>
                                    <select 
                                        value={editForm.availabilityStatus}
                                        onChange={(e) => setEditForm({...editForm, availabilityStatus: e.target.value})}
                                        className="w-full bg-[#f7f5f0] border border-gray-100 focus:border-[#c1f05d] focus:bg-white rounded-xl p-3.5 text-sm font-bold text-[#1c2e24] outline-none transition-all cursor-pointer"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Unavailable">Unavailable</option>
                                    </select>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button 
                                        type="button" 
                                        onClick={closeEditModal}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    
                                    <button 
                                        type="submit" 
                                        disabled={editLoading}
                                        className="bg-[#c1f05d] hover:bg-[#b0dc4b] disabled:bg-[#e4fbc2] disabled:cursor-not-allowed text-[#1c2e24] font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
                                    >
                                        {editLoading && (
                                            <svg className="animate-spin h-3.5 w-3.5 text-[#1c2e24]" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                        )}
                                        <span>{editLoading ? "Saving..." : "Save Changes"}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="w-full max-w-sm relative p-[2px] rounded-[2.5rem] bg-gradient-to-br from-red-400 via-rose-300 to-red-400 shadow-[0_0_40px_rgba(225,29,72,0.25)]">
                        <div className="bg-white w-full rounded-[2.4rem] p-6 sm:p-8 font-sans text-center">
                            <h3 className="text-2xl font-black text-[#1c2e24] tracking-tight uppercase mb-2">Delete listing?</h3>
                            <p className="text-xs text-gray-400 font-bold px-2 mb-6 leading-relaxed">
                                This removes the car from your listings and the marketplace permanently.
                            </p>
                            
                            <div className="flex items-center justify-center gap-3">
                                <button 
                                    onClick={() => setIsDeleteOpen(false)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleDeleteConfirm}
                                    disabled={deleteLoading}
                                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-red-100"
                                >
                                    {deleteLoading && (
                                        <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    )}
                                    <span>{deleteLoading ? "Deleting..." : "Delete"}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAddedCarsPage;