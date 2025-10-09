'use client';

import React from "react";
import { use } from "react";
import { productDummyData } from "@/assets/assets";
import { Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { toast } from "react-hot-toast";

export default function CategoryPage({ params }) {
  const { name } = use(params); // ✅ unwrap the params Promise (Next.js 15+)
  const dispatch = useDispatch();

  // Filter products by category
  const products = productDummyData.filter(
    (p) => p.category.toLowerCase() === name.toLowerCase()
  );

  // 🛒 Add to Cart (send full structured data to cartSlice)
  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.src || product.images?.[0],
        quantity: 1, // default quantity
        category: product.category,
      })
    );

    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-8 text-slate-800">
        Category: {name.charAt(0).toUpperCase() + name.slice(1)}
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-center p-4 text-center"
            >
              {/* Product Image */}
              <div className="w-full h-56 flex items-center justify-center bg-white rounded-xl overflow-hidden mb-4">
                <img
                  src={product.images[0].src || product.images[0]}
                  alt={product.name}
                  className="max-h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <h2 className="font-semibold text-gray-800 text-sm sm:text-base">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex justify-center items-center mt-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-green-500 fill-green-500"
                  />
                ))}
              </div>

              {/* Price */}
              <p className="text-slate-800 font-semibold text-sm sm:text-base">
                ₹{product.price}
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-3 bg-slate-800 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-slate-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found in this category.</p>
      )}
    </div>
  );
}
