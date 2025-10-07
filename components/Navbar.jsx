// 'use client'

// import { Search, ShoppingCart, Menu, LogIn, UserCircle,Heart} from "lucide-react";
// import WVlogo from "../assets/WV-logo.png";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//     const router = useRouter();
//     const [search, setSearch] = useState("");
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [showSearch, setShowSearch] = useState(false);
//     const cartCount = useSelector((state) => state.cart.total);
//     const {total:wishlistCount} = useSelector((state) => state.wishlist);
//     const handleSearch = (e) => {
//         e.preventDefault();
//         router.push(`/shop?search=${search}`);
//     };

//     return (
//         <nav className="relative bg-white shadow-sm">
//             <div className="mx-6">
//                 <div className="flex items-center justify-between max-w-7xl mx-auto py-2.5 transition-all">

//                     {/* 🟩 Logo */}
//                     <Link href="/" className="relative text-4xl font-semibold text-slate-700">
//                         <Image src={WVlogo} alt="WV logo" className="w-28 h-auto" />
//                     </Link>

//                     {/* 🟦 Desktop Menu */}
//                     <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600 ml-25">
//                         <Link href="/">Home</Link>
//                         <Link href="/shop">Shop</Link>
//                         <Link href="/">About</Link>
//                         <Link href="/">Contact</Link>

//                         {/* Search Bar (Desktop Only) */}
//                         <div className="relative hidden xl:flex items-center text-sm text-slate-600">
//                             <button
//                                 type="button"
//                                 onClick={() => setShowSearch(!showSearch)}
//                                 className="p-2 hover:bg-slate-200 rounded-full transition"
//                             >
//                                 <Search size={18} />
//                             </button>

//                             {showSearch && (
//                                 <form
//                                     onSubmit={handleSearch}
//                                     className="flex items-center w-64 gap-2 bg-slate-100 px-4 py-2 ml-2 rounded-full transition-all duration-500 ease-in-out"
//                                 >
//                                     <input
//                                         className="w-full bg-transparent outline-none placeholder-slate-600"
//                                         type="text"
//                                         placeholder="Search products"
//                                         value={search}
//                                         onChange={(e) => setSearch(e.target.value)}
//                                         autoFocus
//                                         required
//                                     />
//                                 </form>
//                             )}
//                         </div>

//                          {/* WishList */}
//                         <Link href="/wishlist" className="relative flex items-center gap-2 text-slate-600">
//                             <Heart size={18} />
//                             Wishlist
//                             <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
//                                 {wishlistCount}
//                             </span>
//                         </Link>    

//                         {/* Cart */}
//                         <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
//                             <ShoppingCart size={18} />
//                             Cart
//                             <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
//                                 {cartCount}
//                             </span>
//                         </Link>

//                         {/* Login */}
//                         <button className="flex items-center gap-2 px-5 py-1.5 text-sm transition bg-blue-600 text-white rounded-full hover:bg-blue-700">
//                             <LogIn size={16} />
//                             Login
//                         </button>
//                     </div>

//                     {/* 🟨 Mobile Icons Row */}
//                     <div className="flex items-center gap-2 sm:hidden ml-auto">

//                         {/* Search icon (mobile) */}
//                         <button
//                             type="button"
//                             onClick={() => setShowSearch(!showSearch)}
//                             className="p-2 hover:bg-slate-200 rounded-full transition"
//                         >
//                             <Search size={18} />
//                         </button>
//                             <Link
//                             href="/wishlist"
//                             className="relative flex items-center"
//                             onClick={() => setMenuOpen(false)}
//                         >
//                             <Heart size={20} />
//                             {cartCount > 0 && (
//                                 <span className="absolute -top-1 -right-1 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
//                                     {cartCount}
//                                 </span>
//                             )}
//                         </Link>
//                         {/* Cart icon (mobile) */}
//                         <Link
//                             href="/cart"
//                             className="relative flex items-center"
//                             onClick={() => setMenuOpen(false)}
//                         >
//                             <ShoppingCart size={20} />
//                             {cartCount > 0 && (
//                                 <span className="absolute -top-1 -right-1 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
//                                     {cartCount}
//                                 </span>
//                             )}
//                         </Link>

//                         {/* User / Contact icon */}
//                         <button className="p-2 hover:bg-slate-200 rounded-full transition">
//                             <UserCircle size={20} />
//                         </button>

//                         {/* Mobile Menu */}
//                         <button
//                             className="p-2 rounded-md hover:bg-gray-100 transition"
//                             onClick={() => setMenuOpen(!menuOpen)}
//                             aria-label="Toggle menu"
//                         >
//                             <Menu size={24} className="text-slate-700" />
//                         </button>
//                     </div>

//                 </div>
//             </div>

//             <hr className="border-gray-300" />

//             {/* 🟧 Mobile Search Input */}
//             {showSearch && (
//                 <div className="sm:hidden flex justify-center py-3 bg-slate-50 border-t border-gray-200">
//                     <form
//                         onSubmit={handleSearch}
//                         className="flex items-center w-10/12 gap-2 bg-white px-4 py-2 rounded-full shadow-sm"
//                     >
//                         <Search size={18} className="text-slate-500" />
//                         <input
//                             className="w-full bg-transparent outline-none text-sm placeholder-slate-500"
//                             type="text"
//                             placeholder="Search products..."
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             autoFocus
//                             required
//                         />
//                     </form>
//                 </div>
//             )}

//             {/* 🟥 Mobile Dropdown Menu */}
//             {/* Mobile Dropdown Menu */}
//             {menuOpen && (
//                 <div className="fixed top-[80px] right-0 h-full w-1/2 bg-white shadow-lg z-50 rounded-b-2xl 
//                   flex flex-col gap-3 text-slate-700 px-6 py-4 
//                   transition-all duration-300 ease-in-out animate-slideDown">

//                     <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
//                     <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
//                     <Link href="/" onClick={() => setMenuOpen(false)}>About</Link>
//                     <Link href="/" onClick={() => setMenuOpen(false)}>Contact</Link>

//                     {/* <Link
//                         href="/cart"
//                         className="flex items-center gap-2"
//                         onClick={() => setMenuOpen(false)}
//                     >
//                         <ShoppingCart size={18} /> Cart ({cartCount})
//                     </Link>

//                     {/* --- Login Button --- */}
//                     {/* <button className="flex items-center gap-2 px-5 py-1.5 text-sm transition bg-blue-600 text-white rounded-full hover:bg-blue-700">
//                         <LogIn size={16} /> Login
//                     </button> */}

//                     {/* --- Enquiry Button --- */}
//                     {/* <button
//                         onClick={() => {
//                             const phoneNumber = "917094371450";
//                             const message = encodeURIComponent("Hii VANDHU 👋");
//                             const url = `https://wa.me/${phoneNumber}?text=${message}`;
//                             window.open(url, "_blank");
//                         }}
//                         className="px-5 py-1.5 bg-green-500 hover:bg-green-600 text-sm transition text-white rounded-full"
//                     >
//                         Enquiry
//                     </button>  */}

//                 </div>
//             )}

//         </nav>
//     );
// };

// export default Navbar;

'use client'

import { Search, ShoppingCart, Menu, LogIn, UserCircle, Heart } from "lucide-react";
import WVlogo from "../assets/WV-logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mounted, setMounted] = useState(false); // 👈 key fix for hydration

  const cartCount = useSelector((state) => state.cart.total);
  const { total: wishlistCount } = useSelector((state) => state.wishlist);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
  };

  useEffect(() => {
    // Prevent hydration mismatch by rendering counts only after mount
    setMounted(true);
  }, []);

  return (
    <nav className="relative bg-white shadow-sm">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-2.5 transition-all">
          
          {/* 🟩 Logo */}
          <Link href="/" className="relative text-4xl font-semibold text-slate-700">
            <Image src={WVlogo} alt="WV logo" className="w-28 h-auto" />
          </Link>

          {/* 🟦 Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600 ml-25">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>

            {/* Search Bar (Desktop Only) */}
            <div className="relative hidden xl:flex items-center text-sm text-slate-600">
              <button
                type="button"
                onClick={() => setShowSearch(!showSearch)}
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

            {/* ❤️ Wishlist */}
            <Link href="/wishlist" className="relative flex items-center gap-2 text-slate-600">
              <Heart size={18} />
              Wishlist
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* 🛒 Cart */}
            <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
              <ShoppingCart size={18} />
              Cart
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* 🔐 Login */}
            <button className="flex items-center gap-2 px-5 py-1.5 text-sm transition bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <LogIn size={16} />
              Login
            </button>
          </div>

          {/* 🟨 Mobile Icons Row */}
          <div className="flex items-center gap-2 sm:hidden ml-auto">

            {/* Search icon (mobile) */}
            <button
              type="button"
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-slate-200 rounded-full transition"
            >
              <Search size={18} />
            </button>

            {/* Wishlist icon (mobile) */}
            <Link href="/wishlist" className="relative flex items-center" onClick={() => setMenuOpen(false)}>
              <Heart size={20} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart icon (mobile) */}
            <Link href="/cart" className="relative flex items-center" onClick={() => setMenuOpen(false)}>
              <ShoppingCart size={20} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User / Contact icon */}
            <button className="p-2 hover:bg-slate-200 rounded-full transition">
              <UserCircle size={20} />
            </button>

            {/* Mobile Menu */}
            <button
              className="p-2 rounded-md hover:bg-gray-100 transition"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <Menu size={24} className="text-slate-700" />
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* 🟧 Mobile Search Input */}
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

      {/* 🟥 Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="fixed top-[80px] right-0 h-full w-1/2 bg-white shadow-lg z-50 rounded-b-2xl 
          flex flex-col gap-3 text-slate-700 px-6 py-4 
          transition-all duration-300 ease-in-out animate-slideDown">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link href="/" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
