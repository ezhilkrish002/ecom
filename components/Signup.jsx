'use client'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signupRequest, signupSuccess, signupFailure, clearError } from '../lib/features/login/authSlice';

const SignUp = ({ onClose, onOpenLogin }) => {
  const dispatch = useDispatch();
  const { isLoading, error, users } = useSelector((state) => state.auth);
  const [isVisible, setIsVisible] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    dispatch(signupRequest());

    setTimeout(() => {
      if (firstName && lastName && email && password) {
        // Check if user already exists in Redux state
        if (users && users.some((user) => user.email === email)) {
          dispatch(signupFailure('Email already exists'));
          return;
        }

        // Dispatch signup success with user data
        dispatch(signupSuccess({ firstName, lastName, email, password }));
        alert('Sign up successful! Please sign in.');
        // Reset form
        e.target.reset();
        setIsVisible(false);
        onOpenLogin(); // Redirect to login page
      } else {
        dispatch(signupFailure('All fields are required'));
      }
    }, 1000);
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(clearError());
    const form = e.target.closest('form');
    if (form) {
      form.reset();
    }
    setIsVisible(false);
    onClose();
  };

  const handleOpenLogin = (e) => {
    e.preventDefault();
    dispatch(clearError());
    const form = e.target.closest('form');
    if (form) {
      form.reset();
    }
    setIsVisible(false);
    onOpenLogin();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div>
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-red-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-300"
        aria-label="Close"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Create Account
      </h2>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg animate-pulse">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50"
            placeholder="Enter your last name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:scale-100 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing Up...
            </span>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          onClick={handleOpenLogin}
          className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUp;