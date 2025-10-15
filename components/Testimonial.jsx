
'use client';
import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { dummyRatingsData } from "@/assets/assets";

const CARD_WIDTH = 320; // px (fixed width)
const CARD_HEIGHT = 340; // px (fixed height)

const Testimonial = () => {
  const [current, setCurrent] = useState(0);
  const visibleCards = 3;

  const maxStart = Math.max(0, dummyRatingsData.length - visibleCards);

  // Handle arrows
  const prev = () => setCurrent((v) => Math.max(0, v - 1));
  const next = () => setCurrent((v) => Math.min(maxStart, v + 1));

  // Calculate which cards to show
  const showing = dummyRatingsData.slice(current, current + visibleCards);

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-3">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">What Our Customers Say</h2>
        <p className="text-gray-600 mb-10 text-center">
          We value every piece of feedback — here’s what our happy customers have to say!
        </p>
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            className="-ml-4 z-10 absolute left-0 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition"
            onClick={prev}
            disabled={current === 0}
            aria-label="Previous"
            style={{ top: "44%", transform: "translateY(-50%)" }}
          >
            <ChevronLeft size={28} className={current === 0 ? "text-gray-300" : "text-gray-600"} />
          </button>

          <div
            className="flex gap-6 justify-center"
            style={{
              minWidth: `${CARD_WIDTH * visibleCards + 40}px`,
              maxWidth: "100%",
            }}
          >
            {showing.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition-all"
                style={{ width: CARD_WIDTH, height: CARD_HEIGHT, minWidth: CARD_WIDTH, minHeight: CARD_HEIGHT, maxWidth: CARD_WIDTH, maxHeight: CARD_HEIGHT }}
              >
                <Image
                  src={item.user.image}
                  alt={item.user.name}
                  className="rounded-full object-cover mt-6"
                  width={80}
                  height={80}
                />
                <h3 className="mt-4 font-semibold text-lg text-gray-800">{item.user.name}</h3>
                {/* ⭐ Rating */}
                <div className="flex items-center justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(item.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({item.rating})</span>
                </div>
                {/* 💬 Review */}
                <p className="mt-4 text-gray-600 text-sm leading-relaxed px-4 line-clamp-4">
                  “{item.review}”
                </p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            className="-mr-4 z-10 absolute right-0 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition"
            onClick={next}
            disabled={current === maxStart}
            aria-label="Next"
            style={{ top: "44%", transform: "translateY(-50%)" }}
          >
            <ChevronRight size={28} className={current === maxStart ? "text-gray-300" : "text-gray-600"} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
