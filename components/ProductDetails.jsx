'use client'

import { addToCart } from "@/lib/features/cart/cartSlice";
import { StarIcon, TagIcon, EarthIcon, CreditCardIcon, UserIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ product }) => {
    const productId = product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';

    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const router = useRouter();
    const [mainImage, setMainImage] = useState(product.images[0]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [userName, setUserName] = useState('');
    const [userMobile, setUserMobile] = useState('');

    const addToCartHandler = () => {
        dispatch(addToCart({ productId }));
    };

    const averageRating = product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length;

    const handleWhatsApp = () => {
        const quantity = cart[productId] || 1;
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
            {/* Main product section */}
            <div className="flex max-lg:flex-col gap-12">
                <div className="flex max-sm:flex-col-reverse gap-3">
                    <div className="flex sm:flex-col gap-3">
                        {product.images.map((image, index) => (
                            <div key={index} onClick={() => setMainImage(product.images[index])} className="bg-slate-100 flex items-center justify-center size-26 rounded-lg group cursor-pointer">
                                <Image src={image} className="group-hover:scale-103 group-active:scale-95 transition" alt="" width={45} height={45} />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center h-100 sm:size-113 bg-slate-100 rounded-lg">
                        <Image src={mainImage} alt="" width={250} height={250} />
                    </div>
                </div>

                <div className="flex-1">
                    <h1 className="text-3xl font-semibold text-slate-800">{product.name}</h1>
                    <div className='flex items-center mt-2'>
                        {Array(5).fill('').map((_, index) => (
                            <StarIcon key={index} size={14} className='text-transparent mt-0.5' fill={averageRating >= index + 1 ? "#00C950" : "#D1D5DB"} />
                        ))}
                        <p className="text-sm ml-3 text-slate-500">{product.rating.length} Reviews</p>
                    </div>
                    <div className="flex items-start my-6 gap-3 text-2xl font-semibold text-slate-800">
                        <p> {currency}{product.price} </p>
                        <p className="text-xl text-slate-500 line-through">{currency}{product.mrp}</p>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <TagIcon size={14} />
                        <p>Save {((product.mrp - product.price) / product.mrp * 100).toFixed(0)}% right now</p>
                    </div>
                    <div className="flex items-end gap-5 mt-10">
                        {
                            cart[productId] && (
                                <div className="flex flex-col gap-3">
                                    <p className="text-lg text-slate-800 font-semibold">Quantity</p>
                                    <Counter productId={productId} />
                                </div>
                            )
                        }

                        <button onClick={() => !cart[productId] ? addToCartHandler() : router.push('/cart')} className="bg-slate-800 text-white px-10 py-3 text-sm font-medium rounded hover:bg-slate-900 active:scale-95 transition">
                            {!cart[productId] ? 'Add to Cart' : 'View Cart'}
                        </button>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-green-600 text-white px-10 py-3 text-sm font-medium rounded hover:bg-green-700 active:scale-95 transition"
                        >
                            Book Enquiry
                        </button>
                    </div>

                    <hr className="border-gray-300 my-5" />

                    <div className="flex flex-col gap-4 text-slate-500">
                        <p className="flex gap-3"> <EarthIcon className="text-slate-400" /> Free shipping worldwide </p>
                        <p className="flex gap-3"> <CreditCardIcon className="text-slate-400" /> 100% Secured Payment </p>
                        <p className="flex gap-3"> <UserIcon className="text-slate-400" /> Trusted by top brands </p>
                    </div>
                </div>
            </div>

            {/* Modal Section */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[rgb(0,0,0,0.5)]  backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>

                    <div className="relative bg-white w-full max-w-md p-6 rounded-2xl shadow-xl z-50">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Confirm Enquiry</h2>
                            <button onClick={() => setIsModalOpen(false)}>
                                <X size={20} className="text-gray-500 hover:text-gray-700" />
                            </button>
                        </div>

                        <p className="text-gray-600 mb-6">
                            Please choose how you'd like to proceed with your enquiry.
                        </p>

                        {/* Form Fields */}
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

                        {/* Buttons */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleWhatsApp}
                                className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            >
                                📱 WhatsApp
                            </button>
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                📝 Add Form
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetails;
