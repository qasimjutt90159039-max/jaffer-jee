import React, { useState } from 'react';
import {
  Sparkles,
  Building,
  CheckCircle2,
  Gift,
  Phone,
  FileText,
  ArrowRight,
  ShieldCheck,
  Award,
  Send,
  MessageSquare
} from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

interface CorporateGiftsPageProps {
  onNavigate: (page: string) => void;
}

export const CorporateGiftsPage: React.FC<CorporateGiftsPageProps> = ({ onNavigate }) => {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState('25 - 50 Pieces');
  const [articleType, setArticleType] = useState('Executive Wallets & Cardholders');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !phone) return;
    setIsSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          phone,
          email,
          subject: `Corporate Gifting Request: ${companyName} (${quantity})`,
          message: `Company: ${companyName}\nArticle Type: ${articleType}\nQuantity: ${quantity}\nNotes: ${notes}`
        })
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans space-y-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C522F] font-bold">
          Executive & Corporate Services
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#19100B]">
          Corporate Leather Gifting & Custom Brass Stamping
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6B5C] leading-relaxed">
          Elevate your corporate relationships with timeless full-grain leather articles. Custom brass dies bearing your organization’s emblem, paired with individual patron monogramming and signature gift packaging.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl border border-[#EAE3D9] space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xs bg-[#FAF6EE] border border-[#E8E1D5] text-[#8C522F] flex items-center justify-center">
            <Building className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-[#19100B]">Custom Brass Insignia Dies</h3>
          <p className="text-xs text-[#7A6B5C] leading-relaxed">
            We precision-machine custom brass debossing dies carrying your corporate logo or crest. Articles are heat-stamped with either deep blind deboss or 22K gold leaf.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-[#EAE3D9] space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xs bg-[#FAF6EE] border border-[#E8E1D5] text-[#8C522F] flex items-center justify-center">
            <Gift className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-[#19100B]">Signature Presentation Box</h3>
          <p className="text-xs text-[#7A6B5C] leading-relaxed">
            Every executive gift is individually presented in Jafferjees’ signature forest-green box with protective cotton dust flannel, wax seal card, and emerald satin ribbon.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-[#EAE3D9] space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xs bg-[#FAF6EE] border border-[#E8E1D5] text-[#8C522F] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-[#19100B]">Tiered Institutional Pricing</h3>
          <p className="text-xs text-[#7A6B5C] leading-relaxed">
            Volume commercial rates tailored for annual general meetings, diplomatic delegates, banking privileges, and executive milestones across Multan and nationwide.
          </p>
        </div>
      </div>

      {/* Inquiry Form & Consultation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#EAE3D9] p-8 shadow-xs">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#19100B] mb-1">
            Request an Executive Corporate Proposal
          </h2>
          <p className="text-xs text-[#7A6B5C] mb-6">
            Share your requirements below and our Multan corporate relations manager will contact you with physical sample sets and bulk pricing.
          </p>

          {submitted ? (
            <div className="p-8 text-center bg-[#FAF6EE] rounded-lg border border-[#E8E1D5] space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#19100B]">Inquiry Received</h3>
              <p className="text-xs text-[#6A5B4C]">
                Thank you, {contactName}. A formal executive catalog and digital mockups for {companyName} will be shared shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Organization / Enterprise *</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Meezan Bank / Multan Chamber"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Contact Officer Name *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Asad Raza"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Official Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="corporate@domain.com"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Preferred Article Type</label>
                  <select
                    value={articleType}
                    onChange={(e) => setArticleType(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs font-semibold focus:outline-none"
                  >
                    <option value="Executive Wallets & Cardholders">Executive Wallets & Cardholders</option>
                    <option value="Diplomatic Leather Briefcases">Diplomatic Leather Briefcases</option>
                    <option value="Desk Pads & Luxury Leather Organizers">Desk Pads & Luxury Organizers</option>
                    <option value="Passport Cases & Travel Document Wallets">Passport Cases & Travel Wallets</option>
                    <option value="Bespoke Executive Gift Sets">Curated Executive Gift Sets</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Estimated Quantity</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs font-semibold focus:outline-none"
                  >
                    <option value="15 - 30 Pieces">15 - 30 Pieces</option>
                    <option value="30 - 75 Pieces">30 - 75 Pieces</option>
                    <option value="75 - 200 Pieces">75 - 200 Pieces</option>
                    <option value="200+ Pieces (Custom Die Included)">200+ Pieces (Custom Die Included)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Timeline & Special Requirements</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Target delivery date, packaging requests, or logo deboss details..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#19100B] hover:bg-[#382216] disabled:opacity-50 text-white font-serif text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Send className="w-4 h-4 text-[#D8BA73]" />
                <span>Submit Corporate Gifting Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Multan Showroom Contact Box */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 bg-[#FAF6EE] rounded-xl border border-[#E8E1D5] space-y-4">
            <h3 className="font-serif text-base font-bold text-[#19100B]">
              Direct Executive Desk • Multan
            </h3>
            <p className="text-xs text-[#7A6B5C] leading-relaxed">
              If your corporate event or diplomatic delegation requires immediate sample review, you are welcome to visit our Sharif Complex Gulgasht showroom or connect directly via WhatsApp.
            </p>

            <div className="space-y-2 text-xs text-stone-800 pt-2 border-t border-stone-200">
              <p><strong>Showroom Address:</strong> {siteConfig.address.fullAddress}</p>
              <p><strong>Direct Phone:</strong> {siteConfig.contactNumber}</p>
              <p><strong>Lead Time:</strong> 5 to 7 days for customized brass die production</p>
            </div>

            <a
              href={getWhatsAppUrl("Hello Jafferjees Multan, I would like to inquire regarding a corporate leather gifting order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xs text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Message Corporate Desk on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
