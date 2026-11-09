import React, { useEffect, lazy, Suspense } from 'react';
import { initLenis, destroyAnimations } from './animations';
import { Cursor } from './components/Cursor';
import { Preloader } from './components/Preloader';
import { Nav } from './components/Nav';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { Statement } from './components/Statement';
import { CategoryIndex } from './components/CategoryIndex';
import { EthosShowcase } from './components/EthosShowcase';
import { ProductGrid } from './components/ProductGrid';
import { RoomShowcase } from './components/RoomShowcase';
import { VisitSection } from './components/VisitSection';
import { Footer } from './components/Footer';
import { BagDrawer } from './components/BagDrawer';
import { SavedDrawer } from './components/SavedDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { WhatsAppButton } from './components/WhatsAppButton';
// Click-only / pitch-only pieces load on demand, not in the first paint.
// This keeps the initial bundle smaller (Performance / TBT) — they are
// only needed when a user opens a modal or ?pitch=1 is present.
const PitchControls = lazy(() =>
  import('./components/PitchControls').then((m) => ({ default: m.PitchControls }))
);
const DeviceEndCard = lazy(() =>
  import('./components/DeviceEndCard').then((m) => ({ default: m.DeviceEndCard }))
);
const TradeTearSheetModal = lazy(() =>
  import('./components/TradeTearSheetModal').then((m) => ({ default: m.TradeTearSheetModal }))
);
const PrivateViewingModal = lazy(() =>
  import('./components/PrivateViewingModal').then((m) => ({ default: m.PrivateViewingModal }))
);
const PresentationBar = lazy(() =>
  import('./components/PresentationBar').then((m) => ({ default: m.PresentationBar }))
);

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll synced with ScrollTrigger
    initLenis();

    return () => {
      destroyAnimations();
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink relative selection:bg-red selection:text-cream">
      {/* Subtle Tactile Museum Cotton Paper Grain (Removes digital monitor flatness) */}
      <div className="editorial-grain" aria-hidden="true" />

      {/* Custom Pointer Cursor */}
      <Cursor />

      {/* Lookbook Session Preloader */}
      <Preloader />

      {/* Navigation Header */}
      <Nav />

      {/* Main Page Flow */}
      <main id="main-content">
        <Hero />
        <Statement />
        <CategoryIndex />
        <EthosShowcase />
        <ProductGrid />
        <RoomShowcase />
        <VisitSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Drawers, Modals & Floating Concierge */}
      <MobileMenu />
      <BagDrawer />
      <SavedDrawer />
      <SearchOverlay />
      <WhatsAppButton />
      <Suspense fallback={null}>
        <PitchControls />
        <DeviceEndCard />

        {/* Enterprise High-Ticket Modals */}
        <TradeTearSheetModal />
        <PrivateViewingModal />
        <PresentationBar />
      </Suspense>
    </div>
  );
}
