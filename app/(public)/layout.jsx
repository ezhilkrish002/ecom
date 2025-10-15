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
            <div className=" relative w-[700px] h-[230px] sm:h-[350px] md:h-[450px] lg:h-[550px] w-full max-w-[100%] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1200px] mx-auto px-4 rounded-xl px-5 sm:px-10 max-w-7xl mx-auto my-10">
                <Image
                    src={assets.banner1}
                    alt="Wave"
                    fill
                    className="object-cover h-full rounded-3xl"
                />
            </div>
            <Footer />
        </>
    );
}
