"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm px-4 sm:px-6 py-4 relative z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* LEFT: Logo Section */}
                <div className="flex items-center space-x-3 shrink-0">
                    {/* Blue Book Icon */}

                    {/* Logo Text */}
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
                        <Link href={"/my-bookings"} className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base">My Bookings
                        </Link>
                    </li>
                </ul>

                {/* RIGHT: Actions & Mobile Toggle */}
                <div className="flex items-center lg:space-x-6 space-x-3">
                    {/* Action Links (Hidden on small mobile screens, visible on sm/md/lg) */}
                    <div className="hidden sm:flex items-center lg:space-x-6 space-x-4">
                        <Link href={"/login"} className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base">
                            Login
                        </Link>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold lg:px-6 lg:py-2.5 px-4 py-2 rounded-full shadow-md shadow-blue-200 transition-all text-sm">
                            Join Free
                        </button>
                    </div>

                    {/* Mobile Menu Button (Visible only below md breakpoint) */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-slate-700 hover:bg-slate-50 rounded-lg focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

            </div>

            {/* MOBILE BREAKDOWN DRAWER (Toggled via State) */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg md:hidden transition-all duration-200 ease-in-out">
                    <div className="px-4 pt-2 pb-6 space-y-3 flex flex-col">
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
                            <Link href={"/my-bookings"} className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base">My Bookings
                            </Link>
                        </li>

                        {/* Action buttons inside mobile drawer (For screen sizes narrower than 'sm') */}
                        <div className="pt-4 border-t border-[#e8e4da] sm:hidden flex flex-col space-y-3">
                            {/* Login Link: টেক্সট সেন্টার করে থিম কালার দেওয়া হয়েছে */}
                            <Link
                                href="/login"
                                className="text-[#415e51] hover:text-[#1c2e24] font-semibold transition-colors text-sm text-center py-2"
                            >
                                Login
                            </Link>

                            {/* Register Link & Button: Mossforge সিগনেচার লাইম কালার (#c1f05d) দেওয়া হলো যেন ব্যানার বাটনের সাথে মিলে যায় */}
                            <Link href="/register" className="w-full block">
                                <button className="w-full bg-[#c1f05d] hover:bg-[#b0df4c] text-[#1c2e24] font-bold py-2.5 rounded-full shadow-md transition-all duration-300 text-sm">
                                    Join Free
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;