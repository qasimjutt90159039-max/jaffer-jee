import React, { useState, useEffect } from 'react';
import {
  Heart,
  Check,
  ShieldCheck,
  Sparkles,
  Share2,
  Clock,
  ArrowRight,
  Star,
  MessageSquare,
  HelpCircle,
  FileText,
  MapPin,
  ShoppingBag,
  Award,
  Truck,
  Plus,
  Minus
} from 'lucide-react';
import { Product, ProductColor, Review, Question } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPKR, siteConfig, getWhatsAppUrl } from '../config/siteConfig';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (page: string, slug?: string) => void;
  onOpenMonogramModal?: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenMonogramModal
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'monogram' | 'reviews' | 'care'>('specs');

  // Inline Monogramming state
  const [wantMonogram, setWantMonogram] = useState(false);
  const [monogramInitials, setMonogramInitials] = useState('M.Z');
  const [monogramFoil, setMonogramFoil] = useState<'blind' | 'gold' | 'silver'>('gold');

  // Review submission state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newLoc, setNewLoc] = useState('Gulgasht, Multan');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Added notification state
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.product) {
          setProduct(data.product);
          setRelated(data.related || []);
          setReviews(data.reviews || []);
          setQuestions(data.questions || []);

          const defaultColor = (data.product.colors && data.product.colors.length > 0)
            ? data.product.colors[0]
            : { name: 'Classic Leather', hex: '#2B1A12', image: data.product.thumbnail };

          setSelectedColor(defaultColor);
          setActiveImage(defaultColor.image || data.product.thumbnail);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-10 h-10 border-2 border-[#8C522F] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs uppercase tracking-widest text-[#7A6B5C]">Loading Leather Heirloom...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#19100B]">Leather Item Not Found</h2>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-2.5 bg-[#19100B] text-[#FAF8F5] text-xs font-semibold rounded-xs"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const unitPrice = product.discountPrice || product.price;

  const handleAddToCart = () => {
    const personalization = wantMonogram && monogramInitials.trim()
      ? { initials: monogramInitials.trim().toUpperCase(), foilType: monogramFoil }
      : undefined;

    addToCart(product, selectedColor || undefined, quantity, personalization);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleWhatsAppInquire = () => {
    let msg = `Hello Jafferjees Multan Store,\n`;
    msg += `I am interested in: *${product.title}* (SKU: ${product.sku})\n`;
    msg += `Color: ${selectedColor?.name || 'Default'}\n`;
    msg += `Price: ${formatPKR(unitPrice)}\n`;
    if (wantMonogram && monogramInitials) {
      msg += `Monogram: "${monogramInitials}" (${monogramFoil} foil)\n`;
    }
    msg += `Please confirm availability at Sharif Complex Gulgasht showroom or dispatch.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productTitle: product.title,
          author: newAuthor,
          location: newLoc,
          rating: newRating,
          comment: newComment
        })
      });
      const data = await res.json();
      if (data.success && data.review) {
        setReviews([data.review, ...reviews]);
        setReviewSuccess(true);
        setNewComment('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#7A6B5C]">
        <button onClick={() => onNavigate('home')} className="hover:text-[#19100B]">Home</button>
        <span>/</span>
        <button onClick={() => onNavigate('shop')} className="hover:text-[#19100B]">Collection</button>
        <span>/</span>
        <button onClick={() => onNavigate('shop', product.categorySlug)} className="hover:text-[#19100B]">{product.category}</button>
        <span>/</span>
        <span className="text-[#19100B] font-semibold truncate">{product.title}</span>
      </div>

      {/* Primary Presentation: Gallery & Product Options */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-[#F4EFEB] border border-[#EAE3D9] shadow-inner">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span className="px-2.5 py-1 rounded-xs text-[10px] font-bold uppercase tracking-wider bg-[#19100B] text-[#D8BA73]">
                {product.leatherType}
              </span>
              <span className="px-2 py-0.5 rounded-xs text-[10px] font-semibold bg-[#8C522F] text-white flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Genuine Leather
              </span>
            </div>

            {/* Wishlist Button */}
            <div className="absolute top-3 right-3">
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-full backdrop-blur-xs shadow-md transition-colors ${
                  isFavorited ? 'bg-red-50 text-red-600' : 'bg-white/80 text-stone-700 hover:bg-white'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-red-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-md overflow-hidden border-2 shrink-0 transition-transform ${
                  activeImage === img ? 'border-[#8C522F] scale-105 shadow-sm' : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Multan Atelier Warranty Notice */}
          <div className="p-4 bg-[#FAF6EE] rounded-lg border border-[#E8E1D5] text-xs text-[#6A5B4C] flex items-start gap-3">
            <Award className="w-5 h-5 text-[#8C522F] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#19100B] block mb-0.5">Sharif Complex Gulgasht Heritage Warranty:</strong>
              Every Jafferjees article includes a structural lifetime stitch and hardware warranty. Serviced and polished locally at our Multan boutique.
            </div>
          </div>
        </div>

        {/* Right: Pricing, Color Swatches, Monogramming & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C522F] font-bold">
              {product.category} • SKU: {product.sku}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#19100B] mt-1 leading-snug">
              {product.title}
            </h1>
            <p className="text-xs text-[#7A6B5C] mt-1.5 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-[#BFA054]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating || 5)
                      ? 'fill-current'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-stone-600 font-sans font-medium">
              {product.rating || 5.0} ({reviews.length || 14} Verified Atelier Reviews)
            </span>
          </div>

          {/* Price Box */}
          <div className="p-5 bg-white rounded-lg border border-[#EAE3D9] space-y-3 shadow-xs">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-serif text-3xl font-bold text-[#19100B]">
                  {formatPKR(unitPrice)}
                </span>
                {product.discountPrice && (
                  <span className="ml-2 text-sm text-stone-400 line-through">
                    {formatPKR(product.price)}
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-xs text-emerald-800 bg-emerald-100 font-bold px-2 py-0.5 rounded block">
                  In Stock in Multan
                </span>
                <span className="text-[10px] text-stone-500 mt-1 block">
                  Same-Day Pickup Available
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-[#7A6B5C]">
              <span>Dimensions: <strong>{product.specs?.dimensions || 'Standard Form'}</strong></span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> Free Courier Across Pakistan
              </span>
            </div>
          </div>

          {/* Color Swatch Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#19100B] uppercase tracking-wider text-[11px]">
                Leather Tone: <span className="font-serif normal-case text-sm text-[#8C522F]">{selectedColor?.name}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setSelectedColor(c);
                      if (c.image) setActiveImage(c.image);
                    }}
                    className={`px-3 py-2 rounded-xs border text-xs font-medium flex items-center gap-2 transition-all ${
                      selectedColor?.name === c.name
                        ? 'border-[#8C522F] bg-[#FAF6EE] text-[#19100B] shadow-xs ring-1 ring-[#8C522F]'
                        : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-stone-300"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bespoke Monogram Customizer Box */}
          {product.isMonogrammable && (
            <div className="p-4 bg-[#FAF6EE] rounded-lg border border-[#E8E1D5] space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#19100B]">
                  <input
                    type="checkbox"
                    checked={wantMonogram}
                    onChange={(e) => setWantMonogram(e.target.checked)}
                    className="w-4 h-4 text-[#8C522F] rounded-xs"
                  />
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#BFA054]" /> Add Complimentary Monogramming
                  </span>
                </label>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  FREE
                </span>
              </div>

              {wantMonogram && (
                <div className="space-y-3 pt-2 border-t border-[#EAE3D9]">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-600 mb-1">
                        Initials (Max 4 chars)
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={monogramInitials}
                        onChange={(e) => setMonogramInitials(e.target.value.toUpperCase())}
                        placeholder="M.Z"
                        className="w-full text-xs font-serif tracking-widest p-2 bg-white border border-stone-300 rounded-xs uppercase"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-600 mb-1">
                        Foil Type
                      </label>
                      <select
                        value={monogramFoil}
                        onChange={(e) => setMonogramFoil(e.target.value as any)}
                        className="w-full text-xs p-2 bg-white border border-stone-300 rounded-xs font-semibold"
                      >
                        <option value="gold">22K Gold Foil</option>
                        <option value="blind">Blind Deboss</option>
                        <option value="silver">Sterling Foil</option>
                      </select>
                    </div>
                  </div>

                  {/* Visual Preview */}
                  <div className="p-2.5 bg-[#25160E] rounded text-center">
                    <span className="text-[9px] uppercase tracking-widest text-stone-400 block">
                      STAMPING PREVIEW
                    </span>
                    <span
                      className={`text-2xl font-serif font-bold tracking-widest ${
                        monogramFoil === 'gold'
                          ? 'text-[#ECC870]'
                          : monogramFoil === 'silver'
                          ? 'text-[#E0E2EC]'
                          : 'text-[#19100B] text-stone-300'
                      }`}
                    >
                      {monogramInitials || 'YOUR INITIALS'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-[#19100B]">Quantity:</span>
              <div className="flex items-center border border-stone-300 rounded-xs bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 text-sm font-bold"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-stone-900 text-xs">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 text-sm font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-right flex-1">
                <span className="text-xs text-stone-500">Total: </span>
                <strong className="text-base font-serif font-bold text-[#8C522F]">
                  {formatPKR(unitPrice * quantity)}
                </strong>
              </div>
            </div>

            {/* Added Notice */}
            {addedNotice && (
              <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center justify-between">
                <span>✓ Added to Shopping Bag!</span>
                <button
                  onClick={() => onNavigate('cart')}
                  className="underline hover:text-emerald-950"
                >
                  View Bag & Checkout
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 gap-2.5 pt-1">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 px-4 bg-[#19100B] hover:bg-[#382216] text-white font-serif text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#D8BA73]" />
                <span>Add {quantity} to Shopping Bag • {formatPKR(unitPrice * quantity)}</span>
              </button>

              <button
                onClick={handleWhatsAppInquire}
                className="w-full py-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#116930] rounded-xs text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-emerald-500/30"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Inquire & Reserve via WhatsApp to Multan Store</span>
              </button>
            </div>
          </div>

          {/* Multan Pickup Badge */}
          <div className="pt-2 border-t border-stone-200 grid grid-cols-2 gap-3 text-xs text-[#7A6B5C]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8C522F]" />
              <button onClick={() => onNavigate('contact')} className="underline hover:text-[#19100B]">
                Sharif Complex Gulgasht Pickup
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8C522F]" />
              <span>Mon-Sat: 11 AM - 10 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Technical Specs, Craftsmanship, Reviews, Care */}
      <div className="bg-white rounded-xl border border-[#EAE3D9] overflow-hidden shadow-xs">
        {/* Tab Headers */}
        <div className="flex border-b border-[#EAE3D9] bg-[#FAF8F5] overflow-x-auto text-xs font-serif font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-6 py-4 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'specs'
                ? 'border-[#8C522F] text-[#8C522F] bg-white'
                : 'border-transparent text-[#7A6B5C] hover:text-[#19100B]'
            }`}
          >
            <FileText className="w-4 h-4" /> Technical Specifications
          </button>

          <button
            onClick={() => setActiveTab('monogram')}
            className={`px-6 py-4 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'monogram'
                ? 'border-[#8C522F] text-[#8C522F] bg-white'
                : 'border-transparent text-[#7A6B5C] hover:text-[#19100B]'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Bespoke Monogramming
          </button>

          <button
            onClick={() => setActiveTab('care')}
            className={`px-6 py-4 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'care'
                ? 'border-[#8C522F] text-[#8C522F] bg-white'
                : 'border-transparent text-[#7A6B5C] hover:text-[#19100B]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Leather Care & Longevity
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-4 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'reviews'
                ? 'border-[#8C522F] text-[#8C522F] bg-white'
                : 'border-transparent text-[#7A6B5C] hover:text-[#19100B]'
            }`}
          >
            <Star className="w-4 h-4" /> Reviews ({reviews.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* 1. Technical Specs Tab */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
              <div className="space-y-4">
                <h4 className="font-serif text-sm font-bold text-[#19100B] uppercase tracking-wider">
                  Material & Dimensions
                </h4>
                <div className="space-y-2 divide-y divide-stone-100">
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Leather Origin & Type:</span>
                    <span className="font-semibold text-stone-900">{product.specs?.material || product.leatherType}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Physical Dimensions:</span>
                    <span className="font-semibold text-stone-900">{product.specs?.dimensions || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Hardware & Fittings:</span>
                    <span className="font-semibold text-stone-900">{product.specs?.hardware || 'Solid Cast Brass'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Interior Lining:</span>
                    <span className="font-semibold text-stone-900">{product.specs?.lining || 'Brushed Microfiber Suede'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-serif text-sm font-bold text-[#19100B] uppercase tracking-wider">
                  Craftsmanship & Guarantee
                </h4>
                <div className="space-y-2 divide-y divide-stone-100">
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Compartments & Capacity:</span>
                    <span className="font-semibold text-stone-900">{product.specs?.compartments || 'Multiple specialized dividers'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Edge Treatment:</span>
                    <span className="font-semibold text-stone-900">Triple-waxed hand-burnished edge</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Warranty:</span>
                    <span className="font-semibold text-stone-900">Lifetime structural stitch & hardware guarantee</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone-500">Service Center:</span>
                    <span className="font-semibold text-stone-900">Sharif Complex Gulgasht, Multan</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Monogramming Tab */}
          {activeTab === 'monogram' && (
            <div className="max-w-2xl space-y-4 text-xs text-[#6A5B4C]">
              <h3 className="font-serif text-base font-bold text-[#19100B]">
                The Jafferjees Hot-Stamp Tradition
              </h3>
              <p className="leading-relaxed">
                Personalization has been the signature of discerning patrons since the 19th century. Using solid brass movable typography set by hand, we heat our stamping press to precisely 130°C and deboss your initials with your choice of genuine 22K gold leaf, sterling silver, or a quiet blind impression.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-[#FAF6EE] rounded border border-[#E8E1D5]">
                  <span className="font-bold text-[#19100B] block mb-1">22K Gold Foil</span>
                  <p className="text-[11px]">Reflective, warm metallic brilliance for high-contrast prestige.</p>
                </div>
                <div className="p-3 bg-[#FAF6EE] rounded border border-[#E8E1D5]">
                  <span className="font-bold text-[#19100B] block mb-1">Blind Deboss</span>
                  <p className="text-[11px]">Deep heat compression with no pigment for an understated, tactile impression.</p>
                </div>
                <div className="p-3 bg-[#FAF6EE] rounded border border-[#E8E1D5]">
                  <span className="font-bold text-[#19100B] block mb-1">Sterling Foil</span>
                  <p className="text-[11px]">Crisp silver foil suited for modern black and navy leather articles.</p>
                </div>
              </div>
            </div>
          )}

          {/* 3. Leather Care Tab */}
          {activeTab === 'care' && (
            <div className="max-w-2xl space-y-4 text-xs text-[#6A5B4C]">
              <h3 className="font-serif text-base font-bold text-[#19100B]">
                How to Care for Full-Grain Leather
              </h3>
              <ul className="space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Conditioning:</strong> Apply a neutral beeswax or lanolin leather balm every 4 to 6 months to maintain suppleness.</li>
                <li><strong>Moisture:</strong> If caught in rain, blot gently with a clean micro-fiber cloth and allow to dry naturally away from radiators or direct sunlight.</li>
                <li><strong>Storage:</strong> When not in use, store your leather piece in the provided breathable cotton dust cover.</li>
                <li><strong>Multan Complimentary Care:</strong> Bring your Jafferjees leather items to our Sharif Complex Gulgasht showroom anytime for complimentary buffing and edge conditioning.</li>
              </ul>
            </div>
          )}

          {/* 4. Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-stone-900">{rev.author}</span>
                        <span className="text-[10px] text-stone-500 font-sans">• {rev.location}</span>
                      </div>
                      <div className="flex text-[#BFA054] text-xs">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <form onSubmit={handleReviewSubmit} className="p-5 bg-[#FAF6EE] rounded-lg border border-[#E8E1D5] space-y-3">
                <h4 className="font-serif text-sm font-bold text-[#19100B]">Share Your Atelier Experience</h4>
                {reviewSuccess && (
                  <p className="text-xs text-emerald-800 font-semibold">Thank you! Your review has been recorded.</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Mian Tariq"
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">City / Area</label>
                    <input
                      type="text"
                      value={newLoc}
                      onChange={(e) => setNewLoc(e.target.value)}
                      placeholder="e.g. Gulgasht, Multan"
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">Rating</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xs font-semibold"
                    >
                      <option value={5}>5 Stars - Exceptional Leather Craft</option>
                      <option value={4}>4 Stars - Very Pleased</option>
                      <option value={3}>3 Stars - Good</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">Your Review</label>
                  <textarea
                    rows={3}
                    required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Describe the grain texture, durability, and packaging..."
                    className="w-full p-2 bg-white border border-stone-300 rounded-xs text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#19100B] text-[#FAF8F5] rounded-xs text-xs font-bold"
                >
                  Submit Review
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
