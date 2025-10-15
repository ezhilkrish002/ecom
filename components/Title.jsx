'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Title = ({ title, description, visibleButton = true, href = '' }) => {

    return (
        <div className='flex flex-row justify-between items-center'>
            <div className="flex items-center gap-3">
            {/* <div className="w-[10px] h-full bg-[#c31e5aff]"></div> */}
            <div className="w-2 h-10 rounded-full bg-gradient-to-b bg-[#c31e5aff] shadow-lg"></div>
            <p className='text-2xl w-[150px] sm:w-full truncate font-semibold text-slate-800'>{title}</p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-[#c31e5aff] to-transparent ml-4"></div>
            <div>
            <Link href={href} className='flex items-center gap-5 text-sm text-slate-600 mt-1'>
                {/* <p className='max-w-lg text-center'>{description}</p> */}
                {visibleButton && <button className='text-[#c31e5aff] flex items-center gap-1'>View more <ArrowRight size={14} /></button>}
            </Link>
            </div>
        </div>
    )
}

export default Title