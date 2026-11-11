import React from 'react';
import { MessageSquare } from 'lucide-react';
import { buildWhatsAppUrl } from '../config/brand';

export function WhatsAppButton() {
  const url = buildWhatsAppUrl();

  return (
    <aside
      aria-label="Direct Showroom Concierge"
      className="fixed bottom-6 right-6 z-40 hidden md:block"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-ink hover:bg-red text-cream shadow-2xl transition-all duration-300 hover:scale-105 select-none border border-grey/30"
        aria-label="Contact Concierge on WhatsApp"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red group-hover:bg-cream opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red group-hover:bg-cream"></span>
        </span>
        <MessageSquare className="w-4 h-4 stroke-[1.8]" />
        <span className="font-sans font-medium text-xs tracking-wider uppercase">
          Concierge
        </span>
      </a>
    </aside>
  );
}
