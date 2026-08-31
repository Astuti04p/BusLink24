'use client';

import React, { useState } from 'react';
import { 
  MOCK_ADMIN_STATS, 
  MOCK_ADMIN_CHARTS 
} from '@/lib/mockData';
import { 
  Bus, 
  Package, 
  ShieldAlert, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Zap, 
  SlidersHorizontal,
  BarChart3, 
  PieChart as PieIcon, 
  Activity, 
  Search,
  CheckCircle2,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'fleet' | 'dispatches'>('analytics');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = MOCK_ADMIN_STATS;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 bg-brand-50 border border-brand-200 px-3 py-0.5 rounded-full flex items-center gap-1.5 w-fit">
            <ShieldAlert className="w-3.5 h-3.5" />
            Central Dispatch & Freight Orchestration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
            BusLink 24 Control Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time telemetry, belly cargo utilization meters & AI routing dispatch across 42 Indian cities
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'analytics'
                ? 'bg-white text-navy-950 shadow-sm'
                : 'text-slate-600 hover:text-navy-950'
            }`}
          >
            Analytics & KPIs
          </button>
          <button
            onClick={() => setActiveTab('fleet')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'fleet'
                ? 'bg-white text-navy-950 shadow-sm'
                : 'text-slate-600 hover:text-navy-950'
            }`}
          >
            Bus Bay Capacity
          </button>
          <button
            onClick={() => setActiveTab('dispatches')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'dispatches'
                ? 'bg-white text-navy-950 shadow-sm'
                : 'text-slate-600 hover:text-navy-950'
            }`}
          >
            Active Dispatches
          </button>
        </div>
      </div>

      {/* 5 PLATFORM KPI METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Total Parcels */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase text-slate-400">Total Parcels</span>
          <div className="text-2xl sm:text-3xl font-black text-navy-950 font-mono">
            {stats.totalParcels.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +24% this week
          </span>
        </div>

        {/* Active Deliveries */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase text-slate-400">Active Deliveries</span>
          <div className="text-2xl sm:text-3xl font-black text-brand-600 font-mono">
            {stats.activeDeliveries}
          </div>
          <span className="text-[10px] text-brand-600 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-ping" /> Live on highways
          </span>
        </div>

        {/* Partner Buses */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase text-slate-400">Partner Buses</span>
          <div className="text-2xl sm:text-3xl font-black text-navy-950 font-mono">
            {stats.partnerBuses}
          </div>
          <span className="text-[10px] text-slate-500 font-medium">Overnight Volvo & BharatBenz</span>
        </div>

        {/* Connected Cities */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase text-slate-400">Connected Hubs</span>
          <div className="text-2xl sm:text-3xl font-black text-navy-950 font-mono">
            {stats.connectedCities}
          </div>
          <span className="text-[10px] text-purple-600 font-semibold">Tier-1 & Tier-2 Corridors</span>
        </div>

        {/* Average ETA */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold uppercase text-slate-400">Average Transit ETA</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
            {stats.avgEtaHours} hrs
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">98.4% on-time record</span>
        </div>

      </div>

      {/* TAB 1: ANALYTICS & CHARTS */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          
          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Delivery Volume Line/Area Chart */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-navy-950 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-brand-600" />
                    Parcel Delivery Velocity & Revenue Trend
                  </h3>
                  <p className="text-xs text-slate-500">Daily dispatches across all active bus routes</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  +18.2% Day-over-Day
                </span>
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_ADMIN_CHARTS.deliveriesOverTime}>
                    <defs>
                      <linearGradient id="colorDeliveries" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e11d48" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="deliveries" name="Parcels Dispatched" stroke="#e11d48" strokeWidth={3} fillOpacity={1} fill="url(#colorDeliveries)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Parcel Categories Donut Chart */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-navy-950 flex items-center gap-2">
                    <PieIcon className="w-4 h-4 text-blue-600" />
                    Parcel Category Distribution
                  </h3>
                  <p className="text-xs text-slate-500">Payload categories transported</p>
                </div>
              </div>

              <div className="h-72 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MOCK_ADMIN_CHARTS.categories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {MOCK_ADMIN_CHARTS.categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Charts Row 2: Most Popular Routes Bar Chart */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-950 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  Top High-Volume Highway Bus Corridors
                </h3>
                <p className="text-xs text-slate-500">Parcel volume by intercity bus route</p>
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_ADMIN_CHARTS.popularRoutes} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                  <YAxis type="category" dataKey="route" stroke="#334155" fontSize={11} width={130} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="count" name="Parcels Delivered" fill="#e11d48" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: BUS BAY CAPACITY UTILIZATION */}
      {activeTab === 'fleet' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-2">
            <h3 className="text-lg font-bold text-navy-950">Bus Luggage Belly Cargo Utilization</h3>
            <p className="text-xs text-slate-500">
              Live capacity telemetry from digital weight sensors mounted in bus cargo bays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_ADMIN_CHARTS.busCapacityFleet.map((bus, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full uppercase">
                      {bus.route}
                    </span>
                    <h4 className="text-sm font-extrabold text-navy-950 leading-tight">
                      {bus.busName}
                    </h4>
                  </div>

                  <span className={`text-xs font-mono font-bold px-2 py-1 rounded-xl ${
                    bus.pct > 80 ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {bus.pct}% Used
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-600 font-medium">
                    <span>Bay Allocation</span>
                    <span className="font-mono font-bold text-navy-900">{bus.used} kg / {bus.capacity} kg</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        bus.pct > 80 ? 'bg-rose-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                      }`}
                      style={{ width: `${bus.pct}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Free Capacity</span>
                  <strong className="text-emerald-700 font-mono font-bold">{bus.available} kg Available</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ACTIVE DISPATCHES MONITOR */}
      {activeTab === 'dispatches' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-navy-950">Active Transit Dispatch Monitor</h3>
              <p className="text-xs text-slate-500">Real-time custody tracking across expressway corridors</p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Dispatches..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-navy-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="pb-3 pr-4">Parcel ID</th>
                  <th className="pb-3 px-4">Route</th>
                  <th className="pb-3 px-4">Carrier Bus</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 px-4">Remaining ETA</th>
                  <th className="pb-3 pl-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 pr-4 font-mono font-bold text-brand-600">
                    BL24-DEL-PAT-10234
                  </td>
                  <td className="py-4 px-4 font-semibold text-navy-900">
                    Delhi ➔ Patna (Purvanchal Exp)
                  </td>
                  <td className="py-4 px-4 text-slate-700 font-medium">
                    Swift Travels (DL-01-AB-2024)
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-ping" />
                      In Transit (Near Lucknow)
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-navy-900">
                    3h 20m (68 km/h)
                  </td>
                  <td className="py-4 pl-4 text-right">
                    <a href="/tracking" className="text-xs font-bold text-brand-600 hover:text-brand-700">
                      Live Telematics →
                    </a>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 pr-4 font-mono font-bold text-navy-900">
                    BL24-DEL-LKO-10221
                  </td>
                  <td className="py-4 px-4 font-semibold text-navy-900">
                    Delhi ➔ Lucknow (Yamuna Exp)
                  </td>
                  <td className="py-4 px-4 text-slate-700 font-medium">
                    North India Express (UP-32-NX-8821)
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Arrived at Alambagh ISBT
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-500">
                    Ready for Pickup
                  </td>
                  <td className="py-4 pl-4 text-right">
                    <span className="text-xs text-slate-400 font-semibold">Station Docked</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 pr-4 font-mono font-bold text-navy-900">
                    BL24-MUM-PUN-09941
                  </td>
                  <td className="py-4 px-4 font-semibold text-navy-900">
                    Mumbai ➔ Pune Expressway
                  </td>
                  <td className="py-4 px-4 text-slate-700 font-medium">
                    CityRide Luxury (MH-04-CR-1102)
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                      <Bus className="w-3 h-3" /> In Transit (Lonavala Ghat)
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-navy-900">
                    45m (72 km/h)
                  </td>
                  <td className="py-4 pl-4 text-right">
                    <a href="/tracking" className="text-xs font-bold text-brand-600 hover:text-brand-700">
                      Live Telematics →
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
