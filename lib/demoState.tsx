'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ParcelDetails, 
  BusMatch, 
  ActiveDelivery, 
  DeliveryStatus 
} from '@/types';
import { DEMO_DEFAULT_DELIVERY, MOCK_BUSES, MOCK_RECENT_DELIVERIES } from './mockData';
import { generateParcelId } from './utils';

export interface BookingFormState {
  fromCity: string;
  toCity: string;
  fromTerminal: string;
  toTerminal: string;
  parcel: ParcelDetails;
  selectedBus: BusMatch | null;
  parcelId: string;
}

interface DemoContextType {
  bookingState: BookingFormState;
  activeDelivery: ActiveDelivery;
  recentDeliveries: typeof MOCK_RECENT_DELIVERIES;
  isDemoBarVisible: boolean;
  setIsDemoBarVisible: (visible: boolean) => void;
  updateRoute: (from: string, to: string, fromTerm: string, toTerm: string) => void;
  updateParcel: (details: Partial<ParcelDetails>) => void;
  selectBus: (bus: BusMatch) => void;
  confirmBooking: () => string;
  resetToDemoPreset: () => void;
  advanceSimulationStage: () => void;
  verifyOtpAndComplete: (enteredOtp: string) => boolean;
  setActiveDeliveryStatus: (status: DeliveryStatus) => void;
}

const DEFAULT_PARCEL: ParcelDetails = {
  category: 'Documents',
  weightKg: 2,
  dimensions: { length: 20, width: 15, height: 10 },
  declaredValue: 2000,
  isFragile: false,
  senderName: 'Astuti Pandey',
  senderPhone: '+91 98765 12345',
  receiverName: 'Rahul Sharma',
  receiverPhone: '+91 98123 45678',
  specialInstructions: 'Urgent contract papers. Keep in dry locked bay.'
};

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [bookingState, setBookingState] = useState<BookingFormState>({
    fromCity: 'Delhi',
    toCity: 'Patna',
    fromTerminal: 'ISBT Kashmere Gate',
    toTerminal: 'Patna Bus Terminal (Bairiya)',
    parcel: DEFAULT_PARCEL,
    selectedBus: MOCK_BUSES[0],
    parcelId: 'BL24-DEL-PAT-10234',
  });

  const [activeDelivery, setActiveDelivery] = useState<ActiveDelivery>(DEMO_DEFAULT_DELIVERY);
  const [recentDeliveries, setRecentDeliveries] = useState(MOCK_RECENT_DELIVERIES);
  const [isDemoBarVisible, setIsDemoBarVisible] = useState(true);

  // Initialize from LocalStorage if available
  useEffect(() => {
    try {
      const savedDelivery = localStorage.getItem('buslink_active_delivery');
      if (savedDelivery) {
        setActiveDelivery(JSON.parse(savedDelivery));
      }
      const savedBooking = localStorage.getItem('buslink_booking_state');
      if (savedBooking) {
        setBookingState(JSON.parse(savedBooking));
      }
    } catch {
      // ignore
    }
  }, []);

  const updateRoute = (from: string, to: string, fromTerm: string, toTerm: string) => {
    setBookingState(prev => {
      const updated = {
        ...prev,
        fromCity: from,
        toCity: to,
        fromTerminal: fromTerm,
        toTerminal: toTerm,
      };
      try { localStorage.setItem('buslink_booking_state', JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const updateParcel = (details: Partial<ParcelDetails>) => {
    setBookingState(prev => {
      const updated = {
        ...prev,
        parcel: { ...prev.parcel, ...details },
      };
      try { localStorage.setItem('buslink_booking_state', JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const selectBus = (bus: BusMatch) => {
    setBookingState(prev => {
      const updated = { ...prev, selectedBus: bus };
      try { localStorage.setItem('buslink_booking_state', JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const confirmBooking = (): string => {
    const newId = generateParcelId(bookingState.fromCity, bookingState.toCity);
    const bus = bookingState.selectedBus || MOCK_BUSES[0];
    
    setBookingState(prev => ({
      ...prev,
      parcelId: newId,
    }));

    const newActiveDelivery: ActiveDelivery = {
      ...DEMO_DEFAULT_DELIVERY,
      parcelId: newId,
      bookingTime: 'Just now',
      route: {
        from: bookingState.fromCity,
        to: bookingState.toCity,
        fromTerminal: bookingState.fromTerminal,
        toTerminal: bookingState.toTerminal,
        distanceTotalKm: 1045,
      },
      parcel: bookingState.parcel,
      bus: bus,
      price: bus.price,
      status: 'In Transit',
      otp: '482917',
      deliveryRecipient: {
        name: bookingState.parcel.receiverName || 'Rahul Sharma',
        phone: bookingState.parcel.receiverPhone || '+91 98123 45678',
      }
    };

    setActiveDelivery(newActiveDelivery);
    try {
      localStorage.setItem('buslink_active_delivery', JSON.stringify(newActiveDelivery));
    } catch {}

    // Add to recent deliveries
    const newEntry = {
      parcelId: newId,
      route: `${bookingState.fromCity} ➔ ${bookingState.toCity}`,
      date: 'Today (Just booked)',
      status: 'In Transit',
      category: bookingState.parcel.category,
      weight: `${bookingState.parcel.weightKg} kg`,
      price: bus.price,
      busOperator: bus.operator,
      eta: '10h 15m'
    };

    setRecentDeliveries(prev => [newEntry, ...prev]);

    return newId;
  };

  const resetToDemoPreset = () => {
    const presetBooking: BookingFormState = {
      fromCity: 'Delhi',
      toCity: 'Patna',
      fromTerminal: 'ISBT Kashmere Gate',
      toTerminal: 'Patna Bus Terminal (Bairiya)',
      parcel: DEFAULT_PARCEL,
      selectedBus: MOCK_BUSES[0],
      parcelId: 'BL24-DEL-PAT-10234',
    };
    setBookingState(presetBooking);
    setActiveDelivery(DEMO_DEFAULT_DELIVERY);
    try {
      localStorage.setItem('buslink_booking_state', JSON.stringify(presetBooking));
      localStorage.setItem('buslink_active_delivery', JSON.stringify(DEMO_DEFAULT_DELIVERY));
    } catch {}
  };

  const advanceSimulationStage = () => {
    setActiveDelivery(prev => {
      let nextStatus: DeliveryStatus = prev.status;
      let nextPct = prev.currentLocation.progressPercentage;
      let nextNearCity = prev.currentLocation.nearCity;
      let nextDist = prev.currentLocation.distanceRemainingKm;
      let nextEta = prev.currentLocation.etaRemaining;

      if (prev.status === 'In Transit') {
        nextStatus = 'Arrived at Destination';
        nextPct = 95;
        nextNearCity = 'Patna City Entry (Bairiya ISBT Approach)';
        nextDist = 5;
        nextEta = '10 mins';
      } else if (prev.status === 'Arrived at Destination') {
        nextStatus = 'Ready for Collection';
        nextPct = 100;
        nextNearCity = 'Docked at Bay 12, Patna Bus Terminal';
        nextDist = 0;
        nextEta = 'Ready for pickup';
      }

      const updated: ActiveDelivery = {
        ...prev,
        status: nextStatus,
        currentLocation: {
          ...prev.currentLocation,
          progressPercentage: nextPct,
          nearCity: nextNearCity,
          distanceRemainingKm: nextDist,
          etaRemaining: nextEta,
        }
      };
      try { localStorage.setItem('buslink_active_delivery', JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const verifyOtpAndComplete = (enteredOtp: string): boolean => {
    if (enteredOtp.trim() === '482917' || enteredOtp.trim() === activeDelivery.otp) {
      const updated: ActiveDelivery = {
        ...activeDelivery,
        status: 'Delivered',
        deliveryRecipient: {
          ...activeDelivery.deliveryRecipient,
          verifiedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          collectedBy: activeDelivery.parcel.receiverName || 'Rahul Sharma'
        }
      };
      setActiveDelivery(updated);
      try { localStorage.setItem('buslink_active_delivery', JSON.stringify(updated)); } catch {}
      return true;
    }
    return false;
  };

  const setActiveDeliveryStatus = (status: DeliveryStatus) => {
    setActiveDelivery(prev => {
      const updated = { ...prev, status };
      try { localStorage.setItem('buslink_active_delivery', JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  return (
    <DemoContext.Provider
      value={{
        bookingState,
        activeDelivery,
        recentDeliveries,
        isDemoBarVisible,
        setIsDemoBarVisible,
        updateRoute,
        updateParcel,
        selectBus,
        confirmBooking,
        resetToDemoPreset,
        advanceSimulationStage,
        verifyOtpAndComplete,
        setActiveDeliveryStatus,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
