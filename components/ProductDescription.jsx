
'use client'
import { ArrowRight, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const ProductDescription = ({ product }) => {
  const [selectedTab, setSelectedTab] = useState('Description')

  return (
    <div className="my-16 text-sm text-slate-700 px-4 md:px-0">

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 max-w-2xl">
        {['Description', 'Specifications', 'Reviews'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-3 py-2 font-medium transition-colors ${
              tab === selectedTab
                ? 'border-b-2 border-red-600 text-[]font-semibold'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* -------- Description -------- */}
      {selectedTab === 'Description' && (
        <p className="max-w-3xl leading-relaxed">{product.description}</p>
      )}

      {/* -------- Specifications -------- */}
      {selectedTab === 'Specifications' && (
        <div className="max-w-6xl">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">
            Common Specifications
          </h2>

          {/* top 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {/* Applications */}
            <div>
              <h3 className="text-lg font-semibold text-[#c31e5aff] mb-3">
                APPLICATIONS
              </h3>
              <p>
                <span className="font-semibold">Type</span> — Residential, construction site
              </p>
            </div>

            {/* Materials */}
            <div>
              <h3 className="text-lg font-semibold text-[#c31e5aff] mb-3">
                MATERIALS
              </h3>
              <ul className="space-y-2">
                <li><span className="font-semibold">Impeller:</span> Forged brass</li>
                <li><span className="font-semibold">Pump casing & flanges:</span> Cast iron–IS 210 grade FG 200</li>
                <li><span className="font-semibold">Motor body:</span> Aluminium / Cast iron</li>
                <li><span className="font-semibold">Shaft:</span> SS 410 / EN–8</li>
                <li><span className="font-semibold">Motor body:</span> Alu extruded + powder coated</li>
                <li><span className="font-semibold">Mechanical seal:</span> Carbon ceramic</li>
                <li><span className="font-semibold">Bearing:</span> Double shielded ball bearing</li>
              </ul>
            </div>

            {/* Operating conditions */}
            <div>
              <h3 className="text-lg font-semibold text-[#c31e5aff] mb-3">
                OPERATING CONDITIONS
              </h3>
              <ul className="space-y-2">
                <li><span className="font-semibold">Suction lift:</span> up to 8 metre</li>
                <li><span className="font-semibold">Max. liquid temperature:</span> 50 °C</li>
                <li><span className="font-semibold">Max. ambient temperature:</span> 40 °C</li>
                <li><span className="font-semibold">Max. operating pressure:</span> 8 bar</li>
              </ul>
            </div>
          </div>

          {/* Technical specifications */}
          <div>
            <h3 className="text-lg font-semibold text-[#c31e5aff] mb-4">
              TECHNICAL SPECIFICATIONS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-10">
              {product.specs.map((spec, i) => (
                <p key={i}>
                  <span className="font-semibold">{spec.label}</span> — {spec.value}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* -------- Reviews -------- */}
      {selectedTab === 'Reviews' && (
        <div className="flex flex-col gap-6 mt-10">
          {product.rating.map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-4 border-b pb-6">
              <Image
                src={item.user.image}
                alt={item.user.name}
                width={48}
                height={48}
                className="size-12 rounded-full"
              />
              <div>
                <div className="flex mb-2">
                  {Array(5).fill('').map((_, idx) => (
                    <StarIcon
                      key={idx}
                      size={18}
                      fill={item.rating >= idx + 1 ? '#c31e5a' : '#D1D5DB'}
                      className="text-transparent"
                    />
                  ))}
                </div>
                <p className="text-slate-700 mb-2">{item.review}</p>
                <p className="font-medium text-slate-900">{item.user.name}</p>
                <p className="text-xs text-slate-500">
                  {new Date(item.createdAt).toDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* -------- Store info -------- */}
      <div className="flex items-center gap-3 mt-12">
        <Image
          src={product.store.logo}
          alt={product.store.name}
          width={48}
          height={48}
          className="size-12 rounded-full ring ring-slate-300"
        />
        <div>
          <p className="font-medium text-slate-800">
            Product by {product.store.name}
          </p>
          <Link
            href={`/shop/${product.store.username}`}
            className="flex items-center gap-1 text-green-600 hover:underline"
          >
            View store <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDescription
