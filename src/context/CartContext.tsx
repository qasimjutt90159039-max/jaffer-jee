import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductColor } from '../types';
import { siteConfig } from '../config/siteConfig';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, selectedColor?: ProductColor, quantity?: number, personalization?: { initials: string; foilType: 'blind' | 'gold' | 'silver' }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  appliedCoupon: string | null;
  discountAmount: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  totalQuantity: number;
  subtotal: number;
  shippingFee: number;
  grandTotal: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('jaf_cart_items');
      return saved ? JSON.parse(saved) : [
        {
          id: 'prod-w-1-Espresso',
          productId: 'prod-w-1',
          title: 'Heritage Bifold Full-Grain Leather Wallet',
          slug: 'heritage-bifold-full-grain-leather-wallet',
          sku: 'JAF-WLT-001',
          category: 'Leather Wallets',
          image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop',
          price: 4850,
          quantity: 1,
          selectedColor: { name: 'Espresso', hex: '#2B1A12' },
          stockQuantity: 18
        }
      ];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('jaf_cart_items', JSON.stringify(items));
  }, [items]);

  const addToCart = (
    product: Product,
    selectedColor?: ProductColor,
    quantity: number = 1,
    personalization?: { initials: string; foilType: 'blind' | 'gold' | 'silver' }
  ) => {
    if (quantity <= 0) return;
    const color = selectedColor || (product.colors && product.colors[0]) || { name: 'Standard Leather', hex: '#3B2216' };
    const compositeId = `${product.id}-${color.name}${personalization?.initials ? `-${personalization.initials}` : ''}`;
    const unitPrice = product.discountPrice || product.price;

    setItems(prev => {
      const existing = prev.find(item => item.id === compositeId);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stockQuantity || 20);
        return prev.map(item =>
          item.id === compositeId ? { ...item, quantity: newQty } : item
        );
      } else {
        const newItem: CartItem = {
          id: compositeId,
          productId: product.id,
          title: product.title,
          slug: product.slug,
          sku: product.sku,
          category: product.category,
          image: color.image || product.thumbnail,
          price: unitPrice,
          originalPrice: product.discountPrice ? product.price : undefined,
          quantity,
          selectedColor: color,
          personalization,
          stockQuantity: product.stockQuantity || 20
        };
        return [...prev, newItem];
      }
    });

    setIsCartDrawerOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const qty = Math.min(quantity, item.stockQuantity || 25);
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  // Computations
  const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = items.reduce((acc, i) => acc + (i.price * i.quantity), 0);

  const freeShippingThreshold = siteConfig.freeShippingThreshold; // 5000 PKR
  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : siteConfig.shippingRates.standard;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const applyCoupon = async (code: string) => {
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, cartTotal: subtotal })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAppliedCoupon(data.data.code);
        setDiscountAmount(data.data.discountAmount);
        return {
          success: true,
          message: `Coupon ${data.data.code} applied! Saved Rs. ${data.data.discountAmount.toLocaleString('en-PK')}`
        };
      } else {
        return { success: false, message: data.message || 'Invalid coupon code' };
      }
    } catch {
      // Local fallback for offline mode
      if (code.toUpperCase() === 'WELCOME10') {
        const discount = Math.round((subtotal * 10) / 100);
        setAppliedCoupon('WELCOME10');
        setDiscountAmount(discount);
        return { success: true, message: `10% Welcome discount applied! Saved Rs. ${discount.toLocaleString('en-PK')}` };
      }
      if (code.toUpperCase() === 'MULTAN5') {
        const discount = Math.round((subtotal * 5) / 100);
        setAppliedCoupon('MULTAN5');
        setDiscountAmount(discount);
        return { success: true, message: `5% Multan Local discount applied! Saved Rs. ${discount.toLocaleString('en-PK')}` };
      }
      return { success: false, message: 'Invalid or expired coupon' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        discountAmount,
        applyCoupon,
        removeCoupon,
        totalQuantity,
        subtotal,
        shippingFee,
        grandTotal,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        isCartDrawerOpen,
        setIsCartDrawerOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
