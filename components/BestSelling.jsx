

// 'use client'
// import Title from './Title'
// import ProductCard from './ProductCard'
// import { useSelector } from 'react-redux'

// const BestSelling = () => {
//     const displayQuantity = 4
//     const products = useSelector(state => state.product.list)

//     const categories = [...new Set(products.map(p => p.category))]

//     return (
//         <div className='px-6 my-30 max-w-6xl mx-auto'>
//             {categories.map((category, index) => {
//                 const filtered = products.filter(p => p.category === category)
//                 return (
//                     <div key={index} className='mb-16'>
//                         <Title 
//                             title={`${category}`} 
//                             description={`Showing ${filtered.length < displayQuantity ? filtered.length : displayQuantity} of ${filtered.length} products`} 
//                             href='/shop' 
//                         />
//                         <div className='mt-8 grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12'>
//                             {filtered
//                                 .slice()
//                                 .sort((a, b) => b.rating.length - a.rating.length)
//                                 .slice(0, displayQuantity)
//                                 .map((product, i) => (
//                                     <ProductCard key={i} product={product} />
//                                 ))}
//                         </div>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

// export default BestSelling


'use client';
import Title from './Title';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';

const BestSelling = () => {
  const displayQuantity = 4;
  const products = useSelector((state) => state.product.list);

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="px-4 sm:px-6 my-20 max-w-6xl mx-auto">
      {categories.map((category, index) => {
        const filtered = products.filter((p) => p.category === category);

        return (
          <div key={index} className="mb-16">
            {/* 🔹 Section Title */}
            <Title
              title={`${category}`}
            //   description={`Showing ${
            //     filtered.length < displayQuantity ? filtered.length : displayQuantity
            //   } of ${filtered.length} products`}
              href={`/category/${category}`}
            />

            {/* 🧩 Responsive Product Grid */}
            <div
              className="
                mt-8 
                grid
                grid-cols-1        /* 📱 Mobile: 1 per row */
                sm:grid-cols-2     /* 📲 Small tablets: 2 per row */
                md:grid-cols-3     /* 💻 Tablets: 3 per row */
                lg:grid-cols-4     /* 🖥️ Desktop: 4 per row */
                gap-6
                xl:gap-10
                place-items-center
              "
            >
              {filtered
                .slice()
                .sort((a, b) => b.rating.length - a.rating.length)
                .slice(0, displayQuantity)
                .map((product, i) => (
                  <ProductCard key={i} product={product} />
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BestSelling;

