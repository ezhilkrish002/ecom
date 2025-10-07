
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import Link from 'next/link';
import WVlogo from '../assets/WV-logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Login from './Login';
import SignUp from './Signup';
import SignOut from './Signout';

const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const cartCount = useSelector((state) => state.cart.total);
  const { email } = useSelector((state) => state.auth);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
    setIsSearchOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
    if (isLoginOpen) setIsLoginOpen(false);
    if (isSignUpOpen) setIsSignUpOpen(false);
    if (isSignOutOpen) setIsSignOutOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isLoginOpen) setIsLoginOpen(false);
    if (isSignUpOpen) setIsSignUpOpen(false);
    if (isSignOutOpen) setIsSignOutOpen(false);
  };

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
    if (isSignUpOpen) setIsSignUpOpen(false);
    if (isSignOutOpen) setIsSignOutOpen(false);
  };

  const toggleSignUp = () => {
    setIsSignUpOpen(!isSignUpOpen);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
    if (isLoginOpen) setIsLoginOpen(false);
    if (isSignOutOpen) setIsSignOutOpen(false);
  };

  const toggleSignOut = () => {
    setIsSignOutOpen(!isSignOutOpen);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
    if (isLoginOpen) setIsLoginOpen(false);
    if (isSignUpOpen) setIsSignUpOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen || isLoginOpen || isSignUpOpen || isSignOutOpen) {

'use client'

import { Search, ShoppingCart, Menu, X, UserCircle, LogIn, Heart } from "lucide-react";
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
  const [mounted, setMounted] = useState(false); // Hydration fix

  const cartCount = useSelector(state => state.cart.total);
  const { total: wishlistCount } = useSelector(state => state.wishlist);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
    setShowSearch(false); // close search after submit
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

  // Hydration fix + scroll lock for mobile menu
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
  }, [isMenuOpen, isLoginOpen, isSignUpOpen, isSignOutOpen]);

  return (
    <nav className="relative bg-white">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">
  }, [menuOpen]);

  return (
    <nav className="relative bg-white shadow-sm">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-2.5 transition-all">

          {/* Logo */}
          <Link href="/" className="relative text-4xl font-semibold text-slate-700">
            <Image src={WVlogo} alt="WV logo" className="w-28 h-auto" />
          </Link>


          {/* Desktop Menu */}

          <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>


            <form
              onSubmit={handleSearch}
              className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-md"
            >
              <Search size={18} className="text-slate-600" />
              <input
                className="w-full bg-transparent outline-none placeholder-slate-600"
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </form>

            <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
              <ShoppingCart size={18} />
              Cart
              <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">
                {cartCount}
              </button>
            </Link>

            {email ? (
              <button
                onClick={toggleSignOut}
                className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
              >
                Profile
              </button>
            ) : (
              <button
                onClick={toggleLogin}
                className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
              >
                Login
              </button>
            )}
          </div>

          <div className="sm:hidden flex items-center gap-4">
            <button onClick={toggleSearch} className="text-slate-600">
              <Search size={24} />
            </button>
            <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
              <ShoppingCart size={18} />
              <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">
                {cartCount}
              </span>
            </Link>
            <button onClick={email ? toggleSignOut : toggleLogin} className="text-slate-600">
              <User size={24} />
            </button>
            <button onClick={toggleMenu} className="text-slate-600">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`sm:hidden bg-white w-full flex justify-center transition-all duration-300 ease-in-out ${
          isSearchOpen ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full max-w-md text-sm gap-2 bg-slate-100 px-4 py-3 rounded-lg"
        >
          <Search size={18} className="text-slate-600" />
          <input
            className="w-full bg-transparent outline-none placeholder-slate-600"
            type="text"
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
        </form>
      </div>

      <div
        className={`sm:hidden fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-sm z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
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
            <Link href="/" onClick={toggleMenu} className="text-left">
              Home
            </Link>
            <Link href="/shop" onClick={toggleMenu} className="text-left">
              Shop
            </Link>
            <Link href="/" onClick={toggleMenu} className="text-left">
              About
            </Link>
            <Link href="/" onClick={toggleMenu} className="text-left">
              Contact
            </Link>

            {/* Search Bar (Desktop Only) */}
            <div className="relative hidden xl:flex items-center text-sm text-slate-600">
              <button
                type="button"
                onClick={toggleSearch}
                className="p-2 hover:bg-slate-200 rounded-full transition"
              >
                <Search size={18} />
              </button>

              {showSearch && (
                <form
                  onSubmit={handleSearch}
                  className="flex items-center w-64 gap-2 bg-slate-100 px-4 py-2 ml-2 rounded-full transition-all duration-500 ease-in-out"
                >
                  <input
                    className="w-full bg-transparent outline-none placeholder-slate-600"
                    type="text"
                    placeholder="Search products"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                    required
                  />
                </form>
              )}
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative flex items-center gap-2 text-slate-600">
              <Heart size={18} />
              Wishlist
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
              <ShoppingCart size={18} />
              Cart
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login */}
            <button className="flex items-center gap-2 px-5 py-1.5 text-sm transition bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <LogIn size={16} />
              Login
            </button>
          </div>

          {/* Mobile Icons Row */}
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

            <button className="p-2 hover:bg-slate-200 rounded-full transition">
              <UserCircle size={20} />
            </button>

            <button
              className="p-2 rounded-md hover:bg-gray-100 transition"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <Menu size={24} className="text-slate-700" />
            </button>

          </div>
        </div>
      </div>


      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-2xl p-6 max-w-xs w-full mx-4 sm:max-w-md sm:p-8">
            <Login onClose={toggleLogin} onOpenSignUp={toggleSignUp} />
          </div>
        </div>
      )}

      {isSignUpOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-2xl p-6 max-w-xs w-full mx-4 sm:max-w-md sm:p-8">
            <SignUp onClose={toggleSignUp} onOpenLogin={toggleLogin} />
          </div>
        </div>
      )}

      {isSignOutOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-2xl p-6 max-w-xs w-full mx-4 sm:max-w-md sm:p-8">
            <SignOut onClose={toggleSignOut} />
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
          onClick={toggleMenu}
        ></div>
      )}

      <hr className="border-gray-300" />

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

      {/* Mobile Dropdown Menu */}
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

          {/* Overlay */}
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

export default Navbar;

