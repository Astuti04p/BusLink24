'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/lib/demoState';
import { QRCodeCard } from '@/components/booking/QRCodeCard';
import { Modal } from '@/components/ui/Modal';
import { 
  Bus, 
  MapPin, 
  Package, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  Sparkles,
  Lock,
  User,
  QrCode
} from 'lucide-react';

export default function BookingConfirmationPage() {
  const router = useRouter();
  const { bookingState, confirmBooking } = useDemo();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [generatedId, setGeneratedId] = useState(bookingState.parcelId || 'BL24-DEL-PAT-10234');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'card'>('upi');

  const bus = bookingState.selectedBus;
  const parcel = bookingState.parcel;

  const handleOpenPayment = () => {
    setIsPaymentModalOpen(true);
  };

  const handleSimulatePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const newParcelId = confirmBooking();
      setGeneratedId(newParcelId);
      setIsProcessingPayment(false);
      setIsPaymentModalOpen(false);
      setIsConfirmed(true);
    }, 1800);
  };

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header & Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-brand-50 border border-brand-200 px-3 py-0.5 rounded-full">
              Step 3 of 4
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
              {isConfirmed ? '🎉 Booking Confirmed & QR Pass' : 'Confirm Your Express Delivery'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {isConfirmed
                ? 'Your parcel bay is reserved on the express bus. Present QR / OTP at pickup.'
                : 'Review journey details and complete simulated instant payment.'}
            </p>
          </div>
        </div>

        {/* Progress Breadcrumbs */}
        <div className="grid grid-cols-4 gap-2 pt-4">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-mono text-[11px]">✓</span>
            <span className="truncate">Route & Parcel</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-mono text-[11px]">✓</span>
            <span className="truncate">AI Bus Match</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-md">
            <span className="w-5 h-5 rounded-full bg-white text-brand-600 flex items-center justify-center font-mono text-[11px]">3</span>
            <span className="truncate">Confirm & QR</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-500 font-semibold text-xs">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-[11px]">4</span>
            <span className="truncate">Live Track</span>
          </div>
        </div>
      </div>

      {!isConfirmed ? (
        /* PRE-PAYMENT SUMMARY CARD */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Route & Bus Summary */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-6">
              
              {/* Bus Operator Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-600/30">
                    <Bus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-navy-950">
                      {bus?.operator || 'Swift Travels'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {bus?.busType || 'Volvo Multi-Axle AC Sleeper'} • {bus?.busNumber || 'DL-01-AB-2024'}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  AI Match: {bus?.aiScore || 96}/100
                </span>
              </div>

              {/* Journey Route Visual */}
              <div className="space-y-4 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70">
                
                {/* Origin */}
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-brand-600 ring-4 ring-brand-100 mt-1 shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase text-slate-500">Pickup Hub (From)</span>
                      <span className="text-xs font-mono font-bold text-navy-950">{bus?.departureTime || '08:30 PM'}</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-navy-950">
                      {bookingState.fromCity} — {bookingState.fromTerminal}
                    </h4>
                  </div>
                </div>

                {/* Duration divider */}
                <div className="pl-1.5 py-1 border-l-2 border-dashed border-slate-300 ml-1.5 flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-brand-600" />
                  <span>Transit Duration: <strong>{bus?.duration || '10h 15m'} (Overnight)</strong></span>
                </div>

                {/* Destination */}
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-emerald-100 mt-1 shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase text-slate-500">Destination Terminal (To)</span>
                      <span className="text-xs font-mono font-bold text-navy-950">{bus?.arrivalTime || '06:45 AM'}</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-navy-950">
                      {bookingState.toCity} — {bookingState.toTerminal}
                    </h4>
                  </div>
                </div>

              </div>

              {/* Parcel Details Mini Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                  <span className="text-slate-400 block font-medium">Category</span>
                  <strong className="text-navy-900">{parcel.category}</strong>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                  <span className="text-slate-400 block font-medium">Weight</span>
                  <strong className="text-navy-900 font-mono">{parcel.weightKg} kg</strong>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block font-medium">Receiver</span>
                  <strong className="text-navy-900 truncate block">{parcel.receiverName}</strong>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Pricing & Checkout Button */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-navy-950 pb-3 border-b border-slate-100">
                Payment Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Base Express Bus Freight</span>
                  <span className="font-mono font-bold text-navy-900">₹269</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>OTP Security Tagging & QR Pass</span>
                  <span className="font-mono font-bold text-navy-900">₹20</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Transit Cargo Protection (₹2,000 cover)</span>
                  <span className="font-mono font-bold text-navy-900">₹10</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm font-extrabold text-navy-950">
                  <span>Total Amount Payable</span>
                  <span className="text-2xl font-black text-brand-600 font-mono">
                    ₹{bus?.price || 299}
                  </span>
                </div>
              </div>

              {/* Security Banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3 text-xs text-slate-600">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Simulated Hackathon Checkout. No real bank charges or credit cards required.
                </span>
              </div>

              {/* Pay Button */}
              <button
                type="button"
                onClick={handleOpenPayment}
                className="w-full bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-700 hover:to-rose-700 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-brand-600/30 hover:shadow-2xl transition-all flex items-center justify-center gap-2 group text-base"
              >
                <Lock className="w-4 h-4" />
                <span>Confirm & Pay ₹{bus?.price || 299}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>

          </div>

        </div>
      ) : (
        /* POST-PAYMENT CONFIRMED VIEW WITH QR PASS */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Confirmation details */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-200 shadow-xl space-y-6 relative overflow-hidden">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Payment & Reservation Confirmed
                </span>
                <h2 className="text-2xl font-black text-navy-950">
                  Bay Successfully Reserved!
                </h2>
                <p className="text-xs text-slate-500">
                  Your parcel will travel on <strong>{bus?.operator || 'Swift Travels'}</strong> tonight departing at {bus?.departureTime || '08:30 PM'}.
                </p>
              </div>

              {/* Step Checklist */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                  <div>
                    <strong className="text-navy-900 block">Drop off at {bookingState.fromTerminal}</strong>
                    <span className="text-slate-500">Show Parcel ID or QR Code at BusLink 24 Station Counter before {bus?.departureTime || '08:30 PM'}.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="w-5 h-5 rounded-full bg-navy-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                  <div>
                    <strong className="text-navy-900 block">Receiver Collects at {bookingState.toTerminal}</strong>
                    <span className="text-slate-500">Receiver ({parcel.receiverName}) presents OTP <strong>482917</strong> at arrival counter.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => router.push('/tracking')}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-brand-600/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm group"
                >
                  <span>Track Live Bus Transit Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold py-3 px-6 rounded-2xl transition-colors text-xs"
                >
                  View Sender Dashboard
                </button>
              </div>

            </div>

          </div>

          {/* Right: Realistic Scannable QR Code Pass */}
          <div className="lg:col-span-6">
            <QRCodeCard
              parcelId={generatedId}
              receiverName={parcel.receiverName}
              route={`${bookingState.fromCity} ➔ ${bookingState.toCity}`}
              departure={bus?.departureTime || '08:30 PM'}
              price={bus?.price || 299}
            />
          </div>

        </div>
      )}

      {/* MOCK PAYMENT MODAL */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => !isProcessingPayment && setIsPaymentModalOpen(false)}
        title="Simulated Express Checkout"
        subtitle={`Amount: ₹${bus?.price || 299} • Fast simulated hackathon gateway`}
        maxWidth="md"
      >
        <div className="space-y-5 py-2">
          
          {/* Payment Method Selector */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedPaymentMethod('upi')}
              className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                selectedPaymentMethod === 'upi'
                  ? 'border-brand-500 bg-brand-50/70 text-brand-700 ring-1 ring-brand-500'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Smartphone className="w-4 h-4 text-brand-600" />
              <span>Instant UPI (GPay/PhonePe)</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPaymentMethod('card')}
              className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                selectedPaymentMethod === 'card'
                  ? 'border-brand-500 bg-brand-50/70 text-brand-700 ring-1 ring-brand-500'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <CreditCard className="w-4 h-4 text-navy-900" />
              <span>Debit / Credit Card</span>
            </button>
          </div>

          {/* Payment Details Box */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Merchant</span>
              <strong className="text-navy-900">BusLink 24 Logistics Ltd</strong>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Item</span>
              <strong className="text-navy-900">Bus Bay Reservation ({bookingState.fromCity} ➔ {bookingState.toCity})</strong>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Total</span>
              <strong className="text-base font-black text-brand-600 font-mono">₹{bus?.price || 299}</strong>
            </div>
          </div>

          {/* Pay Button */}
          <button
            type="button"
            disabled={isProcessingPayment}
            onClick={handleSimulatePayment}
            className="w-full bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-700 hover:to-rose-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 text-sm disabled:opacity-75"
          >
            {isProcessingPayment ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Processing Payment Authorization...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Pay ₹{bus?.price || 299} (Instant Simulation)</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-slate-400">
            🔒 256-bit Mock Encryption • Hackathon demonstration sandbox
          </p>

        </div>
      </Modal>

    </div>
  );
}
