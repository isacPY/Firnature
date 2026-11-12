import React from 'react';
import { MapPin, Clock, Phone, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import { BRAND_CONFIG, ROOM_SHOWCASE, buildWhatsAppUrl } from '../config/brand';
import { handleImageFallback, getLocalSrcset } from '../utils/placeholders';

export function VisitSection() {
  const showroom = BRAND_CONFIG.showroom;
  const whatsappUrl = buildWhatsAppUrl();
  const visitSrcset = getLocalSrcset(ROOM_SHOWCASE.image, '(max-width: 768px) calc(100vw - 40px), 1200px');

  return (
    <section
      id="contact"
      className="relative w-full bg-ink text-cream py-16 sm:py-24 px-5 sm:px-8 border-b border-red/20 select-none"
      aria-label="Showroom Visit and Inquiries"
    >
      <div className="max-w-[1440px] mx-auto">

        {/* Image strip — the collection in situ, carrying the mood into the visit */}
        <div className="relative mb-10 sm:mb-14 overflow-hidden border border-grey/30">
          <img
            src={ROOM_SHOWCASE.image}
            {...(visitSrcset ? { srcSet: visitSrcset.srcSet, sizes: visitSrcset.sizes } : {})}
            onError={(e) => handleImageFallback(e, 'sofas')}
            alt="Spatial Sanctuary — the collection in situ"
            loading="lazy"
            decoding="async"
            className="w-full h-56 sm:h-72 object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-ink/70 backdrop-blur-md text-cream px-3.5 py-1.5 rounded-full text-[11px] font-sans tracking-wide">
            Spatial Sanctuary № 01 — the collection, in situ
          </div>
        </div>

        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <span className="font-display text-xs sm:text-sm text-red tracking-[0.15em] uppercase block mb-1">
            06 — PRIVATE VISITATION & SHOWROOM
          </span>
          <h2 className="font-serif text-[clamp(2.4rem,4.5vw,4.5rem)] text-cream leading-[0.95] tracking-tight">
            Experience the Collection <span className="italic text-cream/90">in Person.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Address, Hours, Contact Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-8">
              {/* Showroom Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-cream/25 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-4 h-4 text-red" />
                </div>
                <div>
                  <h3 className="font-display text-sm tracking-widest text-red uppercase">
                    {showroom.title}
                  </h3>
                  <p className="font-serif text-lg text-cream mt-1">
                    {showroom.address}
                  </p>
                  <p className="font-serif text-base text-cream/70">
                    {showroom.city}, {showroom.country}
                  </p>
                  <a
                    href={showroom.mapDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-display text-xs text-red tracking-wider uppercase mt-2 hover:underline"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-cream/25 flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-4 h-4 text-red" />
                </div>
                <div>
                  <h3 className="font-display text-sm tracking-widest text-red uppercase">
                    SHOWROOM HOURS
                  </h3>
                  <div className="mt-2 space-y-1.5 font-serif text-sm sm:text-base text-cream">
                    {showroom.hours.map((h, i) => (
                      <div key={i} className="flex items-baseline justify-between gap-6 max-w-sm">
                        <span className="text-cream/70">{h.days}</span>
                        <span className="font-mono text-xs text-cream">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inquiries & Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-cream/25 flex items-center justify-center shrink-0 mt-1">
                  <Phone className="w-4 h-4 text-red" />
                </div>
                <div>
                  <h3 className="font-display text-sm tracking-widest text-red uppercase">
                    DIRECT INQUIRIES
                  </h3>
                  <p className="font-serif text-lg text-cream mt-1">
                    <a href={`tel:+${showroom.phone.replace(/[^0-9]/g, '')}`} className="hover:text-red transition-colors">
                      {showroom.displayPhone}
                    </a>
                  </p>
                  <p className="font-serif text-sm text-cream/70">
                    <a href={`mailto:${showroom.email}`} className="hover:underline">
                      {showroom.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Concierge Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-red text-cream font-sans text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-ink transition-colors duration-300 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Schedule on WhatsApp</span>
              </a>

              <a
                href={`tel:+${showroom.phone.replace(/[^0-9]/g, '')}`}
                className="px-8 py-3.5 rounded-full border border-cream/40 text-cream font-sans text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:border-red hover:text-red transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>Call Showroom</span>
              </a>
            </div>

          </div>

          {/* Right Column: Architectural Map View */}
          <div className="lg:col-span-6 min-h-[380px] w-full rounded-sm overflow-hidden border border-cream/25 relative bg-cream/5">
            <iframe
              title="Showroom Location Map"
              src={showroom.mapEmbedUrl}
              className="w-full h-full min-h-[380px] border-0 grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-700"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}
