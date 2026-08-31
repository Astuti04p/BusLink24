'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/lib/demoState';
import { SimulatedRouteMap } from '@/components/tracking/SimulatedRouteMap';
import { 
  Search, 
  Bus, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Phone, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  FastForward, 
  Navigation,
  KeyRound,
  AlertCircle
} from 'lucide-react';

export default function TrackingPage() {
  const router = useRouter();
  const { activeDelivery, advanceSimulationStage } = useDemo();

  const [searchInput, setSearchInput] = useState(activeDelivery.parcelId);
  const [copiedOtp, setCopiedOtp] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    // Set search
  };

  const handleAdvance = () => {
    advanceSimulationStage();
  };

  const handleGoToVerify = () => {
    router.push('/verify');
  };

  const isDelivered = activeDelivery.status === 'Delivered';
  const isReady = activeDelivery.status === 'Ready for Collection' || activeDelivery.status === 'Arrived at Destination';

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Header & Search Input */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-brand-50 border border-brand-200 px-3 py-0.5 rounded-full flex items-center gap-1.5 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Live Express Telematics
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
            Track Your Parcel in Transit
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time highway tracking for intercity express bus cargo
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Parcel ID (e.g. BL24-DEL-PAT-10234)"
              className="w-full bg-white border border-slate-300 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
            />
          </div>
          <button
            type="submit"
            className="bg-navy-900 hover:bg-navy-800 text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors"
          >
            Track
          </button>
        </form>
      </div>

      {/* JUDGE SIMULATOR TOOLBAR */}
      <div className="bg-gradient-to-r from-brand-900/90 via-navy-900 to-brand-900/90 text-white rounded-2xl p-4 border border-brand-700/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <span>Hackathon Transit Simulator</span>
              <span className="text-[10px] bg-brand-500 text-white px-2 py-0.2 rounded-full font-mono">
                Current Status: {activeDelivery.status}
              </span>
            </h4>
            <p className="text-[11px] text-slate-300">
              Fast-forward transit to simulate bus reaching destination terminal for OTP collection.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleAdvance}
            className="flex-1 sm:flex-initial bg-white hover:bg-slate-100 text-navy-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition-all"
          >
            <FastForward className="w-4 h-4 text-brand-600" />
            <span>Simulate Bus Movement</span>
          </button>

          <button
            type="button"
            onClick={handleGoToVerify}
            className="flex-1 sm:flex-initial bg-brand-600 hover:bg-brand-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition-all"
          >
            <KeyRound className="w-4 h-4" />
            <span>Verify OTP Delivery ➔</span>
          </button>
        </div>
      </div>

      {/* SIMULATED INDIA ROUTE MAP */}
      <SimulatedRouteMap
        fromCity={activeDelivery.route.from}
        toCity={activeDelivery.route.to}
        busNumber={activeDelivery.bus.busNumber}
        operator={activeDelivery.bus.operator}
        speedKmh={activeDelivery.currentLocation.speedKmh}
        nearLocation={activeDelivery.currentLocation.nearCity}
        progressPct={activeDelivery.currentLocation.progressPercentage}
        waypoints={activeDelivery.waypoints}
      />

      {/* METRIC CARDS & TIMELINE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Live Status Metrics & Driver Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active Status Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase text-slate-400">Current Status</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                <Bus className="w-3.5 h-3.5" />
                {activeDelivery.status}
              </span>
            </div>

            {/* Big ETA & Remaining Distance */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Estimated ETA</span>
                <span className="text-2xl font-black text-navy-950 font-mono block mt-1">
                  {activeDelivery.currentLocation.etaRemaining}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">On Schedule (6:45 AM)</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Distance Left</span>
                <span className="text-2xl font-black text-brand-600 font-mono block mt-1">
                  {activeDelivery.currentLocation.distanceRemainingKm} km
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Of 1,045 km total</span>
              </div>
            </div>

            {/* Current Location Detail */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-brand-600" /> Current Checkpoint
              </span>
              <p className="text-xs font-bold text-navy-950">
                {activeDelivery.currentLocation.name}
              </p>
              <p className="text-[11px] text-slate-500">
                Highway Traffic: <strong className="text-emerald-700">{activeDelivery.currentLocation.trafficCondition}</strong>
              </p>
            </div>

            {/* Receiver OTP Box */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 uppercase flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-emerald-600" /> Receiver Delivery OTP
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Required at Pickup
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-2xl font-black font-mono text-emerald-800 tracking-widest">
                  482917
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText('482917');
                    setCopiedOtp(true);
                    setTimeout(() => setCopiedOtp(false), 2000);
                  }}
                  className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl transition-colors"
                >
                  {copiedOtp ? 'Copied!' : 'Copy OTP'}
                </button>
              </div>
              <p className="text-[11px] text-emerald-800">
                Share with {activeDelivery.deliveryRecipient.name} for handover at {activeDelivery.route.toTerminal}.
              </p>
            </div>

          </div>

          {/* Driver / Conductor Contact Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Assigned Bus Crew & Cargo Custodian
            </h4>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-navy-900 text-white flex items-center justify-center font-bold text-sm">
                  VS
                </div>
                <div>
                  <strong className="text-xs text-navy-950 block">{activeDelivery.bus.driverName}</strong>
                  <span className="text-[11px] text-slate-500">Bus Captain • DL-01-AB-2024</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Calling Bus Captain ${activeDelivery.bus.driverName} (${activeDelivery.bus.driverPhone})...`)}
                className="bg-slate-100 hover:bg-slate-200 text-navy-900 p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-600" />
                <span>Call Crew</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Vertical Delivery Timeline */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-navy-950">Journey Tracking Milestones</h3>
              <p className="text-xs text-slate-500">End-to-end custody audit log</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
              {activeDelivery.parcelId}
            </span>
          </div>

          {/* Timeline list */}
          <div className="relative pl-6 space-y-6">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-slate-200" />

            {activeDelivery.timeline.map((item, idx) => {
              const isCompleted = item.status === 'completed';
              const isCurrent = item.status === 'current';

              return (
                <div key={item.id} className="relative flex items-start gap-4">
                  {/* Circle Marker */}
                  <div className="relative z-10">
                    {isCompleted && (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-md shadow-emerald-500/30">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                    {isCurrent && (
                      <div className="relative flex items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-brand-500 opacity-60"></span>
                        <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/50">
                          <Bus className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    )}
                    {!isCompleted && !isCurrent && (
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center text-[10px] font-mono">
                        {idx + 1}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <h5 className={`text-xs sm:text-sm font-bold ${
                        isCurrent ? 'text-brand-600 font-extrabold' : isCompleted ? 'text-navy-950' : 'text-slate-400'
                      }`}>
                        {item.title}
                        {isCurrent && (
                          <span className="ml-2 text-[10px] bg-brand-600 text-white px-2 py-0.2 rounded font-bold animate-pulse">
                            ACTIVE
                          </span>
                        )}
                      </h5>
                      <span className="text-[11px] font-mono text-slate-400">{item.time}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      📍 {item.location}
                    </p>

                    {item.description && (
                      <p className="text-xs text-slate-600 mt-1 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action CTA to Verification */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Ready to verify handover at destination?
            </span>
            <button
              type="button"
              onClick={handleGoToVerify}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-brand-600/30 transition-all"
            >
              <span>Delivery Verification Screen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
