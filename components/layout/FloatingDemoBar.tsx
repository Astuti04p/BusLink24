'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  RotateCcw, 
  Home, 
  Send, 
  Bot, 
  CreditCard, 
  MapPin, 
  CheckCircle, 
  LayoutDashboard, 
  ShieldAlert 
} from 'lucide-react';
import { useDemo } from '@/lib/demoState';

const DEMO_STEPS = [
  { id: 'landing', label: '1. Landing', path: '/', icon: Home },
  { id: 'send', label: '2. Send', path: '/send', icon: Send },
  { id: 'matching', label: '3. AI Match', path: '/matching', icon: Bot },
  { id: 'booking', label: '4. Confirm & QR', path: '/booking', icon: CreditCard },
  { id: 'tracking', label: '5. Live Track', path: '/tracking', icon: MapPin },
  { id: 'verify', label: '6. Verify OTP', path: '/verify', icon: CheckCircle },
  { id: 'dashboard', label: '7. User Dash', path: '/dashboard', icon: LayoutDashboard },
  { id: 'admin', label: '8. Admin Center', path: '/admin', icon: ShieldAlert },
];

export function FloatingDemoBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resetToDemoPreset, isDemoBarVisible, setIsDemoBarVisible } = useDemo();
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isDemoBarVisible) return null;

  const handleReset = () => {
    resetToDemoPreset();
    router.push('/send');
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300">
      <div className="bg-navy-950/95 text-white backdrop-blur-xl border border-navy-700/90 rounded-2xl shadow-2xl p-2.5 sm:p-3 ring-1 ring-white/10">
        
        {/* Top Header Ribbon */}
        <div className="flex items-center justify-between px-2 pb-2 mb-1.5 border-b border-navy-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span className="font-bold tracking-wide uppercase text-[11px] text-brand-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Judge Demo Controller
            </span>
            <span className="text-slate-400 hidden sm:inline text-[11px]">
              (Click any step to jump)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-[11px] bg-brand-600/30 hover:bg-brand-600/50 text-brand-300 px-2.5 py-1 rounded-lg border border-brand-500/30 transition-colors font-medium"
              title="Reset state to Delhi ➔ Patna standard demo"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Demo Preset</span>
              <span className="sm:hidden">Reset</span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Toggle Demo Bar Details"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Step Navigation Pill list */}
        {isExpanded && (
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 sm:gap-1.5 overflow-x-auto pt-1">
            {DEMO_STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = pathname === step.path;
              return (
                <Link
                  key={step.id}
                  href={step.path}
                  className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl text-center transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white font-bold shadow-lg shadow-brand-600/40 scale-102 ring-1 ring-white/20'
                      : 'bg-navy-900/80 hover:bg-navy-800 text-slate-300 hover:text-white border border-navy-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="text-[10px] sm:text-[11px] whitespace-nowrap leading-tight">
                    {step.label}
                  </span>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
