'use client';
import Title from './Title';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BestSelling = () => {
  const displayQuantity = 4;
  const products = useSelector((state) => state.product.list);
  const categories = [...new Set(products.map((p) => p.category))];

  const [currentIndex, setCurrentIndex] = useState({}); // ✅ store per-category index
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 640);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Handlers per category
  const handlePrev = (category) => {
    setCurrentIndex((prev) => ({
      ...prev,
      [category]: Math.max(0, (prev[category] || 0) - 1),
    }));
  };

  const handleNext = (category, max) => {
    setCurrentIndex((prev) => ({
      ...prev,
      [category]: Math.min(max - 1, (prev[category] || 0) + 1),
    }));
  };

  const filteredProducts = (category) =>
    products.filter((p) => p.category === category);

  return (
    <div className="px-4 sm:px-6 my-20 max-w-6xl mx-auto">
      {categories.map((category, index) => {
        const filtered = filteredProducts(category);
        const sorted = filtered.slice().sort((a, b) => b.rating.length - a.rating.length);
        const maxIndex = Math.max(0, sorted.length - 1);
        const slideIndex = currentIndex[category] || 0; // ✅ category-specific index

        return (
          <div key={index} className="mb-16 relative">
            <Title title={category} href={`/category/${category}`} />

            {isMobile ? (
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${slideIndex * 100}vw)` }}
                >
                  {sorted.map((product, i) => (
                    <div
                      key={i}
                      className="flex-none w-screen"
                      style={{ flexShrink: 0 }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Arrows for this category only */}
                <button
                  onClick={() => handlePrev(category)}
                  disabled={slideIndex === 0}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronLeft size={24} className="text-gray-600" />
                </button>
                <button
                  onClick={() => handleNext(category, sorted.length)}
                  disabled={slideIndex >= sorted.length - 1}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronRight size={24} className="text-gray-600" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
                {sorted.slice(0, displayQuantity).map((product, i) => (
                  <ProductCard key={i} product={product} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BestSelling;
