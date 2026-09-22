import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { siteConfig, formatPKR, getWhatsAppUrl } from '../config/siteConfig';

interface HeaderProps {
  onNavigate: (page: string, param?: string) => void;
  currentPage?: string;
  activePage?: string;
  onOpenCart: () => void;
  onOpenMonogramModal?: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  currentPage: propCurrentPage,
  activePage,
  onOpenCart,
  onOpenMonogramModal,
  onOpenSearch
}) => {
  const currentPage = activePage || propCurrentPage || 'home';
  const { totalQuantity, subtotal } = useCart();
  const { user, isAdmin } = useAuth();
  const { wishlistIds } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery.trim())}&limit=6`);
        const json = await res.json();
        if (json.success) {
          setSearchResults(json.data || []);
          setShowResults(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { id: 'wallets', name: 'Wallets' },
    { id: 'belts', name: 'Belts' },
    { id: 'bags', name: 'Bags & Briefcases' },
    { id: 'handbags', name: 'Handbags & Totes' },
    { id: 'mens-accessories', name: "Men's Essentials" },
    { id: 'womens-accessories', name: "Women's" },
    { id: 'gifts', name: 'Gift Collection' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5] border-b border-[#E8E1D5] shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#19100B] text-[#E8DCC4] text-[11px] sm:text-xs py-1.5 px-4 font-sans border-b border-[#382216]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#BFA054] animate-pulse"></span>
            <span className="font-medium tracking-wide">
              Sharif Complex Gulgasht, Multan Showroom
            </span>
            <span className="hidden md:inline text-[#8C7A6B]">|</span>
            <span className="hidden md:inline text-[#D4C3A3]">
              Nationwide Cash on Delivery (COD) • Free Shipping above Rs. 5,000
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] shrink-0">
            <a
              href={`tel:${siteConfig.contactNumber}`}
              className="flex items-center gap-1 text-[#E8DCC4] hover:text-[#BFA054] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#BFA054]" />
              <span className="hidden sm:inline">Call Store:</span>
              <span className="font-semibold tracking-wider">{siteConfig.contactNumber}</span>
            </a>
            <button
              onClick={() => onNavigate('track-order')}
              className="hidden lg:inline hover:text-[#BFA054] transition-colors"
            >
              Track Order
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hidden lg:inline hover:text-[#BFA054] transition-colors"
            >
              Sharif Complex Directions
            </button>
          </div>
        </div>
      </div>

      {/* Main Luxury Brand & Action Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Brand Crest & Title */}
        <div
          onClick={() => onNavigate('home')}
          className="cursor-pointer flex items-center gap-3 select-none group"
        >
          {/* Emblem */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-sm bg-[#25160E] text-[#BFA054] flex flex-col items-center justify-center border border-[#BFA054]/40 group-hover:border-[#BFA054] transition-all shadow-xs">
            <span className="font-serif text-lg font-bold tracking-tighter leading-none">J</span>
            <span className="text-[7px] tracking-widest text-[#D8BA73] font-sans -mt-0.5">EST. 1880</span>
          </div>
          <div>
            <span className="block font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#19100B] leading-none group-hover:text-[#6B3B1E] transition-colors">
              JAFFERJEES
            </span>
            <span className="block text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8C522F] mt-1">
              Sharif Complex Gulgasht • Multan
            </span>
          </div>
        </div>

        {/* Global Product Search */}
        <div ref={searchRef} className="hidden md:block relative flex-1 max-w-md mx-2 lg:mx-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { if (searchResults.length > 0) setShowResults(true); }}
              placeholder="Search handcrafted leather wallets, belts, briefcases, handbags..."
              className="w-full bg-[#F3EFEA] text-[#19100B] placeholder-[#8A7969] text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-full border border-[#DCD3C5] focus:outline-none focus:border-[#8C522F] focus:bg-white transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-[#8A7969] absolute left-3.5 top-3" />
            {isSearching && (
              <span className="w-4 h-4 border-2 border-[#8C522F] border-t-transparent rounded-full animate-spin absolute right-3.5 top-3"></span>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-[#DCD3C5] py-2 z-50 overflow-hidden">
              <div className="px-4 py-1.5 text-[10px] uppercase tracking-wider text-[#8A7969] font-bold border-b border-stone-100 flex justify-between">
                <span>Handcrafted Leather Pieces</span>
                <span>{searchResults.length} matches</span>
              </div>
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onNavigate('product-detail', item.slug);
                    setShowResults(false);
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FAF6EE] cursor-pointer transition-colors border-b border-stone-50 last:border-0"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-11 h-11 object-cover rounded-xs border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#19100B] truncate">{item.title}</p>
                    <p className="text-[11px] text-[#7A6B5C]">
                      {item.category} • <span className="text-[#8C522F] font-bold">{formatPKR(item.discountPrice || item.price)}</span>
                    </p>
                  </div>
                </div>
              ))}
              <div
                onClick={() => {
                  onNavigate('shop');
                  setShowResults(false);
                }}
                className="px-4 py-2 text-center text-xs text-[#8C522F] font-bold bg-[#FAF6EE] hover:bg-[#F3EFEA] cursor-pointer"
              >
                View complete Multan catalogue →
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Personalize Button */}
          {onOpenMonogramModal && (
            <button
              onClick={onOpenMonogramModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F4EFEB] hover:bg-[#EAE3D9] text-[#25160E] border border-[#DCD3C5] transition-colors"
              title="Personalize with custom initials"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#BFA054]" />
              <span>Monogramming</span>
            </button>
          )}

          {/* Wishlist Link */}
          <button
            onClick={() => onNavigate('wishlist')}
            className="relative p-2 rounded-full text-[#4A3B30] hover:text-[#19100B] hover:bg-[#F3EFEA] transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8C522F] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </button>

          {/* Account / Admin */}
          <button
            onClick={() => onNavigate(isAdmin ? 'admin' : 'account')}
            className="p-2 rounded-full text-[#4A3B30] hover:text-[#19100B] hover:bg-[#F3EFEA] transition-colors flex items-center gap-1"
            title={user ? user.name : 'Sign In'}
          >
            <User className="w-5 h-5" />
            {user && (
              <span className="hidden xl:inline text-xs font-medium text-[#19100B] max-w-[80px] truncate">
                {user.name.split(' ')[0]}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#25160E] hover:bg-[#382216] text-white text-xs font-medium transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-[#D8BA73]" />
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-[10px] text-[#D8BA73] font-semibold">{totalQuantity} {totalQuantity === 1 ? 'Piece' : 'Pieces'}</span>
              <span className="font-bold text-white tracking-wide">{formatPKR(subtotal)}</span>
            </div>
            {totalQuantity > 0 && (
              <span className="sm:hidden absolute -top-1 -right-1 w-4 h-4 bg-[#BFA054] text-[#19100B] text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#19100B] hover:bg-[#F3EFEA] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <nav className="hidden lg:block bg-[#F3EFEA] border-t border-[#E8E1D5]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-6 overflow-x-auto py-2.5">
            <button
              onClick={() => onNavigate('home')}
              className={`whitespace-nowrap transition-colors tracking-wider uppercase font-semibold text-[11px] ${
                currentPage === 'home'
                  ? 'text-[#8C522F] border-b-2 border-[#8C522F] pb-0.5'
                  : 'text-[#4A3B30] hover:text-[#19100B]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className={`whitespace-nowrap transition-colors tracking-wider uppercase font-semibold text-[11px] ${
                currentPage === 'shop'
                  ? 'text-[#8C522F] border-b-2 border-[#8C522F] pb-0.5'
                  : 'text-[#4A3B30] hover:text-[#19100B]'
              }`}
            >
              All Leather Goods
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigate('shop', cat.id)}
                className="whitespace-nowrap transition-colors tracking-wide text-[#4A3B30] hover:text-[#8C522F] pb-0.5 font-sans"
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[#4A3B30]">
            <button
              onClick={() => onNavigate('contact')}
              className="flex items-center gap-1.5 hover:text-[#8C522F] font-semibold text-[#6B3B1E] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#BFA054]" />
              <span>Sharif Complex Gulgasht</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-t border-[#E8E1D5] px-4 py-4 space-y-4 shadow-xl">
          {/* Mobile Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leather wallets, belts, bags..."
              className="w-full bg-[#F3EFEA] text-[#19100B] text-xs pl-10 pr-4 py-2 rounded-lg border border-[#DCD3C5]"
            />
            <Search className="w-4 h-4 text-[#8A7969] absolute left-3 top-2.5" />
          </div>

          {/* Category Links */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded bg-[#F3EFEA] hover:bg-[#EAE3D9] font-medium text-[#19100B]"
            >
              Home Atelier
            </button>
            <button
              onClick={() => { onNavigate('shop'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded bg-[#25160E] text-white font-medium"
            >
              All Leather Goods
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => { onNavigate('shop', c.id); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded bg-[#F3EFEA] hover:bg-[#EAE3D9] text-[#25160E]"
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Direct Multan Showroom Contact Box */}
          <div className="p-3 bg-[#F3EFEA] rounded-lg border border-[#E8E1D5] space-y-2 text-xs">
            <p className="font-semibold text-[#19100B] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#8C522F]" />
              Sharif Complex Gulgasht Store
            </p>
            <p className="text-[11px] text-[#6A5B4C] leading-snug">
              6F8C+4WX, Sharif Complex, Shop # G 06-08, Peer Khurshid Colony Chah Usman Wala, Multan
            </p>
            <div className="flex gap-2 pt-1">
              <a
                href={`tel:${siteConfig.contactNumber}`}
                className="flex-1 py-1.5 bg-[#25160E] text-white rounded text-center font-semibold text-[11px]"
              >
                Call: {siteConfig.contactNumber}
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 bg-[#25D366] text-white rounded text-center font-semibold text-[11px]"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
