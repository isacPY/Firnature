import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { PRODUCTS, BRAND_CONFIG } from '../config/brand';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // Session Preloader State
  const [preloaderDone, setPreloaderDoneState] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      return sessionStorage.getItem('atelier_seen') === '1';
    } catch (e) {
      return false;
    }
  });

  const setPreloaderDone = useCallback((val) => {
    setPreloaderDoneState(val);
    try {
      if (val) {
        sessionStorage.setItem('atelier_seen', '1');
      } else {
        sessionStorage.removeItem('atelier_seen');
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const replayPreloader = useCallback(() => {
    try {
      sessionStorage.removeItem('atelier_seen');
    } catch (e) {
      // ignore
    }
    setPreloaderDoneState(false);
  }, []);

  // Live Rebranding State (In-Call Pitch Customizer)
  const [customBrandName, setCustomBrandNameState] = useState(() => {
    if (typeof window === 'undefined') return BRAND_CONFIG.name;
    try {
      return localStorage.getItem('atelier_custom_brand') || BRAND_CONFIG.name;
    } catch (e) {
      return BRAND_CONFIG.name;
    }
  });

  const setCustomBrandName = useCallback((name) => {
    const trimmed = (name || '').trim() || BRAND_CONFIG.name;
    setCustomBrandNameState(trimmed);
    BRAND_CONFIG.name = trimmed;
    BRAND_CONFIG.wordmark = trimmed.endsWith('°') ? trimmed : `${trimmed}°`;
    try {
      localStorage.setItem('atelier_custom_brand', trimmed);
    } catch (e) {
      // ignore
    }
    // Update document title live
    if (typeof document !== 'undefined') {
      document.title = `${BRAND_CONFIG.wordmark} | Haute Architecture & Editorial Living`;
    }
  }, []);

  // Active Category Filter
  const [activeCategory, setActiveCategory] = useState('all');

  // Drawers & Modals
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDeviceEndCardOpen, setIsDeviceEndCardOpen] = useState(false);

  // High-Ticket Enterprise Modals
  const [isTearSheetOpen, setIsTearSheetOpen] = useState(false);
  const [tearSheetProduct, setTearSheetProduct] = useState(null);
  
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentPiece, setAppointmentPiece] = useState(null);

  // Fullscreen Executive Pitch Mode
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  const openTearSheet = useCallback((product) => {
    setTearSheetProduct(product || PRODUCTS[0]);
    setIsTearSheetOpen(true);
  }, []);

  const closeTearSheet = useCallback(() => {
    setIsTearSheetOpen(false);
  }, []);

  const openAppointment = useCallback((piece = null) => {
    setAppointmentPiece(piece);
    setIsAppointmentOpen(true);
  }, []);

  const closeAppointment = useCallback(() => {
    setIsAppointmentOpen(false);
  }, []);

  const togglePresentationMode = useCallback(() => {
    setIsPresentationMode((prev) => !prev);
  }, []);

  // Saved / Wishlist Items
  const [savedIds, setSavedIds] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('atelier_saved');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('atelier_saved', JSON.stringify(savedIds));
    } catch (e) {
      // ignore
    }
  }, [savedIds]);

  const isSaved = useCallback((productId) => {
    return savedIds.includes(productId);
  }, [savedIds]);

  const toggleSave = useCallback((product) => {
    setSavedIds((prev) => {
      const exists = prev.includes(product.id);
      return exists ? prev.filter((id) => id !== product.id) : [...prev, product.id];
    });
  }, []);

  const savedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => savedIds.includes(p.id));
  }, [savedIds]);

  // Bag / Inquiries Cart
  const [bagItems, setBagItems] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('atelier_bag');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('atelier_bag', JSON.stringify(bagItems));
    } catch (e) {
      // ignore
    }
  }, [bagItems]);

  const addToBag = useCallback((product) => {
    setBagItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsBagOpen(true);
  }, []);

  const removeFromBag = useCallback((productId) => {
    setBagItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateBagQuantity = useCallback((productId, delta) => {
    setBagItems((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  }, []);

  const clearBag = useCallback(() => {
    setBagItems([]);
  }, []);

  const bagCount = useMemo(() => {
    return bagItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  }, [bagItems]);

  const toggleDeviceEndCard = useCallback(() => {
    setIsDeviceEndCardOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      preloaderDone,
      setPreloaderDone,
      replayPreloader,
      customBrandName,
      setCustomBrandName,
      activeCategory,
      setActiveCategory,
      isBagOpen,
      setIsBagOpen,
      isSavedOpen,
      setIsSavedOpen,
      isSearchOpen,
      setIsSearchOpen,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      isDeviceEndCardOpen,
      toggleDeviceEndCard,
      // Tear Sheet
      isTearSheetOpen,
      tearSheetProduct,
      openTearSheet,
      closeTearSheet,
      // VIP Appointment
      isAppointmentOpen,
      appointmentPiece,
      openAppointment,
      closeAppointment,
      // Presentation Mode
      isPresentationMode,
      togglePresentationMode,
      // Saved / Bag
      savedIds,
      savedProducts,
      isSaved,
      toggleSave,
      bagItems,
      bagCount,
      addToBag,
      removeFromBag,
      updateBagQuantity,
      clearBag,
    }),
    [
      preloaderDone,
      setPreloaderDone,
      replayPreloader,
      customBrandName,
      setCustomBrandName,
      activeCategory,
      isBagOpen,
      isSavedOpen,
      isSearchOpen,
      isMobileMenuOpen,
      isDeviceEndCardOpen,
      toggleDeviceEndCard,
      isTearSheetOpen,
      tearSheetProduct,
      openTearSheet,
      closeTearSheet,
      isAppointmentOpen,
      appointmentPiece,
      openAppointment,
      closeAppointment,
      isPresentationMode,
      togglePresentationMode,
      savedIds,
      savedProducts,
      isSaved,
      toggleSave,
      bagItems,
      bagCount,
      addToBag,
      removeFromBag,
      updateBagQuantity,
      clearBag,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
