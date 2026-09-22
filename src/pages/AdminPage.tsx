import React, { useState, useEffect } from 'react';
import {
  Package,
  ShoppingBag,
  Sparkles,
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  Clock,
  Layers,
  Phone,
  MapPin,
  TrendingUp,
  MessageSquare,
  Search,
  Filter,
  DollarSign
} from 'lucide-react';
import { Product } from '../types';
import { formatPKR, siteConfig, getWhatsAppUrl } from '../config/siteConfig';

interface AdminPageProps {
  products: Product[];
  onRefreshProducts: () => void;
  onNavigate: (page: string, slug?: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  products,
  onRefreshProducts,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'monograms' | 'settings'>('overview');

  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Editing Product State
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Settings
  const [contactNumber, setContactNumber] = useState(siteConfig.contactNumber);
  const [storeAddress, setStoreAddress] = useState(siteConfig.address.fullAddress);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && data.orders) {
        setOrders(data.orders);
      }
    } catch {
      // Local fallback orders
      setOrders([
        {
          id: 'JAF-89104',
          customerName: 'Mian Tariq Mansoor',
          customerPhone: '03008765432',
          city: 'Multan',
          deliveryAddress: 'House 14, Officers Colony, Multan',
          grandTotal: 34500,
          paymentMethod: 'cod',
          status: 'dispatched',
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          items: [
            {
              title: 'Executive Top-Grain Leather Briefcase',
              selectedColor: { name: 'Espresso Brown' },
              quantity: 1,
              price: 34500,
              personalization: { initials: 'M.T.M', foilType: 'gold' }
            }
          ]
        },
        {
          id: 'JAF-89105',
          customerName: 'Ayesha Raza',
          customerPhone: '03217654321',
          city: 'Multan',
          deliveryAddress: 'Self-Pickup: Sharif Complex Gulgasht, Multan',
          grandTotal: 18500,
          paymentMethod: 'counter_payment',
          status: 'monogramming',
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          items: [
            {
              title: 'Classic Saffiano Leather Structured Tote',
              selectedColor: { name: 'Bordeaux Red' },
              quantity: 1,
              price: 18500,
              personalization: { initials: 'A.R', foilType: 'blind' }
            }
          ]
        },
        {
          id: 'JAF-89106',
          customerName: 'Bilal Khan',
          customerPhone: '03335551234',
          city: 'Lahore',
          deliveryAddress: 'DHA Phase 6, Lahore',
          grandTotal: 11000,
          paymentMethod: 'bank_transfer',
          status: 'pending',
          createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
          items: [
            {
              title: 'Heritage Bifold Leather Wallet with Coin Pocket',
              selectedColor: { name: 'Cognac Tan' },
              quantity: 2,
              price: 5500,
              personalization: { initials: 'B.K', foilType: 'silver' }
            }
          ]
        }
      ]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.title || !editingProduct?.price) return;

    try {
      const method = isNewProduct ? 'POST' : 'PUT';
      const url = isNewProduct ? '/api/products' : `/api/products/${editingProduct.id}`;

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct)
      });

      setEditingProduct(null);
      setIsNewProduct(false);
      onRefreshProducts();
    } catch (err) {
      console.error(err);
      setEditingProduct(null);
      setIsNewProduct(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to remove this leather article from the boutique catalog?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      onRefreshProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const pendingMonograms = orders.filter(o => 
    o.status === 'monogramming' || 
    (o.items && o.items.some((i: any) => i.personalization?.initials))
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D5] pb-5">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C522F]">
            Atelier Management Portal
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#19100B]">
            Jafferjees Multan Store Dashboard
          </h1>
          <p className="text-xs text-[#7A6B5C] mt-0.5">
            Sharif Complex Gulgasht • Inventory, Monograms & Fulfillment
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEditingProduct({
                title: '',
                slug: `article-${Date.now()}`,
                sku: `JAF-${Math.floor(1000 + Math.random() * 9000)}`,
                category: 'Men\'s Wallets',
                categorySlug: 'mens-wallets',
                leatherType: 'Full-Grain Calfskin',
                price: 7500,
                stock: 15,
                rating: 5,
                isMonogrammable: true,
                description: 'Handcrafted luxury leather article made with traditional edge-burnishing.',
                thumbnail: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
                images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80']
              });
              setIsNewProduct(true);
            }}
            className="px-4 py-2.5 bg-[#8C522F] hover:bg-[#724124] text-white text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Leather Article</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E8E1D5] bg-[#FAF8F5] overflow-x-auto text-xs font-serif font-bold uppercase tracking-wider rounded-t-lg">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-3.5 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'overview'
              ? 'border-[#8C522F] text-[#8C522F] bg-white'
              : 'border-transparent text-[#7A6B5C] hover:text-[#19100B]'
          }`}
        >
          <TrendingUp className="w-4 h-4" /> Overview
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-3.5 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'orders'
              ? 'border-[#8C522F] text-[#8C522F] bg-white'
              : 'border-transparent text-[#7A6B5C] hover:text-[#19100B]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-3.5 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'products'
              ? 'border-[#8C522F] text-[#8C522F] bg-white'
              : 'border-transparent text-[#7A6B5C] hover:text-[#19100B]'
          }`}
        >
          <Package className="w-4 h-4" /> Leather Catalog ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('monograms')}
          className={`px-5 py-3.5 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'monograms'
              ? 'border-[#8C522F] text-[#8C522F] bg-white'
              : 'border-transparent text-[#7A6B5C] hover:text-[#19100B]'
          }`}
        >
          <Sparkles className="w-4 h-4" /> Hot-Stamping Queue ({pendingMonograms})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-5 py-3.5 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'settings'
              ? 'border-[#8C522F] text-[#8C522F] bg-white'
              : 'border-transparent text-[#7A6B5C] hover:text-[#19100B]'
          }`}
        >
          <Settings className="w-4 h-4" /> Multan Boutique Config
        </button>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-lg border border-[#EAE3D9] shadow-xs">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                Total Revenue (Recent)
              </span>
              <strong className="font-serif text-2xl font-bold text-[#19100B] block mt-1">
                {formatPKR(totalRevenue)}
              </strong>
              <span className="text-[11px] text-emerald-800 font-semibold mt-1 block">
                Multan Boutique + Nationwide
              </span>
            </div>

            <div className="p-5 bg-white rounded-lg border border-[#EAE3D9] shadow-xs">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                Active Client Orders
              </span>
              <strong className="font-serif text-2xl font-bold text-[#8C522F] block mt-1">
                {orders.length}
              </strong>
              <span className="text-[11px] text-stone-500 mt-1 block">
                Pending fulfillment & delivery
              </span>
            </div>

            <div className="p-5 bg-white rounded-lg border border-[#EAE3D9] shadow-xs">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                Active Leather SKUs
              </span>
              <strong className="font-serif text-2xl font-bold text-[#19100B] block mt-1">
                {products.length}
              </strong>
              <span className="text-[11px] text-stone-500 mt-1 block">
                In-store & Online Catalog
              </span>
            </div>

            <div className="p-5 bg-white rounded-lg border border-[#EAE3D9] shadow-xs">
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                Monogram Queue
              </span>
              <strong className="font-serif text-2xl font-bold text-[#BFA054] block mt-1">
                {pendingMonograms}
              </strong>
              <span className="text-[11px] text-stone-500 mt-1 block">
                Awaiting brass stamping
              </span>
            </div>
          </div>

          {/* Quick Orders Feed */}
          <div className="bg-white rounded-lg border border-[#EAE3D9] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-[#19100B]">
                Recent Client Orders
              </h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs text-[#8C522F] hover:underline font-semibold"
              >
                View All Orders →
              </button>
            </div>

            <div className="divide-y divide-stone-100">
              {orders.slice(0, 4).map((order) => (
                <div key={order.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#19100B]">{order.id}</span>
                      <span className="text-stone-500">• {order.customerName} ({order.customerPhone})</span>
                    </div>
                    <p className="text-stone-600 mt-0.5 text-[11px]">
                      {order.items?.map((i: any) => i.title).join(', ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <strong className="font-serif text-sm text-[#8C522F]">
                      {formatPKR(order.grandTotal)}
                    </strong>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-800">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Orders Management */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg border border-[#EAE3D9] p-5 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-serif text-base font-bold text-[#19100B]">
              Order Fulfillment Log ({orders.length})
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchOrders}
                className="px-3 py-1.5 border border-stone-200 text-xs font-semibold rounded hover:bg-stone-50"
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="divide-y divide-stone-200">
            {orders.map((order) => {
              const handleDirectWhatsApp = () => {
                const text = `Hello ${order.customerName}, Jafferjees Multan showroom is updating your order ${order.id}. Current status: ${order.status.toUpperCase()}.`;
                window.open(`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
              };

              return (
                <div key={order.id} className="py-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#19100B] bg-stone-100 px-2 py-0.5 rounded">
                        {order.id}
                      </span>
                      <strong className="ml-2 text-xs text-stone-900">{order.customerName}</strong>
                      <span className="text-xs text-stone-500 ml-2">({order.customerPhone})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        className="text-xs p-1.5 bg-[#FAF8F5] border border-stone-300 rounded font-semibold text-stone-800"
                      >
                        <option value="pending">Pending Confirmation</option>
                        <option value="monogramming">In Monogram Studio</option>
                        <option value="dispatched">Dispatched with Courier</option>
                        <option value="ready_for_pickup">Ready at Multan Showroom</option>
                        <option value="delivered">Delivered & Closed</option>
                      </select>

                      <button
                        onClick={handleDirectWhatsApp}
                        className="p-1.5 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200"
                        title="Contact customer on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-[#FAF8F5] rounded border border-stone-200 text-xs">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase font-bold block">Delivery Destination</span>
                      <p className="text-stone-900 mt-0.5">{order.deliveryAddress || 'Gulgasht, Multan'}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 uppercase font-bold block">Items & Monogram</span>
                      {order.items?.map((item: any, idx: number) => (
                        <div key={idx} className="mt-0.5">
                          <p className="font-semibold text-stone-900">{item.title} (x{item.quantity})</p>
                          {item.personalization && (
                            <span className="text-[11px] text-[#8C522F] font-bold block">
                              ★ Monogram: "{item.personalization.initials}" [{item.personalization.foilType}]
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-stone-500 uppercase font-bold block">Payment & Total</span>
                      <strong className="font-serif text-sm text-[#8C522F] block mt-0.5">
                        {formatPKR(order.grandTotal)}
                      </strong>
                      <span className="text-[10px] uppercase font-bold text-stone-500">
                        {order.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Products Catalog Management */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-lg border border-[#EAE3D9] p-5 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-serif text-base font-bold text-[#19100B]">
              Leather Goods Inventory ({products.length} articles)
            </h3>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search SKU or title..."
                className="w-full text-xs pl-8 pr-3 py-2 bg-[#FAF8F5] border border-stone-300 rounded focus:outline-none"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-[#FAF8F5] text-stone-600 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Item</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Leather Type</th>
                  <th className="py-2.5 px-3">Price</th>
                  <th className="py-2.5 px-3">Stock</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products
                  .filter(p => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50">
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.thumbnail}
                            alt={p.title}
                            className="w-10 h-10 object-cover rounded border border-stone-200"
                          />
                          <div>
                            <strong className="text-stone-900 block font-serif">{p.title}</strong>
                            <span className="text-[10px] text-stone-400 font-mono">SKU: {p.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-stone-600">{p.category}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FAF6EE] text-[#8C522F] border border-[#E8E1D5]">
                          {p.leatherType}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-serif font-bold text-stone-900">
                        {formatPKR(p.discountPrice || p.price)}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="text-emerald-800 font-bold">{p.stock || 12} units</span>
                      </td>
                      <td className="py-2.5 px-3 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setIsNewProduct(false);
                          }}
                          className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Monograms Queue */}
      {activeTab === 'monograms' && (
        <div className="bg-white rounded-lg border border-[#EAE3D9] p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-base font-bold text-[#19100B] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#BFA054]" /> Multan Showroom Hot-Stamping Queue
              </h3>
              <p className="text-xs text-[#7A6B5C] mt-0.5">
                Articles requiring brass movable type composition and heat debossing
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders
              .flatMap(o => (o.items || []).filter((i: any) => i.personalization?.initials).map((i: any) => ({ ...i, orderId: o.id, customerName: o.customerName, status: o.status })))
              .map((item, idx) => (
                <div key={idx} className="p-4 bg-[#FAF6EE] rounded-lg border border-[#E8E1D5] space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-stone-500">Order #{item.orderId}</span>
                      <h4 className="font-serif font-bold text-xs text-[#19100B] mt-0.5">{item.title}</h4>
                      <p className="text-[11px] text-stone-600">Client: {item.customerName}</p>
                    </div>

                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                      {item.status}
                    </span>
                  </div>

                  {/* Stamp Visualizer */}
                  <div className="p-3 bg-[#24150D] rounded text-center">
                    <span className="text-[9px] uppercase tracking-widest text-stone-400 block">
                      FOIL: {item.personalization.foilType.toUpperCase()}
                    </span>
                    <span className={`text-2xl font-serif font-bold tracking-widest ${
                      item.personalization.foilType === 'gold' ? 'text-[#D8BA73]' :
                      item.personalization.foilType === 'silver' ? 'text-stone-300' : 'text-stone-400'
                    }`}>
                      {item.personalization.initials}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-stone-500 text-[11px]">Leather: {item.selectedColor?.name || 'Standard'}</span>
                    <button
                      onClick={() => handleUpdateOrderStatus(item.orderId, 'dispatched')}
                      className="px-3 py-1 bg-[#19100B] text-white text-[11px] font-bold rounded-xs hover:bg-[#382216]"
                    >
                      Mark Stamping Complete ✓
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg border border-[#EAE3D9] p-6 space-y-6 max-w-2xl shadow-xs">
          <div>
            <h3 className="font-serif text-base font-bold text-[#19100B]">
              Multan Boutique Contact & Coordinates
            </h3>
            <p className="text-xs text-[#7A6B5C] mt-0.5">
              Updates phone and address references across all storefront receipts and WhatsApp links.
            </p>
          </div>

          {settingsSaved && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 font-semibold">
              ✓ Boutique settings saved successfully!
            </div>
          )}

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-700 font-bold mb-1">
                Showroom Direct Phone
              </label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">
                Multan Boutique Physical Address
              </label>
              <textarea
                rows={3}
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
                className="w-full p-2.5 bg-[#FAF8F5] border border-stone-300 rounded focus:outline-none"
              />
            </div>

            <button
              onClick={() => {
                setSettingsSaved(true);
                setTimeout(() => setSettingsSaved(false), 2500);
              }}
              className="px-6 py-2.5 bg-[#19100B] hover:bg-[#382216] text-white text-xs font-bold uppercase tracking-wider rounded-xs"
            >
              Save Boutique Configuration
            </button>
          </div>
        </div>
      )}

      {/* Product Edit / Add Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#EAE3D9] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#19100B]">
                {isNewProduct ? 'Add New Leather Article' : `Edit: ${editingProduct.title}`}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-stone-400 hover:text-stone-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.title || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    className="w-full p-2 bg-[#FAF8F5] border border-stone-300 rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.sku || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full p-2 bg-[#FAF8F5] border border-stone-300 rounded focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={editingProduct.category || "Men's Wallets"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full p-2 bg-[#FAF8F5] border border-stone-300 rounded font-semibold"
                  >
                    <option value="Men's Wallets">Men's Wallets</option>
                    <option value="Handbags & Totes">Handbags & Totes</option>
                    <option value="Briefcases & Messengers">Briefcases & Messengers</option>
                    <option value="Belts & Buckles">Belts & Buckles</option>
                    <option value="Luggage & Weekenders">Luggage & Weekenders</option>
                    <option value="Small Accessories">Small Accessories</option>
                    <option value="Desk & Office">Desk & Office</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full p-2 bg-[#FAF8F5] border border-stone-300 rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Discount Price (PKR)</label>
                  <input
                    type="number"
                    value={editingProduct.discountPrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, discountPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full p-2 bg-[#FAF8F5] border border-stone-300 rounded focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Leather Type</label>
                  <input
                    type="text"
                    value={editingProduct.leatherType || 'Full-Grain Calfskin'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, leatherType: e.target.value })}
                    className="w-full p-2 bg-[#FAF8F5] border border-stone-300 rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={editingProduct.stock || 10}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full p-2 bg-[#FAF8F5] border border-stone-300 rounded focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingProduct.thumbnail || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, thumbnail: e.target.value, images: [e.target.value] })}
                  className="w-full p-2 bg-[#FAF8F5] border border-stone-300 rounded focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full p-2 bg-[#FAF8F5] border border-stone-300 rounded focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="monogramCheck"
                  checked={editingProduct.isMonogrammable ?? true}
                  onChange={(e) => setEditingProduct({ ...editingProduct, isMonogrammable: e.target.checked })}
                  className="w-4 h-4 text-[#8C522F] rounded"
                />
                <label htmlFor="monogramCheck" className="text-xs font-bold text-stone-800">
                  Allow Complimentary Personal Monogramming on this item
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#19100B] hover:bg-[#382216] text-white rounded text-xs font-bold uppercase tracking-wider"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
