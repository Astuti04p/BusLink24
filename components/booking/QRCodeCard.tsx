'use client';

import React, { useState } from 'react';
import { QrCode, Download, Share2, Check, ShieldCheck, Copy } from 'lucide-react';

interface QRCodeCardProps {
  parcelId: string;
  receiverName: string;
  route: string;
  departure: string;
  price: number;
}

export function QRCodeCard({
  parcelId,
  receiverName,
  route,
  departure,
  price,
}: QRCodeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(parcelId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-b from-navy-900 to-navy-950 text-white rounded-3xl p-6 sm:p-7 border border-navy-800 shadow-2xl space-y-6 text-center relative overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-600/20 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-brand-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Parcel Verification Pass</span>
        </div>
        <h3 className="text-xl font-extrabold text-white">
          Digital Handoff QR Code
        </h3>
        <p className="text-xs text-slate-400">
          Share this QR with receiver ({receiverName}) for pickup at destination terminal
        </p>
      </div>

      {/* High-Contrast Realistic QR Code Visual Container */}
      <div className="bg-white p-5 rounded-2xl inline-block shadow-xl ring-4 ring-white/10 mx-auto">
        <div className="w-48 h-48 sm:w-56 sm:h-56 relative flex items-center justify-center bg-white">
          {/* Custom SVG QR Code pattern for realistic offline demo */}
          <svg viewBox="0 0 200 200" className="w-full h-full text-navy-950">
            {/* Corner Squares */}
            <rect x="10" y="10" width="50" height="50" fill="currentColor" rx="6" />
            <rect x="20" y="20" width="30" height="30" fill="white" rx="3" />
            <rect x="26" y="26" width="18" height="18" fill="currentColor" rx="2" />

            <rect x="140" y="10" width="50" height="50" fill="currentColor" rx="6" />
            <rect x="150" y="20" width="30" height="30" fill="white" rx="3" />
            <rect x="156" y="26" width="18" height="18" fill="currentColor" rx="2" />

            <rect x="10" y="140" width="50" height="50" fill="currentColor" rx="6" />
            <rect x="20" y="150" width="30" height="30" fill="white" rx="3" />
            <rect x="26" y="156" width="18" height="18" fill="currentColor" rx="2" />

            {/* Matrix Data Blocks */}
            <rect x="70" y="15" width="12" height="12" fill="currentColor" />
            <rect x="90" y="15" width="12" height="12" fill="currentColor" />
            <rect x="110" y="25" width="12" height="12" fill="currentColor" />
            <rect x="70" y="35" width="12" height="12" fill="currentColor" />
            <rect x="100" y="45" width="12" height="12" fill="currentColor" />
            <rect x="120" y="15" width="12" height="12" fill="currentColor" />

            <rect x="15" y="70" width="12" height="12" fill="currentColor" />
            <rect x="35" y="80" width="12" height="12" fill="currentColor" />
            <rect x="15" y="100" width="12" height="12" fill="currentColor" />
            <rect x="45" y="110" width="12" height="12" fill="currentColor" />

            <rect x="70" y="70" width="60" height="60" fill="currentColor" rx="8" />
            <rect x="75" y="75" width="50" height="50" fill="#e11d48" rx="6" />
            
            {/* Center Logo in QR */}
            <text x="100" y="105" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              BL24
            </text>

            <rect x="145" y="75" width="12" height="12" fill="currentColor" />
            <rect x="165" y="90" width="12" height="12" fill="currentColor" />
            <rect x="145" y="115" width="12" height="12" fill="currentColor" />

            <rect x="70" y="145" width="12" height="12" fill="currentColor" />
            <rect x="90" y="160" width="12" height="12" fill="currentColor" />
            <rect x="110" y="145" width="12" height="12" fill="currentColor" />
            <rect x="130" y="165" width="12" height="12" fill="currentColor" />
            <rect x="150" y="145" width="12" height="12" fill="currentColor" />
            <rect x="170" y="160" width="12" height="12" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Parcel ID Badge */}
      <div className="bg-navy-800/90 border border-navy-700 rounded-2xl p-3.5 flex items-center justify-between gap-3">
        <div className="text-left">
          <span className="text-[10px] text-slate-400 block uppercase font-semibold">Tracking Parcel ID</span>
          <span className="text-sm sm:text-base font-black text-brand-400 font-mono tracking-wider">
            {parcelId}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="bg-navy-700 hover:bg-navy-600 text-white p-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy ID'}</span>
        </button>
      </div>

      {/* Share & Download Actions */}
      <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-bold">
        <button
          type="button"
          onClick={() => alert(`Shareable Pass for Parcel ${parcelId} generated! Share with ${receiverName}`)}
          className="bg-navy-800 hover:bg-navy-700 text-white py-2.5 px-3 rounded-xl border border-navy-700 flex items-center justify-center gap-1.5 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-brand-400" />
          <span>Share Pass</span>
        </button>

        <button
          type="button"
          onClick={() => alert(`Downloaded BusLink 24 Digital Handoff Pass: ${parcelId}.pdf`)}
          className="bg-navy-800 hover:bg-navy-700 text-white py-2.5 px-3 rounded-xl border border-navy-700 flex items-center justify-center gap-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span>Download PDF</span>
        </button>
      </div>

    </div>
  );
}
