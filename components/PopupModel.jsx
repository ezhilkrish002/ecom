'use client'

import React, { useState } from 'react';
import { X, PhoneCall, UserPlus } from 'lucide-react';

const ModalPopup = ({
  isOpen,
  onClose,
  items = [],
  totalPrice = 0,
  totalQuantity = 0,
  currency = '₹',
  onSendWhatsApp,
  showInitialForm = false,
}) => {
  const [showForm, setShowForm] = useState(showInitialForm);
  const [userName, setUserName] = useState('');
  const [userMobile, setUserMobile] = useState('');

  const handleSend = () => {
    onSendWhatsApp({ userName, userMobile });
    setShowForm(false);
    setUserName('');
    setUserMobile('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[rgb(0,0,0,0.5)] backdrop-blur-sm"
        onClick={() => {
          onClose();
          setShowForm(false);
          setUserName('');
          setUserMobile('');
        }}
      ></div>

      <div className="relative bg-white w-full max-w-md p-6 rounded-2xl shadow-xl z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Confirm Enquiry</h2>
          <button
            onClick={() => {
              onClose();
              setShowForm(false);
              setUserName('');
              setUserMobile('');
            }}
          >
            <X size={20} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Please choose how you'd like to proceed with your enquiry.
        </p>

        {showForm && (
          <div className="space-y-4 mb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={userMobile}
              onChange={(e) => setUserMobile(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
            />
          </div>
        )}

        <div className="flex justify-end gap-3">
          {!showForm ? (
            <>
              <button
                onClick={handleSend}
                className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                <PhoneCall size={16} />
                WhatsApp
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                <UserPlus size={16} />
                Add Form
              </button>
            </>
          ) : (
            <div className="flex justify-center gap-3">
  <button
    onClick={handleSend}
    className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  >
    Submit
  </button>
</div>

          )}
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
