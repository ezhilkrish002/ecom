// components/CategoryProducts.jsx
'use client';

import React from "react";
import { productDummyData } from "@/assets/assets";
import { Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { toast } from "react-hot-toast";

export default function CategoryProducts({ categoryName }) {
  const dispatch = useDispatch();

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

  return (
    <div className="max-w-7xl mx-auto py-6 px-3 sm:px-6">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-slate-800 text-center sm:text-left">
        Category: {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
      </h1>

      {products.length > 0 ? (
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            gap-4 sm:gap-6
            justify-center
            place-items-center
          "
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100 flex flex-col items-center p-3 sm:p-4 text-center w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px]"
            >
              {/* Product Image */}
              <div className="w-full h-36 sm:h-44 flex items-center justify-center bg-white rounded-lg overflow-hidden mb-3">
                <img
                  src={product.images[0].src || product.images[0]}
                  alt={product.name}
                  className="max-h-32 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <h2 className="font-semibold text-gray-800 text-xs sm:text-sm truncate w-full">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex justify-center items-center mt-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="text-green-500 fill-green-500"
                  />
                ))}
              </div>

              {/* Price */}
              <p className="text-slate-800 font-semibold text-xs sm:text-sm">
                ₹{product.price}
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 bg-slate-800 text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full hover:bg-slate-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No products found in this category.</p>
      )}
    </div>
  );
}
