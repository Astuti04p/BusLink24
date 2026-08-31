'use client';

import React from 'react';
import { Bus, Clock, TrendingDown, MapPin, Sparkles } from 'lucide-react';

const STATS = [
  {
    icon: Bus,
    value: '10,000+',
    label: 'Daily Intercity Buses',
    subtext: 'Unutilized cargo bays travelling every single day across India',
    accentColor: 'text-brand-600',
    bgColor: 'bg-brand-50',
    borderColor: 'border-brand-200',
  },
  {
    icon: Clock,
    value: '24 hrs',
    label: 'Target Delivery Time',
    subtext: 'Next-morning arrival via scheduled overnight bus journeys',
    accentColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    icon: TrendingDown,
    value: '40%',
    label: 'Potential Cost Reduction',
    subtext: 'Zero added fleet fuel costs by leveraging existing vehicle trips',
    accentColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    icon: MapPin,
    value: '100+',
    label: 'Connectable Cities',
    subtext: 'Direct highway connectivity without multi-tier transit hub delays',
    accentColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
];

export function StatsCounter() {
  return (
    <section className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Prototype Metrics Notice Banner */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          <span className="font-semibold text-slate-700">Prototype Concept Architecture:</span>
          <span>Target operational benchmarks modeled for India’s express bus networks</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${stat.bgColor} ${stat.borderColor} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${stat.accentColor}`} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-extrabold text-navy-950 tracking-tight font-mono">
                    {stat.value}
                  </h3>
                  <h4 className="text-sm font-bold text-navy-900">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed pt-1">
                    {stat.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
