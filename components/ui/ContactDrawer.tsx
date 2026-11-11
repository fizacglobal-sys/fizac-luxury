'use client';

import React, { useEffect } from 'react';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLiveChat?: () => void;
  onOpenContactForm?: () => void;
}

export default function ContactDrawer({ 
  isOpen, 
  onClose, 
  onOpenLiveChat, 
  onOpenContactForm 
}: ContactDrawerProps) {
  // Prevent background scroll when slide drawer is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const phoneNumber = '+2349080994635';
  const whatsappNumber = '2349080994635';
  const whatsappMessage = encodeURIComponent('Hello FIZAC, I would like to make an inquiry.');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-neutral-950 text-neutral-100 shadow-2xl border-l border-neutral-800 flex flex-col justify-between transform transition duration-300 ease-in-out">
          
          {/* Header Section */}
          <div className="px-6 py-6 border-b border-neutral-800 flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-normal">
              Client Advisor & Concierge
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white transition-colors duration-200 focus:outline-none"
              aria-label="Close menu"
            >
              {/* Close X Icon */}
              <svg className="w-6 h-6 stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body Options */}
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
            <div className="mb-2">
              <h3 
                style={{ fontFamily: "'Granjon', 'Garamond', 'Georgia', serif" }} 
                className="text-xl tracking-[0.2em] text-white uppercase mb-1 font-normal"
              >
                Contact Us
              </h3>
              <p className="text-xs text-neutral-400 font-light tracking-wide leading-relaxed">
                Our advisors are available to assist you with bespoke requests, order tracking, and product advice.
              </p>
            </div>

            {/* Option 1: Direct Phone Call */}
            <a 
              href={`tel:${phoneNumber}`}
              className="group block p-4 rounded-none border border-neutral-800 hover:border-neutral-400 bg-neutral-900/40 hover:bg-neutral-900 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <svg className="w-5 h-5 stroke-[1.25] text-neutral-300 group-hover:text-white mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.826-1.47-5.114-3.758-6.584-6.584l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <span className="text-xs uppercase tracking-wider font-medium text-white group-hover:underline">
                      Call Us
                    </span>
                    <span className="text-xs text-neutral-300 font-mono">
                      +234 (90) 8099-4635
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1.5 font-light leading-relaxed">
                    Monday - Saturday from 10 AM to 8.30 PM (EST)<br />
                    Sunday from 11.00 AM to 8.00 PM (EST)
                  </p>
                </div>
              </div>
            </a>

            {/* Option 2: Live Chat */}
            <button
              onClick={() => {
                onClose();
                if (onOpenLiveChat) onOpenLiveChat();
              }}
              className="w-full text-left group block p-4 border border-neutral-800 hover:border-neutral-400 bg-neutral-900/40 hover:bg-neutral-900 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <svg className="w-5 h-5 stroke-[1.25] text-neutral-300 group-hover:text-white mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.596.596 0 01-.743-.65 4.58 4.58 0 011.01-2.28 8.084 8.084 0 01-1.677-6.04C4.001 7.444 8.03 3.75 13 3.75s9 3.694 9 8.25z" />
                </svg>
                <div>
                  <span className="text-xs uppercase tracking-wider font-medium text-white group-hover:underline block">
                    LIVE CHAT
                  </span>
                  <p className="text-[11px] text-neutral-400 mt-1.5 font-light leading-relaxed">
                    Monday - Saturday from 10 AM to 8.30 PM (EST)<br />
                    Sunday from 11.00 AM to 8.00 PM (EST)
                  </p>
                </div>
              </div>
            </button>

            {/* Option 3: WhatsApp Us */}
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 border border-neutral-800 hover:border-neutral-400 bg-neutral-900/40 hover:bg-neutral-900 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <svg className="w-5 h-5 stroke-[1.25] text-neutral-300 group-hover:text-white mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.556 0 8.25-3.694 8.25-8.25S16.556 3.75 12 3.75 3.75 7.444 3.75 12c0 1.63.473 3.15 1.29 4.434L4.25 19.75l3.476-.773A8.212 8.212 0 0012 20.25z" />
                </svg>
                <div>
                  <span className="text-xs uppercase tracking-wider font-medium text-white group-hover:underline block">
                    WhatsApp Us
                  </span>
                  <p className="text-[11px] text-neutral-400 mt-1.5 font-light leading-relaxed">
                    Monday - Saturday from 10 AM to 8.30 PM (EST)<br />
                    Sunday from 11.00 AM to 8.00 PM (EST)
                  </p>
                </div>
              </div>
            </a>

            {/* Option 4: Get in Contact with Us */}
            <div className="pt-4 border-t border-neutral-800">
              <p className="text-xs text-neutral-400 mb-3 tracking-wide">
                Do you need further assistance?
              </p>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenContactForm) onOpenContactForm();
                }}
                className="w-full py-3.5 px-4 bg-white text-black hover:bg-neutral-200 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Get in Contact with Us
              </button>
            </div>
          </div>

          {/* Footer Branding */}
          <div className="px-6 py-4 border-t border-neutral-900 text-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono">
              FIZAC GLOBAL © 2026
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}