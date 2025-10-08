'use client'

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { signOut } from '../../../lib/features/login/authSlice';

const SignOut = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { firstName, lastName, email } = useSelector((state) => state.auth);

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(signOut());
    alert('Signed out successfully!');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
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
    </div>
  );
};

export default SignOut;