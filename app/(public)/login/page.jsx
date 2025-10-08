'use client'

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginRequest, loginSuccess, loginFailure } from '../../../lib/features/login/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, error, users } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    dispatch(loginRequest());

    setTimeout(() => {
      const user = users && users.find((u) => u.email === email && u.password === password);
      if (user) {
        dispatch(loginSuccess({ email }));
        alert('Login successful!');
        router.push('/'); // Redirect to home or dashboard after login
      } else {
        dispatch(loginFailure('Invalid email or password'));
      }
    }, 1000);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Static placeholder, no action
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent sm:text-3xl sm:mb-8">
          Welcome Back
        </h2>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded-lg animate-pulse sm:p-4 sm:mb-6">
            <p className="text-xs font-medium sm:text-sm">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1 sm:text-sm sm:mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 sm:p-4"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-1 sm:text-sm sm:mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 sm:p-4"
              placeholder="Enter your password"
              required
            />
            <div className="text-right mt-1 sm:mt-2">
              <button
                onClick={handleForgotPassword}
                className="text-blue-600 hover:text-blue-800 text-xs font-semibold transition-colors sm:text-sm"
              >
                Forgot Password?
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-base hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:scale-100 disabled:cursor-not-allowed sm:py-4 sm:text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-gray-600 sm:mt-6 sm:text-sm">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors text-xs sm:text-sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;