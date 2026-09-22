import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';

// Global Navigation & Modals
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FloatingActions } from './components/FloatingActions';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { BespokeMonogramModal } from './components/BespokeMonogramModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BespokeAtelierPage } from './pages/BespokeAtelierPage';
import { CorporateGiftsPage } from './pages/CorporateGiftsPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { AccountPage } from './pages/AccountPage';
import { AdminPage } from './pages/AdminPage';

import { Product } from './types';
import { initialProducts } from './data/seedData';

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const parseHash = () => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) return { page: 'home', param: undefined };
    const parts = hash.split('/');
    return { page: parts[0] || 'home', param: parts.slice(1).join('/') || undefined };
  };

  const initial = parseHash();
  const [currentPage, setCurrentPage] = useState<string>(initial.page);
  const [pageParam, setPageParam] = useState<string | undefined>(initial.param);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMonogramModalOpen, setIsMonogramModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && data.products && data.products.length > 0) {
        setProducts(data.products);
      }
    } catch {
      // Keep initialProducts fallback
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Sync with browser history and URL hash
  useEffect(() => {
    const onLocationChange = () => {
      const { page, param } = parseHash();
      setCurrentPage(page);
      setPageParam(param);
    };

    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, pageParam]);

  const handleNavigate = (page: string, param?: string) => {
    setCurrentPage(page);
    setPageParam(param);
    const newHash = param ? `#${page}/${param}` : (page === 'home' ? '#' : `#${page}`);
    if (window.location.hash !== newHash) {
      window.history.pushState(null, '', newHash);
    }
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#19100B] selection:bg-[#8C522F] selection:text-[#FAF8F5]">
            {/* Header */}
            <Header
              activePage={currentPage}
              onNavigate={handleNavigate}
              onOpenCart={() => setIsCartOpen(true)}
              onOpenMonogramModal={() => setIsMonogramModalOpen(true)}
              onOpenSearch={() => handleNavigate('shop')}
            />

            {/* Main Views */}
            <main className="flex-1 pb-16 md:pb-0">
              {currentPage === 'home' && (
                <HomePage
                  onNavigate={handleNavigate}
                  onQuickView={handleQuickView}
                  onOpenMonogramModal={() => setIsMonogramModalOpen(true)}
                />
              )}

              {currentPage === 'shop' && (
                <ShopPage
                  onNavigate={handleNavigate}
                  onQuickView={handleQuickView}
                  initialCategory={pageParam}
                />
              )}

              {(currentPage === 'product' || currentPage === 'product-detail') && (
                <ProductDetailPage
                  slug={pageParam || products[0]?.slug}
                  onNavigate={handleNavigate}
                  onOpenMonogramModal={() => setIsMonogramModalOpen(true)}
                />
              )}

              {(currentPage === 'bespoke-atelier' || currentPage === 'monogram' || currentPage === 'visualizer') && (
                <BespokeAtelierPage
                  onNavigate={handleNavigate}
                  onOpenMonogramModal={() => setIsMonogramModalOpen(true)}
                />
              )}

              {(currentPage === 'corporate-gifting' || currentPage === 'trade-program') && (
                <CorporateGiftsPage
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'our-story' && (
                <OurStoryPage
                  onNavigate={handleNavigate}
                />
              )}

              {(currentPage === 'checkout' || currentPage === 'cart') && (
                <CheckoutPage
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'track-order' && (
                <TrackOrderPage
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'contact' && (
                <ContactPage
                  onNavigate={handleNavigate}
                  onOpenMonogramModal={() => setIsMonogramModalOpen(true)}
                />
              )}

              {currentPage === 'faq' && (
                <FaqPage
                  onNavigate={handleNavigate}
                  onOpenMonogramModal={() => setIsMonogramModalOpen(true)}
                />
              )}

              {currentPage === 'account' && (
                <AccountPage
                  products={products}
                  onNavigate={handleNavigate}
                  onOpenMonogramModal={() => setIsMonogramModalOpen(true)}
                />
              )}

              {currentPage === 'admin' && (
                <AdminPage
                  products={products}
                  onRefreshProducts={fetchProducts}
                  onNavigate={handleNavigate}
                />
              )}
            </main>

            {/* Footer */}
            <Footer onNavigate={handleNavigate} />

            {/* Floating Quick Action Buttons */}
            <FloatingActions
              onNavigate={handleNavigate}
              onOpenMonogramModal={() => setIsMonogramModalOpen(true)}
            />

            {/* Mobile Bottom Navigation Bar */}
            <MobileBottomNav
              activePage={currentPage}
              onNavigate={handleNavigate}
              onOpenCart={() => setIsCartOpen(true)}
              onOpenMonogramModal={() => setIsMonogramModalOpen(true)}
            />

            {/* Slide-out Cart Drawer */}
            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              onNavigate={handleNavigate}
              onOpenMonogramModal={() => {
                setIsCartOpen(false);
                setIsMonogramModalOpen(true);
              }}
            />

            {/* Quick View Product Modal */}
            <QuickViewModal
              isOpen={!!quickViewProduct}
              product={quickViewProduct}
              onClose={() => setQuickViewProduct(null)}
              onNavigate={handleNavigate}
              onOpenMonogramModal={() => {
                setQuickViewProduct(null);
                setIsMonogramModalOpen(true);
              }}
            />

            {/* Bespoke Monogramming Modal */}
            <BespokeMonogramModal
              isOpen={isMonogramModalOpen}
              onClose={() => setIsMonogramModalOpen(false)}
            />
          </div>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
