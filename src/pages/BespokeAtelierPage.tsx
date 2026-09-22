import React from 'react';
import {
  Sparkles,
  Award,
  ShieldCheck,
  Clock,
  Layers,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  MapPin
} from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

interface BespokeAtelierPageProps {
  onNavigate: (page: string, slug?: string) => void;
  onOpenMonogramModal: () => void;
}

export const BespokeAtelierPage: React.FC<BespokeAtelierPageProps> = ({
  onNavigate,
  onOpenMonogramModal
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C522F] font-bold">
          Sharif Complex Gulgasht • Multan Atelier
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#19100B] leading-tight">
          The Art of Bespoke Leather Personalization
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6B5C] leading-relaxed max-w-2xl mx-auto">
          Every Jafferjees article tells a unique story. With hand-set solid brass type, 130°C temperature-calibrated heat presses, and genuine 22K gold leaf, we imprint your initials for eternity.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenMonogramModal}
            className="px-6 py-3.5 bg-[#19100B] hover:bg-[#382216] text-[#FAF8F5] text-xs font-serif font-bold uppercase tracking-wider rounded-xs flex items-center gap-2 shadow-sm transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#D8BA73]" />
            <span>Launch Monogram Simulator</span>
          </button>

          <button
            onClick={() => onNavigate('shop')}
            className="px-6 py-3.5 border border-[#DCD3C5] bg-white hover:bg-stone-50 text-[#19100B] text-xs font-serif font-bold uppercase tracking-wider rounded-xs transition-colors"
          >
            Explore Monogrammable Collection
          </button>
        </div>
      </div>

      {/* 3 Debossing Variations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl border border-[#EAE3D9] space-y-4 shadow-xs">
          <div className="h-28 rounded-lg bg-[#24150D] flex items-center justify-center border border-black/20">
            <span className="font-serif text-3xl font-bold tracking-widest text-[#ECC870] drop-shadow-md">
              M.Z.T
            </span>
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-[#19100B]">22K Genuine Gold Foil</h3>
            <p className="text-xs text-[#7A6B5C] mt-1 leading-relaxed">
              Thin beaten gold leaf bonded to full-grain leather under heat. Radiant, lustrous, and timelessly regal.
            </p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl border border-[#EAE3D9] space-y-4 shadow-xs">
          <div className="h-28 rounded-lg bg-[#24150D] flex items-center justify-center border border-black/20">
            <span className="font-serif text-3xl font-bold tracking-widest text-[#150B06] drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)]">
              A.R.K
            </span>
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-[#19100B]">Understated Blind Deboss</h3>
            <p className="text-xs text-[#7A6B5C] mt-1 leading-relaxed">
              Pure thermal pressure indentation with zero color pigment. Tactile, discreet, and favored by quiet luxury purists.
            </p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl border border-[#EAE3D9] space-y-4 shadow-xs">
          <div className="h-28 rounded-lg bg-[#141416] flex items-center justify-center border border-black/20">
            <span className="font-serif text-3xl font-bold tracking-widest text-[#E0E2EC] drop-shadow-md">
              H.F
            </span>
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-[#19100B]">Sterling Silver Foil</h3>
            <p className="text-xs text-[#7A6B5C] mt-1 leading-relaxed">
              Crisp metallic silver foil that creates exceptional contrast against deep midnight black and navy leather surfaces.
            </p>
          </div>
        </div>
      </div>

      {/* The 4 Step Process */}
      <div className="bg-[#FAF6EE] rounded-2xl border border-[#E8E1D5] p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C522F]">
            The Master Technique
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#19100B]">
            How We Personalize in Multan
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <span className="font-serif text-2xl font-bold text-[#8C522F]">01.</span>
            <h4 className="font-serif text-sm font-bold text-[#19100B]">Brass Type Composition</h4>
            <p className="text-xs text-[#7A6B5C] leading-relaxed">
              Traditional serif movable brass letters are arranged in reverse into the heated press chase.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-serif text-2xl font-bold text-[#8C522F]">02.</span>
            <h4 className="font-serif text-sm font-bold text-[#19100B]">Thermal Calibration</h4>
            <p className="text-xs text-[#7A6B5C] leading-relaxed">
              The press is brought to 130°C to activate the thermal binder without scorching delicate grain fibers.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-serif text-2xl font-bold text-[#8C522F]">03.</span>
            <h4 className="font-serif text-sm font-bold text-[#19100B]">Even Mechanical Pressure</h4>
            <p className="text-xs text-[#7A6B5C] leading-relaxed">
              Precision balanced descent imprints the leaf foil directly into the leather substrate.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-serif text-2xl font-bold text-[#8C522F]">04.</span>
            <h4 className="font-serif text-sm font-bold text-[#19100B]">Inspection & Gift Boxing</h4>
            <p className="text-xs text-[#7A6B5C] leading-relaxed">
              Careful brush removal of excess foil, followed by packing in our green gift box with velvet ribbon.
            </p>
          </div>
        </div>
      </div>

      {/* Multan Showroom Experience */}
      <div className="p-8 bg-white rounded-xl border border-[#EAE3D9] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8C522F]">
            <MapPin className="w-4 h-4" />
            <span>Sharif Complex Gulgasht, Multan</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#19100B]">
            Watch Your Initials Being Stamped Live in Our Showroom
          </h3>
          <p className="text-xs text-[#7A6B5C] leading-relaxed">
            Visit our Multan store to select your leather hide, choose your foil tone, and watch our craftsman deboss your heirloom on the spot in 15 minutes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href={siteConfig.address.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-[#19100B] hover:bg-[#382216] text-[#FAF8F5] text-xs font-serif font-bold uppercase tracking-wider rounded-xs text-center transition-colors shadow-xs"
          >
            Visit Multan Boutique
          </a>

          <a
            href={getWhatsAppUrl("Hello Jafferjees Multan, I would like to book a complimentary in-store monogramming appointment.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xs flex items-center justify-center gap-2 text-center transition-colors shadow-xs"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Reserve on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
