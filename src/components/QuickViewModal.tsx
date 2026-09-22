import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Star,
  Check,
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { formatPKR, siteConfig } from '../config/siteConfig';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  isOpen?: boolean;
  product: Product | null;
  onClose: () => void;
  onNavigate: (page: string, param?: string) => void;
  onOpenMonogramModal?: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  isOpen,
  product,
  onClose,
  onNavigate,
  onOpenMonogramModal
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(undefined);
  const [added, setAdded] = useState(false);

  if (isOpen === false || !product) return null;

  const activeColor = selectedColor || (product.colors && product.colors[0]) || { name: 'Espresso', hex: '#2B1A12', image: product.thumbnail };
  const activeImage = activeColor.image || product.thumbnail;
  const unitPrice = product.discountPrice || product.price;

  const handleAddToCart = () => {
    addToCart(product, activeColor, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto no-print">
      <div className="min-h-screen px-4 text-center flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-[#19100B]/70 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />

        {/* Modal Window */}
        <div className="relative inline-block w-full max-w-2xl bg-[#FAF8F5] rounded-xl text-left overflow-hidden shadow-2xl border border-[#DCD3C5] z-10 my-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-white/90 text-stone-600 hover:text-stone-900 border border-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Preview */}
            <div className="relative bg-[#F4EFEB] aspect-square md:aspect-auto">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                <span className="px-2.5 py-1 rounded-xs bg-[#19100B] text-[#D8BA73] text-[10px] font-bold uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="px-2 py-0.5 rounded-xs bg-[#8C522F] text-white text-[9px] font-bold">
                  {product.leatherType}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C522F]">
                    Sharif Complex Gulgasht • Multan
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#19100B] leading-snug mt-0.5">
                    {product.title}
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#BFA054]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating || 5)
                            ? 'fill-current'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-stone-500 font-sans">
                    ({product.reviewsCount || 12} Atelier Reviews)
                  </span>
                </div>

                {/* Price Display */}
                <div className="p-3 bg-[#F3EFEA] rounded-lg border border-[#E0D7C9] flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">Price (PKR)</span>
                    <span className="font-serif text-2xl font-bold text-[#19100B]">
                      {formatPKR(unitPrice)}
                    </span>
                    {product.discountPrice && (
                      <span className="ml-2 text-xs text-stone-400 line-through">
                        {formatPKR(product.price)}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 font-semibold px-2 py-0.5 rounded block">
                      In Stock at Multan
                    </span>
                    <span className="text-[10px] text-stone-500 mt-1 block">SKU: {product.sku}</span>
                  </div>
                </div>

                {/* Color Swatch Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-[#19100B]">
                      Select Leather Tone: <strong>{activeColor.name}</strong>
                    </span>
                    <div className="flex gap-2">
                      {product.colors.map(c => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c)}
                          className={`w-6 h-6 rounded-full border-2 transition-transform ${
                            activeColor.name === c.name
                              ? 'border-[#8C522F] scale-110 shadow-xs'
                              : 'border-white hover:scale-105'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity selector */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="font-semibold text-stone-800">Quantity:</span>
                  <div className="flex items-center border border-stone-300 rounded bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 px-2.5 hover:bg-stone-100 text-stone-700"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 font-bold text-xs">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1.5 px-2.5 hover:bg-stone-100 text-stone-700"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 rounded-xs text-xs font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs ${
                    added
                      ? 'bg-emerald-800 text-white'
                      : 'bg-[#19100B] hover:bg-[#382216] text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Added to Shopping Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#D8BA73]" />
                      <span>Add to Bag • {formatPKR(unitPrice * quantity)}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onNavigate('product-detail', product.slug);
                  }}
                  className="w-full py-2 bg-[#F3EFEA] hover:bg-[#EAE3D9] text-[#19100B] rounded-xs text-xs font-semibold flex items-center justify-center gap-1 border border-[#DCD3C5]"
                >
                  <span>View Complete Specifications & Craft Story</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8C522F]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
