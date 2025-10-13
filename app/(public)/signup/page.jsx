'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  signupRequest,
  signupSuccess,
  signupFailure,
} from '../../../lib/features/login/authSlice';

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, error, users } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    dispatch(signupRequest());

    setTimeout(() => {
      if (!fullName || !email || !password || !confirmPassword) {
        dispatch(signupFailure('All fields are required'));
        return;
      }

      if (password !== confirmPassword) {
        dispatch(signupFailure('Passwords do not match'));
        return;
      }

      if (password.length < 8) {
        dispatch(signupFailure('Password must be at least 8 characters long'));
        return;
      }

      if (users && users.some((user) => user.email === email)) {
        dispatch(signupFailure('Email already exists'));
        return;
      }

      dispatch(signupSuccess({ fullName, email, password }));
      alert('Account created successfully! Please sign in.');
      router.push('/login');
    }, 800);
  };

  return (
    <div className="mt-9 px-4 sm:px-6">
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
               <span className="text-gray-700">Sign Up</span>
             </li>
           </ol>
         </nav>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#c31e5aff]">Create an Account</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Enter your detail below
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-6 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="John"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                required
              />
            </div>

            {/* Re-type Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Re-type Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-type your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0F172A] text-white py-3 rounded-lg font-medium text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-[#f48638] font-semibold hover:underline">
              Sign in Now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;