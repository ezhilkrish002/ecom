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
        
            <Footer />
        </>
    );
}
