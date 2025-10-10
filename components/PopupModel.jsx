'use client';

import React, { useState } from 'react';
import { X, PhoneCall, UserPlus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addEnquiry } from '@/lib/features/enquiry/enquirySlice';
import toast from 'react-hot-toast'; // ✅ import toast

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
  const dispatch = useDispatch();

  // ✅ Handle submit & show toast
  const handleSubmitEnquiry = () => {
    if (!userName || !userMobile) {
      toast.error('Please fill out all fields before submitting.');
      return;
    }

    const enhancedItems = items.map((item) => {
      const productLink =
        typeof window !== 'undefined'
          ? `${window.location.origin}/product/${item.id || item.slug || 'unknown'}`
          : '';
      return { ...item, link: productLink };
    });

    const enquiryData = {
      userName,
      userMobile,
      items: enhancedItems,
      totalPrice,
      totalQuantity,
      createdAt: new Date().toISOString(),
    };

    dispatch(addEnquiry(enquiryData));

    // ✅ Success toast
    toast.success('Enquiry submitted successfully!');

    // Reset form
    setShowForm(false);
    setUserName('');
    setUserMobile('');
    onClose();
  };

  const handleSendWhatsApp = () => {
    const enhancedItems = items.map((item) => {
      const productLink =
        typeof window !== 'undefined'
          ? `${window.location.origin}/product/${item.id || item.slug || 'unknown'}`
          : '';
      return { ...item, link: productLink };
    });

    let message = `Hello, I'm interested in placing an order. Here are the details:\n\n`;
    enhancedItems.forEach((item, index) => {
      message += `Item ${index + 1}:\n`;
      message += `🛍 *Product:* ${item.name}\n`;
      message += `💰 *Price:* ${currency}${item.price}\n`;
      message += `📦 *Quantity:* ${item.quantity}\n`;
      message += `🖼 *Product Link:* ${item.link}\n\n`;
    });

    if (userName && userMobile) {
      message += `🙋 *Name:* ${userName}\n📱 *Mobile:* ${userMobile}\n`;
    }

    message += `\nTotal: ${currency}${totalPrice}\nTotal Items: ${totalQuantity}\n\nPlease let me know the next steps.`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '9345795629';
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

    setShowForm(false);
    setUserName('');
    setUserMobile('');
    onClose();
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

        <div className={`flex ${showForm ? 'justify-center' : 'justify-end'} gap-3`}>
          {!showForm ? (
            <>
              <button
                onClick={handleSendWhatsApp}
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
            <button
              onClick={handleSubmitEnquiry}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
