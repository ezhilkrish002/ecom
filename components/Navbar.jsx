'use client'
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import Link from "next/link";
import WVlogo from "../assets/WV-logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const cartCount = useSelector(state => state.cart.total);

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/shop?search=${search}`);
        setIsSearchOpen(false); // Close search bar after submission
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isSearchOpen) setIsSearchOpen(false); // Close search bar if menu is opened
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isMenuOpen) setIsMenuOpen(false); // Close menu if search is opened
    };

    // Prevent page scrolling when hamburger menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Cleanup on component unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    return (
        <nav className="relative bg-white">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">
                    {/* 🟩 Logo */}
                    <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                        <Image src={WVlogo} alt="WV logo" className="w-28 h-auto" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
                        <Link href="/">Home</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/">About</Link>
                        <Link href="/">Contact</Link>

                        {/* Search Bar (Desktop Only) */}
                         <div className="relative hidden xl:flex items-center text-sm text-slate-600">
                             <button
                                type="button"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 hover:bg-slate-200 rounded-full transition"
                            >
                                <Search size={18} />
                            </button>

                            {isSearchOpen && (
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

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                            <ShoppingCart size={18} />
                            Cart
                            <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">{cartCount}</button>
                        </Link>

                        <button className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                            Login
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="sm:hidden flex items-center gap-4">
                        <button onClick={toggleSearch} className="text-slate-600">
                            <Search size={24} />
                        </button>
                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                            <ShoppingCart size={18} />
                            <span className="absolute -top-1 left-4 text-[8px] text-slate-900 size-3.5 rounded-full">{cartCount}</span>
                        </Link>
                        <button className="text-slate-600">
                            <User size={24} />
                        </button>
                        <button onClick={toggleMenu} className="text-slate-600">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div
                className={`sm:hidden bg-white w-full flex justify-center transition-all duration-300 ease-in-out ${
                    isSearchOpen ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
            >
                <form onSubmit={handleSearch} className="flex items-center w-full max-w-md text-sm gap-2 bg-slate-100 px-4 py-3 rounded-lg">
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

            {/* Mobile Menu */}
            <div
                className={`sm:hidden fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-sm z-50 transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                       {/* 🟩 Logo */}
                    <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                        <Image src={WVlogo} alt="WV logo" className="w-28 h-auto" />
                    </Link>
                        <button onClick={toggleMenu} className="text-slate-600">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="flex flex-col items-start gap-8 text-slate-600 text-lg px-6 py-6">
                        <Link href="/" onClick={toggleMenu} className="text-left">Home</Link>
                        <Link href="/shop" onClick={toggleMenu} className="text-left">Shop</Link>
                        <Link href="/" onClick={toggleMenu} className="text-left">About</Link>
                        <Link href="/" onClick={toggleMenu} className="text-left">Contact</Link>
                    </div>
                </div>
            </div>

            {/* Overlay for blur effect (only for menu) */}
            {isMenuOpen && (
                <div
                    className="sm:hidden fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
                    onClick={toggleMenu}
                ></div>
            )}

            <hr className="border-gray-300" />
        </nav>
    );
};

export default Navbar;

// 'use client'

// import { Search, ShoppingCart, Menu, LogIn, UserCircle } from "lucide-react";
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





