'use client';

import React from 'react';
import { MapPin, Bot, Bus, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  {
    number: '01',
    title: 'Enter Route',
    description: 'Select origin & destination cities and your nearest authorized ISBT bus terminal station.',
    icon: MapPin,
    badge: 'Step 1',
    color: 'from-brand-500 to-rose-500',
  },
  {
    number: '02',
    title: 'AI Finds Best Bus',
    description: 'Our AI engine analyzes real-time bus schedules, cargo capacity, traffic, and punctuality scores.',
    icon: Bot,
    badge: 'Step 2',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    number: '03',
    title: 'Parcel Travels With Bus',
    description: 'Hand over parcel at the departure counter. It is placed into a secured, tamper-sealed luggage bay.',
    icon: Bus,
    badge: 'Step 3',
    color: 'from-amber-500 to-orange-500',
  },
  {
    number: '04',
    title: 'Secure OTP Collection',
    description: 'Receiver receives an instant SMS with a 6-digit OTP and QR code for verified handoff at the arrival terminal.',
    icon: ShieldCheck,
    badge: 'Step 4',
    color: 'from-emerald-500 to-teal-500',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-slate-100/70 relative overflow-hidden border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
            Operational Blueprint
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            How BusLink 24 Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Delivering parcels across states in under 24 hours without building expensive warehouses or dedicated freight airplanes.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-200 font-mono">
                      {step.number}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${step.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-navy-950 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>{step.badge}</span>
                  {idx < STEPS.length - 1 ? (
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                  ) : (
                    <span className="text-emerald-600 font-bold">Delivered ✓</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-12 text-center">
          <Link
            href="/send"
            className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-navy-900/20 hover:shadow-xl transition-all text-sm group"
          >
            <span>Try the 4-Step Booking Workflow</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
