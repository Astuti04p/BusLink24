export type ParcelCategory = 
  | 'Documents'
  | 'Electronics'
  | 'Clothing'
  | 'Food'
  | 'Small Package'
  | 'Other';

export interface CityTerminal {
  id: string;
  name: string;
  address: string;
  isHub?: boolean;
}

export interface City {
  id: string;
  name: string;
  state: string;
  terminals: CityTerminal[];
  coords: { x: number; y: number; lat: number; lng: number };
}

export interface ParcelDetails {
  category: ParcelCategory;
  weightKg: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  declaredValue: number;
  isFragile: boolean;
  senderName: string;
  senderPhone: string;
  receiverName: string;
  receiverPhone: string;
  specialInstructions?: string;
}

export interface AIScoreBreakdown {
  routeCompatibility: number;
  arrivalTime: number;
  cargoAvailability: number;
  costEfficiency: number;
  trafficConditions: number;
  operatorReliability: number;
  weightedTotal: number;
}

export interface BusMatch {
  id: string;
  operator: string;
  busNumber: string;
  busType: string;
  from: string;
  to: string;
  fromTerminal: string;
  toTerminal: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  originalPrice?: number;
  totalCapacityKg: number;
  usedCapacityKg: number;
  availableCapacityKg: number;
  cargoStatus: 'High' | 'Moderate' | 'Limited';
  reliabilityScore: number;
  aiScore: number;
  isAIRecommended?: boolean;
  trafficStatus: 'Optimal' | 'Moderate' | 'Minor Delays';
  scoreBreakdown: AIScoreBreakdown;
  aiExplanation: string;
  driverName: string;
  driverPhone: string;
  features: string[];
}

export type DeliveryStatus = 
  | 'Confirmed'
  | 'Accepted'
  | 'Picked Up'
  | 'In Transit'
  | 'Arrived at Destination'
  | 'Ready for Collection'
  | 'Delivered';

export interface TrackingMilestone {
  id: string;
  title: string;
  time: string;
  location: string;
  status: 'completed' | 'current' | 'upcoming';
  description?: string;
}

export interface RouteWaypoint {
  name: string;
  state: string;
  eta: string;
  status: 'passed' | 'current' | 'upcoming';
  distanceFromStartKm: number;
  coordinates: { x: number; y: number };
}

export interface ActiveDelivery {
  parcelId: string;
  bookingTime: string;
  route: {
    from: string;
    to: string;
    fromTerminal: string;
    toTerminal: string;
    distanceTotalKm: number;
  };
  parcel: ParcelDetails;
  bus: BusMatch;
  price: number;
  status: DeliveryStatus;
  otp: string;
  currentLocation: {
    name: string;
    nearCity: string;
    speedKmh: number;
    distanceRemainingKm: number;
    etaRemaining: string;
    progressPercentage: number;
    trafficCondition: 'Clear Highway' | 'Moderate Flow' | 'Toll Delay';
  };
  waypoints: RouteWaypoint[];
  timeline: TrackingMilestone[];
  deliveryRecipient: {
    name: string;
    phone: string;
    verifiedAt?: string;
    collectedBy?: string;
  };
}

export interface AdminFleetStat {
  totalParcels: number;
  activeDeliveries: number;
  partnerBuses: number;
  connectedCities: number;
  avgEtaHours: number;
  onTimeRate: number;
  carbonReductionTons: number;
}
