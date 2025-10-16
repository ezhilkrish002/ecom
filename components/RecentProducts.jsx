'use client'
import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {assets} from '@/assets/assets'
import Image from 'next/image'
const recentProducts = [
  { id: 1, img: assets.recent1 },
  { id: 2, img: assets.recent1 },
  { id: 3, img: assets.recent1 },
  { id: 4, img: assets.recent1 },
  { id: 5, img: assets.recent1 },
  { id: 6, img: assets.recent1 },
  { id: 7, img: assets.recent1 },
  { id: 8, img: assets.recent1 },
]

const RecentProducts = () => {
  const carouselRef = useRef(null)

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: 'smooth',
      })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="px-4 my-20  mx-auto max-w-7xl">
      {/* Title Section */}
      <div className="flex flex-col items-start mb-10">
        <h2 className="text-4xl font-bold">
          <span className="text-[#7C2A47]">RECENT</span>{' '}
          <span className="text-gray-900">PRODUCTS</span>
        </h2>

        {/* Horizontal Line */}
        <div className="w-full border-t border-gray-300 mt-4 mb-6"></div>

        <p className="text-lg text-[#E6A02A] font-semibold">
          INDUSTRY DESIGNS, INSPIRING GROWTH
        </p>
      </div>

      {/* --- Carousel --- */}
      <div className="relative mt-6">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md z-20 hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md z-20 hover:bg-gray-100 transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable Products */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide space-x-6 px-0  sm:px-9 py-2"
        >
          {recentProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 snap-start"
            >
              <div className="bg-white rounded-lg overflow-hidden">
                <Image
                  src={product.img}
                  alt={`Product ${product.id}`}
                  className="w-full h-[250px] object-contain "
                />
              </div>
              {/* <div className="h-full w-full flex items-center justify-center overflow-hidden">
                                <Image
                                  className="scale-110 group-hover:scale-115 transition duration-300"
                                  src={product.img}
                                  alt={product.id}
                                  width={160}
                                  height={160}
                                />
                              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentProducts
