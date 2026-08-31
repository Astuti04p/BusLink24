'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CITIES } from '@/lib/mockData';
import { useDemo } from '@/lib/demoState';
import { MapPin, Package, ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { ParcelCategory } from '@/types';

export function QuickQuoteWidget() {
  const router = useRouter();
  const { updateRoute, updateParcel } = useDemo();

  const [fromCity, setFromCity] = useState('Delhi');
  const [toCity, setToCity] = useState('Patna');
  const [category, setCategory] = useState<ParcelCategory>('Documents');
  const [weightKg, setWeightKg] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fromCityObj = CITIES.find((c) => c.name === fromCity) || CITIES[0];
    const toCityObj = CITIES.find((c) => c.name === toCity) || CITIES[1];

    updateRoute(
      fromCity,
      toCity,
      fromCityObj.terminals[0]?.name || 'Central ISBT',
      toCityObj.terminals[0]?.name || 'Main Bus Stand'
    );

    updateParcel({
      category,
      weightKg,
    });

    router.push('/matching');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/60 border border-slate-200/80 relative">
      {/* Top Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
            <Sparkles className="w-4 h-4" />
          </span>
          <h3 className="font-extrabold text-navy-900 text-sm tracking-tight">
            Instant AI Bus Route Finder
          </h3>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <Zap className="w-3 h-3 fill-emerald-600" />
          Sub-24h Dispatch
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Origin & Destination inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-600" /> From (Origin)
            </label>
            <select
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.state})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> To (Destination)
            </label>
            <select
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
            >
              {CITIES.filter((c) => c.name !== fromCity).map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Parcel Category & Weight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-slate-500" /> Parcel Type
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ParcelCategory)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
            >
              <option value="Documents">Documents (Legal / Papers)</option>
              <option value="Electronics">Electronics (Gadgets / Parts)</option>
              <option value="Clothing">Clothing & Apparel</option>
              <option value="Food">Packaged Food / Perishables</option>
              <option value="Small Package">Small Package</option>
              <option value="Other">Other Items</option>
            </select>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span>Weight</span>
              <span className="text-brand-600 font-mono">{weightKg} kg</span>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input
                type="range"
                min="0.5"
                max="15"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Quick Route Preview */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex items-center justify-between">
          <div className="text-xs">
            <span className="text-slate-500 block">Estimated Rate & Transit</span>
            <span className="font-extrabold text-navy-950 text-base">
              ₹299 <span className="text-xs font-normal text-slate-500">• Overnight (10h 15m)</span>
            </span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> OTP Protected
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-700 hover:to-rose-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-brand-600/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 group text-sm"
        >
          <span>Find Available Buses with AI</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}
