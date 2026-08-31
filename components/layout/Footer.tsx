'use client';

import React from 'react';
import Link from 'next/link';
import { Bus, ShieldCheck, Zap, Sparkles, MapPin, ArrowUpRight } from 'lucide-react';
import { useDemo } from '@/lib/demoState';

export function Footer() {
  const { resetToDemoPreset } = useDemo();

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800/80 pt-16 pb-24 md:pb-16 mt-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-brand-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Live Network Status Banner */}
        <div className="bg-navy-900/90 border border-navy-700/80 rounded-2xl p-4 sm:p-5 mb-12 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <p className="text-sm font-bold text-white flex items-center gap-2">
                BusLink 24 Active Corridor Network
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  LIVE SIMULATION
                </span>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                246 partner buses currently active across 42 cities with real-time cargo space allocation.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={resetToDemoPreset}
              className="text-xs font-semibold bg-navy-800 hover:bg-navy-700 text-slate-200 px-3.5 py-2 rounded-xl border border-navy-700 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              Reset Demo Preset
            </button>
            <Link
              href="/admin"
              className="text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl transition-all shadow-md shadow-brand-600/30 flex items-center gap-1"
            >
              Admin Control Center <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-navy-800/80">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-600/30">
                <Bus className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Bus<span className="text-brand-500">Link</span> <span className="text-xs text-brand-400 bg-brand-950 px-1.5 py-0.5 rounded border border-brand-800">24</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              &ldquo;Send Today. Reach Tomorrow.&rdquo; Transforming India&apos;s existing 10,000+ daily intercity buses into an AI-powered 24-hour parcel delivery backbone.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" /> OTP Verified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-400 font-medium">
                <Zap className="w-4 h-4" /> 24hr Target
              </span>
            </div>
          </div>

          {/* Quick Demo Routes */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              High-Frequency Corridors
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-white transition-colors flex items-center justify-between">
                <span>Delhi ➔ Patna (ISBT ➔ Bairiya)</span>
                <span className="text-emerald-400 font-mono text-[11px]">10h 15m</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center justify-between">
                <span>Delhi ➔ Lucknow (Alambagh)</span>
                <span className="text-emerald-400 font-mono text-[11px]">6h 30m</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center justify-between">
                <span>Mumbai ➔ Pune (Swargate)</span>
                <span className="text-emerald-400 font-mono text-[11px]">3h 15m</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center justify-between">
                <span>Delhi ➔ Jaipur (Sindhi Camp)</span>
                <span className="text-emerald-400 font-mono text-[11px]">4h 45m</span>
              </li>
              <li className="hover:text-white transition-colors flex items-center justify-between">
                <span>Bangalore ➔ Chennai (CMBT)</span>
                <span className="text-emerald-400 font-mono text-[11px]">5h 50m</span>
              </li>
            </ul>
          </div>

          {/* Prototype Pages */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Demo Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-brand-400 transition-colors">1. Landing Page & Pitch</Link></li>
              <li><Link href="/send" className="hover:text-brand-400 transition-colors">2. Send Parcel Booking</Link></li>
              <li><Link href="/matching" className="hover:text-brand-400 transition-colors">3. AI Bus Matching Engine</Link></li>
              <li><Link href="/booking" className="hover:text-brand-400 transition-colors">4. Booking & QR Pass</Link></li>
              <li><Link href="/tracking" className="hover:text-brand-400 transition-colors">5. Live Highway Route Map</Link></li>
              <li><Link href="/verify" className="hover:text-brand-400 transition-colors">6. OTP Delivery Verification</Link></li>
            </ul>
          </div>

          {/* Platform Access */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Platform Views
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-1.5">User Logistics Dashboard <ArrowUpRight className="w-3 h-3 text-slate-500" /></Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1.5">Admin Fleet Control Center <ArrowUpRight className="w-3 h-3 text-slate-500" /></Link></li>
              <li><span className="text-slate-500 text-[11px]">Built for Web Hackathon Demo</span></li>
              <li className="pt-2">
                <div className="bg-navy-900 border border-navy-800 rounded-xl p-3 text-[11px] text-slate-400">
                  <span className="text-brand-400 font-semibold">Hackathon Jury Tip:</span> Use the bottom floating demo bar to jump between any step anytime.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2024 BusLink 24. Hackathon Prototype. All data and services simulated for demonstration purposes.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium">“Why build a new network when thousands of buses travel every day?”</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
