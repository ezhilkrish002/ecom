'use client';

import { StarIcon, ArrowRight, User,ShoppingCart,Send } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import ModalPopup from './PopupModel';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/features/cart/cartSlice';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';

  // 🛒 Add to Cart
    const handleAddToCart = (e,product) => {
      e.preventDefault();
      dispatch(addToCart({ productId: product.id }));
      toast.success(`${product.name} added to cart!`);
    };

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
    const productLink =
      typeof window !== 'undefined' ? window.location.href : '';

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
      <Link
  href={`/product/${product.id}`}
  className="w-full max-w-[95vw] mx-auto flex flex-col items-center rounded-lg overflow-hidden sm:max-w-md"
>
  {/* Image Container */}
  <div
    className={`relative w-full h-[420px] sm:h-[400px] md:h-[380px] lg:h-[360px] hover:-translate-y-5 transition-transform duration-300 rounded-lg ${
      isHovered ? "scale-108" : "scale-100"
    }`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <Image
      src={product.images[0]}
      alt={product.name}
      fill
      className={`object-cover w-full h-full ${
        isHovered ? "rounded-xl" : "rounded-lg"
      }`}
    />

    {/* Icon Buttons - Bottom Right */}
    <div
      className={`absolute bottom-3 flex flex-col gap-2 transition-all duration-300 ${
        isHovered
          ? "opacity-100 translate-y-0 right-5"
          : "opacity-0 translate-y-4 right-3"
      }`}
    >
      {/* 🛒 Cart Icon */}
      {/* <button
        onClick={(e) => {
          e.preventDefault();
          handleAddToCart(product);
        }}
        className="p-2 rounded-full bg-white text-black shadow-md hover:bg-[#c31e5a] hover:text-white transition-all duration-200 flex items-center justify-center"
        title="Add to Cart"
      >
        <ShoppingCart size={18} />
      </button> */}

      {/* ✉️ Enquiry Icon */}
      {/* <button
        onClick={(e) => {
          e.preventDefault();
          handleEnquiry(e);
        }}
        className="p-2 rounded-full bg-white text-black shadow-md hover:bg-[#f48638] hover:text-white transition-all duration-200 flex items-center justify-center"
        title="Send Enquiry"
      >
        <Send size={18} />
      </button> */}

      {/* ➡️ View Details Icon */}
      {/* <button
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `/product/${product.id}`;
        }}
        className="p-2 rounded-full bg-white text-black shadow-md hover:bg-[rgb(55,50,46)] hover:text-white transition-all duration-200 flex items-center justify-center"
        title="View Details"
      >
        <ArrowRight size={18} />
      </button> */}
       


    </div>
  </div>


  {/* Product Info */}
  <div
    className={`w-full flex justify-center items-start gap-2 mt-2 text-sm text-slate-800 px-2 sm:px-0`}
  >
    <div className="flex flex-col ">
      {/* <p className="font-medium text-lg sm:text-xl">{product.name}</p> */}
      <p className="font-medium text-xl sm:text-lg truncate w-[200px] sm:w-[250px] flex justify-center items-center gap-2" >
  {product.name}
     </p>

    </div>
    {/* <div className="sm:hidden items-center">
      <ArrowRight />
    </div> */}
  </div>
   <div className="flex flex-nowrap gap-7 sm:gap-4 mt-3 justify-between items-center">
                            {/* 🛒 Add to Cart */}
                           <div className="relative group">
                              <button
                                onClick={(e) => handleAddToCart(e, product)}
                                className="flex items-center justify-center 
                                          w-10 h-10 sm:w-11 sm:h-11 
                                           text-black bg-gray-200
                                           hover:text-white
                                           hover:bg-[#c31e5a] 
                                          rounded-full 
                                          hover:bg-[#a81a4d] 
                                          transition-all"

                              >
                                <ShoppingCart size={18} />
                              </button>
                            </div>

        
                            {/* ✉️ Send Enquiry */}
                           {/* <div className="relative group">
                              <button
                                onClick={(e) => handleEnquiry(e, product)}
                                className="flex items-center justify-center 
                                          w-10 h-10 sm:w-11 sm:h-11 
                                          bg-[#f48638] text-white 
                                          rounded-full 
                                          hover:bg-[#e47424] 
                                          transition-all"
                              >
                                <Send size={18} />
                                <span className="sm:hidden">Send Enquiry</span>
                              </button>
                            </div> */}
                            <div className="relative group"> <button onClick={(e) => handleEnquiry(e, product)} className="flex items-center justify-center 
                             text-black bg-gray-200 
                             hover:text-white
                             hover:bg-[#f48638]
                            rounded-lg px-5 py-3 sm:px-0 sm:py-0 sm:w-11 sm:h-11 sm:rounded-full  transition-all" > <Send size={18} /> <span className="sm:hidden">Send Enquiry</span> </button> </div>
        
                            {/* 🔍 View Details */}
                            <div className="relative group">
                                <button
                                  className="flex items-center justify-center 
                                            w-10 h-10 sm:w-11 sm:h-11 
                                            text-black bg-gray-200 
                                             hover:text-white
                                           hover:bg-[rgb(55,50,46)]  
                                            border border-gray-300 
                                            rounded-full 
                                            hover:bg-[rgb(40,36,33)] 
                                            transition-all"
                                >
                                  <ArrowRight size={18} />
                                </button>
                              </div>

                          </div>
</Link>


      {/* WhatsApp Modal */}
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