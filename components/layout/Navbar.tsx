'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Bus, 
  Send, 
  Search, 
  LayoutDashboard, 
  ShieldAlert, 
  Menu, 
  X, 
  Play, 
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useDemo } from '@/lib/demoState';
import { DemoLoginModal } from './DemoLoginModal';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resetToDemoPreset } = useDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const navLinks = [
    { name: 'Send Parcel', href: '/send', icon: Send },
    { name: 'Track Parcel', href: '/tracking', icon: Search },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Admin Control', href: '/admin', icon: ShieldAlert },
  ];

  const handleStartDemo = () => {
    resetToDemoPreset();
    setMobileMenuOpen(false);
    router.push('/send');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-500/30 group-hover:scale-105 transition-transform">
                <Bus className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-navy-950">
                    Bus<span className="text-brand-600">Link</span>
                  </span>
                  <span className="bg-brand-100 text-brand-700 text-[11px] font-black px-1.5 py-0.5 rounded tracking-wide uppercase border border-brand-200">
                    24
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase -mt-0.5 hidden sm:block">
                  Intercity Bus Logistics
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-brand-50 text-brand-600 shadow-sm'
                        : 'text-slate-600 hover:text-navy-950 hover:bg-slate-100/70'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* 3-Min Demo Button */}
              <button
                onClick={handleStartDemo}
                className="relative group overflow-hidden bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-sm hover:shadow"
              >
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
                </span>
                <Play className="w-3.5 h-3.5 text-brand-400 fill-brand-400" />
                <span>3-Min Demo</span>
              </button>

              {/* Login / Role Switcher */}
              <button
                onClick={() => setLoginModalOpen(true)}
                className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-brand-600/20 hover:shadow-lg transition-all"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Portal Roles</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={handleStartDemo}
                className="bg-brand-600 text-white p-2 rounded-lg text-xs font-bold flex items-center gap-1"
                aria-label="Start Demo"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white/98 px-4 pt-2 pb-6 space-y-3 shadow-xl">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold ${
                      isActive
                        ? 'bg-brand-50 text-brand-600'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={handleStartDemo}
                className="w-full bg-navy-900 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm"
              >
                <Play className="w-4 h-4 text-brand-400 fill-brand-400" />
                Launch 3-Min Demo (Delhi ➔ Patna)
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLoginModalOpen(true);
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm"
              >
                <UserCheck className="w-4 h-4 text-slate-600" />
                Switch Demo Roles (Customer / Admin)
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Demo Access Modal */}
      <DemoLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
}
