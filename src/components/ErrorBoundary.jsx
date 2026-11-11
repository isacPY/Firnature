import React from 'react';

/**
 * ErrorBoundary — catches render crashes anywhere in the tree and shows a
 * graceful fallback instead of a blank page (patch 4 proved a one-line bug
 * can blank the whole live site). The fallback is on-brand (cream, ink,
 * red) and offers a single recovery action: reload.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (typeof console !== 'undefined' && console.error) {
      console.error('ATELIER° render error:', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream text-ink flex flex-col items-center justify-center px-6 py-16 text-center">
          <span className="font-display text-xs text-red tracking-[0.2em] uppercase block mb-4">
            ATELIER°
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight">
            Something went wrong.
          </h1>
          <p className="font-serif italic text-base text-grey mt-3 max-w-md leading-relaxed">
            This page could not be displayed. Nothing has been lost — please
            reload and continue browsing the collection.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-8 px-8 py-3 rounded-full bg-ink text-cream hover:bg-red font-sans text-xs tracking-widest uppercase transition-colors cursor-pointer"
          >
            Reload the page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
