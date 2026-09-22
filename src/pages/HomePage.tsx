import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Phone,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  Package,
  Heart,
  Eye,
  Gift,
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { Product, Category } from '../types';
import { initialProducts, initialCategories } from '../data/seedData';
import { ProductCard } from '../components/ProductCard';
import { siteConfig, formatPKR, getWhatsAppUrl } from '../config/siteConfig';

interface HomePageProps {
  products?: Product[];
  categories?: Category[];
  onNavigate: (page: string, slug?: string) => void;
  onQuickView?: (product: Product) => void;
  onOpenMonogramModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products = initialProducts,
  categories = initialCategories,
  onNavigate,
  onQuickView,
  onOpenMonogramModal
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'wallets' | 'belts' | 'bags' | 'handbags'>('all');

  const filteredProducts = activeTab === 'all'
    ? products.slice(0, 8)
    : products.filter(p => {
        if (activeTab === 'wallets') return p.category === 'Leather Wallets';
        if (activeTab === 'belts') return p.category === 'Leather Belts';
        if (activeTab === 'bags') return p.category === 'Bags & Briefcases';
        if (activeTab === 'handbags') return p.category === 'Handbags & Totes';
        return true;
      }).slice(0, 8);

  const heroBags = products.filter(p => p.category === 'Bags & Briefcases').slice(0, 2);
  const heroWallets = products.filter(p => p.category === 'Leather Wallets').slice(0, 2);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 font-sans">
      {/* 1. Atelier Luxury Hero Section */}
      <section className="relative bg-[#19100B] text-[#FAF8F5] overflow-hidden">
        {/* Subtle leather texture overlay */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D8BA73_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25160E] border border-[#BFA054]/40 text-xs text-[#D8CCA8]">
                <span className="w-2 h-2 rounded-full bg-[#BFA054] animate-pulse"></span>
                <span className="font-medium tracking-wide">
                  Sharif Complex Gulgasht • Multan Boutique
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Legendary Pakistani Leather Craftsmanship.
              </h1>

              <p className="text-sm sm:text-base text-[#D0C3B0] max-w-xl leading-relaxed">
                Handcrafted from full-grain bovine and calf hides since 1880. Experience timeless executive briefcases, heirloom bi-fold wallets, and personalized bespoke accessories at our dedicated Multan atelier.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-7 py-3.5 bg-[#FAF8F5] text-[#19100B] font-serif text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-white transition-all flex items-center gap-2 shadow-lg hover:translate-x-0.5"
                >
                  <span>Explore Leather Goods</span>
                  <ArrowRight className="w-4 h-4 text-[#8C522F]" />
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3.5 bg-[#25160E] hover:bg-[#382216] text-[#FAF8F5] border border-[#BFA054]/40 font-serif text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-[#D8BA73]" />
                  <span>Sharif Complex Multan</span>
                </button>

                <a
                  href={`tel:${siteConfig.contactNumber}`}
                  className="px-4 py-3.5 text-xs text-[#D8CCA8] hover:text-[#D8BA73] transition-colors flex items-center gap-1.5 underline underline-offset-4"
                >
                  <Phone className="w-4 h-4 text-[#D8BA73]" />
                  <span>Call Store: {siteConfig.contactNumber}</span>
                </a>
              </div>

              {/* Key Trust Pillars */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#382216] text-xs">
                <div>
                  <span className="block font-serif text-lg font-bold text-white">100%</span>
                  <span className="text-[11px] text-[#A3927B]">Full-Grain Leather</span>
                </div>
                <div>
                  <span className="block font-serif text-lg font-bold text-white">Free COD</span>
                  <span className="text-[11px] text-[#A3927B]">Across Pakistan (&gt; Rs. 5K)</span>
                </div>
                <div>
                  <span className="block font-serif text-lg font-bold text-white">Multan Store</span>
                  <span className="text-[11px] text-[#A3927B]">Peer Khurshid Colony</span>
                </div>
              </div>
            </div>

            {/* Right Curated Visual Display */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="space-y-3.5">
                <div
                  onClick={() => onNavigate('product-detail', 'executive-leather-laptop-briefcase')}
                  className="group relative rounded-lg overflow-hidden border border-[#382216] cursor-pointer aspect-4/5 bg-stone-900"
                >
                  <img
                    src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop"
                    alt="Executive Leather Briefcase"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D8BA73]">Business Essential</span>
                    <h3 className="font-serif text-sm font-bold text-white">Executive Briefcase</h3>
                    <p className="text-[11px] text-[#D8CCA8]">Rs. 24,500 • Full-Grain Cowhide</p>
                  </div>
                </div>

                <div
                  onClick={onOpenMonogramModal}
                  className="p-4 rounded-lg bg-[#25160E] border border-[#BFA054]/30 hover:border-[#BFA054] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-[#D8BA73] mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-wider font-bold">Bespoke Atelier</span>
                  </div>
                  <h4 className="font-serif text-xs font-bold text-white group-hover:text-[#D8BA73] transition-colors">
                    Initials Monogramming
                  </h4>
                  <p className="text-[11px] text-[#A3927B] mt-0.5">Complimentary 22K gold foil hot-stamp on your leather goods.</p>
                </div>
              </div>

              <div className="space-y-3.5 pt-6">
                <div
                  onClick={() => onNavigate('product-detail', 'heritage-bifold-full-grain-leather-wallet')}
                  className="group relative rounded-lg overflow-hidden border border-[#382216] cursor-pointer aspect-4/5 bg-stone-900"
                >
                  <img
                    src="https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop"
                    alt="Heritage Bifold Leather Wallet"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D8BA73]">Atelier Classic</span>
                    <h3 className="font-serif text-sm font-bold text-white">Heritage Bi-Fold</h3>
                    <p className="text-[11px] text-[#D8CCA8]">Rs. 4,850 • Hand-Burnished</p>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate('shop', 'belts')}
                  className="p-4 rounded-lg bg-[#25160E] border border-[#BFA054]/30 hover:border-[#BFA054] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-emerald-400 mb-1">
                    <Award className="w-4 h-4 text-[#D8BA73]" />
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#D8BA73]">Lifetime Stitch</span>
                  </div>
                  <h4 className="font-serif text-xs font-bold text-white group-hover:text-[#D8BA73] transition-colors">
                    Reversible Dress Belts
                  </h4>
                  <p className="text-[11px] text-[#A3927B] mt-0.5">Italian solid brass rotary buckles in Black & Cognac.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Leather Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 pb-4 border-b border-[#E8E1D5]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C522F] font-bold">
              Artisanal Categories
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#19100B] mt-1">
              Handcrafted Leather Collections
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-semibold text-[#8C522F] hover:text-[#19100B] flex items-center gap-1 transition-colors mt-2 md:mt-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('shop', cat.id)}
              className="group bg-white rounded-lg border border-[#EAE3D9] hover:border-[#8C522F] p-4 cursor-pointer transition-all hover:shadow-lg flex flex-col justify-between"
            >
              <div className="relative aspect-16/11 rounded-sm overflow-hidden mb-3 bg-[#F4EFEB]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div>
                <h3 className="font-serif text-sm font-bold text-[#19100B] group-hover:text-[#8C522F] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#7A6B5C] mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#F0EBE1] flex items-center justify-between text-xs">
                <span className="text-[#8C522F] font-bold">From {formatPKR(cat.startingPrice || 2500)}</span>
                <span className="text-[11px] text-stone-400 group-hover:text-[#8C522F] group-hover:translate-x-1 transition-all">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Masterpieces with Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 pb-4 border-b border-[#E8E1D5]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C522F] font-bold">
              Sharif Complex Gulgasht Showcase
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#19100B] mt-1">
              Curated Atelier Masterpieces
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 md:pt-0">
            {[
              { id: 'all', label: 'All Pieces' },
              { id: 'wallets', label: 'Wallets' },
              { id: 'belts', label: 'Belts' },
              { id: 'bags', label: 'Briefcases & Bags' },
              { id: 'handbags', label: 'Handbags' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#19100B] text-white shadow-xs'
                    : 'bg-[#F3EFEA] text-[#4A3B30] hover:bg-[#EAE3D9]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-3.5 bg-[#19100B] text-[#FAF8F5] font-serif text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#382216] transition-colors shadow-md inline-flex items-center gap-2"
          >
            <span>View Full Catalogue ({products.length} Leather Items)</span>
            <ArrowRight className="w-4 h-4 text-[#D8BA73]" />
          </button>
        </div>
      </section>

      {/* 4. Bespoke Monogramming Studio Callout Banner */}
      <section className="bg-[#FAF6EE] border-y border-[#E8E1D5] py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C522F] font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#BFA054]" /> Personalize Your Leather Heirloom
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#19100B] leading-tight">
                Complimentary Hot-Stamp Monogramming in 22K Gold or Blind Emboss.
              </h2>
              <p className="text-xs sm:text-sm text-[#6A5B4C] leading-relaxed">
                Add an indelible touch of distinction. We hand-set solid brass typographical dies heated to 130°C to press your initials directly into the full-grain leather fibers at our Sharif Complex Gulgasht workshop.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={onOpenMonogramModal}
                  className="px-6 py-3 bg-[#19100B] text-[#FAF8F5] rounded-xs text-xs font-bold uppercase tracking-wider hover:bg-[#382216] transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D8BA73]" />
                  <span>Launch Monogram Simulator</span>
                </button>
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-5 py-3 border border-[#DCD3C5] bg-white text-[#19100B] rounded-xs text-xs font-semibold hover:bg-[#F3EFEA] transition-colors"
                >
                  Browse Monogrammable Items
                </button>
              </div>
            </div>

            {/* Visual Deboss Sample */}
            <div className="lg:col-span-5 bg-[#25160E] rounded-xl p-8 border border-[#BFA054]/30 text-center relative overflow-hidden shadow-xl">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#D8BA73] mb-2 font-mono">
                JAFFERJEES ATELIER • MULTAN
              </div>
              <div className="text-5xl font-serif font-bold text-[#ECC870] tracking-[0.3em] my-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                M.Z.T
              </div>
              <div className="text-xs text-[#D8CCA8] mt-2 font-serif italic">
                22K Hot-Stamping on Full-Grain Espresso Leather
              </div>
              <div className="mt-4 pt-4 border-t border-[#382216] flex justify-center gap-6 text-[11px] text-[#A3927B]">
                <span>✓ Solid Brass Die</span>
                <span>✓ Permanent Patina</span>
                <span>✓ Zero Extra Cost</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Jafferjees Leather Standard (Craft Story) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C522F] font-bold">
            Uncompromising Standards
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#19100B] mt-1">
            The Anatomy of a Jafferjees Leather Good
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6B5C] mt-2">
            Every stitch, rivet, and raw edge is executed with century-old precision to ensure decades of daily service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-lg border border-[#EAE3D9] space-y-3 relative">
            <span className="font-serif text-3xl font-bold text-[#DCD3C5]">01</span>
            <h3 className="font-serif text-base font-bold text-[#19100B]">Selected Full-Grain Hides</h3>
            <p className="text-xs text-[#7A6B5C] leading-relaxed">
              We reject buffed and corrected leathers, preserving the natural hair-follicle grain that develops a rich, lustrous patina with age.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-[#EAE3D9] space-y-3 relative">
            <span className="font-serif text-3xl font-bold text-[#DCD3C5]">02</span>
            <h3 className="font-serif text-base font-bold text-[#19100B]">Vegetable Tannin Aging</h3>
            <p className="text-xs text-[#7A6B5C] leading-relaxed">
              Tanned using natural chestnut and quebracho bark extracts over 40 days, delivering supple strength and an unmistakable earthy aroma.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-[#EAE3D9] space-y-3 relative">
            <span className="font-serif text-3xl font-bold text-[#DCD3C5]">03</span>
            <h3 className="font-serif text-base font-bold text-[#19100B]">Hand-Burnished Edges</h3>
            <p className="text-xs text-[#7A6B5C] leading-relaxed">
              Raw leather edges are hand-beveled, triple-coated with natural wax, and polished under friction to seal against moisture and fraying.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-[#EAE3D9] space-y-3 relative">
            <span className="font-serif text-3xl font-bold text-[#DCD3C5]">04</span>
            <h3 className="font-serif text-base font-bold text-[#19100B]">Solid Brass Hardware</h3>
            <p className="text-xs text-[#7A6B5C] leading-relaxed">
              Japanese YKK heavy-gauge zippers, custom die-cast buckles, and reinforced stress points guaranteed against breakage.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Sharif Complex Gulgasht Multan Store Invitation */}
      <section className="bg-[#19100B] text-[#FAF8F5] py-14 border-t border-[#382216]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#D8BA73] font-bold">
                Exclusive Multan Showroom
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Visit Our Sharif Complex Gulgasht Boutique
              </h2>
              <p className="text-xs sm:text-sm text-[#D0C3B0] leading-relaxed">
                Step into our air-conditioned showroom in Peer Khurshid Colony to experience the weight of our briefcases, test wallet card slots, and receive in-person initial debossing while you wait.
              </p>
              <div className="space-y-2 text-xs text-[#D8CCA8] pt-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D8BA73] shrink-0 mt-0.5" />
                  <span>{siteConfig.address.fullAddress}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#D8BA73] shrink-0" />
                  <span>Mon – Sat: 11:00 AM – 10:00 PM • Sunday: 3:00 PM – 10:00 PM</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#D8BA73] shrink-0" />
                  <span>Showroom Telephone: <strong className="text-white">{siteConfig.contactNumber}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 bg-[#FAF8F5] text-[#19100B] font-serif text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-white transition-colors"
              >
                Directions & Store Hours
              </button>
              <a
                href={getWhatsAppUrl("Hello Jafferjees Multan, I would like to visit the Sharif Complex showroom.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#25D366]/20 border border-emerald-500/40 text-emerald-300 font-serif text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#25D366]/30 transition-colors text-center"
              >
                WhatsApp Multan Concierge
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
