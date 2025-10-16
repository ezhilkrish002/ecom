'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Title = ({ title, description, visibleButton = true, href = '' }) => {
  return (
    <div className='flex flex-row justify-between items-center mb-3'>
      <div className="flex items-center gap-3">
        <div className="w-2 h-10 rounded-full bg-[#c31e5aff] shadow-lg"></div>
        <p className='text-lg sm:text-2xl w-[150px] sm:w-full truncate font-semibold text-slate-800'>
          {title}
        </p>
      </div>

      <div className="flex-1 h-px bg-gradient-to-r from-[#c31e5aff] to-transparent -ml-4 sm:ml-4"></div>

      <div>
        <Link href={href} className='flex items-center gap-5 text-sm text-slate-600 mt-1'>
          {visibleButton && (
            <button
              className='group text-[#c31e5aff] text-lg mb-2 sm:text-xl flex items-center gap-1 transition-all duration-300 hover:scale-105'
            >
              <span className='relative after:content-[""] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-[#c31e5aff] after:transition-all after:duration-300 group-hover:after:w-full'>
                View more
              </span>
              <ArrowRight
                size={18}
                className='transition-transform duration-300 group-hover:translate-x-1'
              />
            </button>
          )}
        </Link>
      </div>
    </div>
  )
}

export default Title
