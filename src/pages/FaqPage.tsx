import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageSquare, Award, ShieldCheck, MapPin } from 'lucide-react';
import { getWhatsAppUrl, siteConfig } from '../config/siteConfig';

interface FaqPageProps {
  onNavigate: (page: string) => void;
  onOpenMonogramModal?: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onOpenMonogramModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is all Jafferjees leather 100% genuine full-grain?',
      a: 'Yes, without exception. Jafferjees crafts its articles exclusively from top-grade full-grain and top-grain hides, including supple calfskin, vegetable-tanned bovine leathers, and scratch-resistant cross-grain saffiano. We never use bonded leather, PU, or synthetic substitutes. Each hide is selected by master tanners and ages gracefully with a rich patina.'
    },
    {
      q: 'How does the complimentary bespoke monogramming work?',
      a: 'We offer complimentary hot-stamping on all eligible leather goods. You may customize your piece with up to 4 initials stamped in 22K genuine gold foil, sterling silver foil, or a subtle blind deboss. In our Sharif Complex Gulgasht showroom in Multan, monogramming can be executed on-the-spot in approximately 15 to 20 minutes.'
    },
    {
      q: 'Where is the Multan showroom located and what are the opening hours?',
      a: 'Our Multan flagship is situated at Sharif Complex, Shop # G 06-08, Peer Khurshid Colony Chah Usman Wala, Gulgasht, Multan, 60700, Pakistan (Plus code: 6F8C+4WX). We welcome patrons Monday through Saturday from 11:00 AM to 10:00 PM, and Sundays from 03:00 PM to 10:00 PM.'
    },
    {
      q: 'Do you offer Cash on Delivery (COD) across Pakistan?',
      a: 'Yes! We ship nationwide with Cash on Delivery (COD) via premium express courier services to all cities across Pakistan, including Multan, Lahore, Islamabad, Karachi, Faisalabad, Peshawar, and Quetta. Orders above Rs. 5,000 enjoy complimentary express shipping.'
    },
    {
      q: 'Can I order online and collect in-store at Sharif Complex Gulgasht?',
      a: 'Certainly. During checkout, simply select "Multan Store Pickup". Your ordered leather items will be hand-inspected, personalized with your desired initials, gift-boxed with our signature velvet ribbon, and made ready for collection within 2 hours.'
    },
    {
      q: 'What is covered under the Jafferjees Lifetime Stitch & Hardware Warranty?',
      a: 'Every genuine Jafferjees article includes a lifetime warranty covering structural seam stitching, solid brass hardware, and zipper mechanisms. If a stitch or rivet ever gives way through normal wear, bring it to our Multan showroom or ship it to our atelier for complimentary restoration.'
    },
    {
      q: 'Do you accommodate corporate gifting and bulk executive custom debossing?',
      a: 'Yes, Jafferjees is the trusted partner for Pakistan’s leading financial institutions, multinational corporations, and prestigious events. We create bespoke custom brass dies with your corporate insignia for executive organizers, cardholders, desk sets, and diplomatic gifts with bulk tiered pricing.'
    },
    {
      q: 'How should I care for and condition my leather articles in Multan’s climate?',
      a: 'Given Multan’s warm climate, full-grain leather benefits from a light application of neutral beeswax or lanolin leather balm every 4 to 6 months to prevent dryness. Keep articles out of prolonged direct sunlight when storing. You are always welcome to bring your pieces to our Gulgasht showroom for complimentary conditioning.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C522F] font-bold">
          Sharif Complex Gulgasht • Multan
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#19100B]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-[#7A6B5C]">
          Everything you need to know about our leather selection, bespoke hot-stamping, warranty service, and nationwide delivery.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-lg border border-[#EAE3D9] overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-bold text-[#19100B] hover:text-[#8C522F] transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 shrink-0 text-[#8C522F]" /> : <ChevronDown className="w-5 h-5 shrink-0 text-stone-400" />}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-[#6A5B4C] leading-relaxed border-t border-stone-100 font-sans">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Multan Help Callout */}
      <div className="p-6 bg-[#FAF6EE] rounded-xl border border-[#E8E1D5] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <strong className="font-serif text-base text-[#19100B] block">
            Have a Specific Question for Our Multan Showroom?
          </strong>
          <p className="text-xs text-[#7A6B5C]">
            Speak directly with our senior leather consultant at Sharif Complex Gulgasht.
          </p>
        </div>

        <a
          href={getWhatsAppUrl("Hello Jafferjees Multan, I have an inquiry regarding your leather collection.")}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xs text-xs font-bold flex items-center gap-2 shrink-0 transition-colors shadow-xs"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
