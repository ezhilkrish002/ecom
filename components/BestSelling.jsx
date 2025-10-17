'use client';
import Title from './Title';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import React from 'react';
const BestSelling = () => {
  const products = useSelector((state) => state.product.list);
  const categories = [...new Set(products.map((p) => p.category))];

  const groupedProducts = categories.map((category) => ({
    category,
    items: products.filter((p) => p.category === category),
  }));

  return (
    <div className="px-4 sm:px-6 my-20 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">Best Selling Products</h2>

      {groupedProducts.map((group, index) => (
        <div key={index} className="mb-16">
          {/* Category Title */}
          <Title title={group.category} href={`/category/${group.category}`} />

          {/* Responsive Product Layout */}
          <div
            className="
              grid 
              grid-cols-1       /* Mobile: 1 per row */
              sm:grid-cols-2    /* Tablet: 2 per row */
              lg:grid-cols-4    /* Desktop: 4 per row */
              gap-6 xl:gap-8
            "
          >
            {group.items.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BestSelling;
