import Link from 'next/link';
import Image from 'next/image';

export default function Banner() {
    return (
        <section
            className="relative min-h-screen flex items-center overflow-hidden bg-cover bg-center"
            style={{
                backgroundImage: "url('/assets/car.png')",
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/55"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl text-center mx-auto">
                    <span className="text-xs font-bold tracking-[0.2em] text-[#c1f05d] uppercase">
                        Luxury Mobility On Demand
                    </span>

                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mt-4">
                        <span className="bg-linear-to-r from-white via-[#e8ffe8] to-[#c1f05d] bg-clip-text text-transparent">
                            Rent
                        </span>{" "}

                        <span className="bg-linear-to-r from-[#c1f05d] via-[#d7ff73] to-[#ffffff] bg-clip-text text-transparent">
                            sharper cars
                        </span>

                        <br />

                        <span className="bg-linear-to-r from-white via-[#f3fff3] to-[#c1f05d] bg-clip-text text-transparent">
                            for cleaner
                        </span>{" "}

                        <span className="bg-linear-to-r from-[#c1f05d] via-white to-[#d7ff73] bg-clip-text text-transparent">
                            getaways.
                        </span>
                    </h1>
                    <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed font-medium mt-6">
                        Discover curated cars across Dhaka, book instantly, or list your own
                        vehicle with a private owner dashboard.
                    </p>

                    <div className="pt-8 flex justify-center">
                        <Link href="/explore-cars">
                            <button className="group flex items-center gap-2 bg-[#c1f05d] hover:bg-[#b0df4c] text-[#1c2e24] font-bold px-7 py-3.5 rounded-full transition-all duration-300 text-sm shadow-sm cursor-pointer">
                                Get Started
                                <svg
                                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform stroke-[2.5]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-64 bg-linear-to-b from-transparent via-white/10 to-white pointer-events-none z-10"></div>

        </section>
    );
}