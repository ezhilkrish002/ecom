'use client'

import { Toaster } from 'react-hot-toast';
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {

    return (
        <>
        <Toaster position="top-center" reverseOrder={false} />
            <Banner />
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
