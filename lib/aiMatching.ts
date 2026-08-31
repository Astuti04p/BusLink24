import { BusMatch, ParcelDetails, AIScoreBreakdown } from '@/types';
import { MOCK_BUSES } from './mockData';

export interface MatchingFactors {
  routeCompatibility: number; // 25%
  arrivalTime: number;        // 25%
  cargoAvailability: number;  // 15%
  costEfficiency: number;     // 15%
  trafficConditions: number;  // 10%
  operatorReliability: number;// 10%
}

export const AI_WEIGHTS = {
  routeCompatibility: 0.25,
  arrivalTime: 0.25,
  cargoAvailability: 0.15,
  costEfficiency: 0.15,
  trafficConditions: 0.10,
  operatorReliability: 0.10,
};

/**
 * Calculates a simulated AI score based on weighted logistics factors
 */
export function calculateAIScore(factors: MatchingFactors): { totalScore: number; breakdown: AIScoreBreakdown } {
  const weighted =
    factors.routeCompatibility * AI_WEIGHTS.routeCompatibility +
    factors.arrivalTime * AI_WEIGHTS.arrivalTime +
    factors.cargoAvailability * AI_WEIGHTS.cargoAvailability +
    factors.costEfficiency * AI_WEIGHTS.costEfficiency +
    factors.trafficConditions * AI_WEIGHTS.trafficConditions +
    factors.operatorReliability * AI_WEIGHTS.operatorReliability;

  const totalScore = Math.round(weighted);

  return {
    totalScore,
    breakdown: {
      routeCompatibility: factors.routeCompatibility,
      arrivalTime: factors.arrivalTime,
      cargoAvailability: factors.cargoAvailability,
      costEfficiency: factors.costEfficiency,
      trafficConditions: factors.trafficConditions,
      operatorReliability: factors.operatorReliability,
      weightedTotal: totalScore,
    },
  };
}

/**
 * Generates an AI explanation text tailored to the parcel & bus metrics
 */
export function generateAIExplanation(bus: BusMatch, parcel: ParcelDetails): string {
  if (bus.isAIRecommended) {
    return `AI Optimal Pick: Direct corridor route with optimal overnight transit time (${bus.duration}). With ${bus.availableCapacityKg} kg spare luggage bay capacity and a 98% on-time record, this bus is ideally suited for ${parcel.category.toLowerCase()} (${parcel.weightKg} kg).`;
  }
  if (bus.price < 260) {
    return `Maximum Cost Efficiency: Offers the lowest tariff (₹${bus.price}) with overnight arrival before morning business hours. Ideal for budget-conscious dispatches.`;
  }
  return `Balanced Schedule: Dependable operator with dedicated security compartment and ${bus.availableCapacityKg} kg available payload capacity.`;
}

/**
 * Main AI Matching function: Matches buses against user route & parcel specifications
 */
export function matchBusesForRoute(
  fromCity: string,
  toCity: string,
  fromTerminal: string,
  toTerminal: string,
  parcel: ParcelDetails
): BusMatch[] {
  // If demo route Delhi -> Patna, return enhanced mock buses
  return MOCK_BUSES.map((bus, idx) => {
    // Dynamic adjustments based on parcel weight & type
    let cargoFactor = 90;
    if (parcel.weightKg > 10) cargoFactor = 78;
    if (parcel.weightKg < 3) cargoFactor = 96;

    let costFactor = 90;
    if (bus.price <= 250) costFactor = 98;
    else if (bus.price > 300) costFactor = 80;

    let routeFactor = 95 - idx * 2;
    let arrivalFactor = 96 - idx * 5;
    let trafficFactor = 93 - idx * 3;
    let reliability = bus.reliabilityScore;

    const factors: MatchingFactors = {
      routeCompatibility: routeFactor,
      arrivalTime: arrivalFactor,
      cargoAvailability: cargoFactor,
      costEfficiency: costFactor,
      trafficConditions: trafficFactor,
      operatorReliability: reliability,
    };

    const { totalScore, breakdown } = calculateAIScore(factors);

    return {
      ...bus,
      from: fromCity || 'Delhi',
      to: toCity || 'Patna',
      fromTerminal: fromTerminal || bus.fromTerminal,
      toTerminal: toTerminal || bus.toTerminal,
      aiScore: totalScore,
      scoreBreakdown: breakdown,
      aiExplanation: generateAIExplanation(bus, parcel),
      isAIRecommended: idx === 0,
    };
  }).sort((a, b) => b.aiScore - a.aiScore);
}

export const AI_SCAN_STEPS = [
  { id: 1, label: 'Scanning active intercity bus corridor networks...', delayMs: 400 },
  { id: 2, label: 'Evaluating real-time cargo bay & luggage capacity...', delayMs: 700 },
  { id: 3, label: 'Checking route waypoints & direct expressway links...', delayMs: 1100 },
  { id: 4, label: 'Simulating highway traffic & toll congestion ETA...', delayMs: 1500 },
  { id: 5, label: 'Analyzing operator security & on-time reliability ratings...', delayMs: 1900 },
  { id: 6, label: 'Computing optimal dynamic freight tariffs for payload...', delayMs: 2300 },
];
