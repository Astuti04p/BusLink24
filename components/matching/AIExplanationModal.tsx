'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { BusMatch, ParcelDetails } from '@/types';
import { Bot, Sparkles, ShieldCheck, CheckCircle2, TrendingUp, Info } from 'lucide-react';

interface AIExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bus: BusMatch | null;
  parcel: ParcelDetails;
}

export function AIExplanationModal({
  isOpen,
  onClose,
  bus,
  parcel,
}: AIExplanationModalProps) {
  if (!bus) return null;

  const factors = [
    { label: 'Route Compatibility', score: bus.scoreBreakdown.routeCompatibility, weight: '25%', desc: 'Direct expressway corridor alignment' },
    { label: 'Arrival & Transit Time', score: bus.scoreBreakdown.arrivalTime, weight: '25%', desc: 'Optimal overnight arrival before 7:00 AM' },
    { label: 'Cargo Bay Availability', score: bus.scoreBreakdown.cargoAvailability, weight: '15%', desc: `${bus.availableCapacityKg} kg unallocated weight headroom` },
    { label: 'Cost Efficiency', score: bus.scoreBreakdown.costEfficiency, weight: '15%', desc: `Economical rate vs air courier (₹${bus.price})` },
    { label: 'Traffic & Toll Conditions', score: bus.scoreBreakdown.trafficConditions, weight: '10%', desc: 'Live toll plaza throughput model' },
    { label: 'Operator Reliability Score', score: bus.scoreBreakdown.operatorReliability, weight: '10%', desc: '98% historical on-time arrival rate' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Why BusLink AI Recommended This Bus"
      subtitle={`Transparent factor analysis for ${bus.operator} (${bus.from} ➔ ${bus.to})`}
      maxWidth="lg"
    >
      <div className="space-y-6 py-2">
        
        {/* Top AI Score Hero */}
        <div className="bg-gradient-to-r from-brand-600 to-rose-600 rounded-2xl p-5 text-white flex items-center justify-between shadow-lg shadow-brand-500/20">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-200" />
              <span className="text-xs uppercase font-bold tracking-wider text-brand-100">
                Composite Logistics AI Index
              </span>
            </div>
            <h4 className="text-2xl font-extrabold">{bus.operator}</h4>
            <p className="text-xs text-brand-100">{bus.busType} • Bay Capacity: {bus.availableCapacityKg}kg free</p>
          </div>

          <div className="text-right">
            <span className="text-4xl font-black font-mono tracking-tight">{bus.aiScore}</span>
            <span className="text-xs block text-brand-100 font-bold">/ 100 MATCH</span>
          </div>
        </div>

        {/* AI Natural Language Summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-navy-900 uppercase">
            <Bot className="w-4 h-4 text-brand-600" />
            <span>AI Recommendation Engine Summary</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            &ldquo;{bus.aiExplanation}&rdquo;
          </p>
        </div>

        {/* Weighted Scoring Breakdown Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
              Scoring Factor Breakdown
            </h5>
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> Weighted Multi-Factor Algorithm
            </span>
          </div>

          <div className="space-y-2.5">
            {factors.map((f, idx) => (
              <div key={idx} className="bg-white border border-slate-200/90 rounded-xl p-3 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-navy-900">
                  <div className="flex items-center gap-2">
                    <span>{f.label}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
                      Weight {f.weight}
                    </span>
                  </div>
                  <span className="font-mono text-brand-600">{f.score}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-rose-600 rounded-full transition-all duration-500"
                    style={{ width: `${f.score}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Parcel Tailoring Note */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3 text-xs text-emerald-900">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Calibrated specifically for <strong>{parcel.category}</strong> payload ({parcel.weightKg} kg) with overnight express priority.
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-3 rounded-xl transition-all text-xs"
        >
          Close AI Breakdown
        </button>

      </div>
    </Modal>
  );
}
