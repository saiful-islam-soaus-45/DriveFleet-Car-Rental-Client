"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // অ্যাক্টিভ রুট ট্র্যাক করার জন্য হুক
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';

const Navbar = () => {
    const pathname = usePathname(); // বর্তমান পেজের পাথনেম (যেমন: '/', '/explore-cars')
    const [isOpen, setIsOpen] = useState(false); // মোবাইল মেনুর জন্য
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // প্রোফাইল ড্রপডাউনের জন্য
    const [imageError, setImageError] = useState(false); // ইমেজ এরর ট্র্যাক করার জন্য

    // Better-Auth এর মাধ্যমে লাইভ সেশন ডাটা ট্র্যাক করা
    const { data: session } = authClient.useSession();
    const user = session?.user; // ইউজার থাকলে অবজেক্ট পাবেন, না থাকলে null

    const handleLogout = async () => {
        await authClient.signOut();
        setIsDropdownOpen(false);
        setIsOpen(false);
        window.location.reload(); // সেশন পুরোপুরি ক্লিয়ার করে পেজ রিফ্রেশ করার জন্য
    };

    // অ্যাক্টিভ রুট চেক করার ফাংশন
    const isActive = (path) => pathname === path;

    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm px-4 sm:px-6 py-4 relative z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* 🚗 LEFT: Logo Section with Custom Lime Green Shadow (#c1f05d) */}
                <Link href="/" className="flex items-center space-x-2 shrink-0 group focus:outline-none">
                    <div className="bg-[#c1f05d] p-2 rounded-xl shadow-[0_0_15px_rgba(193,240,93,0.6)] group-hover:shadow-[0_0_20px_rgba(193,240,93,0.9)] transition-all duration-300">
                        <svg className="w-5 h-5 text-[#2d4a3e]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h7.5m3 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.5m-1.5-3h-15.75m15.75 3v-3.75m0 0-.75-3.75a3 3 0 0 0-3-2.25H6.108c-1.435 0-2.658 1.014-2.922 2.425L2.25 12m19.5 3h-19.5m0 0v-3.75" />
                        </svg>
                    </div>
                    <span className="text-lg sm:text-xl font-black text-[#2d4a3e] tracking-tight">
                        DriveFleet
                    </span>
                </Link>

                {/* CENTER: Navigation Links (Desktop) */}
                <ul className="hidden md:flex lg:space-x-8 md:space-x-5 items-center">
                    {[
                        { name: 'Home', href: '/' },
                        { name: 'Explore Cars', href: '/explore-cars' },
                        { name: 'Add Car', href: '/add-car' },
                        { name: 'My Bookings', href: '/my-bookings' }
                    ].map((link) => (
                        <li key={link.href} className="relative py-2">
                            <Link 
                                href={link.href} 
                                className="text-[#2d4a3e] font-bold text-sm lg:text-base transition-colors duration-200"
                            >
                                {link.name}
                            </Link>
                            {/* 🎯 অ্যাক্টিভ রুটের নিচে ইন্ডিকেটর বার */}
                            {isActive(link.href) && (
                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#c1f05d] rounded-full animate-in fade-in zoom-in-95 duration-300" />
                            )}
                        </li>
                    ))}
                </ul>

                {/* RIGHT: Actions & Dropdown / Login */}
                <div className="flex items-center space-x-4">

                    {/* Desktop View Action */}
                    <div className="hidden md:block">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 border border-gray-200 p-1.5 rounded-full hover:shadow-sm transition-all focus:outline-none cursor-pointer bg-slate-50"
                                >
                                    {user.image && !imageError ? (
                                        <img src={user.image} alt="Profile" className="w-8 h-8 rounded-full object-cover" onError={() => setImageError(true)} />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-[#c1f05d] text-[#2d4a3e] flex items-center justify-center text-sm font-black uppercase">
                                            {user.name ? user.name.charAt(0) : 'U'}
                                        </div>
                                    )}
                                    <svg className="w-4 h-4 text-gray-400 pr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                            <p className="text-sm font-bold text-[#2d4a3e] truncate">{user.name}</p>
                                            <p className="text-xs text-slate-400 truncate">{user.email}</p>
                                        </div>
                                        <Link href="/add-car" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-[#2d4a3e] hover:bg-slate-50 font-medium">Add Car</Link>
                                        <Link href="/my-bookings" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-[#2d4a3e] hover:bg-slate-50 font-medium">My Bookings</Link>
                                        <Link href="/my-added-cars" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-[#2d4a3e] hover:bg-slate-50 font-medium">My Added Cars</Link>
                                        <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold border-t border-gray-50 mt-1 cursor-pointer">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href={"/login"} className="bg-[#c1f05d] hover:bg-[#aee33d] text-[#2d4a3e] font-extrabold px-6 py-2 rounded-full shadow-[0_4px_12px_rgba(193,240,93,0.3)] hover:shadow-[0_4px_16px_rgba(193,240,93,0.5)] transition-all text-sm cursor-pointer inline-block">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-[#2d4a3e] hover:bg-slate-50 rounded-lg focus:outline-none cursor-pointer"
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
                        {[
                            { name: 'Home', href: '/' },
                            { name: 'Explore Cars', href: '/explore-cars' },
                            { name: 'Add Car', href: '/add-car' },
                            { name: 'My Bookings', href: '/my-bookings' }
                        ].map((link) => (
                            <div key={link.href} className="relative pl-2 py-1">
                                {/* 🎯 মোবাইল ভিউতে অ্যাক্টিভ রুটের বাম পাশে একটি ছোট ইন্ডিকেটর বার */}
                                {isActive(link.href) && (
                                    <div className="absolute left-0 top-1 bottom-1 w-[4px] bg-[#c1f05d] rounded-full" />
                                )}
                                <Link 
                                    href={link.href} 
                                    onClick={() => setIsOpen(false)} 
                                    className={`font-bold text-sm block ${isActive(link.href) ? 'text-[#2d4a3e]' : 'text-slate-600'}`}
                                >
                                    {link.name}
                                </Link>
                            </div>
                        ))}

                        {/* Mobile view and conditional actions */}
                        <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
                            {user ? (
                                <>
                                    <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-2xl mb-2">
                                        {user.image && !imageError ? (
                                            <img src={user.image} alt="Profile" className="w-10 h-10 rounded-full object-cover" onError={() => setImageError(true)} />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-[#c1f05d] text-[#2d4a3e] flex items-center justify-center text-base font-black uppercase shrink-0">
                                                {user.name ? user.name.charAt(0) : 'U'}
                                            </div>
                                        )}
                                        <div className="truncate">
                                            <p className="text-sm font-bold text-[#2d4a3e]">{user.name}</p>
                                            <p className="text-xs text-slate-400">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="relative pl-2 py-1">
                                        {isActive('/my-added-cars') && <div className="absolute left-0 top-1 bottom-1 w-[4px] bg-[#c1f05d] rounded-full" />}
                                        <Link href="/my-added-cars" onClick={() => setIsOpen(false)} className={`font-bold text-sm block ${isActive('/my-added-cars') ? 'text-[#2d4a3e]' : 'text-slate-600'}`}>My Added Cars</Link>
                                    </div>
                                    <button onClick={handleLogout} className="w-full text-left text-red-600 font-semibold text-sm py-2 cursor-pointer">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setIsOpen(false)} className="w-full block">
                                        <button className="w-full bg-[#c1f05d] hover:bg-[#aee33d] text-[#2d4a3e] font-extrabold py-2.5 rounded-full shadow-md text-sm transition-all cursor-pointer">
                                            Login
                                        </button>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsOpen(false)} className="w-full block">
                                        <button className="w-full bg-slate-100 hover:bg-slate-200 text-[#2d4a3e] font-bold py-2.5 rounded-full shadow-sm text-sm transition-all cursor-pointer">
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