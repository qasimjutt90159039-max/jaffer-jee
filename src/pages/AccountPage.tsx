import React, { useState } from 'react';
import {
  User,
  ShoppingBag,
  Heart,
  Lock,
  LogOut,
  CheckCircle2,
  Trash2,
  Sparkles,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../types';
import { formatPKR, siteConfig } from '../config/siteConfig';

interface AccountPageProps {
  products: Product[];
  onNavigate: (page: string, slug?: string) => void;
  onOpenMonogramModal?: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  products,
  onNavigate,
  onOpenMonogramModal
}) => {
  const { user, login, register, logout } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'wishlist' | 'orders' | 'profile'>('wishlist');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (isLoginMode) {
      const res = await login(email, password);
      if (!res.success) setAuthError(res.message || 'Invalid credentials');
    } else {
      const res = await register(name, email, phone);
      if (!res.success) setAuthError(res.message || 'Registration failed');
    }
  };

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 font-sans">
        <div className="bg-white rounded-xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C522F]">
              Jafferjees Multan Patron Portal
            </span>
            <h1 className="font-serif text-2xl font-bold text-[#19100B]">
              {isLoginMode ? 'Sign In to Your Account' : 'Register for Atelier Privileges'}
            </h1>
            <p className="text-xs text-[#7A6B5C]">
              Access saved monogram preferences, order history, and Multan boutique pickup records.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xs border border-red-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4 text-xs">
            {!isLoginMode && (
              <>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mian Tariq"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1">Mobile / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0300 8765432"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs font-medium"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block font-bold text-stone-800 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-800 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#19100B] hover:bg-[#382216] text-[#FAF8F5] text-xs font-serif font-bold uppercase tracking-wider rounded-xs transition-colors shadow-xs"
            >
              {isLoginMode ? 'Sign In' : 'Create Patron Account'}
            </button>
          </form>

          <div className="pt-2 border-t border-stone-100 text-center">
            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setAuthError('');
              }}
              className="text-xs text-[#8C522F] hover:underline font-semibold"
            >
              {isLoginMode
                ? "New patron? Create an account for complimentary monogramming"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-5">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C522F]">
            Patron Account
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#19100B]">
            Welcome, {user.name}
          </h1>
          <p className="text-xs text-[#7A6B5C] mt-0.5">
            Member of Jafferjees Multan Atelier • {user.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 border border-stone-300 text-stone-700 text-xs font-semibold rounded-xs hover:bg-stone-50 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E8E1D5] bg-[#FAF8F5] overflow-x-auto text-xs font-serif font-bold uppercase tracking-wider rounded-t-lg">
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`px-6 py-3.5 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'wishlist'
              ? 'border-[#8C522F] text-[#8C522F] bg-white'
              : 'border-transparent text-[#7A6B5C] hover:text-[#19100B]'
          }`}
        >
          <Heart className="w-4 h-4" /> Saved Leather Heirlooms ({wishlist.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3.5 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'orders'
              ? 'border-[#8C522F] text-[#8C522F] bg-white'
              : 'border-transparent text-[#7A6B5C] hover:text-[#19100B]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> Order History
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-6 py-3.5 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'profile'
              ? 'border-[#8C522F] text-[#8C522F] bg-white'
              : 'border-transparent text-[#7A6B5C] hover:text-[#19100B]'
          }`}
        >
          <User className="w-4 h-4" /> Patron Profile & Preferences
        </button>
      </div>

      {/* Tab 1: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-lg border border-[#EAE3D9] space-y-3">
              <Heart className="w-8 h-8 text-stone-300 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#19100B]">Your Wishlist is Empty</h3>
              <p className="text-xs text-[#7A6B5C] max-w-sm mx-auto">
                Explore our full-grain leather articles and tap the heart icon to save pieces for future consultation.
              </p>
              <button
                onClick={() => onNavigate('shop')}
                className="px-5 py-2.5 bg-[#19100B] text-white text-xs font-semibold rounded-xs"
              >
                Browse Leather Collection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((p) => (
                <div key={p.id} className="bg-white rounded-lg border border-[#EAE3D9] overflow-hidden shadow-xs space-y-3 p-4 flex flex-col justify-between">
                  <div className="aspect-4/3 rounded overflow-hidden bg-stone-100 relative">
                    <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeFromWishlist(p.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white text-red-600 rounded-full"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#8C522F] uppercase font-bold tracking-wider">{p.category}</span>
                    <h4 className="font-serif text-sm font-bold text-[#19100B] truncate mt-0.5">{p.title}</h4>
                    <span className="font-serif font-bold text-sm text-[#19100B] mt-1 block">
                      {formatPKR(p.discountPrice || p.price)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                    <button
                      onClick={() => onNavigate('product', p.slug)}
                      className="py-2 px-3 border border-stone-300 text-[#19100B] text-xs font-semibold rounded-xs hover:bg-stone-50"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => addToCart(p, p.colors?.[0], 1)}
                      className="py-2 px-3 bg-[#19100B] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#382216]"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Orders */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg border border-[#EAE3D9] p-6 space-y-4 shadow-xs">
          <h3 className="font-serif text-base font-bold text-[#19100B]">
            Your Acquisition History
          </h3>
          <p className="text-xs text-[#7A6B5C]">
            Orders placed under this account are archived here for warranty validation.
          </p>

          <div className="p-4 bg-[#FAF6EE] rounded-lg border border-[#E8E1D5] flex items-center justify-between text-xs">
            <div>
              <span className="font-mono font-bold text-stone-900">JAF-89104</span>
              <p className="text-stone-600 text-[11px] mt-0.5">Executive Top-Grain Leather Briefcase (Personalized: "T.M")</p>
            </div>
            <div className="text-right">
              <strong className="font-serif text-sm text-[#8C522F] block">{formatPKR(34500)}</strong>
              <span className="text-[10px] text-emerald-800 bg-emerald-100 font-bold px-2 py-0.5 rounded">
                DISPATCHED
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-lg border border-[#EAE3D9] p-6 space-y-4 max-w-xl shadow-xs text-xs">
          <h3 className="font-serif text-base font-bold text-[#19100B]">
            Patron Profile
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-stone-500 font-bold block mb-0.5">Full Name</label>
              <div className="p-2.5 bg-[#FAF8F5] rounded border border-stone-200 text-stone-900 font-medium">
                {user.name}
              </div>
            </div>

            <div>
              <label className="text-stone-500 font-bold block mb-0.5">Email Address</label>
              <div className="p-2.5 bg-[#FAF8F5] rounded border border-stone-200 text-stone-900 font-medium">
                {user.email}
              </div>
            </div>

            <div>
              <label className="text-stone-500 font-bold block mb-0.5">Phone Number</label>
              <div className="p-2.5 bg-[#FAF8F5] rounded border border-stone-200 text-stone-900 font-medium">
                {user.phone || '0300 8765432'}
              </div>
            </div>

            <div>
              <label className="text-stone-500 font-bold block mb-0.5">Preferred Boutique</label>
              <div className="p-2.5 bg-[#FAF8F5] rounded border border-stone-200 text-stone-900 font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8C522F]" />
                <span>Sharif Complex, Shop # G 06-08, Gulgasht Multan</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
