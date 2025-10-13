'use client';

import { StarIcon, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import ModalPopup from './PopupModel';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';

  const rating =
    product.rating && product.rating.length > 0
      ? Math.round(
          product.rating.reduce((acc, curr) => acc + curr.rating, 0) /
            product.rating.length
        )
      : 0;

  const handleEnquiry = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleSendWhatsApp = ({ userName, userMobile }) => {
    const quantity = product.id || 1;
    const productLink = typeof window !== 'undefined' ? window.location.href : '';

    let message = `
Hi, I'm interested in booking an enquiry for the following product:
 *Product:* ${product.name}
 *Price:* ${currency}${product.price}
 *Quantity:* ${quantity}
 *Product Link:* ${productLink}
`;

    if (userName && userMobile) {
      message += `🙋 *Name:* ${userName}\n📱 *Mobile:* ${userMobile}\n`;
    }

    message += `Please let me know the next steps.`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '9345795629';

    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <>
      <Link href={`/product/${product.id}`}
        className="w-full max-w-[95vw] mx-auto flex flex-col items-center rounded-lg overflow-hidden sm:max-w-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div
          className={`relative w-full h-[420px] sm:h-[400px] md:h-[380px] lg:h-[360px] hover:-translate-y-5 transition-transform duration-300 rounded-lg ${
            isHovered ? 'scale-108' : 'scale-100'
          }`}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover w-full h-full ${isHovered ? 'rounded-xl' : 'rounded-lg'}`}
          />

          {/* Enquiry Button */}
          <div
            className={`absolute bottom-3 left-1/2 -translate-x-1/2 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              onClick={handleEnquiry}
              className="mb-2 px-4 py-2 text-sm bg-[rgb(55,50,46)] text-white rounded-md shadow-md hover:bg-[#c31e5aff] transition-all duration-200"
            >
              Enquiry
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full flex justify-between items-start gap-2 mt-2 text-sm text-slate-800 px-2 sm:px-0">
          <div className="flex flex-col">
            <p className="font-medium">{product.name}</p>
            <div className="flex mt-1">
              {Array(5)
                .fill('')
                .map((_, index) => (
                  <StarIcon
                    key={index}
                    size={14}
                    className="text-transparent"
                    fill={rating >= index + 1 ? '#c31e5aff' : '#D1D5DB'}
                  />
                ))}
            </div>
          </div>
          <div className=" sm:flex items-center">
            <ArrowRight />
          </div>
        </div>
      </Link>

      <ModalPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={[
          {
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ]}
        totalPrice={product.price}
        totalQuantity={1}
        currency={currency}
        onSendWhatsApp={handleSendWhatsApp}
      />
    </>
  );
};

export default ProductCard;