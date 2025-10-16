'use client';
import Title from './Title';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LatestProducts = () => {
  const products = useSelector((state) => state.product.list);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const displayQuantity = 4; // Number of products to show in grid on desktop

  // Detect screen size
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 640);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Handlers for carousel
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = (max) => {
    setCurrentIndex((prev) => Math.min(max - 1, prev + 1));
  };

  // Sort products by creation date (newest first)
  const sortedProducts = products
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="px-4 sm:px-6 my-20 max-w-7xl mx-auto">
      <Title
        title="Latest Products"
        description="Explore our newest arrivals"
        visibleButton={true}
        href="/category/products"
      />

      {/* Carousel for all screen sizes */}
      <div className="relative overflow-hidden -mx-2 mt-10 ">
        <div
          className="flex transition-transform duration-500 ease-in-out snap-x snap-mandatory"
          style={{ transform: `translateX(-${currentIndex * (isMobile ? 100 : 25)}%)` }}
        >
          {sortedProducts.map((product, i) => (
            <div
              key={i}
              className={`flex-none ${isMobile ? 'w-full' : 'w-1/4'} snap-start px-2`}
              style={{ flexShrink: 0 }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {sortedProducts.length > (isMobile ? 1 : displayQuantity) && (
          <>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="absolute top-50 sm:top-45 left-2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 disabled:opacity-50 z-20"
            >
              <ChevronLeft size={24} className="text-gray-600" />
            </button>
            <button
              onClick={() => handleNext(sortedProducts.length)}
              disabled={currentIndex >= sortedProducts.length - (isMobile ? 1 : displayQuantity)}
              className="absolute top-50 sm:top-45 right-2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 disabled:opacity-50 z-20"
            >
              <ChevronRight size={24} className="text-gray-600" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LatestProducts;