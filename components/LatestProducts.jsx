
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

      {/* --- Mobile Carousel --- */}
      <div className="relative mt-6 md:hidden">
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
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {products
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((product, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full snap-start"
              >
                {/* Pass mobile prop to ProductCard for full-width 3:4 ratio */}
                <ProductCard product={product} mobile />
              </div>
          ))}
        </div>
      </div>

      {/* --- Desktop Grid --- */}
      <div className="hidden md:grid mt-12 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* Optional View More */}
      {/* <div className="mt-4 md:hidden text-right px-2">
        <Link href="/shop" className="flex items-center gap-1 text-sm text-[#c31e5aff] justify-end">
          View more <ArrowRight size={14} />
        </Link>
      </div> */}
      
    </div>
  )
}

export default LatestProducts
