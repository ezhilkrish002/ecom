
'use client'
import { ArrowRight, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const ProductDescription = ({ product }) => {
  const [selectedTab, setSelectedTab] = useState('Description')
  const [selectedSubTab, setSelectedSubTab] = useState('Applications')

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
                ? 'border-b-2 border-red-600 text-slate-900 font-semibold'
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
            Specifications
          </h2>

          {/* Sub Tabs */}
          <div className="flex flex-wrap border-b border-slate-300 mb-6">
            {['Applications', 'Materials', 'Operating Conditions', 'Technical Specifications'].map((subTab) => (
              <button
                key={subTab}
                onClick={() => setSelectedSubTab(subTab)}
                className={`px-4 py-2 text-sm font-medium transition-colors 
                  ${
                    subTab === selectedSubTab
                      ? 'border-b-2 border-[#c31e5a] text-[#c31e5a]'
                      : 'text-slate-500 hover:text-[#c31e5a]'
                  }`}
              >
                {subTab}
              </button>
            ))}
          </div>

          {/* Inner Tab Content */}
          <div className="mt-6">
            {/* Applications - NO BORDER */}
            {selectedSubTab === 'Applications' && (
              <div>
                <h3 className="text-lg font-semibold text-[#c31e5a] mb-3">
                  APPLICATIONS
                </h3>
                <p>
                  <span className="font-semibold">Type:</span> Residential, Construction site
                </p>
              </div>
            )}

            {/* Materials */}
            {selectedSubTab === 'Materials' && (
              <div>
                <h3 className="text-lg font-semibold text-[#c31e5a] mb-3">
                  MATERIALS
                </h3>
                <table className="w-full border border-slate-200 text-sm md:text-base">
                  <tbody>
                    <tr className="border-b border-slate-200 bg-gray-50">
                      <td className="font-semibold p-3 w-1/3">Impeller</td>
                      <td className="p-3">Forged brass</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="font-semibold p-3">Pump casing & flanges</td>
                      <td className="p-3">Cast iron – IS 210 grade FG 200</td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-gray-50">
                      <td className="font-semibold p-3">Motor body</td>
                      <td className="p-3">Aluminium / Cast iron</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="font-semibold p-3">Shaft</td>
                      <td className="p-3">SS 410 / EN–8</td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-gray-50">
                      <td className="font-semibold p-3">Mechanical seal</td>
                      <td className="p-3">Carbon ceramic</td>
                    </tr>
                    <tr>
                      <td className="font-semibold p-3">Bearing</td>
                      <td className="p-3">Double shielded ball bearing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Operating Conditions */}
            {selectedSubTab === 'Operating Conditions' && (
              <div>
                <h3 className="text-lg font-semibold text-[#c31e5a] mb-3">
                  OPERATING CONDITIONS
                </h3>
                <table className="w-full border border-slate-200 text-sm md:text-base">
                  <tbody>
                    <tr className="border-b border-slate-200 bg-gray-50">
                      <td className="font-semibold p-3 w-1/3">Suction lift</td>
                      <td className="p-3">Up to 8 metres</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="font-semibold p-3">Max liquid temperature</td>
                      <td className="p-3">50°C</td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-gray-50">
                      <td className="font-semibold p-3">Max ambient temperature</td>
                      <td className="p-3">40°C</td>
                    </tr>
                    <tr>
                      <td className="font-semibold p-3">Max operating pressure</td>
                      <td className="p-3">8 bar</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Technical Specifications */}
            {selectedSubTab === 'Technical Specifications' && (
              <div>
                <h3 className="text-lg font-semibold text-[#c31e5a] mb-3">
                  TECHNICAL SPECIFICATIONS
                </h3>
                <table className="w-full border border-slate-200 text-sm md:text-base">
                  <tbody>
                    <tr className="border-b border-slate-200 bg-gray-50">
                      <td className="font-semibold p-3 w-1/3">Power Range</td>
                      <td className="p-3">0.75 kW – 1.5 kW (1HP–2HP)</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="font-semibold p-3">Version</td>
                      <td className="p-3">Single-phase, 220V, 50Hz, AC supply</td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-gray-50">
                      <td className="font-semibold p-3">Maximum Total Head</td>
                      <td className="p-3">214 Metre</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="font-semibold p-3">Maximum Flow Rate</td>
                      <td className="p-3">0.9 lps (3.4 m³/h)</td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-gray-50">
                      <td className="font-semibold p-3">Speed</td>
                      <td className="p-3">2900 RPM</td>
                    </tr>
                    <tr>
                      <td className="font-semibold p-3">Insulation</td>
                      <td className="p-3">Class B/F</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
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
