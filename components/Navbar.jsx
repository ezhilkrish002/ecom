import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import Link from 'next/link';
import WVlogo from '../assets/WV-logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Login from '../app/(public)/login/page'
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
          <Link href="/" className="relative text-4xl font-semibold text-slate-700">
            <Image src={WVlogo} alt="WV logo" className="w-28 h-auto" />
          </Link>

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
    </nav>
  );
};

export default Navbar;