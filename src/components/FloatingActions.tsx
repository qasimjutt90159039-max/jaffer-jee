import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowUp, Sparkles, MapPin } from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

interface FloatingActionsProps {
  onNavigate: (page: string) => void;
  onOpenMonogramModal?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onNavigate,
  onOpenMonogramModal
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto w-10 h-10 rounded-full bg-[#19100B] text-[#FAF8F5] flex items-center justify-center shadow-lg hover:bg-[#382216] transition-all hover:scale-105"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4 text-[#D8BA73]" />
        </button>
      )}

      {/* Monogram preview button */}
      {onOpenMonogramModal && (
        <button
          onClick={onOpenMonogramModal}
          className="pointer-events-auto hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-[#19100B] border border-[#DCD3C5] shadow-lg hover:bg-[#FAF8F5] transition-all hover:scale-105 text-xs font-semibold"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#BFA054]" />
          <span>Monogram Studio</span>
        </button>
      )}

      {/* Direct Call to Multan Showroom */}
      <a
        href={`tel:${siteConfig.contactNumber}`}
        className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25160E] hover:bg-[#382216] text-[#FAF8F5] shadow-xl transition-all hover:scale-105 text-xs font-semibold border border-[#BFA054]/40"
      >
        <Phone className="w-3.5 h-3.5 text-[#D8BA73]" />
        <span>Call: {siteConfig.contactNumber}</span>
      </a>

      {/* Direct WhatsApp Callout */}
      <a
        href={getWhatsAppUrl("Hello Jafferjees Multan, I would like to inquire about your leather collection.")}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl transition-all hover:scale-110 relative group"
        title="Chat with Jafferjees Multan on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#19100B] text-white text-[11px] font-medium px-2.5 py-1 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
          WhatsApp Multan Store
        </span>
      </a>
    </div>
  );
};
