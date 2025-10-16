'use client'
import React, { useRef } from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const LatestProducts = () => {
  const products = useSelector(state => state.product.list)
  const carouselRef = useRef(null)

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth, // scroll by full width
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
    <div className="px-2 sm:px-6 my-12 max-w-6xl mx-auto">
      <Title title="Latest Products" description="Explore our newest arrivals" visibleButton={true} href='/category/products'/>

      {/* --- Responsive Carousel --- */}
      <div className="relative mt-6">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-20 hover:bg-gray-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-20 hover:bg-gray-200"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable container */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide space-x-4"
        >
          {products
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((product, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 snap-start"
              >
                <ProductCard product={product} />
              </div>
          ))}
        </div>
      </div>

      {/* Optional View More */}
      {/* <div className="mt-4 text-right px-2">
        <Link href="/shop" className="flex items-center gap-1 text-sm text-[#c31e5aff] justify-end">
          View more <ArrowRight size={14} />
        </Link>
      </div> */}
      
    </div>
  )
}

export default LatestProducts