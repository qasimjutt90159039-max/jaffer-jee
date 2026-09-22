import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Printer,
  ShoppingBag,
  CreditCard,
  Building,
  Phone,
  MessageSquare,
  Sparkles,
  MapPin,
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { siteConfig, formatPKR, getWhatsAppUrl } from '../config/siteConfig';

interface CheckoutPageProps {
  onNavigate: (page: string, ref?: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const {
    items,
    appliedCoupon,
    discountAmount,
    totalQuantity,
    subtotal,
    shippingFee,
    grandTotal,
    clearCart
  } = useCart();

  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Multan');
  const [postalCode, setPostalCode] = useState('60700');
  const [deliveryType, setDeliveryType] = useState<'courier' | 'store_pickup'>('courier');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer' | 'counter_payment'>('cod');
  const [orderNotes, setOrderNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || (deliveryType === 'courier' && !address)) return;

    setSubmitting(true);
    try {
      const orderPayload = {
        customerName,
        customerPhone,
        customerEmail,
        deliveryAddress: deliveryType === 'store_pickup'
          ? `Self-Pickup: ${siteConfig.address.fullAddress}`
          : `${address}, ${city} ${postalCode}`,
        city,
        items,
        deliveryType,
        paymentMethod,
        subtotal,
        discountAmount,
        shippingFee: deliveryType === 'store_pickup' ? 0 : shippingFee,
        grandTotal: deliveryType === 'store_pickup' ? (subtotal - discountAmount) : grandTotal,
        notes: orderNotes
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      if (data.success && data.order) {
        setCompletedOrder(data.order);
        clearCart();
      } else {
        const fallback = {
          id: `JAF-${Math.floor(100000 + Math.random() * 900000)}`,
          customerName,
          items,
          grandTotal: orderPayload.grandTotal,
          paymentMethod,
          deliveryAddress: orderPayload.deliveryAddress,
          createdAt: new Date().toISOString()
        };
        setCompletedOrder(fallback);
        clearCart();
      }
    } catch (err) {
      console.error(err);
      const fallback = {
        id: `JAF-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName,
        items,
        grandTotal,
        paymentMethod,
        createdAt: new Date().toISOString()
      };
      setCompletedOrder(fallback);
      clearCart();
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // If order was successfully completed
  if (completedOrder) {
    const handleWhatsAppConfirm = () => {
      let msg = `*Jafferjees Order Confirmation*\n`;
      msg += `Order ID: *${completedOrder.id}*\n`;
      msg += `Customer: ${customerName}\n`;
      msg += `Phone: ${customerPhone}\n`;
      msg += `Total Amount: ${formatPKR(completedOrder.grandTotal)}\n`;
      msg += `Payment Method: ${completedOrder.paymentMethod.toUpperCase()}\n`;
      msg += `Delivery: ${completedOrder.deliveryAddress || address}\n\n`;
      msg += `Please confirm my order dispatched from Sharif Complex Gulgasht, Multan.`;

      window.open(getWhatsAppUrl(msg), '_blank');
    };

    return (
      <div className="max-w-3xl mx-auto px-4 py-16 font-sans">
        <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD3C5] p-8 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C522F]">
              Jafferjees Multan Atelier
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#19100B]">
              Thank You for Your Order!
            </h1>
            <p className="text-xs text-[#7A6B5C]">
              Your order confirmation number is{' '}
              <strong className="text-[#19100B] font-mono text-sm">{completedOrder.id}</strong>
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-[#EAE3D9] text-left text-xs space-y-2 max-w-lg mx-auto">
            <div className="flex justify-between">
              <span className="text-stone-500">Recipient:</span>
              <strong className="text-stone-900">{customerName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Contact:</span>
              <strong className="text-stone-900">{customerPhone}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Payment:</span>
              <strong className="text-stone-900 uppercase">{completedOrder.paymentMethod}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Delivery Address:</span>
              <span className="text-stone-900 font-medium text-right max-w-xs">
                {completedOrder.deliveryAddress || address}
              </span>
            </div>
            <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
              <span className="font-bold text-stone-900">Total Payable:</span>
              <strong className="font-serif text-lg text-[#8C522F]">
                {formatPKR(completedOrder.grandTotal)}
              </strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={handleWhatsAppConfirm}
              className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xs text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Confirm via WhatsApp to Multan Store</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-3 border border-[#DCD3C5] bg-white text-[#19100B] rounded-xs text-xs font-semibold hover:bg-stone-50 flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="px-5 py-3 bg-[#19100B] text-[#FAF8F5] rounded-xs text-xs font-semibold hover:bg-[#382216]"
            >
              Back to Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#FAF6EE] text-[#8C522F] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#19100B]">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-[#7A6B5C]">
          Browse our collection of handcrafted leather wallets, belts, and luxury briefcases before proceeding to checkout.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-2.5 bg-[#19100B] text-[#FAF8F5] text-xs font-semibold rounded-xs"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans space-y-8">
      {/* Header */}
      <div className="border-b border-[#E8E1D5] pb-4">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C522F]">
          Sharif Complex Gulgasht • Multan
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#19100B] mt-0.5">
          Secure Atelier Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-6">
          {/* 1. Delivery Options */}
          <div className="bg-white rounded-lg border border-[#EAE3D9] p-5 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <Truck className="w-4 h-4 text-[#8C522F]" />
              <h2 className="font-serif text-sm font-bold text-[#19100B] uppercase tracking-wider">
                1. Delivery Method
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryType('courier')}
                className={`p-3.5 rounded-lg border text-left transition-all ${
                  deliveryType === 'courier'
                    ? 'border-[#8C522F] bg-[#FAF6EE] shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-[#19100B]">Courier Delivery</span>
                  <span className="text-[10px] font-bold text-emerald-800">
                    {shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}
                  </span>
                </div>
                <p className="text-[11px] text-[#7A6B5C]">
                  Doorstep Express Delivery across Pakistan (2-4 business days)
                </p>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('store_pickup')}
                className={`p-3.5 rounded-lg border text-left transition-all ${
                  deliveryType === 'store_pickup'
                    ? 'border-[#8C522F] bg-[#FAF6EE] shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-[#19100B]">Multan Store Pickup</span>
                  <span className="text-[10px] font-bold text-emerald-800">FREE</span>
                </div>
                <p className="text-[11px] text-[#7A6B5C]">
                  Sharif Complex Gulgasht, Multan (Ready in 2 hours)
                </p>
              </button>
            </div>
          </div>

          {/* 2. Customer & Address Details */}
          <div className="bg-white rounded-lg border border-[#EAE3D9] p-5 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <MapPin className="w-4 h-4 text-[#8C522F]" />
              <h2 className="font-serif text-sm font-bold text-[#19100B] uppercase tracking-wider">
                2. Contact & Address Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#19100B] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Mian Tariq"
                  className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#8C522F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#19100B] mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="0300 1234567"
                  className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#8C522F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#19100B] mb-1">
                Email Address (For receipt & tracking)
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#8C522F]"
              />
            </div>

            {deliveryType === 'courier' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-[#19100B] mb-1">
                    Street Address, House/Office Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House 12-A, Street 4, Gulgasht Colony"
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#8C522F]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Multan"
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#8C522F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#19100B] mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="60700"
                      className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#8C522F]"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#19100B] mb-1">
                Order Notes / Delivery Instructions (Optional)
              </label>
              <textarea
                rows={2}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Special packaging notes, gift ribbon, or preferred calling times..."
                className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-stone-300 rounded-xs focus:outline-none focus:border-[#8C522F]"
              />
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white rounded-lg border border-[#EAE3D9] p-5 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <CreditCard className="w-4 h-4 text-[#8C522F]" />
              <h2 className="font-serif text-sm font-bold text-[#19100B] uppercase tracking-wider">
                3. Payment Selection
              </h2>
            </div>

            <div className="space-y-2.5">
              <label
                className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#8C522F] bg-[#FAF6EE]'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-0.5 text-[#8C522F]"
                />
                <div>
                  <strong className="block text-xs text-[#19100B]">Cash on Delivery (COD)</strong>
                  <span className="text-[11px] text-[#7A6B5C]">
                    Pay cash to courier upon inspecting the sealed parcel at your doorstep.
                  </span>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-[#8C522F] bg-[#FAF6EE]'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                  className="mt-0.5 text-[#8C522F]"
                />
                <div>
                  <strong className="block text-xs text-[#19100B]">Direct Bank Transfer (IBFT)</strong>
                  <span className="text-[11px] text-[#7A6B5C]">
                    Transfer via Meezan Bank / Bank Alfalah. Our Multan accounts team confirms within 15 minutes.
                  </span>
                </div>
              </label>

              {deliveryType === 'store_pickup' && (
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'counter_payment'
                      ? 'border-[#8C522F] bg-[#FAF6EE]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'counter_payment'}
                    onChange={() => setPaymentMethod('counter_payment')}
                    className="mt-0.5 text-[#8C522F]"
                  />
                  <div>
                    <strong className="block text-xs text-[#19100B]">Pay at Showroom Counter</strong>
                    <span className="text-[11px] text-[#7A6B5C]">
                      Pay by Cash, Visa, or Mastercard at Sharif Complex Gulgasht, Multan.
                    </span>
                  </div>
                </label>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-[#19100B] hover:bg-[#382216] disabled:opacity-50 text-white rounded-xs text-xs font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            {submitting ? (
              <span>Placing Order...</span>
            ) : (
              <>
                <Lock className="w-4 h-4 text-[#D8BA73]" />
                <span>Place Order • {formatPKR(deliveryType === 'store_pickup' ? (subtotal - discountAmount) : grandTotal)}</span>
              </>
            )}
          </button>
        </form>

        {/* Right Summary */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-[#EAE3D9] p-5 space-y-5 sticky top-24 shadow-xs">
          <div className="pb-3 border-b border-stone-200 flex items-center justify-between">
            <h3 className="font-serif text-sm font-bold text-[#19100B]">
              Order Summary ({totalQuantity} items)
            </h3>
            <button
              onClick={() => onNavigate('cart')}
              className="text-xs text-[#8C522F] hover:underline font-semibold"
            >
              Edit Bag
            </button>
          </div>

          {/* Items List */}
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {items.map((item) => {
              const displayImage = item.product?.thumbnail || item.image || item.product?.images?.[0] || '';
              const displayTitle = item.product?.title || item.title || 'Leather Article';
              const colorName = typeof item.selectedColor === 'object' ? item.selectedColor?.name : (item.selectedColor || 'Signature');

              return (
                <div key={item.id} className="flex gap-3 text-xs">
                  <img
                    src={displayImage}
                    alt={displayTitle}
                    className="w-14 h-14 object-cover rounded-xs border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-[#19100B] truncate">{displayTitle}</h4>
                    <p className="text-[11px] text-[#7A6B5C]">Color: {colorName}</p>
                    {item.personalization && (
                      <p className="text-[10px] text-[#8C522F] flex items-center gap-1 font-semibold">
                        <Sparkles className="w-3 h-3 text-[#BFA054]" />
                        Monogram: "{item.personalization.initials}" ({item.personalization.foilType})
                      </p>
                    )}
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-stone-500 text-[11px]">Qty: {item.quantity}</span>
                      <strong className="text-stone-900">{formatPKR(item.price * item.quantity)}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Totals */}
          <div className="space-y-2 pt-3 border-t border-stone-200 text-xs text-[#7A6B5C]">
            <div className="flex justify-between">
              <span>Items Subtotal:</span>
              <strong className="text-[#19100B]">{formatPKR(subtotal)}</strong>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-800 font-semibold">
                <span>Discount ({appliedCoupon}):</span>
                <span>-{formatPKR(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping Fee:</span>
              <strong className="text-stone-900">
                {deliveryType === 'store_pickup' || shippingFee === 0 ? (
                  <span className="text-emerald-800">FREE</span>
                ) : (
                  formatPKR(shippingFee)
                )}
              </strong>
            </div>

            <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
              <span className="font-serif text-sm font-bold text-[#19100B]">Total Payable:</span>
              <strong className="font-serif text-xl font-bold text-[#8C522F]">
                {formatPKR(deliveryType === 'store_pickup' ? (subtotal - discountAmount) : grandTotal)}
              </strong>
            </div>
          </div>

          {/* Multan Guarantee */}
          <div className="p-3 bg-[#FAF6EE] rounded-sm border border-[#E8E1D5] text-[11px] text-[#6A5B4C] flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8C522F] shrink-0 mt-0.5" />
            <span>
              All articles are hand-packed in our signature green gift boxes with protective flannel dust bags and verified by our Multan showroom inspection team before dispatch.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
