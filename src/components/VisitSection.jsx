import React from 'react';
import { MapPin, Clock, Phone, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import { BRAND_CONFIG, buildWhatsAppUrl } from '../config/brand';

export function VisitSection() {
  const showroom = BRAND_CONFIG.showroom;
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section
      id="contact"
      className="relative w-full bg-cream py-20 sm:py-32 px-5 sm:px-8 border-b border-red/20 select-none"
      aria-label="Showroom Visit and Inquiries"
    >
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <span className="font-display text-xs sm:text-sm text-red tracking-[0.15em] uppercase block mb-1">
            05 — PRIVATE VISITATION & SHOWROOM
          </span>
          <h2 className="font-serif text-[clamp(2.4rem,4.5vw,4.5rem)] text-ink leading-[0.95] tracking-tight">
            Experience the Collection in Person.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Address, Hours, Contact Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-8">
              {/* Showroom Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-4 h-4 text-red" />
                </div>
                <div>
                  <h3 className="font-display text-sm tracking-widest text-red uppercase">
                    {showroom.title}
                  </h3>
                  <p className="font-serif text-lg text-ink mt-1">
                    {showroom.address}
                  </p>
                  <p className="font-serif text-base text-grey">
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
                <div className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-4 h-4 text-red" />
                </div>
                <div>
                  <h3 className="font-display text-sm tracking-widest text-red uppercase">
                    SHOWROOM HOURS
                  </h3>
                  <div className="mt-2 space-y-1.5 font-serif text-sm sm:text-base text-ink">
                    {showroom.hours.map((h, i) => (
                      <div key={i} className="flex items-baseline justify-between gap-6 max-w-sm">
                        <span className="text-grey">{h.days}</span>
                        <span className="font-mono text-xs text-ink">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inquiries & Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center shrink-0 mt-1">
                  <Phone className="w-4 h-4 text-red" />
                </div>
                <div>
                  <h3 className="font-display text-sm tracking-widest text-red uppercase">
                    DIRECT INQUIRIES
                  </h3>
                  <p className="font-serif text-lg text-ink mt-1">
                    <a href={`tel:${showroom.phone}`} className="hover:text-red transition-colors">
                      {showroom.displayPhone}
                    </a>
                  </p>
                  <p className="font-serif text-sm text-grey">
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
                href={`tel:${showroom.phone}`}
                className="px-8 py-3.5 rounded-full border border-ink text-ink font-sans text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:border-red hover:text-red transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>Call Showroom</span>
              </a>
            </div>

          </div>

          {/* Right Column: Architectural Map View */}
          <div className="lg:col-span-6 min-h-[380px] w-full rounded-sm overflow-hidden border border-grey/30 relative bg-ink/5">
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
