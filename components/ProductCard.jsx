'use client';

import { StarIcon, Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { addToWishlist, removeFromWishlist } from '@/lib/features/wishlist/wishlistSlice';
import { addToCart } from '@/lib/features/cart/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Redux state
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const isInWishlist = wishlistItems[product.id];
  const isInCart = cartItems[product.id];

  const [isWishlisted, setIsWishlisted] = useState(!!isInWishlist);
  const [showIcons, setShowIcons] = useState(false);

  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';

  // Sync with Redux updates
  useEffect(() => {
    setIsWishlisted(!!isInWishlist);
  }, [isInWishlist]);

  // Calculate average rating safely
  const rating =
    product.rating && product.rating.length > 0
      ? Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length)
      : 0;

  // 🩷 Handle Wishlist
  const handleWishlist = (e) => {
    e.preventDefault();
    if (isWishlisted) {
      dispatch(removeFromWishlist({ productId: product.id }));
    } else {
      dispatch(addToWishlist({ productId: product.id }));
    }
    setIsWishlisted(!isWishlisted);
  };

  // 🛒 Handle Add to Cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ productId: product.id }));
  };

  return (
    <Link href={`/product/${product.id}`} className="group max-xl:mx-auto">
      <div
        className="h-40 sm:w-60 sm:h-80 rounded-lg flex items-center justify-center relative overflow-hidden"
        onMouseEnter={() => setShowIcons(true)}
        onMouseLeave={() => setShowIcons(false)}
      >
        <Image
          width={600}
          height={800}
          className="max-h-30 sm:max-h-80 sm:max-w-60 w-auto group-hover:scale-105 transition duration-300"
          src={product.images[0]}
          alt={product.name}
        />

        {/* Hover Icons */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-5 transition-all duration-300 ${
            showIcons ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'
          }`}
        >
          {/* 🛒 Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`p-2 rounded-full shadow-md transition ${
              isInCart ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            aria-label="Add to Cart"
          >
            <ShoppingCart size={18} className="text-white" />
          </button>

          {/* ❤️ Wishlist */}
          <button
            onClick={handleWishlist}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
            aria-label="Add to Wishlist"
          >
            <Heart
              size={18}
              fill={isWishlisted ? '#FF4C4C' : 'none'}
              color={isWishlisted ? '#FF4C4C' : '#333'}
            />
          </button>
        </div>
      </div>

      <div className="flex justify-between gap-3 text-sm text-slate-800 pt-2 max-w-60">
        <div>
          <p>{product.name}</p>
          <div className="flex">
            {Array(5)
              .fill('')
              .map((_, index) => (
                <StarIcon
                  key={index}
                  size={14}
                  className="text-transparent mt-0.5"
                  fill={rating >= index + 1 ? '#00C950' : '#D1D5DB'}
                />
              ))}
          </div>
        </div>
        <p>
          {currency}
          {product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
