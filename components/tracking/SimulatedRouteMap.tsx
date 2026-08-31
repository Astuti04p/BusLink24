'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bus, MapPin, Navigation, ShieldCheck, Zap } from 'lucide-react';
import { RouteWaypoint } from '@/types';

interface SimulatedRouteMapProps {
  fromCity: string;
  toCity: string;
  busNumber: string;
  operator: string;
  speedKmh: number;
  nearLocation: string;
  progressPct: number;
  waypoints: RouteWaypoint[];
}

export function SimulatedRouteMap({
  fromCity,
  toCity,
  busNumber,
  operator,
  speedKmh,
  nearLocation,
  progressPct,
  waypoints,
}: SimulatedRouteMapProps) {
  return (
    <div className="relative w-full bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-5 sm:p-7 border border-navy-800 shadow-2xl overflow-hidden">
      
      {/* Background Topo/Grid Lines */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#e11d48 1px, transparent 1px), radial-gradient(#38bdf8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }} 
      />

      {/* Top Map Header Ribbon */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-navy-800 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Simulated Telematics • Purvanchal Expressway Corridor
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
            {fromCity} ➔ {toCity} Express Freight Transit
          </h3>
        </div>

        <div className="flex items-center gap-2 bg-navy-800/90 border border-navy-700 px-3 py-1.5 rounded-xl text-xs">
          <Navigation className="w-3.5 h-3.5 text-brand-400" />
          <span className="text-slate-300">Live Speed: <strong className="text-white font-mono">{speedKmh} km/h</strong></span>
        </div>
      </div>

      {/* SVG Interactive Visual Route Map */}
      <div className="relative py-6 sm:py-8 px-2 sm:px-6">
        
        {/* Animated Bus Indicator along the line */}
        <div className="relative w-full h-24 sm:h-28 flex items-center">
          
          {/* Background Highway Track Line */}
          <div className="absolute left-0 right-0 h-3 bg-navy-800 rounded-full border border-navy-700 overflow-hidden">
            {/* Pulsing glow progress */}
            <motion.div
              className="h-full bg-gradient-to-r from-brand-600 via-rose-500 to-emerald-400 rounded-full"
              style={{ width: `${progressPct}%` }}
              transition={{ duration: 1 }}
            />
          </div>

          {/* Floating Bus Marker at current progress */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
            style={{ left: `${Math.max(5, Math.min(95, progressPct))}%` }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            {/* Pulse beacon */}
            <span className="absolute -top-3 -left-3 w-14 h-14 bg-brand-500/30 rounded-full animate-ping pointer-events-none" />
            
            <div className="relative bg-brand-600 text-white p-2.5 rounded-2xl shadow-xl shadow-brand-500/50 border-2 border-white flex items-center gap-1.5 cursor-pointer group">
              <Bus className="w-5 h-5 animate-pulse" />
              <div className="hidden sm:block text-left pr-1">
                <span className="text-[10px] font-extrabold block uppercase tracking-wider leading-none text-brand-200">
                  {operator}
                </span>
                <span className="text-xs font-mono font-bold leading-tight">
                  {busNumber}
                </span>
              </div>
            </div>

            {/* Floating Location Badge */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-navy-950 border border-brand-500/40 text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-xl text-brand-300">
              📍 {nearLocation}
            </div>
          </motion.div>

          {/* Waypoints across the map */}
          <div className="absolute left-0 right-0 flex justify-between items-center z-10 pointer-events-none">
            {waypoints.map((wp, idx) => {
              const isPassed = wp.status === 'passed';
              const isCurrent = wp.status === 'current';
              const isEnd = idx === waypoints.length - 1;
              const isStart = idx === 0;

              return (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-mono ${
                      isPassed
                        ? 'bg-emerald-500 border-emerald-400 text-white'
                        : isCurrent
                        ? 'bg-brand-600 border-white text-white ring-4 ring-brand-500/40'
                        : 'bg-navy-950 border-slate-600 text-slate-400'
                    }`}
                  >
                    {isPassed ? '✓' : idx + 1}
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 mt-2 whitespace-nowrap hidden sm:block">
                    {wp.name}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Map Footer Indicators */}
      <div className="pt-8 mt-4 border-t border-navy-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Cargo Compartment Security Seal: <strong>ACTIVE & LOCKED</strong></span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <Zap className="w-3.5 h-3.5 text-brand-400" />
          <span>Next Scheduled Stop: <strong>Patna Bus Terminal (Bairiya)</strong></span>
        </div>
      </div>

    </div>
  );
}
