'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/ui/Modal';
import { useDemo } from '@/lib/demoState';
import { User, ShieldCheck, PlayCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface DemoLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoLoginModal({ isOpen, onClose }: DemoLoginModalProps) {
  const router = useRouter();
  const { resetToDemoPreset } = useDemo();

  const handleCustomerLogin = () => {
    onClose();
    router.push('/dashboard');
  };

  const handleAdminLogin = () => {
    onClose();
    router.push('/admin');
  };

  const handleStartDemo = () => {
    resetToDemoPreset();
    onClose();
    router.push('/send');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="BusLink 24 Access Portal"
      subtitle="Select a role to preview this prototype"
      maxWidth="md"
    >
      <div className="space-y-4 py-2">
        <div className="bg-brand-50 border border-brand-100 rounded-xl p-3 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-brand-600 shrink-0" />
          <p className="text-xs text-brand-900 leading-relaxed font-medium">
            <span className="font-bold">Hackathon Demo Notice:</span> Authentication is pre-authenticated with simulated accounts for easy evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {/* Customer Option */}
          <button
            onClick={handleCustomerLogin}
            className="group relative flex items-start gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-brand-500 hover:bg-brand-50/40 text-left transition-all duration-200"
          >
            <div className="p-3 bg-slate-100 group-hover:bg-brand-100 rounded-xl text-slate-700 group-hover:text-brand-600 transition-colors">
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-navy-900 group-hover:text-brand-600">Continue as Customer</h4>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Access sender dashboard, track live orders, view past parcel invoices and receipts.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Active Demo Account
                </span>
              </div>
            </div>
          </button>

          {/* Admin Option */}
          <button
            onClick={handleAdminLogin}
            className="group relative flex items-start gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-navy-900 hover:bg-slate-50 text-left transition-all duration-200"
          >
            <div className="p-3 bg-slate-100 group-hover:bg-navy-900 rounded-xl text-slate-700 group-hover:text-white transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-navy-900">Continue as Admin</h4>
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
            className="w-full mt-2 bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-700 hover:to-rose-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-98"
          >
            <PlayCircle className="w-5 h-5" />
            <span>Launch Complete Demo Flow (Delhi ➔ Patna)</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
