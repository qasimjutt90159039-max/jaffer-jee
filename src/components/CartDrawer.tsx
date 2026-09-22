import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Check,
  ArrowRight,
  ShieldCheck,
  Tag,
  Sparkles,
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteConfig, formatPKR, getWhatsAppUrl } from '../config/siteConfig';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onOpenMonogramModal?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenMonogramModal
}) => {
  const {
    items,
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
    amountNeededForFreeShipping
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  if (!isOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplying(true);
    const res = await applyCoupon(couponInput.trim());
    setCouponMessage(res.message);
    setIsApplying(false);
  };

  const handleWhatsAppCheckout = () => {
    let msg = `*Jafferjees Multan Order Inquiry*\n`;
    msg += `Store: Sharif Complex Gulgasht, Multan\n\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.title}*\n`;
      msg += `   Color: ${item.selectedColor?.name || 'Default'}\n`;
      if (item.personalization) {
        msg += `   Personalization: "${item.personalization.initials}" (${item.personalization.foilType} foil)\n`;
      }
      msg += `   Qty: ${item.quantity} x ${formatPKR(item.price)} = ${formatPKR(item.quantity * item.price)}\n\n`;
    });
    msg += `Subtotal: ${formatPKR(subtotal)}\n`;
    if (discountAmount > 0) {
      msg += `Discount (${appliedCoupon}): -${formatPKR(discountAmount)}\n`;
    }
    msg += `Delivery: ${shippingFee === 0 ? 'FREE Nationwide' : formatPKR(shippingFee)}\n`;
    msg += `*Grand Total: ${formatPKR(grandTotal)}*\n\n`;
    msg += `Please confirm my order and dispatch to my address via Cash on Delivery.`;

    window.open(getWhatsAppUrl(msg), '_blank');
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#DCD3C5] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 bg-[#19100B] text-[#FAF8F5] flex items-center justify-between border-b border-[#382216]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#D8BA73]" />
              <div>
                <h2 className="font-serif text-base font-bold text-white tracking-wide">
                  Shopping Bag ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'})
                </h2>
                <span className="text-[10px] text-[#A3927B]">Sharif Complex Gulgasht, Multan</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-sm text-[#D8CCA8] hover:text-white hover:bg-[#25160E] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F3EFEA] px-4 py-2.5 border-b border-[#E8E1D5] text-xs">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#19100B] mb-1">
              <span className="flex items-center gap-1.5 text-[#8C522F]">
                <Truck className="w-3.5 h-3.5" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-emerald-800">You unlocked Free Nationwide Delivery!</span>
                ) : (
                  <span>Add {formatPKR(amountNeededForFreeShipping)} more for FREE Delivery</span>
                )}
              </span>
              <span className="text-stone-500">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#E0D7C9] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#8C522F] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Drawer Body - Product Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F3EFEA] text-[#8C522F] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#19100B]">Your bag is currently empty</h3>
                <p className="text-xs text-[#7A6B5C] max-w-xs mx-auto">
                  Discover our timeless handcrafted leather wallets, belts, briefcases, and luxury accessories.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('shop');
                  }}
                  className="px-6 py-2.5 bg-[#19100B] text-[#FAF8F5] rounded-xs text-xs font-semibold hover:bg-[#382216] transition-colors shadow-xs"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-white rounded-lg border border-[#EAE3D9] flex gap-3 shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-sm border border-stone-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-xs font-bold text-[#19100B] line-clamp-1">
                        {item.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#7A6B5C]">
                      <span>Color: <strong>{item.selectedColor?.name}</strong></span>
                      {item.selectedColor?.hex && (
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-stone-300 inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                      )}
                    </div>

                    {item.personalization && (
                      <div className="text-[10px] text-[#8C522F] bg-[#FAF6EE] px-1.5 py-0.5 rounded flex items-center gap-1 font-medium w-fit">
                        <Sparkles className="w-3 h-3 text-[#BFA054]" />
                        <span>Monogram: "{item.personalization.initials}" ({item.personalization.foilType})</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-stone-300 rounded-xs overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 text-stone-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-stone-900 bg-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 text-stone-700"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-xs font-bold text-[#19100B]">
                          {formatPKR(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Promo Code section */}
            {items.length > 0 && (
              <div className="pt-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-sm bg-emerald-50 border border-emerald-200 text-xs">
                    <span className="text-emerald-900 font-semibold flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      Coupon applied: <strong>{appliedCoupon}</strong> (-{formatPKR(discountAmount)})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-red-600 hover:text-red-800 text-[11px] font-medium underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon code (e.g. WELCOME10 or MULTAN5)"
                      className="flex-1 bg-white text-xs px-3 py-2 rounded-xs border border-stone-300 focus:outline-none focus:border-[#8C522F]"
                    />
                    <button
                      type="submit"
                      disabled={isApplying}
                      className="px-3.5 py-2 bg-[#19100B] text-[#FAF8F5] rounded-xs text-xs font-medium hover:bg-[#382216] transition-colors"
                    >
                      {isApplying ? '...' : 'Apply'}
                    </button>
                  </form>
                )}
                {couponMessage && (
                  <p className="text-[11px] text-stone-600 mt-1 font-medium">{couponMessage}</p>
                )}
              </div>
            )}
          </div>

          {/* Drawer Footer - Totals & Actions */}
          <div className="p-4 bg-white border-t border-[#E8E1D5] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#7A6B5C]">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-[#19100B]">{formatPKR(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Privilege Discount ({appliedCoupon}):</span>
                  <span>-{formatPKR(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#7A6B5C]">
                <span>Nationwide Shipping:</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-700">FREE Delivery</strong>
                  ) : (
                    formatPKR(shippingFee)
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                <span className="font-serif text-sm font-bold text-[#19100B]">Total Payable:</span>
                <span className="font-serif text-xl font-bold text-[#8C522F]">
                  {formatPKR(grandTotal)}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              <button
                disabled={items.length === 0}
                onClick={() => {
                  onClose();
                  onNavigate('checkout');
                }}
                className="w-full py-3 bg-[#19100B] hover:bg-[#382216] disabled:opacity-50 text-white rounded-xs text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#D8BA73]" />
              </button>

              <button
                disabled={items.length === 0}
                onClick={handleWhatsAppCheckout}
                className="w-full py-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#136630] rounded-xs text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-emerald-500/30"
              >
                <span className="font-bold">●</span> Order via WhatsApp to Multan Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
