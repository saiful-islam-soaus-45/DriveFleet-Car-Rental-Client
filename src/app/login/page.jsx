"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client'; // 👈 আপনার প্রজেক্টের সঠিক পাথ অনুযায়ী এটি পরিবর্তন করুন
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Better-Auth Email & Password Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await authClient.signIn.email({
                email: email,
                password: password,
                callbackURL: '/' // লগইন সফল হলে স্বয়ংক্রিয়ভাবে হোমে যাওয়ার জন্য
            });

            if (error) {
                throw new Error(error.message || "Invalid email or password.");
            }

            toast.success("Login Successful!");
            router.push('/'); // হোম রুটে রিডাইরেক্ট
            router.refresh();
        } catch (error) {
            toast.error(error.message || "Login Failed! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Better-Auth Google Login
    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/' // গুগল লগইন সফল হলে হোম রুটে রিডাইরেক্ট করবে
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
                        Welcome Back
                    </span>
                    <h2 className="text-4xl font-black text-[#1c2e24] tracking-tight">
                        Account Login
                    </h2>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-black text-[#1c2e24] mb-1.5 uppercase tracking-wider">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email" // 👈 ব্রাউজারের ডেটা ট্র্যাকিংয়ের জন্য name প্রয়োজন
                            autoComplete="email" // 👈 এটি থাকলে ইমেইল লিস্ট সাজেস্ট করবে
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@mail.com"
                            className="w-full bg-slate-50 border border-gray-200 rounded-2xl p-3.5 text-sm font-medium text-[#1c2e24] focus:outline-none focus:border-[#82ab24] focus:bg-white transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black text-[#1c2e24] mb-1.5 uppercase tracking-wider">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password" // 👈 পাসওয়ার্ড চেনার জন্য
                            autoComplete="current-password" // 👈 লগইন পেজ হলে current-password দিবেন, আর রেজিস্ট্রেশন পেজ হলে new-password দিবেন
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
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>

                <div className="relative flex py-5 items-center">
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
                        Don't have an account?{' '}
                        <Link href="/register" className="text-[#82ab24] font-black hover:underline ml-1">
                            Register here
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;