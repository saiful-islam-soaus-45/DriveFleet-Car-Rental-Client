import Link from 'next/link';
import Image from 'next/image';

export default function Banner() {
    return (
        <section className="relative w-full bg-green-50 text-[#1c2e24] overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans">

            

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">

                <div className="flex flex-col space-y-6 text-center md:text-left items-center md:items-start w-full">
                    <span className="text-xs font-bold tracking-[0.2em] text-[#2d4a3e] uppercase">
                        Luxury Mobility On Demand
                    </span>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#1c2e24] tracking-tight leading-[1.05]">
                        Rent <br />
                        <span className="relative inline-block z-10 ">
                            sharper cars
                            <span className="absolute left-0 bottom-1 w-full h-3 bg-[#c1f05d] -z-10 opacity-90 rounded-sm" />
                        </span> <br />
                        for cleaner <br />
                        getaways.
                    </h1>

                    <p className="text-sm sm:text-base text-[#415e51] max-w-md leading-relaxed font-medium">
                        Discover curated cars across Dhaka, book instantly, or list your own vehicle with a private owner dashboard.
                    </p>

                    <div className="pt-4">
                        <Link href="/explore-cars">
                            <button className="group flex items-center gap-2 bg-[#c1f05d] hover:bg-[#b0df4c] text-[#1c2e24] font-bold px-7 py-3.5 rounded-full transition-all duration-300 text-sm shadow-sm cursor-pointer">
                                Get started
                                <svg
                                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform stroke-[2.5]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>


                <div className="flex justify-center md:justify-end w-full">

                    <div className="relative w-full max-w-xl aspect-4/3   rounded-[2rem] shadow-2xl shadow-green-800">

                        

                        <div className="relative w-full h-full overflow-hidden rounded-[1.5rem] mt-2 z-10">
                            <Image
                                src="/assets/car.png"
                                alt="DriveFleet Premium Car"
                                fill
                                priority
                                className="object-cover object-center transform hover:scale-105 transition-transform duration-700 grayscale-20 contrast-110"
                                sizes="(max-w-7xl) 100vw, 50vw"
                            />
                            
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}