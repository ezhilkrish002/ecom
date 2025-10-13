'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import {
  signupRequest,
  signupSuccess,
  signupFailure,
} from '../../../lib/features/login/authSlice';

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, error, users } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value.trim();
    const lastName = e.target.lastName.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    dispatch(signupRequest());

    setTimeout(() => {
      if (!firstName || !email || !password) {
        dispatch(signupFailure('All required fields must be filled'));
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

      dispatch(signupSuccess({ firstName, lastName, email, password }));
      alert('Sign up successful! Please sign in.');
      router.push('/login');
    }, 800);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 p-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-[#c31e5aff]">Create your account</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Welcome! Please fill in the details to get started.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-6 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First name <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition"
              placeholder="First name"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last name <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition"
              placeholder="Last name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                minLength={8}
                className="w-full rounded-lg border border-gray-300 bg-white p-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {/* {showPassword ? <EyeOff size={18} /> : <Eye size={18} />} */}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Your password must contain <span className="font-medium text-gray-700">at least 8 characters.</span>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-gray-900 text-white py-3 rounded-lg font-medium text-sm hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
          >
            {isLoading ? 'Creating account...' : 'Continue'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-[#f48638] font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
