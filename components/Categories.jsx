'use client'

import { assets, categories } from '@/assets/assets'
import Title from './Title'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const categoryImages = {
  "Pumps": assets.product_img1,
  "Electric Motor": assets.product_img0,
  "Engine": assets.product_img6,
  "Generator": assets.product_img0,
  "Air Compressor": assets.product_img0,
//   Decoration: assets.product_img1,
}

const Categories = () => {
  return (
    <div className='px-6 my-30 max-w-6xl mx-auto'>
      <Title title='Shop by Category' description='Explore products by category' visibleButton={false} />
      <div className='mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-between'>
        {categories.slice(0, 5).map((cat, index) => (
          <Link key={index} href={`/shop?category=${cat.toLowerCase()}`} className="group max-xl:mx-auto">
            <div className="bg-[#F5F5F5] h-40 w-35 sm:w-45 sm:h-45 rounded-full flex items-center justify-center overflow-hidden">
              <Image
                
                className=" scale-110 overflow-hidden max-h-45 sm:max-h-45  group-hover:scale-115 transition duration-300"
                src={categoryImages[cat]}
                alt={cat}
              />
            </div>
            <p className="text-center mt-2 text-sm text-slate-800">{cat}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories