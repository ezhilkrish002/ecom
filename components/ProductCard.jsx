'use client';

import { StarIcon, Heart, ShoppingCart,ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
// import { addToWishlist, removeFromWishlist } from '@/lib/features/wishlist/wishlistSlice';
// import { addToCart } from '@/lib/features/cart/cartSlice';
import ModalPopup from './PopupModel';
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Redux state
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [isHovered, setIsHovered] = useState(false);

  const isInWishlist = wishlistItems[product.id];
  // const isInCart = cartItems[product.id];

  const [isWishlisted, setIsWishlisted] = useState(!!isInWishlist);
  // const [showIcons, setShowIcons] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

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


  // const handleWishlist = (e) => {
  //   e.preventDefault();
  //   if (isWishlisted) {
  //     dispatch(removeFromWishlist({ productId: product.id }));
  //   } else {
  //     dispatch(addToWishlist({ productId: product.id }));
  //   }
  //   setIsWishlisted(!isWishlisted);
  // };

  // const handleAddToCart = (e) => {
  //   e.preventDefault();
  //   dispatch(addToCart({ productId: product.id }));
  // };

 function handleEnquiry(e) {  
    e.preventDefault();
    setIsModalOpen(true);
  } 
const handleSendWhatsApp = ({ userName, userMobile }) => {
    const quantity = product.id || 1;
    const productLink = typeof window !== 'undefined' ? window.location.href : '';

    let message = `
Hi, I'm interested in booking an enquiry for the following product:
🛍️ *Product:* ${product.name}
💰 *Price:* ${currency}${product.price}
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
    <Link href={`/product/${product.id}`} className="group max-xl:mx-auto flex flex-col items-center">
      <div
        className="h-60 w-40 sm:w-60 sm:h-80 rounded-lg flex items-center justify-center relative overflow-hidden group-hover:scale-108  transition duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          width={600}
          height={800}
          className="max-h-60  max-w-40 sm:max-h-80 sm:max-w-60 w-auto "
          src={product.images[0]}
          alt={product.name}
        />
       {/* 📨 Enquiry Button — Visible only on hover */}
        <div
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={handleEnquiry}
            className="mb-2 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-[rgb(55,50,46)] text-white rounded-md shadow-md hover:bg-[#c31e5aff] transition-all duration-200"
          >
            Enquiry
          </button>
        </div>

      </div>

      <div className="flex justify-center sm:justify-between sm:gap-1 md:gap-3 text-sm text-slate-800 pt-2 max-w-60 mt-2 sm:mt-2">
        <div>
          <p className='text-wrap'>{product.name}</p>
          <div className="flex">
            {Array(5)
              .fill('')
              .map((_, index) => (
                <StarIcon
                  key={index}
                  size={14}
                  className="text-transparent mt-0.5"
                  fill={rating >= index + 1 ? '#c31e5aff' : '#D1D5DB'}
                />
              ))}
          </div>
        </div>
        <div className="hidden sm:flex flex-col items-end justify-between">
          <ArrowRight />
        </div>
      </div>
    </Link>
    
      <ModalPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={[{
          name: product.name,
          price: product.price,
          quantity: 1
        }]}
        totalPrice={product.price }
        totalQuantity={1}
        currency={currency}
        onSendWhatsApp={handleSendWhatsApp}
      />
    </>
  );
};

export default ProductCard;
