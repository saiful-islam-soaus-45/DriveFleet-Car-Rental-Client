"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    // সাধারণ রেজিস্ট্রেশন হ্যান্ডলার
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // 💡 আপনার Firebase অ্যাকাউন্ট ক্রিয়েট ও প্রোফাইল আপডেট লজিক এখানে হবে:
            // await createUserWithEmailAndPassword(auth, email, password);
            // await updateProfile(auth.currentUser, { displayName: name, photoURL: photoUrl });
            
            if (password.length < 6) {
                throw new Error("Password must be at least 6 characters long.");
            }

            toast.success("Registration Successful!");
            setTimeout(() => {
                router.push('/login'); // সফল হলে লগইন পেজে রিডাইরেক্ট করবে
            }, 1000);

        } catch (error) {
            toast.error(error.message || "Registration Failed! Please try again.");
        }
    };

    // গুগল লগইন হ্যান্ডলার (রেজিস্ট্রেশন পেজেও সফল হলে হোম রুটে যাবে)
    const handleGoogleLogin = async () => {
        try {
            // 💡 আপনার Google Sign In লজিক এখানে হবে
            toast.success("Google Login Successful!");
            setTimeout(() => {
                router.push('/'); // সফল গুগল লগইনে হোম রুটে রিডাইরেক্ট
            }, 1000);
        } catch (error) {
            toast.error("Google Login Failed!");
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-gray-100">
                
                {/* 1. Clear Registration Title */}
                <div className="text-center mb-8">
                    <span className="text-[10px] font-black tracking-widest text-[#82ab24] uppercase block mb-1">
                        Get Started
                    </span>
                    <h2 className="text-4xl font-black text-[#1c2e24] tracking-tight">
                        User Registration
                    </h2>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleRegister} className="space-y-4">
                    
                    {/* Name Field */}
                    <div>
                        <label className="block text-xs font-black text-[#1c2e24] mb-1.5 uppercase tracking-wider">
                            Full Name
                        </label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full bg-slate-50 border border-gray-200 rounded-2xl p-3.5 text-sm font-medium text-[#1c2e24] focus:outline-none focus:border-[#82ab24] focus:bg-white transition-all placeholder-gray-300" 
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@mail.com"
                            className="w-full bg-slate-50 border border-gray-200 rounded-2xl p-3.5 text-sm font-medium text-[#1c2e24] focus:outline-none focus:border-[#82ab24] focus:bg-white transition-all placeholder-gray-300" 
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
                            value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                            placeholder="https://example.com/photo.jpg"
                            className="w-full bg-slate-50 border border-gray-200 rounded-2xl p-3.5 text-sm font-medium text-[#1c2e24] focus:outline-none focus:border-[#82ab24] focus:bg-white transition-all placeholder-gray-300" 
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
                            className="w-full bg-slate-50 border border-gray-200 rounded-2xl p-3.5 text-sm font-medium text-[#1c2e24] focus:outline-none focus:border-[#82ab24] focus:bg-white transition-all placeholder-gray-300" 
                            required
                        />
                    </div>

                    {/* Register Button */}
                    <div className="pt-2">
                        <button 
                            type="submit" 
                            className="w-full bg-[#1c2e24] hover:bg-black text-white font-black py-4 px-6 rounded-2xl text-sm transition-all shadow-md cursor-pointer tracking-wide"
                        >
                            Register Button
                        </button>
                    </div>
                </form>

                {/* Divider */}
                <div className="relative flex py-4 items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold">OR</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* Google Login Button */}
                <button 
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 font-bold py-3.5 px-6 rounded-2xl text-sm transition-all cursor-pointer"
                >
                    <img src="https://docs.idfy.com/images/g-logo.png" alt="Google" className="w-5 h-5" />
                    Continue with Google
                </button>

                {/* Link to Login Page */}
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