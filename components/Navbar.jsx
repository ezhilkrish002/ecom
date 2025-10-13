'use client';

import {
  ShoppingCart,
  Menu,
  X,
  UserCircle,
  ChevronDown,
  Home,
  LogIn,
  UserPlus,
  Search,
  ShoppingBag,
  Info, 
  Phone,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import WVlogo from "../assets/YUCHII LOGO.png";
import { categories } from "@/lib/data";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // for active route
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const cartCount = useSelector((state) => state.cart.total);
  const { email } = useSelector((state) => state.auth);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setShowDropdown(false), 200);
  };

  const isActive = (path) => pathname === path;

  return (
    <nav className="relative bg-white shadow-sm z-50 ">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-2.5">
          {/* Hamburger + Logo (Mobile) */}
          <div className="flex items-center gap-2 sm:gap-0">
            <div className="flex items-center sm:hidden">
              <button
                className="p-2 rounded-md hover:bg-[#7C2A47]/10 transition"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link href="/" className="relative text-4xl font-semibold text-[#7C2A47]">
                <Image src={WVlogo} alt="WV logo" className="w-16 h-10" />
              </Link>
            </div>

            {/* Desktop Logo */}
            <div className="hidden sm:flex">
              <Link href="/" className="relative text-4xl font-semibold text-[#7C2A47]">
                <Image src={WVlogo} alt="WV logo" className="w-28 h-auto" />
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-6 text-slate-600 absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="hover:text-[#7C2A47]">Home</Link>
            <Link href="/category/products" className="hover:text-[#7C2A47]">Products</Link>

            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1 hover:text-[#7C2A47]" type="button">
                Categories <ChevronDown size={16} />
              </button>
              {showDropdown && (
                <div className="absolute bg-white shadow-lg rounded-lg top-full mt-2 left-0 w-40 py-2 z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/category/${cat}`}
                      className="block px-4 py-2 text-sm text-[#4A4644] hover:bg-[#E6A02A]/10 hover:text-[#7C2A47]"
                      onClick={() => setShowDropdown(false)}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" className="hover:text-[#7C2A47]">About</Link>
            <Link href="/contact" className="hover:text-[#7C2A47]">Contact</Link>
          </div>

          {/* Desktop Icons */}
          <div className="hidden sm:flex items-center gap-4 text-[#4A4644]">
            <Link href="/cart" className="relative flex items-center">
              <ShoppingCart size={18} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 left-3 text-[8px] text-white bg-[#7C2A47] size-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              href={email ? "/signout" : "/login"}
              className="p-2 hover:bg-[#E6A02A]/20 rounded-full transition"
            >
              <UserCircle size={20} />
            </Link>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center gap-4 sm:hidden">
            <Link href="/cart" className="relative flex items-center">
              <ShoppingCart size={25} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[8px] text-white bg-[#7C2A47] size-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              href={email ? "/signout" : "/login"}
              className="p-2 hover:bg-[#E6A02A]/20 rounded-full transition"
            >
              <UserCircle size={27} />
            </Link>
          </div>
        </div>
      </div>


      {/* Mobile Menu */}
    {menuOpen && (
  <>
    <div className="sm:hidden fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-center px-6 py-4 border-b border-[#E6A02A]/40">
           <Link href="/" className="relative text-4xl font-semibold text-[#7C2A47]">
                <Image src={WVlogo} alt="WV logo" className="w-20 h-auto" />
              </Link>
          {/* <button onClick={toggleMenu}>
            <X size={24} className="text-[#7C2A47]" />
          </button> */}
        </div>

        {/* Search Bar */}
        {/* <div className="px-6 py-4">
          <div className="flex items-center bg-gray-200 rounded-full px-3 py-2">
            <Search size={18} className="text-[#7C2A47]" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-full pl-2 text-[#4A4644]"
            />
          </div>
        </div> */}

        {/* Menu Items */}
       <div className="flex flex-col gap-2 px-6 text-[#4A4644] flex-grow overflow-y-auto mt-2">

  {[ // Menu items excluding categories here
    { label: "Home", href: "/", icon: <Home size={18} /> },
    { label: "Shop", href: "/category/products", icon: <ShoppingBag size={18} /> },
  ].map((item) => (
    <Link
      key={item.href}
      href={item.href}
      onClick={toggleMenu}
      className={`flex items-center gap-3 p-2 rounded-lg transition border-l-4 ${
        isActive(item.href)
          ? "bg-[#fef4ea] text-[#7C2A47] border-[#7C2A47]"
          : " text-[#4A4644] border-transparent hover:bg-[#E6A02A]/10 hover:text-[#7C2A47]"
      }`}
    >
      {item.icon} {item.label}
    </Link>
  ))}

  {/* Move Categories dropdown here */}
  <details className="group">
    <summary
      className="flex items-center justify-between cursor-pointer p-2 
                 text-[#4A4644]
                 border-l-4 border-transparent 
                 hover:bg-[#E6A02A]/10 hover:text-[#7C2A47] hover:border-[#7C2A47]
                 group-open:bg-[#fef4ea] group-open:text-[#7C2A47] 
                 group-open:border-l-4 group-open:border-[#7C2A47]
                 group-open:rounded-lg
                 transition-all duration-200"
    >
      <span className="flex items-center gap-3">
        <LayoutGrid size={18} /> Categories
      </span>
      <ChevronDown size={18} className="transition-transform group-open:rotate-180" />
    </summary>

    <div className="ml-8 mt-2 flex flex-col gap-2">
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/category/${cat}`}
          onClick={toggleMenu}
          className="text-sm text-gray-600 hover:text-[#7C2A47]"
        >
          {cat}
        </Link>
      ))}
    </div>
  </details>

  {/* Now About and Contact below categories */}
  {[ // About and Contact only
    { label: "About", href: "/about", icon: <Info size={18} /> },
    { label: "Contact", href: "/contact", icon: <Phone size={18} /> },          
  ].map((item) => (
    <Link
      key={item.href}
      href={item.href}
      onClick={toggleMenu}
      className={`flex items-center gap-3 p-2 rounded-lg transition border-l-4 ${
        isActive(item.href)
          ? "bg-[#fef4ea] text-[#7C2A47] border-[#7C2A47]"
          : " text-[#4A4644] border-transparent hover:bg-[#E6A02A]/10 hover:text-[#7C2A47]"
      }`}
    >
      {item.icon} {item.label}
    </Link>
  ))}

</div>


        {/* Footer Buttons */}
        {/* <div className="px-6 py-6 border-t border-[#E6A02A]/40">
          <button
            onClick={() => {
              toggleMenu();
              router.push("/login");
            }}
            className="w-full mb-3 flex items-center justify-center gap-2 border border-[#7C2A47] text-[#7C2A47] rounded-full py-2 font-medium hover:bg-[#7C2A47]/10 transition"
          >
            <LogIn size={18} /> Login
          </button>
          <button
            onClick={() => {
              toggleMenu();
              router.push("/signup");
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#7C2A47] text-white rounded-full py-2 font-medium hover:bg-[#E6A02A] transition"
          >
            <UserPlus size={18} /> Register
          </button>
        </div> */}
      </div>
    </div>

    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
      onClick={toggleMenu}
    ></div>
  </>
)}

    </nav>
  );
};

export default Navbar;