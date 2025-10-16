
'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Title = ({ title, visibleButton = true, href = '' }) => {
    return (
        <div className="flex items-center justify-between mb-3 w-full gap-3">
            {/* Title + Line */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Vertical colored bar */}
                <div className="w-2 h-10 rounded-full bg-gradient-to-b from-[#c31e5aff] to-[#c31e5aff] shadow-lg flex-shrink-0"></div>

                {/* Title text */}
                <p className="text-xl sm:text-2xl font-semibold text-slate-800 whitespace-nowrap truncate">
                    {title}
                </p>

                {/* Horizontal line that starts after the title text and extends */}
                <div className="flex-1 h-px bg-gradient-to-r from-[#c31e5aff] to-transparent"></div>
            </div>

            {/* View More Button */}
            {visibleButton && (
                <div className="flex-shrink-0 ml-3">
                    <Link href={href} className="flex items-center gap-1 text-xs sm:text-sm text-[#c31e5aff] whitespace-nowrap">
                        View more <ArrowRight size={16} />
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Title

