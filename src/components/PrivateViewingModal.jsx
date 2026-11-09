import React, { useState, useEffect, useCallback } from 'react';
import { X, Calendar, Clock, MapPin, Coffee, Wine, ShieldCheck, Check, Send } from 'lucide-react';
import { useStore } from '../state/store';
import { BRAND_CONFIG, buildWhatsAppUrl } from '../config/brand';

const SHOWROOMS = [
  { id: 'soho', name: 'SoHo Flagship Atelier', city: '442 West Broadway, New York, NY' },
  { id: 'paris', name: 'Le Marais Salon', city: '18 Rue de Turenne, 75004 Paris' },
  { id: 'milan', name: 'Montenapoleone Studio', city: 'Via Santo Spirito 14, 20121 Milano' },
];

const CONSULTATION_TYPES = [
  'Private Gallery Viewing',
  'Architectural Trade Commission',
  'Material & Swatch Consultation',
  'Full Residence Spatial Curation',
];

const REFRESHMENTS = ['Espresso & Macchiato', 'Champagne & Mineral Water', 'Matcha & Herbal Infusions', 'Still Water Only'];

export function PrivateViewingModal() {
  const { isAppointmentOpen, closeAppointment, appointmentPiece, savedProducts } = useStore();

  const [selectedShowroom, setSelectedShowroom] = useState('soho');
  const [selectedType, setSelectedType] = useState(CONSULTATION_TYPES[0]);
  const [selectedRefreshment, setSelectedRefreshment] = useState(REFRESHMENTS[0]);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('14:00');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') closeAppointment();
  }, [closeAppointment]);

  useEffect(() => {
    if (isAppointmentOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setSubmitted(false);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isAppointmentOpen, handleKeyDown]);

  if (!isAppointmentOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const piecesMentioned = appointmentPiece
      ? appointmentPiece.name
      : savedProducts.length > 0
      ? savedProducts.map((p) => p.name).join(', ')
      : 'General Collection Walkthrough';

    const message = `Hello ${BRAND_CONFIG.wordmark} Concierge,\n\nI would like to confirm a VIP Private Showroom Appointment:\n• Guest: ${clientName || 'Private Guest'}\n• Atelier: ${SHOWROOMS.find((s) => s.id === selectedShowroom)?.name}\n• Date & Time: ${date || 'Earliest Available'} at ${timeSlot}\n• Focus: ${selectedType}\n• Pieces of Interest: ${piecesMentioned}\n• Hospitality: ${selectedRefreshment}\n• Notes: ${clientNotes || 'None'}\n\nPlease confirm availability.`;

    const url = buildWhatsAppUrl([], message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book Private Atelier Consultation"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/75 backdrop-blur-sm overflow-y-auto"
    >
      <div className="fixed inset-0 -z-10" onClick={closeAppointment} />

      <div className="relative w-full max-w-2xl bg-cream text-ink shadow-2xl rounded-sm overflow-hidden my-auto border border-red/30">
        
        {/* Header */}
        <div className="bg-ink text-cream px-6 sm:px-8 py-5 flex items-center justify-between border-b border-white/10">
          <div>
            <span className="font-display text-xl sm:text-2xl text-red uppercase tracking-wide block">
              VIP Private Atelier Consultation
            </span>
            <span className="font-mono text-xs text-cream/70 uppercase tracking-widest block mt-0.5">
              Personal Showroom Walkthrough & Bespoke Architectural Review
            </span>
          </div>

          <button
            type="button"
            onClick={closeAppointment}
            className="w-8 h-8 rounded-full flex items-center justify-center text-cream/70 hover:text-cream hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close appointment modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto font-serif">
          
          {/* Piece of Interest Banner */}
          {appointmentPiece && (
            <div className="p-3 bg-red/10 border border-red/30 rounded-sm flex items-center gap-3">
              <img
                src={appointmentPiece.image}
                alt={appointmentPiece.name}
                className="w-12 h-12 object-cover border border-red/20"
              />
              <div>
                <span className="font-mono text-[10px] text-red uppercase tracking-wider block">
                  Focus Piece for Consultation
                </span>
                <span className="font-display text-sm text-ink uppercase tracking-wider font-semibold">
                  {appointmentPiece.name}
                </span>
                <span className="font-mono text-[10px] text-grey block">
                  {appointmentPiece.dimensions}
                </span>
              </div>
            </div>
          )}

          {/* 1. Select Atelier Location */}
          <div>
            <label className="font-mono text-xs text-red uppercase tracking-widest block mb-2 font-medium">
              1. Select Atelier Location
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SHOWROOMS.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setSelectedShowroom(room.id)}
                  className={`p-3 text-left border rounded-sm transition-all cursor-pointer ${
                    selectedShowroom === room.id
                      ? 'border-red bg-red/5 ring-1 ring-red text-ink'
                      : 'border-grey/30 bg-white/60 hover:bg-white text-ink/80'
                  }`}
                >
                  <span className="font-display text-xs uppercase tracking-wide font-semibold block">
                    {room.name}
                  </span>
                  <span className="font-mono text-[10px] text-grey block mt-0.5">
                    {room.city}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Consultation Type */}
          <div>
            <label className="font-mono text-xs text-red uppercase tracking-widest block mb-2 font-medium">
              2. Nature of Visit
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CONSULTATION_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`py-2 px-3 text-left border rounded-sm font-mono text-xs transition-all cursor-pointer ${
                    selectedType === type
                      ? 'border-red bg-red/5 font-semibold text-red'
                      : 'border-grey/30 bg-white/60 text-ink/75 hover:bg-white'
                  }`}
                >
                  • {type}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Date & Preferred Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="apt-date" className="font-mono text-xs text-red uppercase tracking-widest block mb-1 font-medium">
                3. Preferred Date
              </label>
              <input
                id="apt-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-grey/30 rounded-sm font-mono text-xs text-ink focus:border-red focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="apt-time" className="font-mono text-xs text-red uppercase tracking-widest block mb-1 font-medium">
                Preferred Time
              </label>
              <select
                id="apt-time"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-grey/30 rounded-sm font-mono text-xs text-ink focus:border-red focus:outline-none cursor-pointer"
              >
                <option value="11:00">11:00 — Morning Curation</option>
                <option value="14:00">14:00 — Afternoon Walkthrough</option>
                <option value="16:30">16:30 — Golden Hour Session</option>
                <option value="18:30">18:30 — Evening Private Salon</option>
              </select>
            </div>
          </div>

          {/* 4. Hospitality Preference */}
          <div>
            <label className="font-mono text-xs text-red uppercase tracking-widest block mb-2 font-medium">
              4. Atelier Hospitality
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {REFRESHMENTS.map((ref) => (
                <button
                  key={ref}
                  type="button"
                  onClick={() => setSelectedRefreshment(ref)}
                  className={`p-2 text-center border rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                    selectedRefreshment === ref
                      ? 'border-red bg-red/10 text-red font-semibold'
                      : 'border-grey/30 bg-white/60 text-grey hover:bg-white'
                  }`}
                >
                  {ref}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Guest Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-grey/20 pt-4">
            <div>
              <label htmlFor="client-name" className="font-mono text-xs text-grey uppercase tracking-wider block mb-1">
                Guest Name / Firm
              </label>
              <input
                id="client-name"
                type="text"
                required
                placeholder="e.g. Elena Rostova / Studio Rostova"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-grey/30 rounded-sm font-serif text-xs text-ink focus:border-red focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="client-email" className="font-mono text-xs text-grey uppercase tracking-wider block mb-1">
                Direct Contact Email
              </label>
              <input
                id="client-email"
                type="email"
                required
                placeholder="e.g. elena@rostovadesign.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-grey/30 rounded-sm font-serif text-xs text-ink focus:border-red focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-red text-cream font-display text-sm uppercase tracking-widest hover:bg-ink transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Dispatch Private Appointment Request</span>
              <Send className="w-4 h-4" />
            </button>
            <p className="font-mono text-[10px] text-grey text-center mt-2">
              Concierge confirms via direct WhatsApp and calendar invite within 2 hours.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
