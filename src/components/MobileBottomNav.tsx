import React from 'react';
import { Home, ShoppingBag, Sparkles, Heart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface MobileBottomNavProps {
  currentPage?: string;
  activePage?: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenCart?: () => void;
  onOpenMonogramModal?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage: propCurrentPage,
  activePage,
  onNavigate,
  onOpenCart,
  onOpenMonogramModal
}) => {
  const currentPage = activePage || propCurrentPage || 'home';
  const { totalQuantity } = useCart();
  const { wishlist } = useWishlist();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#EAE3D9] px-2 py-1.5 flex items-center justify-around shadow-lg no-print">
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
          currentPage === 'home' ? 'text-[#8C522F]' : 'text-stone-500'
        }`}
      >
        <Home className="w-4 h-4 mb-0.5" />
        <span>Boutique</span>
      </button>

      <button
        onClick={() => onNavigate('shop')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
          currentPage === 'shop' ? 'text-[#8C522F]' : 'text-stone-500'
        }`}
      >
        <ShoppingBag className="w-4 h-4 mb-0.5" />
        <span>Leathers</span>
      </button>

      <button
        onClick={onOpenMonogramModal ? onOpenMonogramModal : () => onNavigate('bespoke-atelier')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors ${
          currentPage === 'bespoke-atelier' ? 'text-[#8C522F]' : 'text-[#8C522F]'
        }`}
      >
        <div className="w-7 h-7 rounded-full bg-[#19100B] text-[#D8BA73] flex items-center justify-center -mt-3 shadow-sm border border-[#8C522F]/30">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <span className="mt-0.5 text-[9px] font-bold">Monogram</span>
      </button>

      <button
        onClick={() => onNavigate('account')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] font-semibold transition-colors relative ${
          currentPage === 'account' ? 'text-[#8C522F]' : 'text-stone-500'
        }`}
      >
        <Heart className="w-4 h-4 mb-0.5" />
        <span>Saved</span>
        {wishlist.length > 0 && (
          <span className="absolute top-0.5 right-1 w-3.5 h-3.5 rounded-full bg-[#8C522F] text-white text-[8px] flex items-center justify-center font-bold">
            {wishlist.length}
          </span>
        )}
      </button>

      <button
        onClick={onOpenCart}
        className="flex flex-col items-center py-1 px-2 text-[10px] font-semibold text-stone-500 relative transition-colors"
      >
        <ShoppingBag className="w-4 h-4 mb-0.5" />
        <span>Bag</span>
        {totalQuantity > 0 && (
          <span className="absolute top-0.5 right-1 w-3.5 h-3.5 rounded-full bg-[#19100B] text-[#FAF8F5] text-[8px] flex items-center justify-center font-bold">
            {totalQuantity}
          </span>
        )}
      </button>
    </div>
  );
};
