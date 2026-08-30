import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { MobileMenu } from './components/layout/MobileMenu';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/Toast';

// Home components
import { Hero } from './components/home/Hero';
import { CollectionsGrid } from './components/home/CollectionsGrid';
import { NewArrivals } from './components/home/NewArrivals';
import { CampaignBanner } from './components/home/CampaignBanner';
import { ShoppableLookbookSection } from './components/home/ShoppableLookbookSection';
import { BrandStorySection } from './components/home/BrandStorySection';
import { NewsletterSection } from './components/home/NewsletterSection';

// Views
import { ShopView } from './components/shop/ShopView';
import { ProductDetailView } from './components/shop/ProductDetailView';
import { WishlistView } from './components/wishlist/WishlistView';
import { StoryView } from './components/story/StoryView';

// Modals & Drawers
import { ShoppingBagDrawer } from './components/cart/ShoppingBagDrawer';
import { CheckoutDemoModal } from './components/cart/CheckoutDemoModal';
import { QuickViewModal } from './components/shop/QuickViewModal';
import { SizeGuideModal } from './components/shop/SizeGuideModal';
import { SearchModal } from './components/search/SearchModal';
import { AccountDemoModal } from './components/account/AccountDemoModal';

const MainContent: React.FC = () => {
  const { activePage, selectedProduct } = useShop();

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedProduct]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2ED] text-[#1A1A1A] font-sans antialiased selection:bg-[#630D16] selection:text-[#F5F2ED]">
      {/* Toast Notification Stack */}
      <ToastContainer />

      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Navigation Header */}
      <Header />

      {/* Mobile Slide-out Menu */}
      <MobileMenu />

      {/* Dynamic View Routing */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <>
            <Hero />
            <CollectionsGrid />
            <NewArrivals />
            <CampaignBanner />
            <ShoppableLookbookSection />
            <BrandStorySection />
            <NewsletterSection />
          </>
        )}

        {activePage === 'shop' && <ShopView />}

        {activePage === 'product-detail' && selectedProduct && (
          <ProductDetailView product={selectedProduct} />
        )}

        {activePage === 'lookbook' && (
          <div className="py-6">
            <ShoppableLookbookSection />
          </div>
        )}

        {activePage === 'wishlist' && <WishlistView />}

        {activePage === 'story' && <StoryView />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Overlays, Drawers & Modals */}
      <ShoppingBagDrawer />
      <CheckoutDemoModal />
      <QuickViewModal />
      <SizeGuideModal />
      <SearchModal />
      <AccountDemoModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
