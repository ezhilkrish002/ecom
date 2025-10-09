'use client';

import { Search, ShoppingCart, Menu, X, UserCircle, Heart, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import WVlogo from "../assets/YUCHII LOGO.png";
import { categories } from "@/lib/data";

const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const cartCount = useSelector((state) => state.cart.total);
  const { total: wishlistCount } = useSelector((state) => state.wishlist);
  const { email } = useSelector((state) => state.auth);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
    setShowSearch(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (showSearch) setShowSearch(false);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (menuOpen) setMenuOpen(false);
  };

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handlers for hover with delay on hide
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // 200ms delay before hiding dropdown
  };

  return (
    <nav className="relative bg-white shadow-sm z-50">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-2.5">
          {/* Logo */}
          <Link href="/" className="relative text-4xl font-semibold text-slate-700">
            <Image src={WVlogo} alt="WV logo" className="w-20 h-10 sm:w-28 sm:h-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-6 text-slate-600 absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>

            {/* Categories Dropdown (Hover with delay) */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center gap-1 hover:text-slate-800"
                type="button"
              >
                Categories <ChevronDown size={16} />
              </button>

              {showDropdown && (
                <div
                  className="absolute bg-white shadow-lg rounded-lg top-full mt-2 left-0 w-40 py-2 border border-gray-100 z-50"
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/category/${cat}`}
                      className="block px-4 py-2 text-sm hover:bg-slate-100"
                      onClick={() => setShowDropdown(false)} // close when clicked
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* Desktop Icons */}
          <div className="hidden sm:flex items-center gap-5 text-slate-600">
            {/* Search Icon */}
            {/* Search Icon or Search Input inline */}
            {showSearch ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm w-40 focus:outline-blue-500"
                  autoFocus
                />
                <button type="submit" className="ml-2 text-blue-600 hover:text-blue-800">
                  <Search size={18} />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={toggleSearch}
                className="p-2 hover:bg-slate-200 rounded-full transition"
                aria-label="Open search"
              >
                <Search size={18} />
              </button>
            )}


            <Link href="/wishlist" className="relative flex items-center">
              <Heart size={18} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative flex items-center">
              <ShoppingCart size={18} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href={email ? "/signout" : "/login"}
              className="p-2 hover:bg-slate-200 rounded-full transition"
            >
              <UserCircle size={20} />
            </Link>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center gap-2 sm:hidden ml-auto">
            <button
              type="button"
              onClick={toggleSearch}
              className="p-2 hover:bg-slate-200 rounded-full transition"
            >
              <Search size={18} />
            </button>

            <Link href="/wishlist" className="relative flex items-center">
              <Heart size={20} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative flex items-center">
              <ShoppingCart size={20} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href={email ? "/signout" : "/login"}
              className="p-2 hover:bg-slate-200 rounded-full transition"
            >
              <UserCircle size={20} />
            </Link>

            <button
              className="p-2 rounded-md hover:bg-gray-100 transition"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          <div className="sm:hidden fixed top-0 right-0 h-full w-64 bg-white/95 z-50">
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                  <Image src={WVlogo} alt="WV logo" className="w-20 h-10" />
                </Link>
                <button onClick={toggleMenu}>
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col items-start gap-4 text-slate-600 text-lg px-6 py-6">
                <Link href="/" onClick={toggleMenu}>Home</Link>
                <Link href="/shop" onClick={toggleMenu}>Shop</Link>

                {/* Categories in Mobile */}
                <details className="w-full">
                  <summary className="cursor-pointer text-lg font-medium">Categories</summary>
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/category/${cat}`}
                        onClick={toggleMenu}
                        className="text-sm text-gray-700 hover:text-black"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </details>

                <Link href="/about" onClick={toggleMenu}>About</Link>
                <Link href="/contact" onClick={toggleMenu}>Contact</Link>
                <Link href={email ? "/signout" : "/login"} onClick={toggleMenu}>
                  {email ? "Sign Out" : "Sign In"}
                </Link>
              </div>
            </div>
          </div>

          <div
            className="sm:hidden fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
            onClick={toggleMenu}
          ></div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
