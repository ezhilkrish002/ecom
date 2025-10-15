'use client';

import React, { useState, useEffect } from "react";
import { productDummyData } from "@/assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { ShoppingCart, ArrowRight, Send } from "lucide-react";
import ModalPopup from "./PopupModel";
import ProductFilters from "./ProductFilters";

export default function CategoryProducts({ categoryName }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    selectedPipeSizes: [],
    selectedSpeeds: [],
    selectedHeadRanges: [],
    selectedFlowRanges: [],
    selectedHPs: [],
    selectedCategories: [],
    inStockOnly: false,
    sortBy: "default",
  });

  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';

  // Filter products by category (only if categoryName is 'products', otherwise use URL category)
  let products =
    categoryName === "products"
      ? productDummyData
      : productDummyData.filter(
          (product) => product.category.toLowerCase() === categoryName.toLowerCase()
        );

  // Apply filters and sorting
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let updatedProducts = [...products];

    // Apply category filter (only if not filtering by URL category)
    if (categoryName === "products" && filters.selectedCategories.length > 0) {
      updatedProducts = updatedProducts.filter((p) =>
        filters.selectedCategories.includes(p.category)
      );
    }

    // Apply pipe size filter
    if (filters.selectedPipeSizes.length > 0) {
      updatedProducts = updatedProducts.filter((p) =>
        p.specs.some(
          (spec) => spec.label === "Pipe size" && filters.selectedPipeSizes.includes(spec.value)
        )
      );
    }

    // Apply speed filter
    if (filters.selectedSpeeds.length > 0) {
      updatedProducts = updatedProducts.filter((p) =>
        p.specs.some(
          (spec) => spec.label === "Speed" && filters.selectedSpeeds.includes(spec.value)
        )
      );
    }

    // Apply head range filter
    if (filters.selectedHeadRanges.length > 0) {
      updatedProducts = updatedProducts.filter((p) =>
        p.specs.some(
          (spec) => spec.label === "Head range" && filters.selectedHeadRanges.includes(spec.value)
        )
      );
    }

    // Apply flow range filter
    if (filters.selectedFlowRanges.length > 0) {
      updatedProducts = updatedProducts.filter((p) =>
        p.specs.some(
          (spec) => spec.label === "Flow range" && filters.selectedFlowRanges.includes(spec.value)
        )
      );
    }

    // Apply HP filter
    if (filters.selectedHPs.length > 0) {
      updatedProducts = updatedProducts.filter((p) =>
        p.options.some((opt) => filters.selectedHPs.includes(opt))
      );
    }

    // Apply inStock filter
    if (filters.inStockOnly) {
      updatedProducts = updatedProducts.filter((p) => p.inStock);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "priceLowToHigh":
        updatedProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        updatedProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        updatedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "rating":
        updatedProducts.sort((a, b) => {
          const avgA = a.rating.reduce((sum, r) => sum + r.rating, 0) / a.rating.length || 0;
          const avgB = b.rating.reduce((sum, r) => sum + r.rating, 0) / b.rating.length || 0;
          return avgB - avgA;
        });
        break;
      default:
        break;
    }

    setFilteredProducts(updatedProducts);
  }, [filters, categoryName]);

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
    <div className="max-w-7xl mx-auto py-4 px-3 sm:px-6">
      {/* ✅ Breadcrumbs */}
      <div className="text-gray-600 text-sm sm:text-base mt-4 mb-4 sm:mb-5 sm:ml-4 space-x-1">
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
        {/* Filters Sidebar */}
        <div className="md:col-span-1">
          <ProductFilters products={products} onFilterChange={setFilters} />
        </div>

        {/* Products List */}
        <div className="md:col-span-3">
          {filteredProducts.length > 0 ? (
            <>
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-start">
                    {/* Image Section */}
                    <div className="flex justify-center">
                      <div className="p-2 sm:p-4 rounded-xl w-full max-w-[150px] sm:max-w-[200px] flex justify-center">
                        <img
                          src={product.images?.[0]?.src || product.images?.[0]}
                          alt={product.name}
                          className="rounded-xl w-full h-auto object-contain"
                        />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="sm:col-span-2 space-y-3 sm:space-y-4">
                      <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 text-center sm:text-left">
                        {product.name}
                      </h1>
                      <p className="text-gray-600 text-sm sm:text-base text-center sm:text-left line-clamp-3">
                        {product.description}
                      </p>

                      {/* Options */}
                      <div>
                        <h2 className="font-semibold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2 text-center sm:text-left">
                          Available Options:
                        </h2>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                          {product.options.map((opt, i) => (
                            <button
                              key={i}
                              className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition text-xs sm:text-sm"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Technical Specifications */}
                      <div>
                        <h2 className="font-semibold text-gray-800 text-sm sm:text-base mb-2 sm:mb-3 text-center sm:text-left">
                          Technical Specifications:
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 text-gray-700 text-xs sm:text-sm">
                          {product.specs.map((item, i) => (
                            <Spec key={i} label={item.label} value={item.value} />
                          ))}
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 justify-center sm:justify-start items-center">
                        {/* 🛒 Add to Cart */}
                        <div className="relative group">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-[#c31e5a] text-white rounded-lg hover:bg-[#a81a4d] transition-all text-xs sm:text-sm"
                          >
                            <ShoppingCart size={16} />
                            <span className="hidden sm:inline">Add to Cart</span>
                          </button>
                          <span className="absolute left-1/2 -translate-x-1/2 -bottom-6 sm:-bottom-8 text-xs text-white bg-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition sm:hidden">
                            Add to Cart
                          </span>
                        </div>

                        {/* ✉️ Send Enquiry */}
                        <div className="relative group">
                          <button
                            onClick={(e) => handleEnquiry(e, product)}
                            className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-[#f48638] text-white rounded-lg hover:bg-[#e47424] transition-all text-xs sm:text-sm"
                          >
                            <Send size={16} />
                            <span className="sm:inline">Send Enquiry</span>
                          </button>
                          <span className="absolute left-1/2 -translate-x-1/2 -bottom-6 sm:-bottom-8 text-xs text-white bg-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition sm:hidden">
                            Send Enquiry
                          </span>
                        </div>

                        {/* 🔍 View Details */}
                        <div className="relative group">
                          <button
                            className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-[rgb(55,50,46)] text-white border border-gray-300 rounded-lg hover:bg-[rgb(40,36,33)] transition-all text-xs sm:text-sm"
                          >
                            <ArrowRight size={16} />
                            <span className="hidden sm:inline">View Details</span>
                          </button>
                          <span className="absolute left-1/2 -translate-x-1/2 -bottom-6 sm:-bottom-8 text-xs text-white bg-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition sm:hidden">
                            View Details
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-center text-gray-600 text-sm sm:text-base">
              No products match the filters.
            </p>
          )}
        </div>
      </div>

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
      <span className="font-medium text-gray-800 text-xs sm:text-sm">{label}</span>
      <span className="text-gray-600 text-xs sm:text-sm">{value}</span>
    </div>
  );
}