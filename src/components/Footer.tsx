import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Package,
  Heart
} from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

interface FooterProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#19100B] text-[#D8CCA8] border-t border-[#382216] pt-14 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heritage Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#382216]/80 text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-sm bg-[#25160E] text-[#BFA054] border border-[#BFA054]/30 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">100% Genuine Leather</h4>
              <p className="text-[#A3927B] mt-0.5">Full-grain & top-grain Pakistani leather with artisan patina</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-sm bg-[#25160E] text-[#BFA054] border border-[#BFA054]/30 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Bespoke Monogramming</h4>
              <p className="text-[#A3927B] mt-0.5">Complimentary gold & blind hot-stamp embossing on wallets & tags</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-sm bg-[#25160E] text-[#BFA054] border border-[#BFA054]/30 shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Nationwide COD</h4>
              <p className="text-[#A3927B] mt-0.5">Free delivery across Pakistan on orders above Rs. 5,000</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-sm bg-[#25160E] text-[#BFA054] border border-[#BFA054]/30 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Lifetime Craft Guarantee</h4>
              <p className="text-[#A3927B] mt-0.5">Tested brass hardware, bonded stitching, and warranty</p>
            </div>
          </div>
        </div>

        {/* Primary Footer Links & Showroom Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Brand & Multan Store Details */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="cursor-pointer flex items-center gap-3 select-none"
            >
              <div className="w-10 h-10 rounded-sm bg-[#25160E] text-[#BFA054] flex flex-col items-center justify-center border border-[#BFA054]/40">
                <span className="font-serif text-lg font-bold">J</span>
                <span className="text-[7px] text-[#D8BA73] font-sans -mt-1">1880</span>
              </div>
              <div>
                <span className="block font-serif text-xl font-bold tracking-wider text-white leading-none">
                  JAFFERJEES
                </span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-[#BFA054] mt-1">
                  Sharif Complex Gulgasht • Multan
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A3927B] leading-relaxed max-w-sm">
              Since 1880, Jafferjees has epitomized legendary leather craftsmanship. Visit our dedicated boutique in Sharif Complex Gulgasht Multan to discover handcrafted briefcases, executive wallets, luxury handbags, and personalized corporate gifts.
            </p>

            <div className="space-y-2 text-xs text-[#A3927B]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#BFA054] shrink-0 mt-0.5" />
                <span>{siteConfig.address.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#BFA054] shrink-0" />
                <a href={`tel:${siteConfig.contactNumber}`} className="hover:text-white transition-colors">
                  Contact Number: <span className="text-white font-semibold">{siteConfig.contactNumber}</span>
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#BFA054] shrink-0" />
                <span>{siteConfig.openingHours.weekdays} | Sunday: {siteConfig.openingHours.sunday}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={getWhatsAppUrl("Hello Jafferjees Multan, I would like to inquire about your leather collection.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 transition-colors border border-emerald-500/40"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Chat with Multan Showroom</span>
              </a>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide mb-4">
              Leather Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('shop', 'wallets')} className="hover:text-white transition-colors">
                  Gentlemen's Wallets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'belts')} className="hover:text-white transition-colors">
                  Reversible & Dress Belts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'bags')} className="hover:text-white transition-colors">
                  Business Briefcases & Messengers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'handbags')} className="hover:text-white transition-colors">
                  Women's Handbags & Totes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'mens-accessories')} className="hover:text-white transition-colors">
                  Cardholders & Key Fobs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'gifts')} className="hover:text-white transition-colors">
                  Executive Desk & Gift Sets
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier Services */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide mb-4">
              Bespoke Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors font-medium text-[#D8BA73]">
                  Initials Monogramming
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Corporate & Executive Gifting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Sharif Complex In-Store Pickup
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Leather Care & Maintenance Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('track-order')} className="hover:text-white transition-colors">
                  Order Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Support */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide mb-4">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Multan Showroom Location
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faqs')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('account')} className="hover:text-white transition-colors">
                  Customer Portal / Sign In
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('wishlist')} className="hover:text-white transition-colors">
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors text-[#A3927B] opacity-80">
                  Store Management Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#382216] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#8C7A6B]">
          <p>© {new Date().getFullYear()} Jafferjees - Sharif Complex Gulgasht- Multan. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Payment: Cash on Delivery (COD) • Direct Bank Transfer • In-Store Card</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
