"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const isGoogleLogin = localStorage.getItem('google_login_pending');
        if (isGoogleLogin) {

            toast.success("Login Successful!");

            localStorage.removeItem('google_login_pending');

            setTimeout(() => {
                router.push('/');
                router.refresh();
            }, 1200);
        }
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await authClient.signIn.email({
                email: email,
                password: password,
                callbackURL: '/'
            });

            if (error) {
                throw new Error(error.message || "Invalid email or password.");
            }

            toast.success("Login Successful!");
            router.push('/');
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
            localStorage.setItem('google_login_pending', 'true');

            await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/login'
            });
        } catch (error) {
            localStorage.removeItem('google_login_pending');
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
                            name="email"
                            autoComplete="email"
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
                            name="password"
                            autoComplete="current-password"
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
                            className="w-full bg-[#c1f05d] hover:bg-[#aee33d] text-[#2d4a3e] font-black py-4 px-6 rounded-2xl text-sm transition-all shadow-md cursor-pointer tracking-wide disabled:bg-gray-400"
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
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-[#82ab24] font-black hover:underline ml-1"
                        >
                            Register here
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;