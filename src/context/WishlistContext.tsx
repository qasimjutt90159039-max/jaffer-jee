import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { initialProducts } from '../data/seedData';

interface WishlistContextType {
  wishlist: string[];
  wishlistIds: string[];
  wishlistProducts: Product[];
  toggleWishlist: (productOrId: string | Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jaf_wishlist_ids');
      return saved ? JSON.parse(saved) : ['prod-w-1', 'prod-b-1', 'prod-gf-1'];
    } catch {
      return ['prod-w-1', 'prod-b-1', 'prod-gf-1'];
    }
  });

  useEffect(() => {
    localStorage.setItem('jaf_wishlist_ids', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const toggleWishlist = (productOrId: string | Product) => {
    const id = typeof productOrId === 'string' ? productOrId : productOrId.id;
    setWishlistIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistIds(prev => prev.filter(id => id !== productId));
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const clearWishlist = () => setWishlistIds([]);

  const wishlistProducts = initialProducts.filter(p => wishlistIds.includes(p.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlist: wishlistIds,
        wishlistIds,
        wishlistProducts,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
