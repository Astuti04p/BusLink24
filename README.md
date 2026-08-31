<div align="center">

# 🚌 BusLink 24
### *Send Today. Reach Tomorrow.*
**AI-Powered 24-Hour Intercity Parcel Delivery Network Powered by Buses**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Recharts](https://img.shields.io/badge/Recharts-2.15-22c55e?style=for-the-badge)](https://recharts.org/)

---

> ### 🚀 One-Line Pitch
> **“Why build a new delivery network when thousands of buses are already travelling every day?”**

BusLink 24 connects senders with verified intercity buses that have available luggage and belly cargo capacity, enabling fast, affordable, same-day and overnight parcel delivery across India.

</div>

---

## 📌 Problem & Opportunity

| ⚠️ The Problem with Traditional Logistics | 💡 The BusLink 24 Solution |
| :--- | :--- |
| **Traditional Surface Couriers** take **3 to 5 days** due to multi-tier sorting hub bottlenecks and intermediate truck routing. | **Direct Highway Transit**: Packages travel on scheduled express overnight passenger buses with **zero intermediate sorting hub delays**. |
| **Express Air Freight** is expensive (₹650 - ₹900+) and restricted only to cities with major airport infrastructure. | **40% Lower Cost**: Flat rate tariffs (e.g. ₹299 for Delhi ➔ Patna) leveraging existing trip capacity without new fuel expenses. |
| **High Carbon Footprint**: Adding dedicated delivery vans increases urban highway emissions. | **Zero Added Emissions**: 100% utilizes already-moving passenger transport networks. |

---

## ⭐ Complete 3-Minute Hackathon Demo Flow

Experience the primary end-to-end user journey:

```text
Landing Page (http://localhost:3000)
      ↓ Click "3-Min Demo" or "Send a Parcel"
Send Parcel Wizard (/send)
      ↓ Delhi ➔ Patna • 2 kg Documents
AI Bus Matching Engine (/matching)
      ↓ Real-time radar analysis scan & "Why this bus?" modal
Select Swift Travels (96/100 AI Score)
      ↓
Booking Confirmation & Mock Payment (/booking)
      ↓ Instant UPI / Card simulated checkout
Booking Confirmed & High-Contrast QR Pass Generated
      ↓
Live Highway Telematics Tracking (/tracking)
      ↓ Animated Purvanchal Expressway route map near Lucknow
Click "Simulate Bus Movement" / Fast-Forward
      ↓
Delivery Verification Screen (/verify)
      ↓ Enter 6-digit OTP (482917) or simulate QR camera scanner
🎉 Confetti Celebration & Digital Proof of Delivery (POD)
      ↓
Customer Dashboard (/dashboard) & Admin Control Center (/admin)
```

---

## 🧠 AI Bus Matching Algorithm (`/lib/aiMatching.ts`)

BusLink 24 features a transparent multi-factor logistics scoring engine:

$$\text{AI Match Score} = \sum (\text{Factor} \times \text{Weight})$$

```
Route Compatibility       25%  ──  Direct expressway corridor alignment
Arrival & Transit ETA     25%  ──  Overnight transit arriving before 7:00 AM
Cargo Bay Availability    15%  ──  Real-time spare payload capacity (kg)
Cost Efficiency           15%  ──  Dynamic freight pricing optimization
Traffic & Toll Flow       10%  ──  Live toll plaza throughput modeling
Operator Reliability      10%  ──  98%+ historical on-time arrival index
```

---

## 🌟 Key Platform Features

### 1. 🏠 Modern Landing Page
- **Live Expressway Route Animation**: Displays live corridor status with cargo bay headroom.
- **Instant AI Quote Widget**: Quick estimate of fares and overnight delivery times.
- **Interactive Benchmark Comparison**: Side-by-side comparison between Surface Couriers, Air Cargo, and BusLink 24.
- **Concept Metrics**: 10,000+ Daily Buses, 24h Target Delivery, 40% Cost Reduction, 100+ Connected Cities.

### 2. 📦 4-Step Booking Wizard
- Multi-city selector for major hubs (**Delhi, Patna, Lucknow, Kanpur, Jaipur, Mumbai, Pune, Bangalore, Chennai**).
- Dynamic payload configuration: Category chips, weight slider (0.5–20 kg), dimensions, declared value, and fragile item protection.
- **⚡ 1-Click Demo Preset**: Pre-fills the Delhi ➔ Patna standard hackathon demo with one click.

### 3. 🤖 AI Recommendation Engine
- Simulated 6-step progress radar animation.
- 3 Ranked bus operator cards (**Swift Travels**, **North India Express**, **Bihar Connect**).
- **“Why this bus?” Modal**: Transparent weighted factor radar & natural language justification.

### 4. 💳 Instant Checkout & Digital QR Pass
- Transparent fee breakdown with insurance & OTP protection.
- Interactive simulated payment gateway (Instant UPI & Cards).
- Generates unique **Parcel ID** (`BL24-DEL-PAT-10234`) and a high-contrast scannable **SVG QR Pass**.

### 5. 📍 Live Telematics & Highway Tracking Map
- Simulated expressway map with live speed telemetry (68 km/h), remaining distance (285 km), and dynamic ETA.
- Assigned Bus Captain & Custodian contact card.
- Vertical custody audit log from departure to destination terminal.
- **⚡ Fast-Forward Button**: Advances transit status for judge evaluations.

### 6. 📱 Receiver OTP Delivery Verification
- Destination terminal collection interface at Patna Bus Terminal.
- 6-digit OTP input with **Auto-Fill Demo OTP (`482917`)** button.
- Instant confetti burst, recipient identity verification, and digital receipt download.

### 7. 📊 Customer Logistics Dashboard
- KPI summary: Active Deliveries, Completed Orders, Total Spent, Time Saved.
- Active delivery highlight card and recent order history table.

### 8. 🛠️ Admin Logistics Control Center
- Platform metrics: 1,284 Parcels, 87 Active Deliveries, 246 Partner Buses, 42 Hubs.
- **Interactive Recharts Analytics**: Delivery velocity area chart, top bus routes bar chart, and parcel category distribution donut chart.
- **Bus Luggage Bay Capacity Utilization Meters**: Real-time gauge progress bars displaying used vs free cargo bay payload.

### 9. 🚀 Floating Demo Controller
- Persistent bottom controller enabling judges to jump through all 8 steps or reset the demo anytime in 1 click.

---

## 📁 Clean Next.js Architecture

```text
/app
  ├── layout.tsx             # Root layout with DemoProvider, Navbar, Footer & DemoBar
  ├── page.tsx               # Landing Page with Hero, Route animation, metrics & future scope
  ├── send/page.tsx          # Multi-step parcel booking wizard (Route & Parcel Details)
  ├── matching/page.tsx      # AI Bus Matching with animated scan & "Why this bus?" modal
  ├── booking/page.tsx       # Booking confirmation, mock payment & digital QR pass
  ├── tracking/page.tsx      # Live expressway route map & vertical custody timeline
  ├── verify/page.tsx        # OTP Delivery verification (482917) & celebration POD receipt
  ├── dashboard/page.tsx     # Sender logistics dashboard & past deliveries
  ├── admin/page.tsx         # Admin Control Center with Recharts analytics & capacity meters
  └── login/page.tsx         # Demo access portal for switching roles (Customer / Admin)

/components
  ├── /booking               # QRCodeCard, RouteSelector, ParcelForm
  ├── /landing               # HeroRouteAnimation, QuickQuoteWidget, StatsCounter, FutureScope
  ├── /layout                # Navbar, Footer, FloatingDemoBar, DemoLoginModal
  ├── /matching              # AIExplanationModal
  ├── /tracking              # SimulatedRouteMap
  └── /ui                    # Reusable Modal, Badges, Buttons

/lib
  ├── aiMatching.ts          # Transparent AI bus recommendation algorithm
  ├── demoState.tsx          # Global React Context with localStorage persistence
  ├── mockData.ts            # Realistic cities, bus fleets, tracking waypoints & admin stats
  └── utils.ts               # Currency formatting, Parcel ID generation & class utilities

/types
  └── index.ts               # TypeScript interfaces for Bus, Parcel, Route, Booking, Analytics
```

---

## 🛠️ Getting Started (Local Setup)

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Astuti04p/BusLink24.git
   cd BusLink24
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔮 Future Vision & Roadmap

- [ ] **OBD-II Telematics & Real GPS Integration**: Hardware tracking for bus fleet location feeds.
- [ ] **Machine Learning ETA Engine**: Dynamic highway delay and weather-aware transit prediction.
- [ ] **Automated ISBT Smart Lockers**: Self-service OTP/QR collection lockers at major terminals.
- [ ] **Computer Vision Volumetric Scanning**: Instant parcel dimensioning via smartphone camera.
- [ ] **State RTC APIs**: Direct integrations with UPSRTC, BSRTC, MSRTC, and private fleet aggregators.

---

## 📄 License & Hackathon Notice

This project was created as a **Web Hackathon Prototype**. All payment gateways, GPS feeds, and bus operators are simulated for demonstration purposes.

Built with ❤️ by the **BusLink 24 Team**.
