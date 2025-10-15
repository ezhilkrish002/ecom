'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { assets } from '@/assets/assets'
import Title from './Title'

// Application data
const applications = [
  { label: 'AGRICULTURE', src: assets.agri },
  { label: 'BUILDING SERVICES', src: assets.build },
  { label: 'WASTE WATER SOLUTIONS', src: assets.wastewater},
  { label: 'SOLAR PUMPS', src: assets.solar },
  { label: 'DOMESTIC PUMPS', src: assets.home },
]

const itemsPerPageMobile = 2
const itemsPerPageDesktop = 5

export default function PumpApplications() {
  const [startIndex, setStartIndex] = useState(0)

  const handleNext = () => {
    if (startIndex + itemsPerPageMobile < applications.length) {
      setStartIndex(startIndex + itemsPerPageMobile)
    }
  }

  const handlePrev = () => {
    if (startIndex - itemsPerPageMobile >= 0) {
      setStartIndex(startIndex - itemsPerPageMobile)
    }
  }

  return (
    <section className="px-6 mt-10 mb-15 max-w-6xl mx-auto">
      {/* <h2 className="text-2xl font-bold text-center mb-8">Water Pump Applications</h2> */}
         <Title
              title={`Precision Engineering For a Better World`}
              href={`/category/products`}
            />
      {/* --- Mobile Carousel --- */}
      <div className="md:hidden relative flex items-center justify-between w-full">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full z-10 -ml-6 ${
            startIndex === 0 ? 'opacity-40 pointer-events-none' : 'hover:bg-gray-200'
          }`}
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>

        <div className="overflow-x-auto w-full snap-x snap-mandatory scrollbar-hide touch-pan-x">
          <div
            className="flex transition-transform duration-500 ease-in-out mt-5"
            style={{ transform: `translateX(-${startIndex * (100 / itemsPerPageMobile)}%)` }}
          >
            {applications.map((app, index) => (
              <div
                key={index}
                className="group flex-shrink-0 w-1/2 px-4 flex flex-col items-center snap-start"
              >
                <div className="bg-[#F5F5F5] h-36 w-36 rounded-full  flex items-center justify-center overflow-hidden">
                  <Image
                    className="scale-110 group-hover:scale-115 transition duration-300"
                    src={app.src}
                    alt={app.label}
                    width={144}
                    height={144}
                  />
                </div>
                <p className="text-center mt-5 text-sm  text-slate-800">{app.label}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={startIndex + itemsPerPageMobile >= applications.length}
          className={`absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full z-10 -mr-6 ${
            startIndex + itemsPerPageMobile >= applications.length
              ? 'opacity-40 pointer-events-none'
              : 'hover:bg-gray-200'
          }`}
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* --- Desktop Grid --- */}
      <div className="hidden md:grid mt-12 grid-cols-5 mb-5 gap-12 justify-between">
        {applications.map((app, index) => (
          <div key={index} className="group flex flex-col items-center">
            <div className="bg-[#F5F5F5] h-32 w-32 sm:h-50 sm:w-50  flex items-center justify-center overflow-hidden">
              <Image
                className="scale-110 group-hover:scale-115  transition duration-300 "
                
                src={app.src}
                alt={app.label}
                width={200}
                height={200}
              />
            </div>
            <p className="text-center mt-6 text-sm sm:text-2xl w-full font-bold  text-slate-800">{app.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}