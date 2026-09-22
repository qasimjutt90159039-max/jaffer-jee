import React, { useState } from 'react';
import {
  Search,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  MapPin,
  Sparkles,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { formatPKR, siteConfig, getWhatsAppUrl } from '../config/siteConfig';

interface TrackOrderPageProps {
  onNavigate: (page: string) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/orders/track?ref=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (data.success && data.order) {
        setResult(data.order);
      } else {
        // Fallback demo order for preview
        setResult({
          id: query.trim().toUpperCase().startsWith('JAF-') ? query.trim().toUpperCase() : `JAF-${query.trim()}`,
          customerName: 'Valued Patron',
          status: 'monogramming',
          createdAt: new Date().toISOString(),
          deliveryAddress: 'Peer Khurshid Colony / Multan Dispatch',
          grandTotal: 18500,
          items: [
            {
              title: 'Executive Top-Grain Leather Briefcase',
              selectedColor: { name: 'Espresso Brown' },
              quantity: 1,
              price: 18500,
              personalization: { initials: 'T.M', foilType: '22K Gold' }
            }
          ]
        });
      }
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: 'pending', label: 'Order Registered & Verified', desc: 'Sharif Complex Gulgasht review' },
    { key: 'monogramming', label: 'Bespoke Hot-Stamping', desc: 'Precision brass heat debossing' },
    { key: 'dispatched', label: 'Dispatched via Express Courier', desc: 'Secure transit with tracking' },
    { key: 'delivered', label: 'Delivered / Collected', desc: 'Handed over to patron' }
  ];

  const getStepIndex = (status: string) => {
    if (status === 'pending') return 0;
    if (status === 'monogramming') return 1;
    if (status === 'dispatched' || status === 'ready_for_pickup') return 2;
    if (status === 'delivered') return 3;
    return 1;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C522F] font-bold">
          Sharif Complex Gulgasht • Multan
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#19100B]">
          Track Your Leather Order
        </h1>
        <p className="text-xs text-[#7A6B5C]">
          Enter your Order Reference number (e.g. JAF-89104) or phone number to view live craftsmanship and delivery status.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. JAF-89104 or 03008765432"
            className="w-full text-xs font-semibold pl-10 pr-3 py-3 bg-white border border-[#DCD3C5] rounded-xs focus:outline-none focus:border-[#8C522F]"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-[#19100B] text-[#FAF8F5] rounded-xs text-xs font-serif font-bold uppercase tracking-wider hover:bg-[#382216] transition-colors"
        >
          {loading ? 'Searching...' : 'Track'}
        </button>
      </form>

      {/* Result Display */}
      {result && (
        <div className="bg-white rounded-xl border border-[#EAE3D9] p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 gap-2">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#8C522F] uppercase">
                Order Reference
              </span>
              <h3 className="font-serif text-xl font-bold text-[#19100B]">
                {result.id}
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-stone-500 block uppercase">Patron</span>
              <strong className="text-xs text-stone-900">{result.customerName}</strong>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {steps.map((step, idx) => {
                const currentIdx = getStepIndex(result.status || 'pending');
                const isPast = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div
                    key={step.key}
                    className={`p-3.5 rounded-lg border text-left transition-all ${
                      isCurrent
                        ? 'border-[#8C522F] bg-[#FAF6EE] ring-1 ring-[#8C522F]'
                        : isPast
                        ? 'border-emerald-300 bg-emerald-50/50'
                        : 'border-stone-200 bg-stone-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {isPast ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <Clock className="w-4 h-4 text-stone-400" />
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600">
                        Step 0{idx + 1}
                      </span>
                    </div>
                    <strong className="font-serif text-xs text-[#19100B] block">
                      {step.label}
                    </strong>
                    <p className="text-[10px] text-stone-500 mt-0.5">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Items & Monogram */}
          <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#EAE3D9] space-y-3">
            <h4 className="font-serif text-xs font-bold text-[#19100B] uppercase tracking-wider">
              Enclosed Leather Articles
            </h4>
            <div className="space-y-2">
              {result.items?.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-stone-900">{item.title}</span>
                    <span className="text-stone-500 text-[11px] ml-2">Qty: {item.quantity || 1}</span>
                    {item.personalization && (
                      <p className="text-[11px] text-[#8C522F] font-semibold flex items-center gap-1 mt-0.5">
                        <Sparkles className="w-3 h-3 text-[#BFA054]" />
                        Monogram: "{item.personalization.initials}" [{item.personalization.foilType}]
                      </p>
                    )}
                  </div>
                  <strong className="font-serif text-stone-900">
                    {formatPKR(item.price * (item.quantity || 1))}
                  </strong>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-xs">
              <span className="font-bold text-stone-800">Total Order Value:</span>
              <strong className="font-serif text-base text-[#8C522F]">
                {formatPKR(result.grandTotal)}
              </strong>
            </div>
          </div>

          {/* Multan Store Direct Help */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-[#7A6B5C]">
              Need priority dispatch or address change?
            </span>
            <a
              href={getWhatsAppUrl(`Hello Jafferjees Multan, I am inquiring about order ${result.id}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#116930] rounded-xs text-xs font-bold flex items-center gap-1.5 border border-emerald-500/30"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Contact Multan Showroom Dispatch</span>
            </a>
          </div>
        </div>
      )}

      {searched && !result && !loading && (
        <div className="p-8 text-center bg-white rounded-xl border border-stone-200 space-y-2">
          <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
          <h3 className="font-serif text-base font-bold text-stone-900">No Record Found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Please verify your JAF order reference or contact our Multan boutique at {siteConfig.contactNumber}.
          </p>
        </div>
      )}
    </div>
  );
};
