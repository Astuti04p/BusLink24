'use client';

import React from 'react';
import { Zap, DollarSign, Globe2, ShieldCheck, Check } from 'lucide-react';

const VALUES = [
  {
    title: '⚡ Lightning Fast Transit',
    highlight: 'Overnight vs 3-4 Days',
    description: 'Traditional surface couriers consolidate packages in multi-tier regional sorting hubs for days. BusLink 24 puts your parcel directly onto the next departure bus.',
    features: ['Direct highway corridors', 'No intermediate sorting hub delays', 'Arrives with the morning passengers'],
    icon: Zap,
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    iconBg: 'bg-rose-600',
  },
  {
    title: '💰 Ultra Affordable',
    highlight: 'Up to 40% Cheaper',
    description: 'Buses are running their routes anyway. By monetizing empty luggage belly capacity, operators earn incremental revenue while senders save up to 40% on express shipping.',
    features: ['Zero dedicated fleet capital costs', 'Transparent flat-rate pricing', 'No sudden fuel surcharge spikes'],
    icon: DollarSign,
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-600',
  },
  {
    title: '🌐 Infinitely Scalable',
    highlight: '10,000+ Existing Daily Trips',
    description: 'India possesses one of the densest intercity coach networks in the world. BusLink 24 connects Tier-1, Tier-2, and Tier-3 towns without needing new road infrastructure.',
    features: ['Covers 100+ cities instantly', 'Deep penetration into Tier-2/3 India', 'Immediate capacity expansion on demand'],
    icon: Globe2,
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    iconBg: 'bg-blue-600',
  },
  {
    title: '🔐 Tamper-Evident Security',
    highlight: '2-Factor OTP & QR Verification',
    description: 'Every parcel is assigned a unique digital QR pass and locked securely in the bus luggage section. Parcels are handed over strictly upon entering the 6-digit receiver OTP.',
    features: ['Encrypted 6-digit receiver OTP', 'Digital luggage bay weight sensing', 'Direct driver/conductor contact'],
    icon: ShieldCheck,
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    iconBg: 'bg-amber-600',
  },
];

export function ValueProps() {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
            The Value Proposition
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Why BusLink 24?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Revolutionizing intercity cargo logistics by bridging the gap between slow surface couriers and expensive air freight.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VALUES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${item.badgeBg}`}>
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-950 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 space-y-2">
                  {item.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
