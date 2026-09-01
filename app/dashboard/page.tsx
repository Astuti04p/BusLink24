'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/lib/demoState';
import { 
  Package, 
  CheckCircle2, 
  Clock, 
  IndianRupee, 
  Send, 
  Search, 
  ArrowUpRight, 
  Bus, 
  Navigation, 
  ShieldCheck, 
  FileText,
  Filter,
  Sparkles
} from 'lucide-react';

export default function UserDashboardPage() {
  const router = useRouter();
  const { activeDelivery, recentDeliveries } = useDemo();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredDeliveries = recentDeliveries.filter((d) => {
    const matchesSearch = 
      d.parcelId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.route.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || d.status.toUpperCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-brand-50 border border-brand-200 px-3 py-0.5 rounded-full">
            Customer Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
            Sender Logistics Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your intercity express bus dispatches, invoices, and live parcel custody
          </p>
        </div>

        <Link
          href="/send"
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-5 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30 hover:shadow-xl transition-all w-full sm:w-auto"
        >
          <Send className="w-4 h-4" />
          <span>Send New Parcel</span>
        </Link>
      </div>

      {/* 4 TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Active Deliveries */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Active Deliveries</span>
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Bus className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-navy-950 font-mono">1</div>
          <span className="text-[11px] text-brand-600 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-ping" />
            In highway transit
          </span>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Completed Parcels</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-navy-950 font-mono">12</div>
          <span className="text-[11px] text-emerald-700 font-semibold">100% on-time rate</span>
        </div>

        {/* Total Spent */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Total Spent</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-navy-950 font-mono">₹3,240</div>
          <span className="text-[11px] text-blue-700 font-semibold">Avg ₹270 / delivery</span>
        </div>

        {/* Time Saved */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Time Saved</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-navy-950 font-mono">27 hrs</div>
          <span className="text-[11px] text-purple-700 font-semibold">Vs surface courier</span>
        </div>

      </div>

      {/* HIGHLIGHTED ACTIVE DELIVERY CARD */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-6 sm:p-8 border border-navy-800 shadow-2xl relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Left Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-brand-400 bg-brand-950 border border-brand-800 px-3 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                Active Highway Transit
              </span>
              <span className="text-xs font-mono text-slate-400">
                {activeDelivery.parcelId}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {activeDelivery.route.from} ➔ {activeDelivery.route.to}
            </h3>

            <p className="text-xs text-slate-300 flex items-center gap-2">
              <Bus className="w-4 h-4 text-brand-400" />
              <span>Carrier: <strong>{activeDelivery.bus.operator}</strong> ({activeDelivery.bus.busNumber}) • Bay A-2</span>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <span className="bg-navy-800 px-3 py-1.5 rounded-xl text-slate-300">
                📍 Location: <strong className="text-white">{activeDelivery.currentLocation.nearCity}</strong>
              </span>
              <span className="bg-navy-800 px-3 py-1.5 rounded-xl text-slate-300">
                ⚡ ETA: <strong className="text-brand-400 font-mono">{activeDelivery.currentLocation.etaRemaining}</strong>
              </span>
            </div>
          </div>

          {/* Right Action */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => router.push('/tracking')}
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-brand-600/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 text-xs"
            >
              <span>Track Live Route Map</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => router.push('/verify')}
              className="bg-navy-800 hover:bg-navy-700 text-slate-200 font-bold px-6 py-3.5 rounded-2xl border border-navy-700 transition-colors text-xs flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verify &amp; Collect (OTP {activeDelivery.otp})</span>
            </button>
          </div>

        </div>

      </div>

      {/* RECENT DELIVERIES TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Table Filters & Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-navy-950">Recent Deliveries</h3>
            <p className="text-xs text-slate-500">History of dispatched parcels</p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Parcel ID or City..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="IN TRANSIT">In Transit</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                <th className="pb-3 pr-4">Parcel ID</th>
                <th className="pb-3 px-4">Route</th>
                <th className="pb-3 px-4">Date</th>
                <th className="pb-3 px-4">Carrier</th>
                <th className="pb-3 px-4">Weight / Type</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 px-4 text-right">Price</th>
                <th className="pb-3 pl-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDeliveries.map((item, idx) => {
                const isInTransit = item.status === 'In Transit';
                return (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 pr-4 font-mono font-bold text-navy-950">
                      {item.parcelId}
                    </td>
                    <td className="py-4 px-4 font-semibold text-navy-900">
                      {item.route}
                    </td>
                    <td className="py-4 px-4 text-slate-500">
                      {item.date}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {item.busOperator}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {item.category} ({item.weight})
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        isInTransit
                          ? 'bg-brand-50 text-brand-700 border border-brand-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {isInTransit ? <Bus className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-mono font-bold text-navy-950">
                      ₹{item.price}
                    </td>
                    <td className="py-4 pl-4 text-right">
                      {isInTransit ? (
                        <Link
                          href="/tracking"
                          className="text-xs font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
                        >
                          Track <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => alert(`View receipt for ${item.parcelId}`)}
                          className="text-xs font-bold text-slate-500 hover:text-navy-950 inline-flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3" /> Receipt
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
