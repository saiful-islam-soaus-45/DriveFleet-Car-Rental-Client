import React from 'react';

const NextDestinationBanner = () => {
    return (
        <section className="bg-[#f7f5f0] py-16 px-4 sm:px-8">
            {/* মূল ডার্ক গ্রিন কন্টেইনার */}
            <div className="max-w-7xl mx-auto bg-[#1c2e24] rounded-[3.5rem] py-24 px-6 sm:px-12 text-center relative overflow-hidden shadow-[0_15px_40px_rgba(28,46,36,0.12)]">
                
                {/* Background Text - ব্যাকগ্রাউন্ডের বড় জলছাপ "FLEET" লেখা */}
                <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
                    <span className="text-[12rem] sm:text-[18rem] md:text-[24rem] font-black tracking-widest text-white/[0.02] uppercase italic select-none">
                        FLEET
                    </span>
                </div>

                {/* কন্টেন্ট এরিয়া */}
                <div className="max-w-3xl mx-auto z-10 relative">
                    
                    {/* মেইন হেডিং */}
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight italic leading-tight">
                        Ready for Your <br />
                        <span className="text-[#00e676] not-italic sm:italic block sm:inline mt-2 sm:mt-0 drop-shadow-[0_2px_10px_rgba(0,230,118,0.2)]">
                            Next Destination?
                        </span>
                    </h2>

                    {/* সাব-টেক্সট / বিবরণ */}
                    <p className="text-xs sm:text-sm text-gray-400/90 font-medium italic leading-relaxed mt-6 mb-10 max-w-xl mx-auto">
                        Experience the gold standard of concierge mobility in Bangladesh. Our fleet is ready when you are.
                    </p>

                    {/* বাটন সেকশন (হভার ইফেক্টসহ) */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        
                        {/* ১. Explore The Fleet (সাদা বাটন) */}
                        <button className="w-full sm:w-auto bg-white text-[#1c2e24] font-black text-xs tracking-widest uppercase px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:bg-gray-50 hover:shadow-[0_8px_25px_rgba(255,255,255,0.25)] cursor-pointer">
                            Explore The Fleet
                        </button>

                        {/* ২. Consult Concierge (ছবিতে থাকা নিয়ন গ্রিন হভার ও গ্লোয়িং বর্ডার বাটন) */}
                        <button className="w-full sm:w-auto bg-[#1c2e24] text-white font-black text-xs tracking-widest uppercase px-8 py-4 rounded-xl border border-[#22c55e] transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:bg-[#1a3a29] hover:border-[#4ade80] hover:shadow-[0_0_25px_rgba(74,222,128,0.5)] cursor-pointer">
                            Consult Concierge
                        </button>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default NextDestinationBanner;