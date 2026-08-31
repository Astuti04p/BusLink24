'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bus, Package, ShieldCheck, Zap, Navigation, CheckCircle2, Clock } from 'lucide-react';

const ROUTE_STOPS = [
  { id: 'delhi', name: 'Delhi', terminal: 'ISBT Kashmere Gate', time: '08:30 PM Dep', status: 'Passed', km: '0 km' },
  { id: 'kanpur', name: 'Kanpur', terminal: 'Jhakarkati Station', time: '02:30 AM Transit', status: 'Passed', km: '490 km' },
  { id: 'lucknow', name: 'Lucknow', terminal: 'Alambagh Bypass', time: '04:15 AM Transit', status: 'Current', km: '580 km' },
  { id: 'patna', name: 'Patna', terminal: 'Patna Bus Terminal', time: '06:45 AM Arr', status: 'Target', km: '1,045 km' },
];

export function HeroRouteAnimation() {
  const [activeStop, setActiveStop] = useState(2); // Lucknow as current
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto bg-gradient-to-b from-navy-900 to-navy-950 text-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-navy-700/80 overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-navy-800">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Live Corridor Transit
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-navy-800/80 px-2.5 py-1 rounded-lg border border-navy-700">
          <Clock className="w-3.5 h-3.5 text-brand-400" />
          <span>Overnight Express: <strong className="text-white">10h 15m</strong></span>
        </div>
      </div>

      {/* Active Bus Live Card */}
      <div className="bg-navy-800/60 backdrop-blur-md rounded-2xl p-4 border border-navy-700 mb-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-brand-600/30">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">Swift Travels</h4>
                <span className="text-[10px] bg-brand-500/20 text-brand-300 font-bold px-1.5 py-0.5 rounded border border-brand-500/30">
                  DL-01-AB-2024
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                <Navigation className="w-3 h-3 text-emerald-400" />
                <span>Currently near <strong>Lucknow Corridor</strong> • 68 km/h</span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Luggage Bay</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
              48 kg Free
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-[11px] text-slate-400 mb-1 font-mono">
            <span>Delhi (0 km)</span>
            <span className="text-brand-400 font-bold">72% Completed</span>
            <span>Patna (1,045 km)</span>
          </div>
          <div className="w-full h-2 bg-navy-950 rounded-full overflow-hidden p-0.5 border border-navy-700">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-500 via-rose-400 to-emerald-400 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '72%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Visual Route Steps */}
      <div className="relative pl-6 space-y-4">
        {/* Continuous Track Line */}
        <div className="absolute left-[33px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-brand-500 via-rose-500 to-slate-700" />

        {ROUTE_STOPS.map((stop, idx) => {
          const isPassed = idx < activeStop;
          const isCurrent = idx === activeStop;
          const isTarget = idx === ROUTE_STOPS.length - 1;

          return (
            <motion.div
              key={stop.id}
              onClick={() => setActiveStop(idx)}
              className={`relative flex items-start gap-4 p-2.5 rounded-xl cursor-pointer transition-all ${
                isCurrent
                  ? 'bg-navy-800/90 border border-brand-500/50 shadow-md'
                  : 'hover:bg-navy-800/40'
              }`}
              whileHover={{ x: 4 }}
            >
              {/* Node Marker */}
              <div className="relative z-10 flex items-center justify-center">
                {isPassed && (
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-md shadow-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
                {isCurrent && (
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-brand-500 opacity-60"></span>
                    <div className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/50">
                      <Bus className="w-4 h-4" />
                    </div>
                  </div>
                )}
                {!isPassed && !isCurrent && (
                  <div className="w-7 h-7 rounded-full bg-navy-800 border-2 border-slate-600 text-slate-400 flex items-center justify-center text-xs">
                    {isTarget ? <Package className="w-3.5 h-3.5 text-brand-400" /> : <div className="w-2 h-2 rounded-full bg-slate-500" />}
                  </div>
                )}
              </div>

              {/* Stop Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold text-white flex items-center gap-2">
                    {stop.name}
                    {isCurrent && (
                      <span className="text-[10px] bg-brand-600 text-white px-1.5 py-0.2 rounded font-semibold animate-pulse">
                        LIVE TRANSIT
                      </span>
                    )}
                  </h5>
                  <span className="text-xs font-mono text-slate-400">{stop.time}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-0.5">
                  <span className="truncate">{stop.terminal}</span>
                  <span className="text-slate-500 text-[11px] font-mono">{stop.km}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Security Guarantee */}
      <div className="mt-5 pt-3 border-t border-navy-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1 text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Tamper-evident Luggage Bay Lock</span>
        </span>
        <span className="flex items-center gap-1 text-brand-400 font-semibold">
          <Zap className="w-3.5 h-3.5" />
          <span>Fastest Road Transit</span>
        </span>
      </div>

    </div>
  );
}
