'use client';

import React from 'react';
import { 
  Cpu, 
  MapPin, 
  Lock, 
  Eye, 
  TrendingUp, 
  Network, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

const ROADMAP_ITEMS = [
  {
    icon: MapPin,
    title: 'Real-Time GPS Telematics',
    description: 'Hardware OBD-II & GPS tracker integrations providing sub-second vehicle telemetry, speed monitoring, and geofenced station entry alerts.',
    tag: 'Phase 2 Architecture'
  },
  {
    icon: Cpu,
    title: 'Machine-Learning ETA Prediction',
    description: 'Historical toll queue models, Purvanchal & Yamuna Expressway weather feeds, and real-time congestion analysis to predict delivery ETA within ±10 minutes.',
    tag: 'AI/ML Pipeline'
  },
  {
    icon: Lock,
    title: 'Automated ISBT Smart Lockers',
    description: 'Self-serve 24/7 modular smart lockers at Kashmere Gate, Alambagh, and Bairiya terminals where receivers unlock bays using their OTP without counter queues.',
    tag: 'Hardware Integration'
  },
  {
    icon: Eye,
    title: 'Computer Vision Parcel Inspection',
    description: 'Automated smartphone camera scanning to calculate precise volumetric dimensions (L x W x H) and verify tamper-proof packaging integrity in under 2 seconds.',
    tag: 'Edge AI Vision'
  },
  {
    icon: TrendingUp,
    title: 'Dynamic Bus Capacity Pricing',
    description: 'Algorithmic spot-pricing that discounts cargo rates on under-utilized departure runs and optimizes operator yield curves.',
    tag: 'Yield Engine'
  },
  {
    icon: Network,
    title: 'Nationwide RTC & Private Fleet API',
    description: 'Direct API integrations with state transport corporations (UPSRTC, BSRTC, MSRTC) and leading private fleets for 50,000+ daily bus departures.',
    tag: 'Enterprise Expansion'
  },
];

export function FutureScope() {
  return (
    <section className="py-20 bg-navy-950 text-white relative overflow-hidden border-t border-navy-800">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-400 bg-brand-950 border border-brand-800 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            Hackathon Vision & Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What&apos;s Next for BusLink 24?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            From this working hackathon prototype to an enterprise-grade nationwide AI bus freight network.
          </p>
        </div>

        {/* 6 Roadmap Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROADMAP_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-navy-900/80 border border-navy-800 rounded-3xl p-6 hover:border-brand-500/50 hover:bg-navy-900 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-navy-800 border border-navy-700 text-brand-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 bg-navy-950 px-2.5 py-1 rounded-full border border-navy-800">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-navy-800/80 flex items-center text-[11px] font-semibold text-brand-400">
                  <span>Planned for MVP v2.0</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Start Demo Footer Box */}
        <div className="mt-14 bg-gradient-to-r from-brand-900/40 via-navy-900 to-brand-900/40 border border-brand-700/40 rounded-3xl p-6 sm:p-8 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-white">
            Ready to test the 3-minute interactive hackathon flow?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Experience the complete user journey: Select Delhi ➔ Patna, run the AI Matching Engine, confirm booking, simulate live tracking and verify OTP delivery.
          </p>
          <div className="pt-2">
            <Link
              href="/send"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-brand-600/30 hover:shadow-xl transition-all text-sm group"
            >
              <span>Launch Prototype Booking Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
