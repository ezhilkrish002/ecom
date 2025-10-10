'use client'
import React, { useState } from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const LatestProducts = () => {
    const displayQuantity = 1
    const products = useSelector(state => state.product.list)
    const [startIndex, setStartIndex] = useState(0)

    const handleNext = () => {
        if (startIndex + displayQuantity < products.length) {
            setStartIndex(startIndex + displayQuantity)
        }
    }

    const handlePrev = () => {
        if (startIndex - displayQuantity >= 0) {
            setStartIndex(startIndex - displayQuantity)
        }
    }

    return (
        <div className='px-6 my-30 max-w-6xl mx-auto'>
            <Title title='Latest Products' description='Explore our newest arrivals' visibleButton={false} />

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
                        style={{ transform: `translateX(-${startIndex * (100 / displayQuantity)}%)` }}
                    >
                        {products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((product, index) => (
                            <div key={index} className="flex-shrink-0 w-full px-2">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Arrow with View More */}
                <div className="flex items-center">
                    <div
                        onClick={handleNext}
                        className={`p-2 rounded-full cursor-pointer z-10 ${startIndex + displayQuantity >= products.length ? 'opacity-40 pointer-events-none' : 'hover:bg-gray-200'}`}
                    >
                        <ChevronRight className="h-6 w-6" />
                    </div>
                    {startIndex + displayQuantity >= products.length && (
                        <Link href="/shop" className="flex items-center gap-1 text-sm text-[#c31e5aff] ml-2">
                            View more <ArrowRight size={14} />
                        </Link>
                    )}
                </div>
            </div>

            {/* --- Desktop View (Grid) --- */}
            <div className='hidden md:grid mt-12 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-between'>
                {products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8).map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    )
}

export default LatestProducts