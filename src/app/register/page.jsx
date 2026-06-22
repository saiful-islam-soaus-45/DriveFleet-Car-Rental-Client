"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client'; // 👈 আপনার প্রজেক্টের সঠিক পাথ অনুযায়ী এটি পরিবর্তন করুন
import { FcGoogle } from 'react-icons/fc';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Better-Auth Email Sign Up
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await authClient.signUp.email({
                email: email,
                password: password,
                name: name,
                image: photoUrl, // Better-Auth এ ছবিকে 'image' ফিল্ডে পাঠানো হয়
                callbackURL: '/'
            });

            if (error) {
                throw new Error(error.message || "Registration failed.");
            }

            toast.success("Registration Successful!");

            // রেজিস্ট্রেশন সফল হলে সরাসরি হোম পেজে নিয়ে যাবে
            setTimeout(() => {
                router.push('/');
                router.refresh();
            }, 1000);

        } catch (error) {
            toast.error(error.message || "Registration Failed! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Better-Auth Google Login (রেজিস্ট্রেশন পেজের জন্য)
    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/'
            });
            toast.success("Redirecting to Google...");
        } catch (error) {
            toast.error("Google Login Failed!");
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-gray-100">

                <div className="text-center mb-8">
                    <span className="text-[10px] font-black tracking-widest text-[#82ab24] uppercase block mb-1">
                        Get Started
                    </span>
                    <h2 className="text-4xl font-black text-[#1c2e24] tracking-tight">
                        User Registration
                    </h2>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">

                    {/* Name Field */}
                    <div>
                        <label className="block text-xs font-black text-[#1c2e24] mb-1.5 uppercase tracking-wider">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name" // 👈 ব্রাউজারের অটো-ফিলের জন্য যুক্ত করা হলো
                            autoComplete="name" // 👈 ইউজারের নাম সাজেস্ট করবে
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full bg-slate-50 border border-gray-200 rounded-2xl p-3.5 text-sm font-medium text-[#1c2e24] focus:outline-none focus:border-[#82ab24] focus:bg-white transition-all"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-xs font-black text-[#1c2e24] mb-1.5 uppercase tracking-wider">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email" // 👈 ব্রাউজারের অটো-ফিলের জন্য যুক্ত করা হলো
                            autoComplete="email" // 👈 আগের সেভ করা ইমেইল সাজেস্ট করবে
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@mail.com"
                            className="w-full bg-slate-50 border border-gray-200 rounded-2xl p-3.5 text-sm font-medium text-[#1c2e24] focus:outline-none focus:border-[#82ab24] focus:bg-white transition-all"
                            required
                        />
                    </div>

                    {/* Photo URL Field */}
                    <div>
                        <label className="block text-xs font-black text-[#1c2e24] mb-1.5 uppercase tracking-wider">
                            Photo URL
                        </label>
                        <input
                            type="url"
                            name="photoUrl" // 👈 ব্রাউজারের অটো-ফিলের জন্য যুক্ত করা হলো
                            autoComplete="on" // 👈 আগের ইনপুট করা ইমেজ লিঙ্ক মনে রাখতে সাহায্য করবে
                            value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                            placeholder="https://example.com/photo.jpg"
                            className="w-full bg-slate-50 border border-gray-200 rounded-2xl p-3.5 text-sm font-medium text-[#1c2e24] focus:outline-none focus:border-[#82ab24] focus:bg-white transition-all"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-xs font-black text-[#1c2e24] mb-1.5 uppercase tracking-wider">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-slate-50 border border-gray-200 rounded-2xl p-3.5 text-sm font-medium text-[#1c2e24] focus:outline-none focus:border-[#82ab24] focus:bg-white transition-all"
                            required
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1c2e24] hover:bg-black text-white font-black py-4 px-6 rounded-2xl text-sm transition-all shadow-md cursor-pointer tracking-wide disabled:bg-gray-400"
                        >
                            {loading ? "Registering..." : "Register Button"}
                        </button>
                    </div>
                </form>

                <div className="relative flex py-4 items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold">OR</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-500 hover:bg-gray-50 text-slate-700 font-bold py-3.5 px-6 rounded-2xl text-sm transition-all cursor-pointer"
                >
                    <span className="flex items-center gap-2">
                        <FcGoogle className="w-5 h-5" />
                        Continue with Google
                    </span>
                </button>

                <div className="text-center mt-8 pt-6 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-400">
                        Already have an account?{' '}
                        <Link href="/login" className="text-[#82ab24] font-black hover:underline ml-1">
                            Login here
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;