'use client'

import { assets, categories } from '@/assets/assets'
import Title from './Title'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const categoryImages = {
  "Pumps": assets.product_img1,
  "Electric Motor": assets.product_img0,
  "Engine": assets.product_img6,
  "Generator": assets.product_img0,
  "Air Compressor": assets.product_img0,
}

const Categories = () => {
  const [startIndex, setStartIndex] = useState(0)
  const itemsPerPage = 2

  const handleNext = () => {
    if (startIndex + itemsPerPage < categories.length) {
      setStartIndex(startIndex + itemsPerPage)
    }
  }

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage)
    }
  }

  return (
    <div className="px-6 my-30 max-w-6xl mx-auto">
      <Title title="Shop by Category" description="Explore products by category" visibleButton={false} />

      {/* --- Mobile View (Carousel) --- */}
      <div className="mt-8 md:hidden flex items-center justify-between relative">
        {/* Left Arrow */}
        <div
          onClick={handlePrev}
          className={`p-2 rounded-full cursor-pointer z-10 ${startIndex === 0 ? 'opacity-40 pointer-events-none' : 'hover:bg-gray-200'}`}
        >
          <ChevronLeft className="h-6 w-6" />
        </div>

        {/* Visible Items with sliding animation */}
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)` }}
          >
            {categories.map((cat, index) => (
              <Link
                key={index}
                href={`/shop?category=${cat.toLowerCase()}`}
                className="group flex-shrink-0 w-1/2 px-2 flex flex-col items-center"
              >
                <div className="bg-[#F5F5F5] h-28 w-28 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    className="scale-110 group-hover:scale-115 transition duration-300"
                    src={categoryImages[cat]}
                    alt={cat}
                  />
                </div>
                <p className="text-center mt-2 text-sm text-slate-800">{cat}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <div
          onClick={handleNext}
          className={`p-2 rounded-full cursor-pointer z-10 ${startIndex + itemsPerPage >= categories.length ? 'opacity-40 pointer-events-none' : 'hover:bg-gray-200'}`}
        >
          <ChevronRight className="h-6 w-6" />
        </div>
      </div>

      {/* --- Desktop View (Grid) --- */}
      <div className="hidden md:grid mt-12 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-between">
        {categories.slice(0, 5).map((cat, index) => (
          <Link key={index} href={`/shop?category=${cat.toLowerCase()}`} className="group max-xl:mx-auto">
            <div className="flex flex-col justify-center items-center">
              <div className="bg-[#F5F5F5] h-30 w-30 sm:w-40 sm:h-40 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  className="scale-110 group-hover:scale-115 transition duration-300"
                  src={categoryImages[cat]}
                  alt={cat}
                />
              </div>
              <p className="text-center mt-2 text-sm text-slate-800">{cat}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories