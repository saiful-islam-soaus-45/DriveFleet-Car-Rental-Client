"use client";

import ExploreCarCard from "@/components/ExploreCarCard";
import { useEffect, useState } from "react";

const ExploreCar = () => {
    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/explore-cars?search=${search}&type=${type}`,
                    {
                        cache: "no-store",
                    }
                );

                const data = await res.json();
                setCars(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [search, type]);

    return (
        <div className="bg-[#f7f5f0] min-h-screen py-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto mb-10">
                <p className="text-xs font-black tracking-widest text-[#1c2e24] opacity-50 uppercase mb-1">
                    Our Fleet
                </p>

                <h2 className="text-3xl sm:text-4xl font-black text-[#1c2e24] tracking-tight uppercase mb-6">
                    Explore Cars
                </h2>

                {/* Search + Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search by car name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                          className="w-full border-2 border-[#c1f05d] focus:border-[#8bcf00] focus:ring-2 focus:ring-[#c1f05d] focus:outline-none rounded-xl px-4 py-3 bg-white"

                    />


                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="border-2 border-[#c1f05d] focus:border-[#8bcf00] focus:ring-2 focus:ring-[#c1f05d] focus:outline-none rounded-xl px-4 py-3 bg-white">
                        <option value="all">All Types</option>
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Luxury">Luxury</option>
                        <option value="Electric">Electric</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-xl font-semibold">
                    Loading...
                </div>
            ) : (
                <>
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cars?.map((car) => (
                            <ExploreCarCard key={car._id} car={car} />
                        ))}
                    </div>

                    {cars.length === 0 && (
                        <div className="text-center py-20 text-gray-500 text-xl font-semibold">
                            No Cars Found
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ExploreCar;