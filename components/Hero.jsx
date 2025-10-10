'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹'

    return (
        <div className='mx-6'>
            <div className='flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10'>

                <div className='relative flex-1 flex flex-col bg-gradient-to-br from-[#F8E7E9] via-[#FFF3E0] to-[#F4E8D3] rounded-3xl xl:min-h-100 group'>
                    <div className='p-5 sm:p-10'>
                        <div className="inline-flex items-center gap-3 bg-[#7B1E3A]/10 text-[#7B1E3A] pr-1 p-1 rounded-full text-xs sm:text-sm">
                            <span className="bg-[#E29B2B] px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs">NEWS</span>
                            Free Shipping on Orders Above ₹50!
                            <ChevronRightIcon className="group-hover:ml-2 transition-all" size={16} />
                        </div>

                        <h2 className='text-3xl sm:text-5xl leading-[1.2] my-3 font-medium bg-gradient-to-r from-[#7B1E3A] to-[#E29B2B] bg-clip-text text-transparent max-w-xs sm:max-w-md'>
                            Gadgets you'll love. Prices you'll trust.
                        </h2>

                        {/* ✅ Desktop Layout */}
                        <div className='hidden sm:block text-[#3A3634] text-sm font-medium mt-4 sm:mt-1'>
                            <p>Starts from</p>
                            <p className='text-3xl'>{currency}499</p>
                            <button className='bg-[#7B1E3A] text-white text-sm py-2.5 px-7 sm:py-5 sm:px-12 mt-4 sm:mt-10 rounded-md hover:bg-[#61162D] hover:scale-103 active:scale-95 transition'>
                                LEARN MORE
                            </button>
                        </div>
                    </div>

                    {/* ✅ Mobile Layout */}
                    <div className="flex sm:hidden items-center justify-between px-3">
                        <div className="text-[#3A3634] text-sm font-medium">
                            <p>Starts from</p>
                            <p className="text-3xl">{currency}499</p>
                            <button className="bg-[#7B1E3A] text-white text-xs sm:text-sm py-2 px-5 sm:py-3 sm:px-7 md:py-4 md:px-10 mt-3 rounded-md hover:bg-[#61162D] hover:scale-105 active:scale-95 transition">
                                LEARN MORE
                            </button>
                        </div>

                        <Image
                            src={assets.hero_model_img}
                            alt="Gadget"
                            width={400}
                            height={400}
                            className="w-40 transition-all duration-300"
                        />
                    </div>

                    <Image
                        className='hidden sm:block sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm'
                        src={assets.hero_model_img}
                        alt="Gadget"
                    />
                </div>

                <div className='flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-slate-600'>
  <div className='flex-1 flex items-center justify-between w-full bg-green-100 rounded-3xl p-6 px-6 group'>
    <div>
      <p className='text-3xl font-medium bg-gradient-to-r from-green-700 to-green-400 bg-clip-text text-transparent max-w-40'>
        Best products
      </p>
      <p className='flex items-center gap-1 mt-4 text-green-700'>
        View more
        <ArrowRightIcon className='text-green-600 group-hover:ml-2 transition-all' size={18} />
      </p>
    </div>
    <Image 
      className='w-40 h-40 rounded-full object-cover' 
      src={assets.product_img2} 
      alt="" 
      width={80} 
      height={80} 
    />
  </div>

  <div className='flex-1 flex items-center justify-between w-full bg-blue-200 rounded-3xl p-6 px-8 group'>
    <div>
      <p className='text-3xl font-medium bg-gradient-to-r from-slate-800 to-[#78B2FF] bg-clip-text text-transparent max-w-40'>20% discounts</p>
      <p className='flex items-center gap-1 mt-4'>View more <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> </p>
    </div>
    <Image 
      className='w-40 h-40 rounded-full object-cover' 
      src={assets.product_img6} 
      alt="" 
      width={100} 
      height={100} 
    />
  </div>
</div>

            </div>
            <CategoriesMarquee />


        </div>


    )
}

export default Hero





