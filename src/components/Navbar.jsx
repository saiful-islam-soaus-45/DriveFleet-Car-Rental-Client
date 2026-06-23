"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client'; // 👈 আপনার প্রজেক্টের সঠিক পাথ অনুযায়ী এটি চেক করে নিন

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // মোবাইল মেনুর জন্য
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // প্রোফাইল ড্রপডাউনের জন্য

    // 🌟 Better-Auth এর মাধ্যমে লাইভ সেশন ডাটা ট্র্যাক করা
    const { data: session } = authClient.useSession();
    const user = session?.user; // ইউজার থাকলে অবজেক্ট পাবেন, না থাকলে null

    const handleLogout = async () => {
        await authClient.signOut();
        setIsDropdownOpen(false);
        setIsOpen(false);
        window.location.reload(); // সেশন পুরোপুরি ক্লিয়ার করে পেজ রিফ্রেশ করার জন্য
    };

    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm px-4 sm:px-6 py-4 relative z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* LEFT: Logo Section */}
                <div className="flex items-center space-x-3 shrink-0">
                    <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                        DriveFleet
                    </span>
                </div>

                {/* CENTER: Navigation Links (Desktop: md & lg screens) */}
                <ul className="hidden md:flex lg:space-x-8 md:space-x-5 items-center">
                    <li>
                        <Link href={"/"} className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base">Home</Link>
                    </li>
                    <li>
                        <Link href={"/explore-cars"} className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base">Explore Cars</Link>
                    </li>
                    <li>
                        <Link href={"/add-car"} className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base">Add Car</Link>
                    </li>
                    <li>
                        <Link href={"/my-bookings"} className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base">My Bookings</Link>
                    </li>
                </ul>

                {/* RIGHT: Actions & Dropdown / Login */}
                <div className="flex items-center space-x-4">
                    
                    {/* Desktop View Action: Logged In vs Logged Out */}
                    <div className="hidden md:block">
                        {user ? (
                            /* প্রোফাইল ড্রপডাউন কন্টেইনার */
                            <div className="relative">
                                <button 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 border border-gray-200 p-1.5 rounded-full hover:shadow-sm transition-all focus:outline-none cursor-pointer"
                                >
                                    <img 
                                        src={user.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                                        alt="Profile" 
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <svg className="w-4 h-4 text-slate-500 pr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>

                                {/* ড্রপডাউন মেনু */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                            <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                                            <p className="text-xs text-slate-400 truncate">{user.email}</p>
                                        </div>
                                        <Link href="/add-car" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium">Add Car</Link>
                                        <Link href="/my-bookings" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium">My Bookings</Link>
                                        <Link href="/my-added-cars" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium">My Added Cars</Link>
                                        <Link href="/login">
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold border-t border-gray-50 mt-1 cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* 🌟 শুধুমাত্র 'Login' লেখাটি রাখা হয়েছে (Register বাটন সরানো হয়েছে) */
                            <Link href={"/login"} className="text-slate-700 hover:text-blue-600 font-bold transition-colors text-sm lg:text-base mr-2">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-slate-700 hover:bg-slate-50 rounded-lg focus:outline-none cursor-pointer"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

            </div>

            {/* MOBILE BREAKDOWN DRAWER */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg md:hidden transition-all duration-200 ease-in-out">
                    <div className="px-4 pt-2 pb-6 flex flex-col space-y-3">
                        <Link href={"/"} onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm py-1">Home</Link>
                        <Link href={"/explore-cars"} onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm py-1">Explore Cars</Link>
                        <Link href={"/add-car"} onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm py-1">Add Car</Link>
                        <Link href={"/my-bookings"} onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm py-1">My Bookings</Link>

                        {/* Mobile view and conditional actions */}
                        <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
                            {user ? (
                                <>
                                    <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-2xl mb-2">
                                        <img src={user.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                                        <div className="truncate">
                                            <p className="text-sm font-bold text-slate-800">{user.name}</p>
                                            <p className="text-xs text-slate-400">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link href="/my-added-cars" onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-blue-600 font-medium text-sm py-1">My Added Cars</Link>
                                    <Link href="/login">
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full text-left text-red-600 font-semibold text-sm py-2 cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    {/* মোবাইল ভিউতে লগইন না থাকলে বাটন */}
                                    <Link href="/login" onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-blue-600 font-semibold text-sm text-center py-2">
                                        Login
                                    </Link>
                                    <Link href="/register" onClick={() => setIsOpen(false)} className="w-full block">
                                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-full shadow-md text-sm cursor-pointer">
                                            Register
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;