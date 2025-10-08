'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { signOut } from '../../../lib/features/login/authSlice';
import {
  LayoutGrid,
  ShoppingBag,
  Download,
  Home,
  User,
  LogOut,
} from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="flex flex-col items-center py-8 border-b border-gray-100">
          <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-semibold">
            {firstName ? firstName.charAt(0).toUpperCase() : 'U'}
          </div>
          <h2 className="mt-3 text-lg font-semibold text-gray-900">
            {firstName && lastName ? `${firstName} ${lastName}` : 'User Name'}
          </h2>
          <p className="text-sm text-gray-500">Member Since Sep 2020</p>
        </div>

        {/* Menu */}
        <div className="p-4 space-y-2">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-indigo-50 text-indigo-700 font-medium">
            <LayoutGrid className="h-5 w-5" />
            Dashboard
          </button>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
            <ShoppingBag className="h-5 w-5 text-gray-600" />
            <span className="text-gray-700 font-medium text-sm">Orders</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
            <Download className="h-5 w-5 text-gray-600" />
            <span className="text-gray-700 font-medium text-sm">Downloads</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
            <Home className="h-5 w-5 text-gray-600" />
            <span className="text-gray-700 font-medium text-sm">Addresses</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-gray-700 font-medium text-sm">
              Account Details
            </span>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition text-red-600 font-medium"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOut;
