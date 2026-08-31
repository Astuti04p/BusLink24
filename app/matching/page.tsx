'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemo } from '@/lib/demoState';
import { matchBusesForRoute, AI_SCAN_STEPS } from '@/lib/aiMatching';
import { BusMatch } from '@/types';
import { AIExplanationModal } from '@/components/matching/AIExplanationModal';
import { 
  Bot, 
  Sparkles, 
  Bus, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  Zap, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react';

export default function AIMatchingPage() {
  const router = useRouter();
  const { bookingState, selectBus } = useDemo();

  const [isScanning, setIsScanning] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedSort, setSelectedSort] = useState<'ai' | 'price' | 'time'>('ai');
  const [explainingBus, setExplainingBus] = useState<BusMatch | null>(null);

  // Generate buses based on current booking state
  const buses = matchBusesForRoute(
    bookingState.fromCity,
    bookingState.toCity,
    bookingState.fromTerminal,
    bookingState.toTerminal,
    bookingState.parcel
  );

  // Scan simulation effect
  useEffect(() => {
    AI_SCAN_STEPS.forEach((step, index) => {
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, step.id]);
      }, step.delayMs);
    });

    const finishTimeout = setTimeout(() => {
      setIsScanning(false);
    }, 2500);

    return () => clearTimeout(finishTimeout);
  }, []);

  const sortedBuses = [...buses].sort((a, b) => {
    if (selectedSort === 'price') return a.price - b.price;
    if (selectedSort === 'time') return a.departureTime.localeCompare(b.departureTime);
    return b.aiScore - a.aiScore;
  });

  const handleSelectBus = (bus: BusMatch) => {
    selectBus(bus);
    router.push('/booking');
  };

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Header & Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-brand-50 border border-brand-200 px-3 py-0.5 rounded-full flex items-center gap-1.5 w-fit">
              <Bot className="w-3.5 h-3.5" />
              AI Route Matching Engine
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
              AI Bus Recommendations for {bookingState.fromCity} ➔ {bookingState.toCity}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Optimized for: <strong>{bookingState.parcel.category}</strong> ({bookingState.parcel.weightKg} kg) • {bookingState.fromTerminal} ➔ {bookingState.toTerminal}
            </p>
          </div>
        </div>

        {/* Progress Breadcrumbs */}
        <div className="grid grid-cols-4 gap-2 pt-4">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-mono text-[11px]">✓</span>
            <span className="truncate">Route & Parcel</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-md">
            <span className="w-5 h-5 rounded-full bg-white text-brand-600 flex items-center justify-center font-mono text-[11px]">2</span>
            <span className="truncate">AI Bus Matching</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-500 font-semibold text-xs">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-[11px]">3</span>
            <span className="truncate">Confirm & QR</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-500 font-semibold text-xs">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-[11px]">4</span>
            <span className="truncate">Live Track</span>
          </div>
        </div>
      </div>

      {/* SCANNING STATE ANIMATION */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-navy-950 text-white rounded-3xl p-8 shadow-2xl border border-navy-800 my-6 relative overflow-hidden"
          >
            {/* Background radar sweep */}
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full radar-sweep opacity-30 animate-spin" style={{ animationDuration: '6s' }} />

            <div className="max-w-xl mx-auto space-y-6 relative z-10 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/40 shrink-0">
                  <Bot className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">
                    BusLink AI is analyzing available buses...
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Evaluating real-time cargo space, highway traffic, and arrival punctuality
                  </p>
                </div>
              </div>

              {/* Progress Checklist */}
              <div className="space-y-2.5 pt-2">
                {AI_SCAN_STEPS.map((step) => {
                  const isDone = completedSteps.includes(step.id);
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        isDone
                          ? 'bg-navy-900/90 border-brand-500/50 text-slate-200'
                          : 'bg-navy-900/30 border-navy-800 text-slate-500'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-600 border-t-brand-500 animate-spin shrink-0" />
                      )}
                      <span>{step.label}</span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="pt-2 text-center text-xs text-brand-300 animate-pulse font-mono font-bold">
                Matching verified buses with open cargo bays...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RESULTS SECTION */}
      {!isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Results Bar & Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="font-extrabold text-navy-950 text-sm">
                {buses.length} Best AI Matches Found
              </h3>
              <span className="text-xs text-slate-500">
                (Overnight Highway Corridor)
              </span>
            </div>

            {/* Sort Buttons */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-medium hidden sm:inline mr-1">Sort:</span>
              <button
                onClick={() => setSelectedSort('ai')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedSort === 'ai'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                AI Score
              </button>
              <button
                onClick={() => setSelectedSort('price')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedSort === 'price'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Lowest Price
              </button>
              <button
                onClick={() => setSelectedSort('time')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedSort === 'time'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Earliest Dep
              </button>
            </div>
          </div>

          {/* Bus Cards List */}
          <div className="space-y-4">
            {sortedBuses.map((bus) => {
              const isTopPick = bus.isAIRecommended;

              return (
                <div
                  key={bus.id}
                  className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-200 relative overflow-hidden ${
                    isTopPick
                      ? 'border-brand-500 shadow-xl shadow-brand-500/10 ring-1 ring-brand-500/20'
                      : 'border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
                  }`}
                >
                  {/* Top Badge for AI Recommended */}
                  {isTopPick && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-brand-600 to-rose-600 text-white text-[11px] font-black px-4 py-1 rounded-bl-2xl uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>🏆 AI Recommended Choice</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    
                    {/* Left Info Column */}
                    <div className="lg:col-span-8 space-y-4">
                      
                      {/* Operator & Bus Type */}
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0 ${
                          isTopPick ? 'bg-brand-600' : 'bg-navy-900'
                        }`}>
                          <Bus className="w-6 h-6" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-black text-navy-950">
                              {bus.operator}
                            </h4>
                            <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                              {bus.busNumber}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {bus.busType}
                          </p>
                        </div>
                      </div>

                      {/* Timetable Journey Ribbon */}
                      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-center sm:text-left">
                        
                        {/* Departure */}
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Departure</span>
                          <span className="text-base font-extrabold text-navy-950 font-mono">{bus.departureTime}</span>
                          <span className="text-[11px] text-slate-500 block truncate">{bus.fromTerminal}</span>
                        </div>

                        {/* Duration */}
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {bus.duration}
                          </span>
                          <div className="w-full flex items-center justify-center gap-1 my-1">
                            <div className="h-0.5 flex-1 bg-slate-200" />
                            <Bus className="w-3.5 h-3.5 text-slate-400" />
                            <div className="h-0.5 flex-1 bg-slate-200" />
                          </div>
                          <span className="text-[10px] text-emerald-600 font-semibold">Non-Stop Transit</span>
                        </div>

                        {/* Arrival */}
                        <div className="text-center sm:text-right">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Arrival</span>
                          <span className="text-base font-extrabold text-navy-950 font-mono">{bus.arrivalTime}</span>
                          <span className="text-[11px] text-slate-500 block truncate">{bus.toTerminal}</span>
                        </div>

                      </div>

                      {/* Badges & "Why this bus?" link */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-3 text-xs">
                          <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            Cargo Bay: {bus.availableCapacityKg} kg Free
                          </span>
                          <span className="text-slate-500 hidden sm:inline">
                            Driver: {bus.driverName}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setExplainingBus(bus)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-xl border border-brand-200 transition-colors"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>Why this bus?</span>
                        </button>
                      </div>

                    </div>

                    {/* Right Price & Select CTA Column */}
                    <div className="lg:col-span-4 lg:border-l lg:border-slate-200 lg:pl-6 flex flex-col justify-between space-y-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      
                      {/* AI Score Badge */}
                      <div className="flex items-center justify-between lg:justify-end gap-3">
                        <span className="text-xs text-slate-500 font-bold uppercase">AI Match Score:</span>
                        <div className="flex items-center gap-1.5 bg-navy-950 text-white px-3 py-1.5 rounded-xl font-mono shadow-md">
                          <Bot className="w-4 h-4 text-brand-400" />
                          <span className="text-base font-black text-brand-400">{bus.aiScore}</span>
                          <span className="text-xs text-slate-400 font-bold">/100</span>
                        </div>
                      </div>

                      {/* Price Display */}
                      <div className="text-left lg:text-right">
                        <span className="text-xs text-slate-400 block line-through">
                          ₹{bus.originalPrice || 450}
                        </span>
                        <div className="text-3xl font-black text-navy-950 font-mono">
                          ₹{bus.price}
                        </div>
                        <span className="text-[11px] text-emerald-600 font-semibold">
                          Includes OTP security & insurance
                        </span>
                      </div>

                      {/* Select CTA */}
                      <button
                        onClick={() => handleSelectBus(bus)}
                        className={`w-full py-3.5 px-5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                          isTopPick
                            ? 'bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-700 hover:to-rose-700 text-white shadow-brand-600/30 hover:shadow-xl'
                            : 'bg-navy-900 hover:bg-navy-800 text-white shadow-navy-900/20 hover:shadow-lg'
                        }`}
                      >
                        <span>Select This Bus</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* AI Explanation Modal */}
      <AIExplanationModal
        isOpen={!!explainingBus}
        onClose={() => setExplainingBus(null)}
        bus={explainingBus}
        parcel={bookingState.parcel}
      />

    </div>
  );
}
