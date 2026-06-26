import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-[#f7f5f0] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-md w-full text-center">
                
                <div className="relative p-0.5 rounded-[2.5rem] bg-linesr-to-br from-[#c1f05d] via-[#d4f77a] to-[#c1f05d] shadow-[0_0_40px_rgba(193,240,93,0.35)] mb-8">
                    <div className="bg-white rounded-[2.4rem] p-8 sm:p-12 flex flex-col items-center justify-center">
                        
                        <h1 className="text-8xl font-black text-[#1c2e24] tracking-tighter mb-2 animate-bounce">
                            404
                        </h1>
                        
                        <div className="bg-[#f7f5f0] p-4 rounded-full border border-gray-100 text-[#1c2e24] mb-4">
                            <svg className="w-12 h-12 text-[#82ab24]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-black text-[#1c2e24] tracking-tight mb-2">
                            Route Not Found!
                        </h2>
                        
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">
                            Oops! It seems like you have driven off the map. The page you are looking for does not exist or has been moved.
                        </p>
                    </div>
                </div>

                <Link href="/" className="inline-block w-full sm:w-auto">
                    <button className="inline-flex items-center justify-center gap-2 bg-[#c1f05d] hover:bg-[#b0dc4b] text-[#1c2e24] font-black py-4 px-8 rounded-2xl shadow-md transition-all duration-300 text-sm tracking-wider uppercase cursor-pointer">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        Back to Home
                    </button>
                </Link>

            </div>
        </div>
    );
};

export default NotFoundPage;