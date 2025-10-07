'use client'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../lib/features/login/authSlice';

const SignOut = ({ onClose }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, email } = useSelector((state) => state.auth);
  const [isVisible, setIsVisible] = useState(true);

  const handleSignOut = (e) => {
    e.preventDefault();
    // Dispatch sign-out action to reset Redux state
    dispatch(signOut());
    setIsVisible(false);
    onClose();
    alert('Signed out successfully!');
  };

  const handleClose = (e) => {
    e.preventDefault();
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div >
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
        User Profile
      </h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-gray-700">First Name</p>
          <p className="text-lg text-gray-900">{firstName || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">Last Name</p>
          <p className="text-lg text-gray-900">{lastName || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">Email</p>
          <p className="text-lg text-gray-900">{email || 'N/A'}</p>
        </div>
      </div>
      <button
        onClick={handleSignOut}
        className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/30 transition-all duration-300 mt-8"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;