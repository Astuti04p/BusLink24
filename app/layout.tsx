import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "@/lib/demoState";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingDemoBar } from "@/components/layout/FloatingDemoBar";

export const metadata: Metadata = {
  title: "BusLink 24 — AI-Powered 24-Hour Intercity Parcel Delivery Network",
  description: "Why build a new delivery network when thousands of buses are already travelling every day? BusLink 24 uses India's existing intercity bus network for fast, affordable, 24-hour parcel delivery.",
  keywords: "intercity delivery, bus parcel delivery, logistics AI, same day delivery India, bus cargo logistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-navy-950 antialiased selection:bg-brand-500 selection:text-white">
        <DemoProvider>
          <Navbar />
          <main className="flex-1 pb-16">
            {children}
          </main>
          <Footer />
          <FloatingDemoBar />
        </DemoProvider>
      </body>
    </html>
  );
}
