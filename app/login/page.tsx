'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/lib/demoState';
import { 
  User, 
  ShieldCheck, 
  PlayCircle, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Bus 
} from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { resetToDemoPreset } = useDemo();

  const handleCustomerLogin = () => {
    router.push('/dashboard');
  };

  const handleAdminLogin = () => {
    router.push('/admin');
  };

  const handleStartDemo = () => {
    resetToDemoPreset();
    router.push('/send');
  };

  return (
    <div className="py-14 max-w-xl mx-auto px-4 sm:px-6 space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-600/30">
          <Bus className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
            BusLink 24 Access Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pre-authenticated prototype accounts for hackathon evaluation
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
        
        {/* Notice */}
        <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-brand-600 shrink-0" />
          <p className="text-xs text-brand-900 leading-relaxed font-medium">
            <span className="font-bold">Hackathon Demo Notice:</span> Authentication is simulated for rapid feature evaluation. Choose a role below to proceed.
          </p>
        </div>

        <div className="space-y-4">
          {/* Customer Option */}
          <button
            onClick={handleCustomerLogin}
            className="w-full group relative flex items-start gap-4 p-4 rounded-2xl border-2 border-slate-200 hover:border-brand-500 hover:bg-brand-50/40 text-left transition-all duration-200"
          >
            <div className="p-3 bg-slate-100 group-hover:bg-brand-100 rounded-xl text-slate-700 group-hover:text-brand-600 transition-colors">
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-navy-900 group-hover:text-brand-600 text-sm">
                  Continue as Customer
                </h3>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Access sender dashboard, active deliveries, past parcel invoices and live tracking.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Customer Dashboard
                </span>
              </div>
            </div>
          </button>

          {/* Admin Option */}
          <button
            onClick={handleAdminLogin}
            className="w-full group relative flex items-start gap-4 p-4 rounded-2xl border-2 border-slate-200 hover:border-navy-900 hover:bg-slate-50 text-left transition-all duration-200"
          >
            <div className="p-3 bg-slate-100 group-hover:bg-navy-900 rounded-xl text-slate-700 group-hover:text-white transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-navy-900 text-sm">
                  Continue as Admin
                </h3>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-navy-900 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Logistics Control Center, fleet cargo utilization meters, route analytics & live dispatch table.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                  Admin Analytics & Fleet Access
                </span>
              </div>
            </div>
          </button>

          {/* Start 3-min Demo Flow */}
          <button
            onClick={handleStartDemo}
            className="w-full mt-2 bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-700 hover:to-rose-700 text-white font-semibold py-3.5 px-4 rounded-2xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-98 text-sm"
          >
            <PlayCircle className="w-5 h-5" />
            <span>Launch Complete Demo Flow (Delhi ➔ Patna)</span>
          </button>
        </div>

        <div className="pt-2 text-center">
          <Link href="/" className="text-xs text-slate-400 hover:text-brand-600 transition-colors">
            ← Return to Landing Page
          </Link>
        </div>

      </div>

    </div>
  );
}
