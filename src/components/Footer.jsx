"use client"
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 4-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    
                    {/* Column 1: Brand & About */}
                    <div className="space-y-4 text-center sm:text-left flex flex-col items-center sm:items-start">
                        <span className="text-xl font-black text-white tracking-tight">
                            DriveFleet
                        </span>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                            Find the perfect ride for any occasion. DriveFleet connects you with high-quality, trusted rental cars in your location with maximum flexibility.
                        </p>
                        {/* Social Links */}
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                                <span className="text-sm">Fb</span>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-400 hover:text-white transition-all">
                                <span className="text-sm">Tw</span>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all">
                                <span className="text-sm">In</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Navigation */}
                    <div className="text-center sm:text-left">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/explore-cars" className="hover:text-blue-400 transition-colors">Explore Cars</Link>
                            </li>
                            <li>
                                <Link href="/add-car" className="hover:text-blue-400 transition-colors">Add Car</Link>
                            </li>
                            <li>
                                <Link href="/my-bookings" className="hover:text-blue-400 transition-colors">My Bookings</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact us</h4>
                        <ul className="space-y-3 text-sm text-slate-400 flex flex-col items-center sm:items-start">
                            <li className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2">
                                <span className="text-slate-500">📍</span>
                                <span className="text-center sm:text-left">123 Fleet Avenue, Suite 500,<br />Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-slate-500">📞</span>
                                <span>+880 1234 567890</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-slate-500">✉️</span>
                                <span>support@drivefleet.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter or Trust Factor */}
                    <div className="text-center sm:text-left">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Stay Updated</h4>
                        <p className="text-sm text-slate-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <div className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto sm:mx-0">
                            <input 
                                type="email" 
                                placeholder="Enter email" 
                                className="bg-slate-800 text-white placeholder-slate-500 text-sm px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 w-full text-center sm:text-left"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all cursor-pointer w-full sm:w-auto">
                                Go
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar (Copyright & Disclaimers) */}
                <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
                    <p>&copy; {new Date().getFullYear()} DriveFleet. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;