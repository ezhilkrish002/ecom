'use client';
import Title from './Title';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom arrow components for carousel
const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white text-black rounded-full shadow-md hover:bg-gray-200 transition-all duration-200"
    onClick={onClick}
    aria-label="Next Slide"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white text-black rounded-full shadow-md hover:bg-gray-200 transition-all duration-200"
    onClick={onClick}
    aria-label="Previous Slide"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const BestSelling = () => {
  const displayQuantity = 4;
  const products = useSelector((state) => state.product.list);

  const categories = [...new Set(products.map((p) => p.category))];

  // Slick carousel settings with responsive breakpoints
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280, // xl screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 768, // md screens (tablets)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 640, // sm screens (mobile)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480, // extra small screens (mobile)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="px-4 sm:px-6 my-20 max-w-6xl mx-auto">
      {categories.map((category, index) => {
        const filtered = products.filter((p) => p.category === category);

        return (
          <div key={index} className="mb-16">
            {/* 🔹 Section Title */}
            <Title
              title={`${category}`}
              href={`/category/${category}`}
            />

            {/* 🧩 Carousel for Products */}
            <div className="mt-8">
              <Slider {...sliderSettings}>
                {filtered
                  .slice()
                  .sort((a, b) => b.rating.length - a.rating.length)
                  .slice(0, displayQuantity)
                  .map((product, i) => (
                    <div key={i} className="px-2">
                      <ProductCard product={product} />
                    </div>
                  ))}
              </Slider> 
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default BestSelling;