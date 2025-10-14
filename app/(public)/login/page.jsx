'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginRequest, loginSuccess, loginFailure } from '../../../lib/features/login/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, error, users } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    dispatch(loginRequest());

    setTimeout(() => {
      const user = users?.find((u) => u.email === email && u.password === password);
      if (user) {
        dispatch(loginSuccess({ email }));
        alert('Login successful!');
        router.push('/');
      } else {
        dispatch(loginFailure('Invalid email or password'));
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="w-full max-w-7xl mx-auto mb-8 text-sm font-medium text-gray-600">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="text-[#f48638] hover:text-[#c31e5aff] transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-400">&gt;</span>
          </li>
          <li>
            <span className="text-gray-700">Sign In</span>
          </li>
        </ol>
      </nav>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10">
          {/* Header */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-center text-[#c31e5aff] mb-2">
            Sign In to Your Account
          </h1>
          <p className="text-sm sm:text-base text-gray-400 text-center mb-8">
            Enter your detail below
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-600 text-sm sm:text-base p-3 rounded mb-6 text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:border-[#0F172A] transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:border-[#0F172A] transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0F172A] text-white py-3 rounded-md text-sm sm:text-base font-medium hover:bg-[#0a1220] transition disabled:opacity-60"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Forgot password */}
          <div className="mt-4 text-center">
            <a href="#" className="text-xs sm:text-sm text-gray-400 hover:underline">
              Forgot your password?
            </a>
          </div>

          {/* Or separator */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-400 text-sm sm:text-base">Or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Sign up */}
          <p className="text-center text-gray-600 text-xs sm:text-sm">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold text-[#f48638] hover:underline"
            >
              Sign Up Now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;