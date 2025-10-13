// components/CategoryProducts.jsx
'use client';

import React, { useState } from "react";
import { productDummyData } from "@/assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { ShoppingCart, ArrowRight, Send } from "lucide-react";
import ModalPopup from "./PopupModel";

export default function CategoryProducts({ categoryName }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';

  // Filter products by category
  const products =
    categoryName === "products"
      ? productDummyData
      : productDummyData.filter(
          (product) => product.category.toLowerCase() === categoryName.toLowerCase()
        );

  // 🛒 Add to Cart
  const handleAddToCart = (product) => {
    dispatch(addToCart({ productId: product.id }));
    toast.success(`${product.name} added to cart!`);
  };

  function handleEnquiry(e, product) {
    e.preventDefault();
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  const handleSendWhatsApp = ({ userName, userMobile }) => {
    if (!selectedProduct) return;

    const quantity = 1;
    const productLink = typeof window !== 'undefined' ? window.location.href : '';

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
    <div className="max-w-7xl mx-auto py-6 px-3 sm:px-6">
      {/* ✅ Breadcrumbs */}
      <div className="text-gray-600 text-lg mt-8 mb-5 sm:ml-10 space-x-1">
        <Link
          href="/"
          className="hover:text-black transition-colors duration-200"
        >
          Home
        </Link>
        <span>&gt;</span>
        <Link
          href={`/category/products`}
          className="hover:text-black transition-colors duration-200"
        >
          Products
        </Link>
        <span>&gt;</span>
        <span className="text-[rgb(55,50,46)] font-medium">
          {categoryName === "products" ? "All Products" : categoryName}
        </span>
      </div>

      {products.length > 0 && (
        <>
          {products.map((product, index) => (
            <div
              key={index}
              className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-10 mt-6 sm:mt-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Image Section */}
                <div className="flex justify-center">
                  <div className="p-4 rounded-xl w-full sm:w-auto flex justify-center">
                    <img
                      src={product.images?.[0]?.src || product.images?.[0]}
                      alt={product.name}
                      className="rounded-xl w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:col-span-2 space-y-4 sm:space-y-5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center md:text-left">
                    {product.name}
                  </h1>
                  <p className="text-gray-600 text-center md:text-left">{product.description}</p>

                  {/* Options */}
                  <div>
                    <h2 className="font-semibold text-gray-800 mb-2 text-center md:text-left">
                      Available Options:
                    </h2>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                      {product.options.map((opt, i) => (
                        <button
                          key={i}
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
                      {product.specs.map((item, i) => (
                        <Spec key={i} label={item.label} value={item.value} />
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3 mt-6 justify-between md:justify-start items-center">
                    {/* 🛒 Add to Cart */}
                    <div className="relative group">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-[#c31e5a] text-white rounded-lg hover:bg-[#a81a4d] transition-all"
                      >
                        <ShoppingCart size={18} />
                        <span className="hidden md:inline">Add to Cart</span>
                      </button>
                      <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 text-xs text-white bg-gray-800 px-2 py-1.5 rounded opacity-0 group-hover:opacity-100 transition md:hidden">
                        Add to Cart
                      </span>
                    </div>

                    {/* ✉️ Send Enquiry */}
                    <div className="relative group">
                      <button
                        onClick={(e) => handleEnquiry(e, product)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-[#f48638] text-white rounded-lg hover:bg-[#e47424] transition-all"
                      >
                        <Send size={18} />
                        <span className="md:inline">Send Enquiry</span>
                      </button>
                      <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 text-xs text-white bg-gray-800 px-2 py-1.5 rounded opacity-0 group-hover:opacity-100 transition md:hidden">
                        Send Enquiry
                      </span>
                    </div>

                    {/* 🔍 View Details */}
                    <div className="relative group">
                      <button
                        className="flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-[rgb(55,50,46)] text-white border border-gray-300 rounded-lg hover:bg-[rgb(40,36,33)] transition-all"
                      >
                        <ArrowRight size={18} />
                        <span className="hidden md:inline">View Details</span>
                      </button>
                      <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 text-xs text-white bg-gray-800 px-2 py-1.5 rounded opacity-0 group-hover:opacity-100 transition md:hidden">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* WhatsApp Modal */}
      {selectedProduct && (
        <ModalPopup
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          items={[
            {
              name: selectedProduct.name,
              price: selectedProduct.price,
              quantity: 1,
            },
          ]}
          totalPrice={selectedProduct.price}
          totalQuantity={1}
          currency={currency}
          onSendWhatsApp={handleSendWhatsApp}
        />
      )}
    </div>
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
