'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/lib/demoState';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  KeyRound, 
  QrCode, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  User, 
  Download, 
  ArrowRight, 
  Sparkles, 
  FileText,
  Bus
} from 'lucide-react';

export default function DeliveryVerificationPage() {
  const router = useRouter();
  const { activeDelivery, verifyOtpAndComplete } = useDemo();

  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDelivered, setIsDelivered] = useState(activeDelivery.status === 'Delivered');
  const [errorMessage, setErrorMessage] = useState('');
  const [isScanningQR, setIsScanningQR] = useState(false);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6']
      });
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (activeDelivery.status === 'Delivered') {
      setIsDelivered(true);
    }
  }, [activeDelivery.status]);

  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);
    setErrorMessage('');

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleFillDemoOtp = () => {
    const demo = ['4', '8', '2', '9', '1', '7'];
    setOtpDigits(demo);
    setErrorMessage('');
  };

  const handleSubmitVerification = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otpDigits.join('');
    if (fullOtp.length < 6) {
      setErrorMessage('Please enter the complete 6-digit OTP code');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      const success = verifyOtpAndComplete(fullOtp);
      setIsVerifying(false);
      if (success) {
        setIsDelivered(true);
        triggerConfetti();
      } else {
        setErrorMessage('Invalid OTP code. Please enter demo OTP: 482917');
      }
    }, 900);
  };

  const handleSimulateQRScan = () => {
    setIsScanningQR(true);
    setTimeout(() => {
      setIsScanningQR(false);
      verifyOtpAndComplete('482917');
      setIsDelivered(true);
      triggerConfetti();
    }, 1500);
  };

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Destination Station Handoff
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
          {isDelivered ? 'Parcel Delivered Successfully! 🎉' : 'Parcel Arrived at Destination 🎉'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {isDelivered
            ? `Custody successfully transferred to ${activeDelivery.deliveryRecipient.name} at Patna Bus Terminal.`
            : `Your parcel from ${activeDelivery.route.from} has arrived at ${activeDelivery.route.toTerminal}.`}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isDelivered ? (
          /* OTP & QR ENTRY FORM */
          <motion.div
            key="verify-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-8 max-w-2xl mx-auto"
          >
            {/* Parcel ID & Terminal Header Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tracking Parcel ID</span>
                <span className="text-base font-black text-navy-950 font-mono tracking-wider">
                  {activeDelivery.parcelId}
                </span>
              </div>
              <div className="text-center sm:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Collection Terminal</span>
                <span className="text-xs font-bold text-brand-600">
                  {activeDelivery.route.toTerminal}
                </span>
              </div>
            </div>

            {/* OTP Input Form */}
            <form onSubmit={handleSubmitVerification} className="space-y-6">
              <div className="text-center space-y-2">
                <label className="text-sm font-extrabold text-navy-950 block">
                  Enter 6-Digit Delivery OTP
                </label>
                <p className="text-xs text-slate-500">
                  Sent via SMS to receiver ({activeDelivery.deliveryRecipient.phone})
                </p>

                {/* 6 Input Boxes */}
                <div className="flex justify-center gap-2 sm:gap-3 pt-3">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-11 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-black font-mono text-navy-950 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/20 transition-all"
                    />
                  ))}
                </div>

                {errorMessage && (
                  <p className="text-xs font-bold text-rose-600 pt-2 animate-shake">
                    {errorMessage}
                  </p>
                )}
              </div>

              {/* Demo Fill Shortcut */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleFillDemoOtp}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 px-3.5 py-1.5 rounded-full border border-brand-200 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                  <span>Auto-Fill Demo OTP (482917)</span>
                </button>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-700 hover:to-rose-700 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-brand-600/30 hover:shadow-2xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-75"
              >
                {isVerifying ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Verifying Security Clearance...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Verify & Release Parcel</span>
                  </>
                )}
              </button>
            </form>

            {/* Alternative: QR Code Scan simulation */}
            <div className="pt-4 border-t border-slate-100 text-center space-y-3">
              <span className="text-xs font-semibold text-slate-400 block">
                — OR SCAN PHYSICAL PARCEL QR TAG —
              </span>
              <button
                type="button"
                onClick={handleSimulateQRScan}
                disabled={isScanningQR}
                className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-bold px-5 py-3 rounded-2xl text-xs shadow-md transition-all"
              >
                {isScanningQR ? (
                  <>
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Scanning Camera Barcode...</span>
                  </>
                ) : (
                  <>
                    <QrCode className="w-4 h-4 text-brand-400" />
                    <span>Simulate Terminal QR Scanner</span>
                  </>
                )}
              </button>
            </div>

          </motion.div>
        ) : (
          /* SUCCESS CELEBRATION & RECEIPT CARD */
          <motion.div
            key="success-receipt"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-2xl space-y-8 max-w-2xl mx-auto text-center relative overflow-hidden"
          >
            {/* Top Celebration Icon */}
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Official Custody Transfer Complete
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
                Parcel Successfully Collected
              </h2>
              <p className="text-xs text-slate-500">
                Tamper-evident bay unlocked. Recipient identity matched via OTP.
              </p>
            </div>

            {/* Official Digital Proof of Delivery Box */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 text-left space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200 font-sans">
                <span className="font-bold text-navy-950 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-brand-600" /> Proof of Delivery (POD)
                </span>
                <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                  VERIFIED ✓
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px]">Parcel ID</span>
                  <strong className="text-navy-950 font-bold">{activeDelivery.parcelId}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Delivered To</span>
                  <strong className="text-navy-950 font-bold">{activeDelivery.deliveryRecipient.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Terminal Location</span>
                  <strong className="text-navy-950 font-bold">{activeDelivery.route.toTerminal}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Timestamp</span>
                  <strong className="text-navy-950 font-bold">06:48 AM (On-time)</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Transit Carrier</span>
                  <strong className="text-navy-950 font-bold">{activeDelivery.bus.operator} ({activeDelivery.bus.busNumber})</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Security Clearance</span>
                  <strong className="text-emerald-700 font-bold">OTP-{activeDelivery.otp} Matched</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => alert(`Downloaded Delivery Receipt for ${activeDelivery.parcelId}`)}
                className="w-full sm:w-1/2 bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>Download POD Receipt</span>
              </button>

              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="w-full sm:w-1/2 bg-navy-900 hover:bg-navy-800 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Go to User Dashboard</span>
                <ArrowRight className="w-4 h-4 text-brand-400" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
