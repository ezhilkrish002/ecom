// components/CategoryProducts.jsx
'use client';

import React from "react";
import ModalPopup from './PopupModel'; // assuming it's in the same folder
import { useState } from 'react';
import { productDummyData } from "@/assets/assets";
import { Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { toast } from "react-hot-toast";

export default function CategoryProducts({ categoryName }) {
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter products by category
  const products = productDummyData.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  // 🛒 Add to Cart
  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.src || product.images?.[0],
        quantity: 1,
        category: product.category,
      })
    );
    toast.success(`${product.name} added to cart!`);
  };

  const handleSendEnquiry = (product) => {
  setSelectedProduct(product);
  setIsModalOpen(true);
};

const handleSendWhatsApp = ({ userName, userMobile }) => {
  if (!selectedProduct) return;

  const quantity = 1; // Default to 1 since cart not integrated here
  const productLink = typeof window !== 'undefined' ? window.location.href : '';
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';

  let message = `
Hi, I'm interested in booking an enquiry for the following product:
🛍️ *Product:* ${selectedProduct.name}
💰 *Price:* ${currency}${selectedProduct.price}
📦 *Quantity:* ${quantity}
🖼️ *Product Link:* ${productLink}
`;

  if (userName && userMobile) {
    message += `🙋 *Name:* ${userName}\n📱 *Mobile:* ${userMobile}\n`;
  }

  message += `Please let me know the next steps.`;

  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = "9345795629";

  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  setIsModalOpen(false);
};


  return (
    <>
    <div className="max-w-7xl mx-auto py-6 px-3 sm:px-6">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-slate-800 text-center sm:text-left">
        Category: {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
      </h1>

      {products.length > 0 ? (
        <>
          {products.map((product,index) => (
             <div key={index} className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-10 mt-6 sm:mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Image Section */}
        <div className="flex justify-center">
          <div className=" p-4  rounded-xl  w-full sm:w-auto flex justify-center">
            <img
              src={product.images?.[0]?.src || product.images?.[0]}
              alt={product.name}
              className="rounded-xl w-full sm:w-full md:w-full h-full sm:h-full md:h-full object-contain"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="md:col-span-2 space-y-4 sm:space-y-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center md:text-left">
            {product.name}
          </h1>
          <p className="text-gray-600 text-center md:text-left">
            {product.description}
          </p>

          {/* Options */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-2 text-center md:text-left">
              Available Options:
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {product.options.map((opt,index) => (
                <button
                  key={index}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition text-sm sm:text-base"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div>
            
            <h2 className="font-semibold text-gray-800 mb-3 text-center md:text-left">
              Technical Specifications:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-700">
              {product.specs.map((item,index) => (
                <Spec key={index} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
            <button className="w-full sm:w-auto px-6 py-2 bg-[rgb(55,50,46)] text-white border border-gray-300 rounded-lg">
              View Details
            </button>
            <button
  onClick={() => handleSendEnquiry(product)}
  className="w-full sm:w-auto px-6 py-2 bg-[#f48638] text-white rounded-lg hover:bg-[#f48638]-700 transition"
>
  Send Enquiry
</button>

            <button onClick={handleAddToCart} className="w-full sm:w-auto px-6 py-2 bg-[#c31e5aff] text-white rounded-lg hover:bg-[#c31e5aff]-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
          ))}
        </>
      ) : (
        <p className="text-gray-500 text-center">No products found in this category.</p>
      )}
    </div>
    {selectedProduct && (
  <ModalPopup
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    items={[{
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: 1
    }]}
    totalPrice={selectedProduct.price}
    totalQuantity={1}
    currency={process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹'}
    onSendWhatsApp={handleSendWhatsApp}
  />
)}
</>
  );
}

// Helper component for specs
function Spec({ label, value }) {
  return (
    <div className="flex justify-between border-b border-gray-100 pb-1">
      <span className="font-medium text-gray-800">{label}</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}