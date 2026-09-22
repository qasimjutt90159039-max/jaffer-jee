import React from 'react';
import { Award, ShieldCheck, MapPin, Sparkles, Clock, Heart } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface OurStoryPageProps {
  onNavigate: (page: string) => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C522F] font-bold">
          ESTABLISHED 1880 • CRAFTED IN PAKISTAN
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#19100B] leading-tight">
          A Century of Quiet Luxury & Master Leathercraft
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6B5C] leading-relaxed max-w-2xl mx-auto">
          For over 140 years, the house of Jafferjees has stood as the pinnacle of fine leather goods in Pakistan. From diplomatic dispatch cases to heirloom wallets, we honor time-honored artisanal mastery.
        </p>
      </div>

      {/* Visual Narrative Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="relative rounded-2xl overflow-hidden border border-[#EAE3D9] aspect-4/3 shadow-sm bg-stone-100">
          <img
            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80"
            alt="Handcrafting leather"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
            <span className="text-xs font-serif text-white tracking-widest uppercase">
              Tradition Passed Down Through Generations
            </span>
          </div>
        </div>

        <div className="space-y-5 text-xs text-[#6A5B4C] leading-relaxed">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C522F]">
            Artisanal Heritage
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#19100B]">
            Where Raw Bovine Hides Become Enduring Heirlooms
          </h2>
          <p>
            Unlike fast-fashion leather substitutes that peel within seasons, Jafferjees selects only top-grade full-grain and vegetable-tanned hides. These leathers preserve the organic pore structure and natural grain, allowing each piece to develop an exquisite patina unique to its owner’s journey.
          </p>
          <p>
            Each bag, wallet, and briefcase is hand-cut, reinforced at high-stress tension points, edge-burnished with natural carnauba wax, and finished with solid brass hardware designed to outlive trends.
          </p>
          <div className="pt-2 flex items-center gap-6 text-[#19100B]">
            <div>
              <strong className="font-serif text-2xl font-bold text-[#8C522F] block">1880</strong>
              <span className="text-[11px] text-stone-500">Year Founded</span>
            </div>
            <div className="h-8 w-px bg-stone-300" />
            <div>
              <strong className="font-serif text-2xl font-bold text-[#8C522F] block">100%</strong>
              <span className="text-[11px] text-stone-500">Genuine Full-Grain</span>
            </div>
            <div className="h-8 w-px bg-stone-300" />
            <div>
              <strong className="font-serif text-2xl font-bold text-[#8C522F] block">Lifetime</strong>
              <span className="text-[11px] text-stone-500">Stitch Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Multan Chapter */}
      <div className="bg-[#FAF6EE] rounded-2xl border border-[#E8E1D5] p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C522F]">
            The Multan Chapter
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#19100B]">
            Sharif Complex Gulgasht: Our Home in Multan
          </h2>
          <p className="text-xs text-[#7A6B5C] leading-relaxed">
            Located at Shop # G 06-08 in Sharif Complex, Peer Khurshid Colony, Gulgasht Multan, our boutique was established to serve the discerning patrons of South Punjab. Here, you are invited to feel the weights of different leather tannages, view the full color spectrum, and enjoy on-demand hot-stamping while you wait.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E8E1D5]">
          <div className="space-y-1">
            <strong className="font-serif text-sm font-bold text-[#19100B] block">Direct Boutique Care</strong>
            <p className="text-xs text-[#7A6B5C]">Complimentary lifetime conditioning and edge burnishing for any Jafferjees piece.</p>
          </div>

          <div className="space-y-1">
            <strong className="font-serif text-sm font-bold text-[#19100B] block">Live Hot-Stamping</strong>
            <p className="text-xs text-[#7A6B5C]">Witness your initials debossed in 22K gold leaf by our resident artisan.</p>
          </div>

          <div className="space-y-1">
            <strong className="font-serif text-sm font-bold text-[#19100B] block">Executive Privileges</strong>
            <p className="text-xs text-[#7A6B5C]">Bespoke consultation for wedding trousseaus, executive milestones, and corporate gifts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
