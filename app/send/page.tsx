'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CITIES } from '@/lib/mockData';
import { useDemo } from '@/lib/demoState';
import { ParcelCategory } from '@/types';
import { 
  MapPin, 
  Package, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  User, 
  Phone, 
  AlertCircle,
  FileText,
  Laptop,
  Shirt,
  Utensils,
  Box,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

const CATEGORIES: { id: ParcelCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'Documents', label: 'Documents', icon: FileText },
  { id: 'Electronics', label: 'Electronics', icon: Laptop },
  { id: 'Clothing', label: 'Clothing', icon: Shirt },
  { id: 'Food', label: 'Food / Perishables', icon: Utensils },
  { id: 'Small Package', label: 'Small Package', icon: Box },
  { id: 'Other', label: 'Other Items', icon: HelpCircle },
];

export default function SendParcelPage() {
  const router = useRouter();
  const { bookingState, updateRoute, updateParcel, resetToDemoPreset } = useDemo();

  const [fromCity, setFromCity] = useState(bookingState.fromCity || 'Delhi');
  const [toCity, setToCity] = useState(bookingState.toCity || 'Patna');
  
  const fromCityObj = CITIES.find((c) => c.name === fromCity) || CITIES[0];
  const toCityObj = CITIES.find((c) => c.name === toCity) || CITIES[1];

  const [fromTerminal, setFromTerminal] = useState(
    bookingState.fromTerminal || fromCityObj.terminals[0]?.name || 'ISBT Kashmere Gate'
  );
  const [toTerminal, setToTerminal] = useState(
    bookingState.toTerminal || toCityObj.terminals[0]?.name || 'Patna Bus Terminal (Bairiya)'
  );

  // Parcel fields
  const [category, setCategory] = useState<ParcelCategory>(bookingState.parcel.category || 'Documents');
  const [weightKg, setWeightKg] = useState(bookingState.parcel.weightKg || 2);
  const [length, setLength] = useState(bookingState.parcel.dimensions.length || 20);
  const [width, setWidth] = useState(bookingState.parcel.dimensions.width || 15);
  const [height, setHeight] = useState(bookingState.parcel.dimensions.height || 10);
  const [declaredValue, setDeclaredValue] = useState(bookingState.parcel.declaredValue || 2000);
  const [isFragile, setIsFragile] = useState(bookingState.parcel.isFragile || false);
  const [senderName, setSenderName] = useState(bookingState.parcel.senderName || 'Astuti Pandey');
  const [senderPhone, setSenderPhone] = useState(bookingState.parcel.senderPhone || '+91 98765 12345');
  const [receiverName, setReceiverName] = useState(bookingState.parcel.receiverName || 'Rahul Sharma');
  const [receiverPhone, setReceiverPhone] = useState(bookingState.parcel.receiverPhone || '+91 98123 45678');
  const [specialInstructions, setSpecialInstructions] = useState(
    bookingState.parcel.specialInstructions || 'Legal agreement papers. Hand over only after OTP confirmation.'
  );

  // When city changes, update terminals
  const handleFromCityChange = (cityName: string) => {
    setFromCity(cityName);
    const found = CITIES.find((c) => c.name === cityName);
    if (found && found.terminals.length > 0) {
      setFromTerminal(found.terminals[0].name);
    }
  };

  const handleToCityChange = (cityName: string) => {
    setToCity(cityName);
    const found = CITIES.find((c) => c.name === cityName);
    if (found && found.terminals.length > 0) {
      setToTerminal(found.terminals[0].name);
    }
  };

  const handleApplyPreset = () => {
    resetToDemoPreset();
    setFromCity('Delhi');
    setToCity('Patna');
    setFromTerminal('ISBT Kashmere Gate');
    setToTerminal('Patna Bus Terminal (Bairiya)');
    setCategory('Documents');
    setWeightKg(2);
    setLength(20);
    setWidth(15);
    setHeight(10);
    setDeclaredValue(2000);
    setIsFragile(false);
    setSenderName('Astuti Pandey');
    setSenderPhone('+91 98765 12345');
    setReceiverName('Rahul Sharma');
    setReceiverPhone('+91 98123 45678');
  };

  const handleFindBuses = (e: React.FormEvent) => {
    e.preventDefault();
    updateRoute(fromCity, toCity, fromTerminal, toTerminal);
    updateParcel({
      category,
      weightKg,
      dimensions: { length, width, height },
      declaredValue,
      isFragile,
      senderName,
      senderPhone,
      receiverName,
      receiverPhone,
      specialInstructions,
    });
    router.push('/matching');
  };

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Step Indicator Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-brand-50 border border-brand-200 px-3 py-0.5 rounded-full">
              Parcel Booking Engine
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
              Send Parcel via Express Bus Network
            </h1>
          </div>

          <button
            type="button"
            onClick={handleApplyPreset}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-brand-50 hover:bg-brand-100 text-brand-700 px-3.5 py-2 rounded-xl border border-brand-200 shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Load Delhi ➔ Patna Demo Preset</span>
          </button>
        </div>

        {/* Progress Breadcrumbs */}
        <div className="grid grid-cols-4 gap-2 pt-4">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-md">
            <span className="w-5 h-5 rounded-full bg-white text-brand-600 flex items-center justify-center font-mono text-[11px]">1</span>
            <span className="truncate">Route & Parcel</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-500 font-semibold text-xs">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-[11px]">2</span>
            <span className="truncate hidden sm:inline">AI Bus Matching</span>
            <span className="truncate sm:hidden">AI Match</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-500 font-semibold text-xs">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-[11px]">3</span>
            <span className="truncate hidden sm:inline">Confirm & QR</span>
            <span className="truncate sm:hidden">Confirm</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-500 font-semibold text-xs">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-[11px]">4</span>
            <span className="truncate">Live Track</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleFindBuses} className="space-y-8">
        
        {/* STEP 1: ROUTE SELECTION */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy-950">Where are you sending your parcel?</h2>
              <p className="text-xs text-slate-500">Select pickup and drop ISBT bus terminal nodes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Origin */}
            <div className="space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-navy-900 flex items-center gap-1.5 uppercase tracking-wide">
                  <MapPin className="w-4 h-4 text-brand-600" /> Origin City (From)
                </label>
                <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                  Pickup Hub
                </span>
              </div>
              
              <select
                value={fromCity}
                onChange={(e) => handleFromCityChange(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                {CITIES.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}, {c.state}</option>
                ))}
              </select>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Nearest Terminal / ISBT Stand</label>
                <select
                  value={fromTerminal}
                  onChange={(e) => setFromTerminal(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                >
                  {fromCityObj.terminals.map((t) => (
                    <option key={t.id} value={t.name}>{t.name} {t.isHub ? '★ (Express Hub)' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-navy-900 flex items-center gap-1.5 uppercase tracking-wide">
                  <MapPin className="w-4 h-4 text-emerald-600" /> Destination City (To)
                </label>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Collection Hub
                </span>
              </div>

              <select
                value={toCity}
                onChange={(e) => handleToCityChange(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-navy-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                {CITIES.filter((c) => c.name !== fromCity).map((c) => (
                  <option key={c.id} value={c.name}>{c.name}, {c.state}</option>
                ))}
              </select>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Arrival Terminal / Station Counter</label>
                <select
                  value={toTerminal}
                  onChange={(e) => setToTerminal(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                >
                  {toCityObj.terminals.map((t) => (
                    <option key={t.id} value={t.name}>{t.name} {t.isHub ? '★ (Express Terminal)' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2: PARCEL DETAILS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy-950">Tell us about your parcel</h2>
              <p className="text-xs text-slate-500">AI uses dimensions, weight and type to match the optimal bus cargo bay</p>
            </div>
          </div>

          {/* Category Chips Grid */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-navy-900 uppercase tracking-wide">Parcel Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/80 text-brand-700 font-bold shadow-sm ring-1 ring-brand-500'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-brand-600' : 'text-slate-500'}`} />
                    <span className="text-xs">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Weight & Dimension sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Weight */}
            <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-navy-900">
                <span>Weight</span>
                <span className="text-brand-600 font-mono text-sm bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                  {weightKg} kg
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="20"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0.5 kg</span>
                <span>Max 20 kg (Bus Limit)</span>
              </div>
            </div>

            {/* Dimensions */}
            <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-navy-900">
                <span>Dimensions (L × W × H)</span>
                <span className="text-navy-900 font-mono text-xs">
                  {length}×{width}×{height} cm
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 block">Length</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value) || 1)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-center"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block">Width</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value) || 1)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-center"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block">Height</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value) || 1)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-center"
                  />
                </div>
              </div>
            </div>

            {/* Value & Fragile */}
            <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70 space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy-900 flex items-center justify-between">
                  <span>Declared Value</span>
                  <span className="text-xs text-brand-600 font-mono">₹{declaredValue}</span>
                </label>
                <input
                  type="number"
                  value={declaredValue}
                  onChange={(e) => setDeclaredValue(parseInt(e.target.value) || 500)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-navy-900"
                />
              </div>

              <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isFragile}
                  onChange={(e) => setIsFragile(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 accent-brand-600 cursor-pointer"
                />
                <span className="text-xs font-bold text-navy-900 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Fragile / Handle with Care
                </span>
              </label>
            </div>

          </div>

          {/* Sender & Receiver Contacts */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Sender */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-brand-600" /> Sender Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-navy-900"
                  required
                />
                <input
                  type="tel"
                  placeholder="Mobile Phone"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-navy-900"
                  required
                />
              </div>
            </div>

            {/* Receiver */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" /> Receiver (Collects with OTP)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Receiver Name"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-navy-900"
                  required
                />
                <input
                  type="tel"
                  placeholder="Receiver Mobile (for OTP)"
                  value={receiverPhone}
                  onChange={(e) => setReceiverPhone(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-navy-900"
                  required
                />
              </div>
            </div>

          </div>

          {/* Special Instructions */}
          <div className="pt-2">
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Special Handling Instructions (Optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Keep in sealed container, fragile legal papers"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-navy-900"
            />
          </div>

        </div>

        {/* Submit CTA */}
        <div className="flex items-center justify-between flex-wrap gap-4 bg-navy-900 text-white rounded-3xl p-6 shadow-xl">
          <div className="space-y-0.5">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-400 fill-brand-400" />
              Route: {fromCity} ➔ {toCity} ({category}, {weightKg} kg)
            </h3>
            <p className="text-xs text-slate-300">
              AI will rank matching buses by speed, available luggage bays, cost & reliability.
            </p>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-700 hover:to-rose-700 text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg shadow-brand-600/30 hover:shadow-xl transition-all flex items-center gap-2 group text-sm"
          >
            <span>Find Best Bus with AI</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </form>

    </div>
  );
}
