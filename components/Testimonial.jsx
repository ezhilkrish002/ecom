
'use client';
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { dummyRatingsData } from "@/assets/assets";

const Testimonial = () => {
  // Duplicate data for smooth continuous marquee
  const testimonials = [...dummyRatingsData, ...dummyRatingsData];

  return (
    <section className="w-full py-16 bg-gray-50 overflow-x-hidden overflow-y-visible">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 mb-12">
          We value every piece of feedback — here’s what our happy customers have to say!
        </p>
      </div>

      {/* ✅ Marquee Wrapper */}
      <div className="relative w-full overflow-x-hidden overflow-y-visible pb-8">
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl 
              transition-all duration-300 mx-3 sm:mx-4 flex flex-col items-center text-center 
              p-5 sm:p-6 min-w-[240px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[340px]"
            >
              {/* 👤 User Image */}
              <Image
                src={item.user.image}
                alt={item.user.name}
                className="rounded-full object-cover"
                width={80}
                height={80}
              />

              {/* 👤 Name */}
              <h3 className="mt-4 font-semibold text-base sm:text-lg text-gray-800">
                {item.user.name}
              </h3>

              {/* ⭐ Rating */}
              <div className="flex items-center justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < Math.round(item.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs sm:text-sm text-gray-600">
                  ({item.rating})
                </span>
              </div>

              {/* 💬 Review */}
              <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-4">
                “{item.review}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
