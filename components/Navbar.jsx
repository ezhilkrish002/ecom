// 'use client'

// import { Search, ShoppingCart, Menu, X, UserCircle, LogIn, Heart } from "lucide-react";
// import Link from "next/link";
// import WVlogo from "../assets/YUCHII LOGO.png";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const router = useRouter();

//   const [search, setSearch] = useState('');
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [mounted, setMounted] = useState(false); // Hydration fix

//   const cartCount = useSelector(state => state.cart.total);
//   const { total: wishlistCount } = useSelector(state => state.wishlist);

//   // Handle search submit
//   const handleSearch = (e) => {
//     e.preventDefault();
//     router.push(`/shop?search=${search}`);
//     setShowSearch(false); // close search after submit
//   };

//   // Toggle mobile menu
//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//     if (showSearch) setShowSearch(false);
//   };

//   // Toggle search bar
//   const toggleSearch = () => {
//     setShowSearch(!showSearch);
//     if (menuOpen) setMenuOpen(false);
//   };

//   // Hydration fix + scroll lock for mobile menu
//   useEffect(() => {
//     setMounted(true);
//     if (menuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [menuOpen]);

//   return (
//     <nav className="relative bg-white shadow-sm">
//       <div className="mx-6">
//         <div className="flex items-center justify-between max-w-7xl mx-auto py-2.5 transition-all">

//           {/* Logo */}
//           <Link href="/" className="relative text-4xl font-semibold text-slate-700">
//             <Image src={WVlogo} alt="WV logo" className="w-28 h-auto" />
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
//             <Link href="/">Home</Link>
//             <Link href="/shop">Shop</Link>
//             <Link href="/">About</Link>
//             <Link href="/">Contact</Link>

//             {/* Search Bar (Desktop Only) */}
//             <div className="relative hidden xl:flex items-center text-sm text-slate-600">
//               <button
//                 type="button"
//                 onClick={toggleSearch}
//                 className="p-2 hover:bg-slate-200 rounded-full transition"
//               >
//                 <Search size={18} />
//               </button>

//               {showSearch && (
//                 <form
//                   onSubmit={handleSearch}
//                   className="flex items-center w-64 gap-2 bg-slate-100 px-4 py-2 ml-2 rounded-full transition-all duration-500 ease-in-out"
//                 >
//                   <input
//                     className="w-full bg-transparent outline-none placeholder-slate-600"
//                     type="text"
//                     placeholder="Search products"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     autoFocus
//                     required
//                   />
//                 </form>
//               )}
//             </div>

//             {/* Wishlist */}
//             <Link href="/wishlist" className="relative flex items-center gap-2 text-slate-600">
//               <Heart size={18} />
//               Wishlist
//               {mounted && wishlistCount > 0 && (
//                 <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
//                   {wishlistCount}
//                 </span>
//               )}
//             </Link>

//             {/* Cart */}
//             <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
//               <ShoppingCart size={18} />
//               Cart
//               {mounted && cartCount > 0 && (
//                 <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* Login */}
//             <button className="flex items-center gap-2 px-5 py-1.5 text-sm transition bg-blue-600 text-white rounded-full hover:bg-blue-700">
//               <LogIn size={16} />
//               Login
//             </button>
//           </div>

//           {/* Mobile Icons Row */}
//           <div className="flex items-center gap-2 sm:hidden ml-auto">
//             <button
//               type="button"
//               onClick={toggleSearch}
//               className="p-2 hover:bg-slate-200 rounded-full transition"
//             >
//               <Search size={18} />
//             </button>

//             <Link href="/wishlist" className="relative flex items-center">
//               <Heart size={20} />
//               {mounted && wishlistCount > 0 && (
//                 <span className="absolute -top-1 -right-1 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
//                   {wishlistCount}
//                 </span>
//               )}
//             </Link>

//             <Link href="/cart" className="relative flex items-center">
//               <ShoppingCart size={20} />
//               {mounted && cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             <button className="p-2 hover:bg-slate-200 rounded-full transition">
//               <UserCircle size={20} />
//             </button>

//             <button
//               className="p-2 rounded-md hover:bg-gray-100 transition"
//               onClick={toggleMenu}
//               aria-label="Toggle menu"
//             >
//               <Menu size={24} className="text-slate-700" />
//             </button>
//           </div>
//         </div>
//       </div>

//       <hr className="border-gray-300" />

//       {/* Mobile Search Input */}
//       {showSearch && (
//         <div className="sm:hidden flex justify-center py-3 bg-slate-50 border-t border-gray-200">
//           <form
//             onSubmit={handleSearch}
//             className="flex items-center w-10/12 gap-2 bg-white px-4 py-2 rounded-full shadow-sm"
//           >
//             <Search size={18} className="text-slate-500" />
//             <input
//               className="w-full bg-transparent outline-none text-sm placeholder-slate-500"
//               type="text"
//               placeholder="Search products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               autoFocus
//               required
//             />
//           </form>
//         </div>
//       )}

//       {/* Mobile Dropdown Menu */}
//       {menuOpen && (
//         <>
//           <div className="sm:hidden fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-sm z-50 transform transition-transform duration-300 ease-in-out">
//             <div className="flex flex-col">
//               <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
//                 <Link href="/" className="relative text-4xl font-semibold text-slate-700">
//                   <Image src={WVlogo} alt="WV logo" className="w-28 h-auto" />
//                 </Link>
//                 <button onClick={toggleMenu} className="text-slate-600">
//                   <X size={24} />
//                 </button>
//               </div>

//               <div className="flex flex-col items-start gap-8 text-slate-600 text-lg px-6 py-6">
//                 <Link href="/" onClick={toggleMenu}>Home</Link>
//                 <Link href="/shop" onClick={toggleMenu}>Shop</Link>
//                 <Link href="/" onClick={toggleMenu}>About</Link>
//                 <Link href="/" onClick={toggleMenu}>Contact</Link>
//               </div>
//             </div>
//           </div>

//           {/* Overlay */}
//           <div
//             className="sm:hidden fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
//             onClick={toggleMenu}
//           ></div>
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

'use client'

import { Search, ShoppingCart, Menu, X, Heart, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import WVlogo from "../assets/YUCHII LOGO.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);

  const cartCount = useSelector((state) => state.cart?.total || 0);
  const wishlistCount = useSelector((state) => state.wishlist?.total || 0);
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/shop?search=${search}`);
      setSearch('');
      setShowSearch(false);
    }
  };

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={WVlogo} alt="Logo" className="w-24 h-auto" />
          </Link>

          {/* Center Menu */}
          <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium text-sm">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/shop" className="hover:text-blue-600 transition">Shop</Link>
            <Link href="/about" className="hover:text-blue-600 transition">About</Link>
            <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 sm:gap-5 text-gray-700">

            {/* Search Icon */}
            <button onClick={toggleSearch} className="relative hover:text-blue-600 transition">
              <Search size={20} />
            </button>

            {/* Wishlist Icon */}
            <Link href="/wishlist" className="relative hover:text-blue-600 transition">
              <Heart size={20} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[10px] bg-red-500 text-white rounded-full px-1.5">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link href="/cart" className="relative hover:text-blue-600 transition">
              <ShoppingCart size={20} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[10px] bg-blue-600 text-white rounded-full px-1.5">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login Icon */}
            <Link href="/login" className="hover:text-blue-600 transition">
              <LogIn size={20} />
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden hover:text-blue-600 transition">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="w-full bg-gray-100 py-2 border-t border-gray-300 flex justify-center">
          <form onSubmit={handleSearch} className="flex items-center w-10/12 sm:w-6/12 bg-white px-4 py-2 rounded-full shadow-sm">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-2 text-sm bg-transparent outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </form>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <>
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-6 flex flex-col gap-6 text-gray-700 font-medium text-base">
            <button onClick={toggleMenu} className="absolute top-4 right-4">
              <X size={22} />
            </button>
            <Link href="/" onClick={toggleMenu} className="hover:text-blue-600 transition">Home</Link>
            <Link href="/shop" onClick={toggleMenu} className="hover:text-blue-600 transition">Shop</Link>
            <Link href="/about" onClick={toggleMenu} className="hover:text-blue-600 transition">About</Link>
            <Link href="/contact" onClick={toggleMenu} className="hover:text-blue-600 transition">Contact</Link>
          </div>

          {/* Overlay */}
          <div
            onClick={toggleMenu}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          ></div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
