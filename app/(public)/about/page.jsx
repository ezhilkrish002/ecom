'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import WVlogo from "@/assets/YUCHII LOGO.png"
export default function About() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#3A3634]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <Image src={WVlogo} alt="Senba Pumps & Motors" width={300} height={200} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h1 className="text-4xl font-bold text-[#7C2A47] mb-4">
              About <span className="text-[#E6A02A]">Senba Pumps & Motors</span>
            </h1>
            <p className="text-lg leading-relaxed">
              At <strong>Senba Pumps & Motors</strong>, we are committed to delivering reliable
              and energy-efficient pumping solutions for all your industrial and domestic needs.
              With decades of experience and a focus on quality craftsmanship, our products stand
              for durability and trust.
            </p>

            <p className="mt-4 text-lg leading-relaxed">
              Our mission is to empower every customer with sustainable and innovative motor
              technologies that ensure long-term performance and efficiency.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="bg-[#7C2A47] text-[#F5F5F5] py-10 mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-2">Quality • Trust • Innovation</h2>
        <p>Driven by performance, powered by integrity.</p>
      </div>
    </div>
  );
}
