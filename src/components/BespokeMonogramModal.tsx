import React, { useState } from 'react';
import { X, Sparkles, Check, ShieldCheck, Heart } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface BespokeMonogramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyMonogram?: (initials: string, foilType: 'blind' | 'gold' | 'silver') => void;
}

export const BespokeMonogramModal: React.FC<BespokeMonogramModalProps> = ({
  isOpen,
  onClose,
  onApplyMonogram
}) => {
  const [initials, setInitials] = useState('M.Z.T');
  const [foilType, setFoilType] = useState<'blind' | 'gold' | 'silver'>('gold');
  const [leatherTone, setLeatherTone] = useState<'espresso' | 'cognac' | 'black' | 'tan'>('espresso');

  if (!isOpen) return null;

  const leatherBg = {
    espresso: '#23150D',
    cognac: '#68361C',
    black: '#141416',
    tan: '#9E6A38'
  }[leatherTone];

  const foilStyles = {
    blind: 'text-[#0E0704] drop-shadow-[0_1px_1px_rgba(255,255,255,0.15)] font-serif',
    gold: 'text-[#ECC870] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] font-serif',
    silver: 'text-[#E0E2EC] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] font-serif'
  }[foilType];

  const handleApply = () => {
    if (onApplyMonogram && initials.trim()) {
      onApplyMonogram(initials.trim().toUpperCase(), foilType);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD3C5] max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-[#19100B] text-white flex items-center justify-between border-b border-[#382216]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#BFA054]" />
            <div>
              <h3 className="font-serif text-base font-bold text-white tracking-wide">
                Bespoke Leather Monogramming
              </h3>
              <p className="text-[10px] text-[#A3927B]">Sharif Complex Gulgasht • Multan Atelier</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#D8CCA8] hover:text-white hover:bg-[#25160E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Interactive Live Deboss Leather Simulator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#7A6B5C]">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Live Atelier Preview</span>
              <span>Hot-stamp Brass Die</span>
            </div>

            <div
              className="w-full h-36 rounded-lg flex flex-col items-center justify-center p-4 transition-colors relative overflow-hidden shadow-inner border border-white/10"
              style={{ backgroundColor: leatherBg }}
            >
              {/* Subtle leather texture grain */}
              <div className="absolute inset-0 bg-radial from-transparent to-black/30 pointer-events-none" />

              <div className="relative z-10 text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 block mb-1">
                  JAFFERJEES
                </span>
                <span className={`text-4xl tracking-[0.25em] font-bold ${foilStyles}`}>
                  {initials || 'YOUR INITIALS'}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-white/40 block mt-1">
                  MULTAN
                </span>
              </div>

              <div className="absolute bottom-2 right-3 text-[10px] text-white/40 font-mono">
                {foilType.toUpperCase()} EMBOSS
              </div>
            </div>
          </div>

          {/* Controls: Initials Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#19100B]">
              Enter Your Initials (Max 4 characters):
            </label>
            <input
              type="text"
              maxLength={6}
              value={initials}
              onChange={(e) => setInitials(e.target.value.toUpperCase())}
              placeholder="e.g. M.Z or J.A"
              className="w-full px-3 py-2 bg-white rounded-md border border-[#DCD3C5] text-sm font-serif tracking-widest focus:outline-none focus:border-[#8C522F]"
            />
          </div>

          {/* Controls: Foil Options */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#19100B]">
              Select Stamping Finish:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFoilType('gold')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  foilType === 'gold'
                    ? 'border-[#BFA054] bg-[#FBF6E9] shadow-xs'
                    : 'border-[#EAE3D9] bg-white hover:border-[#DCD3C5]'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#9E7D3B] to-[#D8BA73] mb-1" />
                <span className="block text-xs font-bold text-[#19100B]">22K Gold Foil</span>
                <span className="text-[10px] text-stone-500">Most Popular</span>
              </button>

              <button
                type="button"
                onClick={() => setFoilType('blind')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  foilType === 'blind'
                    ? 'border-[#8C522F] bg-[#FAF6EE] shadow-xs'
                    : 'border-[#EAE3D9] bg-white hover:border-[#DCD3C5]'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-[#3B2216] mb-1" />
                <span className="block text-xs font-bold text-[#19100B]">Blind Deboss</span>
                <span className="text-[10px] text-stone-500">Classic Understated</span>
              </button>

              <button
                type="button"
                onClick={() => setFoilType('silver')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  foilType === 'silver'
                    ? 'border-stone-400 bg-stone-50 shadow-xs'
                    : 'border-[#EAE3D9] bg-white hover:border-[#DCD3C5]'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-stone-400 to-stone-200 mb-1" />
                <span className="block text-xs font-bold text-[#19100B]">Sterling Foil</span>
                <span className="text-[10px] text-stone-500">Contemporary</span>
              </button>
            </div>
          </div>

          {/* Leather Tone Preview Switcher */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#19100B]">
              Preview on Leather Color:
            </label>
            <div className="flex gap-2">
              {[
                { id: 'espresso', label: 'Espresso', hex: '#23150D' },
                { id: 'cognac', label: 'Cognac', hex: '#68361C' },
                { id: 'black', label: 'Classic Noir', hex: '#141416' },
                { id: 'tan', label: 'Saddle Tan', hex: '#9E6A38' }
              ].map(tone => (
                <button
                  key={tone.id}
                  type="button"
                  onClick={() => setLeatherTone(tone.id as any)}
                  className={`flex-1 py-1.5 px-2 rounded-md border text-xs flex items-center justify-center gap-1.5 ${
                    leatherTone === tone.id
                      ? 'border-[#8C522F] bg-white font-bold shadow-xs'
                      : 'border-transparent text-stone-600 hover:bg-white/60'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tone.hex }} />
                  <span className="text-[11px]">{tone.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-[#F4EFEB] rounded-lg border border-[#E8E1D5] text-[11px] text-[#6A5B4C] flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8C522F] shrink-0 mt-0.5" />
            <span>
              All monogramming is personally executed in our Sharif Complex Gulgasht Multan store using heated solid brass dies to ensure lifetime impression permanence.
            </span>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 border border-[#DCD3C5] rounded-xs text-xs font-semibold text-[#19100B] hover:bg-[#F3EFEA]"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex-1 py-2.5 bg-[#19100B] hover:bg-[#382216] text-white rounded-xs text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4 text-[#D8BA73]" />
              <span>Apply to Selection</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
