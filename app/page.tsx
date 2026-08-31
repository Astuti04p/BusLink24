'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Send, 
  Search, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  TrendingDown, 
  Bus,
  ChevronDown
} from 'lucide-react';
import { useDemo } from '@/lib/demoState';
import { HeroRouteAnimation } from '@/components/landing/HeroRouteAnimation';
import { QuickQuoteWidget } from '@/components/landing/QuickQuoteWidget';
import { StatsCounter } from '@/components/landing/StatsCounter';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { ValueProps } from '@/components/landing/ValueProps';
import { FutureScope } from '@/components/landing/FutureScope';

export default function LandingPage() {
  const router = useRouter();
  const { resetToDemoPreset } = useDemo();

  const handleStartDemo = () => {
    resetToDemoPreset();
    router.push('/send');
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/60 border-b border-slate-200">
        
        {/* Subtle background ambient circles */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Demo Highlight Pill */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleStartDemo}
              className="inline-flex items-center gap-2 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold px-4 py-1.5 rounded-full border border-brand-200 shadow-sm transition-all group"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-spin" style={{ animationDuration: '3s' }} />
              <span>Interactive Hackathon Demo: Delhi ➔ Patna</span>
              <span className="bg-brand-600 text-white text-[10px] px-1.5 py-0.2 rounded font-black group-hover:scale-105 transition-transform">
                START →
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Pitch & Headline */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              <div className="space-y-3">
                <span className="text-xs font-extrabold tracking-widest text-slate-500 uppercase flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-600" />
                  &ldquo;Send Today. Reach Tomorrow.&rdquo;
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight leading-[1.12]">
                  24-Hour Intercity Delivery. <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-brand-600 via-rose-600 to-brand-700 bg-clip-text text-transparent">
                    Powered by Buses.
                  </span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Turn India&apos;s existing intercity bus network into a faster, affordable, and AI-powered parcel delivery network. Why build new infrastructure when thousands of buses are already moving every day?
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/send"
                  className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-bold px-7 py-4 rounded-2xl shadow-xl shadow-brand-600/30 hover:shadow-2xl transition-all flex items-center justify-center gap-2 group text-base"
                >
                  <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  <span>Send a Parcel</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/tracking"
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-navy-900 font-bold px-7 py-4 rounded-2xl border border-slate-300/80 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 text-base"
                >
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>Track Parcel</span>
                </Link>
              </div>

              {/* Value Badges List */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero Fleet Emissions</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Sub-24h Direct Highway Transit</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>OTP Secure Handoff</span>
                </span>
              </div>

            </div>

            {/* Right Column: Hero Route Animation Visualizer */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <HeroRouteAnimation />
            </div>

          </div>

          {/* Quick Quote Widget Section */}
          <div className="mt-14 max-w-4xl mx-auto">
            <QuickQuoteWidget />
          </div>

        </div>

      </section>

      {/* 2. STATS & METRICS COUNTER */}
      <StatsCounter />

      {/* 3. HOW IT WORKS (4 STEPS) */}
      <HowItWorks />

      {/* 4. WHY BUSLINK 24 (VALUE PROPOSITIONS) */}
      <ValueProps />

      {/* 5. INTERACTIVE COST COMPARISON */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
              Benchmark Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              Traditional Courier vs BusLink 24
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Comparison for a typical 2 kg document parcel between Delhi and Patna (1,045 km).
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              {/* Option 1: Surface Courier */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="text-xs font-bold uppercase text-slate-400">Traditional Surface Courier</div>
                <div className="space-y-1">
                  <div className="text-3xl font-extrabold text-navy-900 font-mono">₹240 - ₹350</div>
                  <div className="text-xs text-slate-500">Economy rate</div>
                </div>
                <div className="space-y-2 pt-2 text-xs text-slate-600 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-amber-700 font-semibold">
                    <Clock className="w-4 h-4" /> 3 to 5 Days Delivery
                  </div>
                  <div>• Multi-tier sorting hubs</div>
                  <div>• High risk of delay</div>
                  <div>• Complex multi-truck transfers</div>
                </div>
              </div>

              {/* Option 2: Air Cargo */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="text-xs font-bold uppercase text-slate-400">Express Air Cargo</div>
                <div className="space-y-1">
                  <div className="text-3xl font-extrabold text-navy-900 font-mono">₹650 - ₹900</div>
                  <div className="text-xs text-slate-500">High premium rate</div>
                </div>
                <div className="space-y-2 pt-2 text-xs text-slate-600 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-blue-700 font-semibold">
                    <Clock className="w-4 h-4" /> 24 to 48 Hours
                  </div>
                  <div>• Expensive airport handling</div>
                  <div>• Limited to major airport hubs</div>
                  <div>• High carbon emissions</div>
                </div>
              </div>

              {/* Option 3: BusLink 24 (Highlighted) */}
              <div className="p-6 sm:p-8 space-y-4 bg-gradient-to-b from-brand-50/70 to-white relative">
                <div className="absolute top-3 right-3 bg-brand-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Optimal Choice
                </div>
                <div className="text-xs font-bold uppercase text-brand-600 flex items-center gap-1.5">
                  <Bus className="w-4 h-4" /> BusLink 24 (Express Bus)
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-black text-brand-600 font-mono">₹299</div>
                  <div className="text-xs text-brand-800 font-medium">Flat transparent fare</div>
                </div>
                <div className="space-y-2 pt-2 text-xs text-slate-700 border-t border-brand-100 font-medium">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <Clock className="w-4 h-4 text-emerald-600" /> Overnight (10h 15m)
                  </div>
                  <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <TrendingDown className="w-3.5 h-3.5" /> 50% cheaper than air cargo
                  </div>
                  <div>• Direct highway transit</div>
                  <div>• OTP-verified station handoff</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 6. WHAT'S NEXT / FUTURE ROADMAP */}
      <FutureScope />

    </div>
  );
}
