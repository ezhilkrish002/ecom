'use client';

import React, { useState, useEffect } from "react";
import { categories } from "@/assets/assets";
import { Filter, X, CheckSquare, Droplet, Gauge, Waves, Cpu, Package } from "lucide-react";

export default function ProductFilters({ products, onFilterChange }) {
  const [selectedPipeSizes, setSelectedPipeSizes] = useState([]);
  const [selectedSpeeds, setSelectedSpeeds] = useState([]);
  const [selectedHeadRanges, setSelectedHeadRanges] = useState([]);
  const [selectedFlowRanges, setSelectedFlowRanges] = useState([]);
  const [selectedHPs, setSelectedHPs] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
const [categoryOpen, setCategoryOpen] = useState(true);

  // Extract unique filter options from products
  const uniquePipeSizes = [...new Set(products.flatMap((product) => product.specs.find(spec => spec.label === "Pipe size")?.value || []))];
  const uniqueSpeeds = [...new Set(products.flatMap((product) => product.specs.find(spec => spec.label === "Speed")?.value || []))];
  const uniqueHeadRanges = [...new Set(products.flatMap((product) => product.specs.find(spec => spec.label === "Head range")?.value || []))];
  const uniqueFlowRanges = [...new Set(products.flatMap((product) => product.specs.find(spec => spec.label === "Flow range")?.value || []))];
  const uniqueHPs = [...new Set(products.flatMap((product) => product.options || []))];

  // Calculate active filter count for badge
  const activeFilterCount = [
    selectedCategories.length,
    selectedPipeSizes.length,
    selectedSpeeds.length,
    selectedHeadRanges.length,
    selectedFlowRanges.length,
    selectedHPs.length,
    inStockOnly ? 1 : 0,
    sortBy !== "default" ? 1 : 0,
  ].reduce((sum, count) => sum + count, 0);

  // Trigger onFilterChange whenever any filter state changes
  useEffect(() => {
    onFilterChange({
      selectedPipeSizes,
      selectedSpeeds,
      selectedHeadRanges,
      selectedFlowRanges,
      selectedHPs,
      selectedCategories,
      inStockOnly,
      sortBy,
    });
  }, [selectedPipeSizes, selectedSpeeds, selectedHeadRanges, selectedFlowRanges, selectedHPs, selectedCategories, inStockOnly, sortBy, onFilterChange]);

  const handleHPChange = (hp) => {
    setSelectedHPs((prev) =>
      prev.includes(hp) ? prev.filter((item) => item !== hp) : [...prev, hp]
    );
  };

  const handlePipeSizeChange = (size) => {
    setSelectedPipeSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  const handleSpeedChange = (speed) => {
    setSelectedSpeeds((prev) =>
      prev.includes(speed) ? prev.filter((item) => item !== speed) : [...prev, speed]
    );
  };

  const handleHeadRangeChange = (range) => {
    setSelectedHeadRanges((prev) =>
      prev.includes(range) ? prev.filter((item) => item !== range) : [...prev, range]
    );
  };

  const handleFlowRangeChange = (range) => {
    setSelectedFlowRanges((prev) =>
      prev.includes(range) ? prev.filter((item) => item !== range) : [...prev, range]
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
  };

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="p-2 bg-[#c31e5aff] text-white rounded-full hover:bg-blue-700 transition"
          aria-label="Open filters"
        >
          <Filter size={20} />
        </button>
      </div>

      {/* Filter Panel */}
      <div
        className={`${
          isFilterOpen ? "block" : "hidden"
        } md:block fixed md:static inset-y-0 left-0 md:inset-auto bg-white md:bg-gradient-to-b md:from-white md:to-gray-50 z-50 md:z-auto p-4 sm:p-6 max-h-screen md:max-h-[90vh] overflow-y-auto md:sticky md:top-4 w-4/5 md:w-[280px] shadow-2xl md:shadow-lg rounded-r-3xl md:rounded-2xl transition-transform duration-300 ease-in-out ${isFilterOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100`}
        role="dialog"
        aria-modal={isFilterOpen ? "true" : "false"}
        aria-label="Filter options"
      >
        {/* Filter Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-[#c31e5aff]" />
            <h2 className="text-xl font-bold text-[#c31e5aff]">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedPipeSizes([]);
                setSelectedSpeeds([]);
                setSelectedHeadRanges([]);
                setSelectedFlowRanges([]);
                setSelectedHPs([]);
                setSelectedCategories([]);
                setInStockOnly(false);
                setSortBy("default");
              }}
              className="font-semibold text-sm hover:underline"
              aria-label="Clear all filters"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition md:hidden"
              aria-label="Close filters"
            >
              <X size={20} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Category */}
       {/* Category */}
{categories.length > 0 && (
  <div className="mb-4 sm:mb-6 border-b border-gray-200 pb-2">
    <button
      onClick={() => setCategoryOpen((prev) => !prev)}
      className="flex justify-between items-center w-full font-semibold text-gray-800 text-sm sm:text-base mb-2 sm:mb-3"
    >
      <div className="flex items-center gap-2">
        <Package size={18} className="text-[#f48638]" />
        Category
      </div>
      <svg
        className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
          categoryOpen ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {categoryOpen && (
      <div className="space-y-2 text-sm sm:text-base pl-1">
        {categories.map((category) => {
          const count = products.filter(
            (product) => product.category === category
          ).length;

          return (
            <label
              key={category}
              className="flex items-center justify-between hover:bg-blue-50 p-2 rounded-lg transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 text-[#f48638] border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  aria-checked={selectedCategories.includes(category)}
                />
                <span className="text-gray-700">{category}</span>
              </div>
              <span className="text-gray-500 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                {count}
              </span>
            </label>
          );
        })}
      </div>
    )}
  </div>
)}


        {/* Pipe Size */}
        {uniquePipeSizes.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-sm sm:text-base mb-2 sm:mb-3">
              <Droplet size={18} className="text-[#f48638]" />
              Pipe Size
            </h3>
            <div className="space-y-2 text-sm sm:text-base">
              {uniquePipeSizes.map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-2 hover:bg-blue-50 p-2 rounded-lg transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedPipeSizes.includes(size)}
                    onChange={() => handlePipeSizeChange(size)}
                    className="h-4 w-4 text-[#f48638] border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    aria-checked={selectedPipeSizes.includes(size)}
                  />
                  <span className="text-gray-700">{size}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Speed */}
        {uniqueSpeeds.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-sm sm:text-base mb-2 sm:mb-3">
              <Gauge size={18} className="text-[#f48638]" />
              Speed
            </h3>
            <div className="space-y-2 text-sm sm:text-base">
              {uniqueSpeeds.map((speed) => (
                <label
                  key={speed}
                  className="flex items-center gap-2 hover:bg-blue-50 p-2 rounded-lg transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedSpeeds.includes(speed)}
                    onChange={() => handleSpeedChange(speed)}
                    className="h-4 w-4 text-[#f48638] border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    aria-checked={selectedSpeeds.includes(speed)}
                  />
                  <span className="text-gray-700">{speed}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Head Range */}
        {uniqueHeadRanges.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-sm sm:text-base mb-2 sm:mb-3">
              <Waves size={18} className="text-[#f48638]" />
              Head Range
            </h3>
            <div className="space-y-2 text-sm sm:text-base">
              {uniqueHeadRanges.map((range) => (
                <label
                  key={range}
                  className="flex items-center gap-2 hover:bg-blue-50 p-2 rounded-lg transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedHeadRanges.includes(range)}
                    onChange={() => handleHeadRangeChange(range)}
                    className="h-4 w-4 text-[#f48638] border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    aria-checked={selectedHeadRanges.includes(range)}
                  />
                  <span className="text-gray-700">{range}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Flow Range */}
        {uniqueFlowRanges.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-sm sm:text-base mb-2 sm:mb-3">
              <Waves size={18} className="text-[#f48638]" />
              Flow Range
            </h3>
            <div className="space-y-2 text-sm sm:text-base">
              {uniqueFlowRanges.map((range) => (
                <label
                  key={range}
                  className="flex items-center gap-2 hover:bg-blue-50 p-2 rounded-lg transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedFlowRanges.includes(range)}
                    onChange={() => handleFlowRangeChange(range)}
                    className="h-4 w-4 text-[#f48638] border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    aria-checked={selectedFlowRanges.includes(range)}
                  />
                  <span className="text-gray-700">{range}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* HP Options */}
        {uniqueHPs.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-sm sm:text-base mb-2 sm:mb-3">
              <Cpu size={18} className="text-[#f48638]" />
              HP Options
            </h3>
            <div className="space-y-2 text-sm sm:text-base">
              {uniqueHPs.map((hp) => (
                <label
                  key={hp}
                  className="flex items-center gap-2 hover:bg-blue-50 p-2 rounded-lg transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedHPs.includes(hp)}
                    onChange={() => handleHPChange(hp)}
                    className="h-4 w-4 text-[#f48638] border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    aria-checked={selectedHPs.includes(hp)}
                  />
                  <span className="text-gray-700">{hp}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* In Stock */}
        <div className="mb-4 sm:mb-6">
          <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-sm sm:text-base mb-2 sm:mb-3">
            <CheckSquare size={18} className="text-[#f48638]" />
            Availability
          </h3>
          <label className="flex items-center gap-2 hover:bg-blue-50 p-2 rounded-lg transition text-sm sm:text-base">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-4 w-4 text-[#f48638] border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              aria-checked={inStockOnly}
            />
            <span className="text-gray-700">In Stock Only</span>
          </label>
        </div>

        {/* Sort By */}
        <div className="mb-4 sm:mb-6">
          <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-sm sm:text-base mb-2 sm:mb-3">
            <Filter size={18} className="text-[#f48638]" />
            Sort By
          </h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base hover:border-blue-400 transition"
            aria-label="Sort options"
          >
            <option value="default">Default</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
    </>
  );
}