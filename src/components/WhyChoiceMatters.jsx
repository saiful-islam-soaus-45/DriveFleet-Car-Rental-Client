import React from 'react';

const WhyChoiceMattersLarge = () => {
    return (
        <section className="bg-[#f7f5f0] py-20 px-4 sm:px-8 lg:px-12">
            {/* max-w-7xl করে সেকশনটি আরও বড় এবং চওড়া করা হয়েছে */}
            <div className="w-full  bg-white rounded-[3rem] overflow-hidden shadow-[0_4px_35px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col lg:flex-row items-stretch">
                
                {/* বাম পাশের কন্টেন্ট সেকশন - প্যাডিং বাড়িয়ে স্পেস বড় করা হয়েছে */}
                <div className="w-full lg:w-1/2 p-8 sm:p-16 lg:p-20 flex flex-col justify-center">
                    <div className="mb-12">
                        <span className="text-xs font-black tracking-widest text-[#82ab24] uppercase block mb-2">
                            The Difference
                        </span>
                        <h2 className="text-5xl sm:text-6xl font-black text-[#1c2e24] tracking-tight leading-none">
                            Why Choice <br />
                            <span className="text-[#82ab24]">Matters.</span>
                        </h2>
                    </div>

                    {/* বৈশিষ্ট্যসমূহের লিস্ট (Hover Effects Added) */}
                    <div className="space-y-8">
                        {/* ১. Transparency & Integrity */}
                        <div className="flex items-start gap-5 group cursor-pointer">
                            {/* group-hover ব্যবহারের ফলে মাউস আনলে ব্যাকগ্রাউন্ড ডার্ক গ্রিন (#1c2e24) হবে */}
                            <div className="flex-shrink-0 w-11 h-11 rounded-2xl border-2 border-gray-100 bg-white flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:bg-[#1c2e24] group-hover:border-[#1c2e24]">
                                <svg className="w-5 h-5 text-[#82ab24] transition-colors duration-300 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-[#1c2e24] tracking-tight transition-colors duration-300 group-hover:text-[#82ab24]">
                                    Transparency & Integrity
                                </h4>
                                <p className="text-sm text-gray-400 font-semibold mt-1.5 leading-relaxed max-w-md">
                                    No hidden charges. Open, honest, reliable, and respectful in all dealings.
                                </p>
                            </div>
                        </div>

                        {/* ২. Customer Service */}
                        <div className="flex items-start gap-5 group cursor-pointer">
                            <div className="flex-shrink-0 w-11 h-11 rounded-2xl border-2 border-gray-100 bg-white flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:bg-[#1c2e24] group-hover:border-[#1c2e24]">
                                <svg className="w-5 h-5 text-[#82ab24] transition-colors duration-300 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-[#1c2e24] tracking-tight transition-colors duration-300 group-hover:text-[#82ab24]">
                                    Customer Service
                                </h4>
                                <p className="text-sm text-gray-400 font-semibold mt-1.5 leading-relaxed max-w-md">
                                    Customer-centric organization focused on exceeding expectations and earning trust.
                                </p>
                            </div>
                        </div>

                        {/* ৩. Quality */}
                        <div className="flex items-start gap-5 group cursor-pointer">
                            <div className="flex-shrink-0 w-11 h-11 rounded-2xl border-2 border-gray-100 bg-white flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:bg-[#1c2e24] group-hover:border-[#1c2e24]">
                                <svg className="w-5 h-5 text-[#82ab24] transition-colors duration-300 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-[#1c2e24] tracking-tight transition-colors duration-300 group-hover:text-[#82ab24]">
                                    Quality
                                </h4>
                                <p className="text-sm text-gray-400 font-semibold mt-1.5 leading-relaxed max-w-md">
                                    All vehicles are first-hand and maintained in excellent condition.
                                </p>
                            </div>
                        </div>

                        {/* ৪. Creativity & Innovation */}
                        <div className="flex items-start gap-5 group cursor-pointer">
                            <div className="flex-shrink-0 w-11 h-11 rounded-2xl border-2 border-gray-100 bg-white flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:bg-[#1c2e24] group-hover:border-[#1c2e24]">
                                <svg className="w-5 h-5 text-[#82ab24] transition-colors duration-300 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-[#1c2e24] tracking-tight transition-colors duration-300 group-hover:text-[#82ab24]">
                                    Creativity & Innovation
                                </h4>
                                <p className="text-sm text-gray-400 font-semibold mt-1.5 leading-relaxed max-w-md">
                                    Adopting the best technology solutions to serve economy, luxury, and commercial needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ডান পাশের ডার্ক গ্রিন কার্ড সেকশন - কন্টেন্ট বড় করা হয়েছে */}
                <div className="w-full lg:w-1/2 bg-[#1c2e24] p-12 sm:p-16 lg:p-20 flex flex-col justify-between items-center text-center relative overflow-hidden min-h-[450px] lg:min-h-auto rounded-[2.5rem] lg:rounded-none m-4 lg:m-0">
                    
                    

                    {/* মেইন কোট টেক্সট */}
                    <div className="my-auto max-w-xl z-10">
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-white italic tracking-tight leading-snug">
                            "Our product is not vehicles, <br className="hidden sm:inline" />
                            but customer satisfaction <br className="hidden sm:inline" />
                            delivered by people."
                        </p>
                    </div>

                    
                </div>

            </div>
        </section>
    );
};

export default WhyChoiceMattersLarge;