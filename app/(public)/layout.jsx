'use client'

import { Toaster } from 'react-hot-toast';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import {assets} from '@/assets/assets';
export default function PublicLayout({ children }) {

    return (
        <>
        <Toaster position="top-center" reverseOrder={false} />
            <Navbar />
            {children}
<div className="relative w-full max-w-7xl h-[230px] sm:h-[350px] md:h-[450px] lg:h-[550px] 
                mx-auto my-10 rounded-xl overflow-hidden">
  <div className="relative w-full h-full">
    <Image
      src={assets.banner1}
      alt="Wave"
      fill
      className="object-cover rounded-3xl"
      style={{ objectFit: 'cover' }}
    />
  </div>
</div>



            <Footer />
        </>
    );
}
