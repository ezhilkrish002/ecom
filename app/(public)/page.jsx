'use client'
import BestSelling from "@/components/BestSelling";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";
import Categories from "@/components/Categories";
import Testimonial from "@/components/Testimonial";
import About from "@/components/About";

export default function Home() {
    return (
        <div>
            <Hero />
            <Categories/>
            <LatestProducts />
            <BestSelling />
            <About />
            <OurSpecs />
            <Testimonial />
            {/* <Newsletter /> */}
        </div>
    );
}
