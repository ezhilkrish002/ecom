'use client';

import { Search, ShoppingCart, Menu, X, UserCircle, Heart } from "lucide-react";
import Link from "next/link";
import WVlogo from "../assets/YUCHII LOGO.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mounted, setMounted] = useState(false); // Prevent hydration mismatch

  const cartCount = useSelector(state => state.cart.total);
  const { total: wishlistCount } = useSelector(state => state.wishlist);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
    setShowSearch(false); // Close search after submit
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (showSearch) setShowSearch(false);
  };

  // Toggle search bar
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (menuOpen) setMenuOpen(false);
  };

  // Mount check and scroll lock for menu
  useEffect(() => {
    setMounted(true);
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  return (
    <nav className="relative bg-white shadow-sm">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-2.5 transition-all">

          {/* Logo */}
          <Link href="/" className="relative text-4xl font-semibold text-slate-700">
            <Image src={WVlogo} alt="WV logo" className="w-28 h-auto" />
          </Link>

          {/* Center Menu (Desktop) */}
          <div className="hidden sm:flex items-center gap-6 text-slate-600 absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>

          {/* Right Icons (Desktop) */}
          <div className="hidden sm:flex items-center gap-5 text-slate-600">
            {/* Search Icon */}
            <button
              type="button"
              onClick={toggleSearch}
              className="p-2 hover:bg-slate-200 rounded-full transition"
            >
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative flex items-center">
              <Heart size={18} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative flex items-center">
              <ShoppingCart size={18} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Icon */}
            <Link href="/profile" className="p-2 hover:bg-slate-200 rounded-full transition">
              <UserCircle size={20} />
            </Link>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center gap-2 sm:hidden ml-auto">
            {/* Search */}
            <button
              type="button"
              onClick={toggleSearch}
              className="p-2 hover:bg-slate-200 rounded-full transition"
            >
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative flex items-center">
              <Heart size={20} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative flex items-center">
              <ShoppingCart size={20} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Icon */}
            <Link href="/profile" className="p-2 hover:bg-slate-200 rounded-full transition">
              <UserCircle size={20} />
            </Link>

            {/* Menu Button */}
            <button
              className="p-2 rounded-md hover:bg-gray-100 transition"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} className="text-slate-700" /> : <Menu size={24} className="text-slate-700" />}
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Mobile Search Input */}
      {showSearch && (
        <div className="sm:hidden flex justify-center py-3 bg-slate-50 border-t border-gray-200">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-10/12 gap-2 bg-white px-4 py-2 rounded-full shadow-sm"
          >
            <Search size={18} className="text-slate-500" />
            <input
              className="w-full bg-transparent outline-none text-sm placeholder-slate-500"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              required
            />
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          <div className="sm:hidden fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-sm z-50 transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                  <Image src={WVlogo} alt="WV logo" className="w-28 h-auto" />
                </Link>
                <button onClick={toggleMenu} className="text-slate-600">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col items-start gap-8 text-slate-600 text-lg px-6 py-6">
                <Link href="/" onClick={toggleMenu}>Home</Link>
                <Link href="/shop" onClick={toggleMenu}>Shop</Link>
                <Link href="/" onClick={toggleMenu}>About</Link>
                <Link href="/" onClick={toggleMenu}>Contact</Link>
              </div>
            </div>
          </div>

          {/* Background Overlay */}
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
