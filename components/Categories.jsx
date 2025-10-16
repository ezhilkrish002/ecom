'use client'

import { assets } from '@/assets/assets'
import Title from './Title'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Dummy categories array with 10 categories
const categories = [
  "Pumps",
  "Electric Motor",
  "Engine",
  "Generator",
  "Air Compressor",
  "Hydraulic Systems",
  "Power Tools",
  "Welding Equipment",
  "Industrial Fans",
  "Control Panels"
]

// Dummy category images (using placeholder images for new categories)
const categoryImages = {
  "Pumps": assets.product_img01 || 'https://via.placeholder.com/160',
  "Electric Motor": assets.product_img02 || 'https://via.placeholder.com/160',
  "Engine": assets.product_img03 || 'https://via.placeholder.com/160',
  "Generator": assets.product_img04 || 'https://via.placeholder.com/160',
  "Air Compressor": assets.product_img05 || 'https://via.placeholder.com/160',
  "Hydraulic Systems": assets.product_img01,
  "Power Tools": assets.product_img01,
  "Welding Equipment": assets.product_img01,
  "Industrial Fans": assets.product_img01,
  "Control Panels": assets.product_img01,
}

const Categories = () => {
  const [startIndex, setStartIndex] = useState(0)
  const itemsPerPageMobile = 2 // Mobile view shows 2 items per page
  const itemsPerPageTablet = 3 // Tablet view shows 3 items per page
  const itemsPerPageDesktop = 5 // Desktop view shows 5 items per page

  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return itemsPerPageDesktop
      if (window.innerWidth >= 768) return itemsPerPageTablet
      return itemsPerPageMobile
    }
    return itemsPerPageMobile // Default for SSR
  }

  const handleNext = () => {
    const itemsPerPage = getItemsPerPage()
    if (startIndex + itemsPerPage < categories.length) {
      setStartIndex(startIndex + itemsPerPage)
    }
  }

  const handlePrev = () => {
    const itemsPerPage = getItemsPerPage()
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage)
    }
  }

  return (
    <div className="px-6 mt-10 sm:my-30 max-w-6xl mx-auto">
      <Title title="Shop by Category" description="Explore products by category" visibleButton={false} />

      {/* --- Mobile View (Touch-Scrollable Carousel with Hidden Scrollbar) --- */}
      <div className="mt-8 lg:hidden relative flex items-center justify-between w-full">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full z-10 cursor-pointer transition-all duration-200 -ml-6 ${
            startIndex === 0 ? 'opacity-40 pointer-events-none' : 'hover:bg-gray-200'
          }`}
        >
          <ChevronLeft className="h-8 w-8 text-gray-700" />
        </button>

        <div className="overflow-x-auto w-full px-0 snap-x snap-mandatory scrollbar-hide touch-pan-x">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${startIndex * (100 / getItemsPerPage())}%)` }}
          >
            {categories.map((cat, index) => (
              <Link
                key={index}
                href={`/category/${cat}`}
                className={`group flex-shrink-0 px-4 flex flex-col items-center snap-start ${
                  getItemsPerPage() === itemsPerPageMobile ? 'w-1/2' : 'w-1/3'
                }`}
              >
                <div className="bg-[#F5F5F5] h-36 w-36 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    className="scale-110 group-hover:scale-115 transition duration-300"
                    src={categoryImages[cat]}
                    alt={cat}
                    width={144}
                    height={144}
                  />
                </div>
                <p className="text-center mt-3 text-base text-slate-800">{cat}</p>
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={startIndex + getItemsPerPage() >= categories.length}
          className={`absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full z-10 cursor-pointer transition-all duration-200 -mr-6 ${
            startIndex + getItemsPerPage() >= categories.length ? 'opacity-40 pointer-events-none' : 'hover:bg-gray-200'
          }`}
        >
          <ChevronRight className="h-8 w-8 text-gray-700" />
        </button>
      </div>

      {/* --- Desktop View --- */}
      {categories.length <= 5 ? (
        // Static Grid for 5 or fewer categories
        <div className="hidden lg:grid mt-12 grid-cols-5 gap-6 justify-between">
          {categories.map((cat, index) => (
            <Link key={index} href={`/category/${cat}`} className="group max-xl:mx-auto">
              <div className="flex flex-col justify-center items-center">
                <div className="bg-[#F5F5F5] h-30 w-30 sm:w-40 sm:h-40 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    className="scale-110 group-hover:scale-115 transition duration-300"
                    src={categoryImages[cat]}
                    alt={cat}
                    width={160}
                    height={160}
                  />
                </div>
                <p className="text-center mt-2 text-sm text-slate-800">{cat}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // Scrollable Carousel for more than 5 categories
        <div className="hidden lg:block mt-12 relative flex items-center justify-between w-full">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full z-10 cursor-pointer transition-all duration-200 -ml-6 ${
              startIndex === 0 ? 'opacity-40 pointer-events-none' : 'hover:bg-gray-200'
            }`}
          >
            <ChevronLeft className="h-8 w-8 text-gray-700" />
          </button>

          <div className="overflow-x-auto w-full px-0 snap-x snap-mandatory scrollbar-hide">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${startIndex * (100 / itemsPerPageDesktop)}%)` }}
            >
              {categories.map((cat, index) => (
                <Link
                  key={index}
                  href={`/category/${cat}`}
                  className="group flex-shrink-0 w-1/5 px-4 flex flex-col items-center snap-center"
                >
                  <div className="bg-[#F5F5F5] h-30 w-30 sm:w-40 sm:h-40 rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      className="scale-110 group-hover:scale-115 transition duration-300"
                      src={categoryImages[cat]}
                      alt={cat}
                      width={160}
                      height={160}
                    />
                  </div>
                  <p className="text-center mt-2 text-sm text-slate-800">{cat}</p>
                </Link>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPageDesktop >= categories.length}
            className={`absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full z-10 cursor-pointer transition-all duration-200 -mr-6 ${
              startIndex + itemsPerPageDesktop >= categories.length ? 'opacity-40 pointer-events-none' : 'hover:bg-gray-200'
            }`}
          >
            <ChevronRight className="h-8 w-8 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  )
}

export default Categories