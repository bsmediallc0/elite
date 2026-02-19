"use client";

import { InlineWidget } from "react-calendly";

export default function BookingSystem() {
  return (
    <section className="bg-deep py-24 px-6" id="book-now">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase italic">
          Schedule Your <span className="text-primary">Roof Inspection</span>
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
          Select a time that works for you, and our expert team will be there to provide a detailed assessment.
        </p>

        {/* Calendly Widget */}
        <div className="bg-layer border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
          <InlineWidget 
            url="https://calendly.com/YOUR_LINK" // Buraya kendi Calendly linkini koyacaksın kanka
            styles={{ height: '700px' }}
            pageSettings={{
              backgroundColor: '0a0a0a',
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: 'b91c1c',
              textColor: 'ffffff',
            }}
          />
        </div>
      </div>
    </section>
  );
}