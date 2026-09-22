import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Send,
  Building,
  ArrowRight
} from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

interface ContactPageProps {
  onNavigate: (page: string) => void;
  onOpenMonogramModal?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onOpenMonogramModal
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Leather Goods Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, subject, message })
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      }
    } catch (err) {
      console.error(err);
      setSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C522F] font-bold">
          Sharif Complex Gulgasht • Multan Atelier
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#19100B]">
          Visit Our Multan Leather Showroom
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6B5C]">
          Experience century-old handcrafted leather artistry in person. Explore bespoke briefcases, personalized wallets, and complimentary on-the-spot monogramming.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Store Coordinates & Timings */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white rounded-xl border border-[#EAE3D9] space-y-6 shadow-xs">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#19100B]">
                Store Coordinates
              </h3>
              <p className="text-xs text-[#7A6B5C] mt-0.5">
                Peer Khurshid Colony, Gulgasht Multan
              </p>
            </div>

            <div className="space-y-4 text-xs text-[#5C4D3E]">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#FAF6EE] border border-[#E0D7C9] text-[#8C522F] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#19100B] block text-sm font-serif">Boutique Address:</strong>
                  <p className="mt-0.5 leading-relaxed">{siteConfig.address.fullAddress}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Plus Code: {siteConfig.address.plusCode}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#FAF6EE] border border-[#E0D7C9] text-[#8C522F] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#19100B] block text-sm font-serif">Showroom Contact:</strong>
                  <a
                    href={`tel:${siteConfig.contactNumber}`}
                    className="hover:text-[#8C522F] font-bold text-sm text-[#19100B]"
                  >
                    {siteConfig.contactNumber}
                  </a>
                  <p className="text-[11px] text-stone-500 mt-0.5">Direct line to Multan showroom manager</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xs bg-[#FAF6EE] border border-[#E0D7C9] text-[#8C522F] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-[#19100B] block text-sm font-serif">Visiting Hours:</strong>
                  <p className="mt-0.5">{siteConfig.hours.weekdays}</p>
                  <p className="text-stone-600">{siteConfig.hours.sunday}</p>
                </div>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={siteConfig.address.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#19100B] hover:bg-[#382216] text-[#FAF8F5] text-xs font-serif font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors text-center shadow-xs"
              >
                <MapPin className="w-4 h-4 text-[#D8BA73]" />
                <span>Get Google Maps Directions</span>
              </a>

              <a
                href={getWhatsAppUrl("Hello Jafferjees Multan, I would like to inquire about your leather store inventory.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#136630] text-xs font-bold rounded-xs flex items-center justify-center gap-2 border border-emerald-500/30 transition-colors text-center"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Multan Showroom</span>
              </a>
            </div>
          </div>

          {/* Complimentary In-Store Services */}
          <div className="p-5 bg-[#FAF6EE] rounded-xl border border-[#E8E1D5] space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#19100B] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#BFA054]" /> In-Store Atelier Privileges
            </h4>
            <ul className="text-xs text-[#6A5B4C] space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C522F]" />
                <span>Complimentary 22K Gold Foil Monogramming (Ready in 20 mins)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C522F]" />
                <span>Signature Forest Green Box & Velvet Ribbon Gift Wrapping</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C522F]" />
                <span>Complimentary Leather Edge Polishing & Conditioning</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C522F]" />
                <span>Corporate Gift & Bulk Executive Order Consultation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Message / Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#EAE3D9] p-8 shadow-xs">
          <div className="mb-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C522F]">
              Direct Inquiries
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#19100B] mt-0.5">
              Send a Message to Multan Showroom
            </h2>
            <p className="text-xs text-[#7A6B5C] mt-1">
              Have a question regarding leather stock, bespoke corporate orders, or wedding gift sets? Our Multan team responds within 2 business hours.
            </p>
          </div>

          {sent ? (
            <div className="p-8 text-center bg-[#FAF6EE] rounded-lg border border-[#E8E1D5] space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#19100B]">Message Received</h3>
              <p className="text-xs text-[#6A5B4C] max-w-sm mx-auto">
                Thank you for contacting Jafferjees Multan. Our showroom staff will contact you shortly on {phone}.
              </p>
              <button
                onClick={() => setSent(false)}
                className="px-5 py-2 bg-[#19100B] text-white text-xs font-semibold rounded-xs"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#19100B] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mian Tariq"
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#8C522F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#19100B] mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#8C522F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#19100B] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#8C522F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#19100B] mb-1">
                    Inquiry Type
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs font-semibold focus:outline-none focus:border-[#8C522F]"
                  >
                    <option value="Product Stock Inquiry">Product Stock in Multan</option>
                    <option value="Bespoke Monogramming">Personalized Monogramming</option>
                    <option value="Corporate / Executive Gifts">Corporate & Executive Gifts</option>
                    <option value="Wedding / Troussau Gift Sets">Wedding & Troussau Gift Sets</option>
                    <option value="Order Tracking & Delivery">Order Delivery Status</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#19100B] mb-1">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us which leather item or custom requirement you need..."
                  className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#8C522F]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#19100B] hover:bg-[#382216] disabled:opacity-50 text-white font-serif text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#D8BA73]" />
                <span>{isSubmitting ? 'Transmitting...' : 'Send Inquiry to Multan Atelier'}</span>
              </button>
            </form>
          )}

          {/* Interactive Map Visualizer */}
          <div className="mt-8 pt-6 border-t border-[#EAE3D9] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#19100B] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#8C522F]" /> Sharif Complex Location
              </span>
              <a
                href={siteConfig.address.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8C522F] hover:underline font-semibold"
              >
                Open in Google Maps App ↗
              </a>
            </div>

            <div className="w-full h-48 rounded-lg overflow-hidden border border-stone-200 bg-stone-100 relative">
              <iframe
                title="Jafferjees Sharif Complex Gulgasht Multan Location"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?q=Sharif+Complex+Peer+Khurshid+Colony+Gulgasht+Multan+Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full filter saturate-75"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
