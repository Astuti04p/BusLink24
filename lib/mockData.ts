import { City, BusMatch, ActiveDelivery, AdminFleetStat } from '@/types';

export const CITIES: City[] = [
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'Delhi NCR',
    coords: { x: 280, y: 180, lat: 28.6139, lng: 77.2090 },
    terminals: [
      { id: 'del-isbt', name: 'ISBT Kashmere Gate', address: 'Inter State Bus Terminal, Kashmere Gate', isHub: true },
      { id: 'del-anand', name: 'Anand Vihar ISBT', address: 'East Delhi Bus Terminal, Anand Vihar', isHub: true },
      { id: 'del-sarai', name: 'Sarai Kale Khan ISBT', address: 'South East Delhi Terminal, Ring Road' },
      { id: 'del-dhaula', name: 'Dhaula Kuan Hub', address: 'South West Transit Station' }
    ]
  },
  {
    id: 'patna',
    name: 'Patna',
    state: 'Bihar',
    coords: { x: 620, y: 310, lat: 25.5941, lng: 85.1376 },
    terminals: [
      { id: 'pat-main', name: 'Patna Bus Terminal (Bairiya)', address: 'Patliputra ISBT, Bairiya, Patna', isHub: true },
      { id: 'pat-mithapur', name: 'Mithapur Bus Stand', address: 'Old Mithapur Terminal Road' },
      { id: 'pat-gandhi', name: 'Gandhi Maidan Bus Depo', address: 'Central Patna Transit Node' }
    ]
  },
  {
    id: 'lucknow',
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    coords: { x: 440, y: 240, lat: 26.8467, lng: 80.9462 },
    terminals: [
      { id: 'luc-alambagh', name: 'Alambagh ISBT Terminal', address: 'Kanpur Road, Alambagh', isHub: true },
      { id: 'luc-kaisarbagh', name: 'Kaisarbagh Bus Stand', address: 'Central Lucknow Terminal' },
      { id: 'luc-charbagh', name: 'Charbagh Station Hub', address: 'Near Northern Railway Station' }
    ]
  },
  {
    id: 'kanpur',
    name: 'Kanpur',
    state: 'Uttar Pradesh',
    coords: { x: 400, y: 260, lat: 26.4499, lng: 80.3319 },
    terminals: [
      { id: 'kan-jhakarkati', name: 'Jhakarkati Bus Station', address: 'GT Road, Collectorganj', isHub: true },
      { id: 'kan-chunniganj', name: 'Chunniganj Bus Depot', address: 'Civil Lines, Kanpur' }
    ]
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    coords: { x: 230, y: 230, lat: 26.9124, lng: 75.7873 },
    terminals: [
      { id: 'jai-sindhi', name: 'Sindhi Camp Central Bus Stand', address: 'Station Road, Jaipur', isHub: true },
      { id: 'jai-narayan', name: 'Narayan Singh Circle', address: 'Tonk Road Hub' }
    ]
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    coords: { x: 180, y: 550, lat: 19.0760, lng: 72.8777 },
    terminals: [
      { id: 'mum-borivali', name: 'Borivali West Nancy Colony Hub', address: 'Western Express Highway', isHub: true },
      { id: 'mum-dadar', name: 'Dadar Asiad Bus Stand', address: 'Dadar TT Circle' },
      { id: 'mum-vashi', name: 'Vashi Highway Transit Plaza', address: 'Sion-Panvel Expressway' }
    ]
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    coords: { x: 230, y: 590, lat: 18.5204, lng: 73.8567 },
    terminals: [
      { id: 'pun-swargate', name: 'Swargate Bus Station', address: 'Jedhe Chowk, Swargate', isHub: true },
      { id: 'pun-shivajinagar', name: 'Shivajinagar Bus Stand', address: 'Old Pune-Mumbai Highway' },
      { id: 'pun-wakad', name: 'Wakad Bridge Transit Hub', address: 'Mumbai-Pune Bypass Road' }
    ]
  },
  {
    id: 'bangalore',
    name: 'Bangalore',
    state: 'Karnataka',
    coords: { x: 300, y: 780, lat: 12.9716, lng: 77.5946 },
    terminals: [
      { id: 'blr-majestic', name: 'Kempegowda Majestic Bus Station', address: 'Majestic City Hub', isHub: true },
      { id: 'blr-madiwala', name: 'Madiwala Private Transit Stand', address: 'Hosur Main Road' },
      { id: 'blr-satellite', name: 'Mysore Road Satellite Station', address: 'Satellite Bus Terminal' }
    ]
  },
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    coords: { x: 420, y: 790, lat: 13.0827, lng: 80.2707 },
    terminals: [
      { id: 'chn-cmbt', name: 'CMBT Koyambedu Bus Terminus', address: 'Inner Ring Road, Koyambedu', isHub: true },
      { id: 'chn-kilambakkam', name: 'KCBT Kilambakkam Modern Terminal', address: 'GST Road, Vandalur' }
    ]
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    coords: { x: 530, y: 300, lat: 25.3176, lng: 82.9739 },
    terminals: [
      { id: 'var-cantt', name: 'Varanasi Cantt Bus Stand', address: 'Near Varanasi Junction', isHub: true }
    ]
  }
];

export const MOCK_BUSES: BusMatch[] = [
  {
    id: 'bus-swift-204',
    operator: 'Swift Travels',
    busNumber: 'DL-01-AB-2024',
    busType: 'Volvo Multi-Axle AC Sleeper (2+1)',
    from: 'Delhi',
    to: 'Patna',
    fromTerminal: 'ISBT Kashmere Gate',
    toTerminal: 'Patna Bus Terminal (Bairiya)',
    departureTime: '08:30 PM',
    arrivalTime: '06:45 AM',
    duration: '10h 15m',
    price: 299,
    originalPrice: 450,
    totalCapacityKg: 120,
    usedCapacityKg: 72,
    availableCapacityKg: 48,
    cargoStatus: 'High',
    reliabilityScore: 98,
    aiScore: 96,
    isAIRecommended: true,
    trafficStatus: 'Optimal',
    driverName: 'Vikram Singh (Verified Captain)',
    driverPhone: '+91 98765 43210',
    features: ['Dedicated Secured Luggage Bay', 'GPS Live Monitored', 'Express Non-Stop Corridor', 'Zero Luggage Transfer Delay'],
    scoreBreakdown: {
      routeCompatibility: 98,
      arrivalTime: 95,
      cargoAvailability: 94,
      costEfficiency: 91,
      trafficConditions: 93,
      operatorReliability: 96,
      weightedTotal: 96
    },
    aiExplanation: 'Top recommendation: Direct expressway corridor route through Yamuna & Purvanchal expressways ensures optimal overnight transit with 48 kg remaining cargo headroom and 98% on-time arrival rate.'
  },
  {
    id: 'bus-north-301',
    operator: 'North India Express',
    busNumber: 'UP-32-NX-8821',
    busType: 'BharatBenz Executive Seater & Sleeper',
    from: 'Delhi',
    to: 'Patna',
    fromTerminal: 'Anand Vihar ISBT',
    toTerminal: 'Patna Bus Terminal (Bairiya)',
    departureTime: '09:15 PM',
    arrivalTime: '08:30 AM',
    duration: '11h 15m',
    price: 269,
    originalPrice: 380,
    totalCapacityKg: 100,
    usedCapacityKg: 68,
    availableCapacityKg: 32,
    cargoStatus: 'Moderate',
    reliabilityScore: 92,
    aiScore: 91,
    trafficStatus: 'Moderate',
    driverName: 'Rajesh Kumar',
    driverPhone: '+91 98111 22334',
    features: ['Luggage Lock Compartment', 'Anand Vihar Direct Hub', 'Live Geo-Tagging'],
    scoreBreakdown: {
      routeCompatibility: 94,
      arrivalTime: 88,
      cargoAvailability: 89,
      costEfficiency: 95,
      trafficConditions: 87,
      operatorReliability: 92,
      weightedTotal: 91
    },
    aiExplanation: 'Budget-friendly alternative departing 45 minutes later from Anand Vihar ISBT with solid cargo clearance and dependable transit timing.'
  },
  {
    id: 'bus-bihar-109',
    operator: 'Bihar Connect',
    busNumber: 'BR-01-BC-5541',
    busType: 'Scania AC Sleeper Premium',
    from: 'Delhi',
    to: 'Patna',
    fromTerminal: 'ISBT Kashmere Gate',
    toTerminal: 'Mithapur Bus Stand',
    departureTime: '10:00 PM',
    arrivalTime: '09:20 AM',
    duration: '11h 20m',
    price: 249,
    originalPrice: 350,
    totalCapacityKg: 110,
    usedCapacityKg: 85,
    availableCapacityKg: 25,
    cargoStatus: 'Limited',
    reliabilityScore: 88,
    aiScore: 87,
    trafficStatus: 'Optimal',
    driverName: 'Amit Verma',
    driverPhone: '+91 97722 33445',
    features: ['Economical Parcel Rate', 'Kashmere Gate Gate 4 Drop', 'QR Label Seal'],
    scoreBreakdown: {
      routeCompatibility: 90,
      arrivalTime: 84,
      cargoAvailability: 80,
      costEfficiency: 98,
      trafficConditions: 90,
      operatorReliability: 88,
      weightedTotal: 87
    },
    aiExplanation: 'Lowest price point available with late 10:00 PM departure, ideal for end-of-day dispatches with arrival before business hours.'
  },
  {
    id: 'bus-zing-505',
    operator: 'ZingBus Prime',
    busNumber: 'HR-26-ZB-9901',
    busType: 'Mercedes SuperClass Sleeper',
    from: 'Delhi',
    to: 'Patna',
    fromTerminal: 'ISBT Kashmere Gate',
    toTerminal: 'Patna Bus Terminal (Bairiya)',
    departureTime: '07:45 PM',
    arrivalTime: '06:15 AM',
    duration: '10h 30m',
    price: 330,
    originalPrice: 500,
    totalCapacityKg: 90,
    usedCapacityKg: 40,
    availableCapacityKg: 50,
    cargoStatus: 'High',
    reliabilityScore: 95,
    aiScore: 89,
    trafficStatus: 'Optimal',
    driverName: 'Sanjay Rawat',
    driverPhone: '+91 99887 76655',
    features: ['Climate Controlled Cargo Section', 'Express Dispatch', 'Digital Weight Sensor'],
    scoreBreakdown: {
      routeCompatibility: 96,
      arrivalTime: 96,
      cargoAvailability: 92,
      costEfficiency: 79,
      trafficConditions: 94,
      operatorReliability: 95,
      weightedTotal: 89
    },
    aiExplanation: 'Premium option with highest cargo headroom and temperature controlled bay, suited for sensitive goods.'
  }
];

export const DEMO_DEFAULT_DELIVERY: ActiveDelivery = {
  parcelId: 'BL24-DEL-PAT-10234',
  bookingTime: '08:12 PM, Today',
  route: {
    from: 'Delhi',
    to: 'Patna',
    fromTerminal: 'ISBT Kashmere Gate',
    toTerminal: 'Patna Bus Terminal (Bairiya)',
    distanceTotalKm: 1045,
  },
  parcel: {
    category: 'Documents',
    weightKg: 2,
    dimensions: { length: 20, width: 15, height: 10 },
    declaredValue: 2000,
    isFragile: false,
    senderName: 'Astuti Pandey',
    senderPhone: '+91 98765 12345',
    receiverName: 'Rahul Sharma',
    receiverPhone: '+91 98123 45678',
    specialInstructions: 'Critical legal agreement documents. Hand over to receiver only after OTP match.'
  },
  bus: MOCK_BUSES[0],
  price: 299,
  status: 'In Transit',
  otp: '482917',
  currentLocation: {
    name: 'Purvanchal Highway Expressway KM 142',
    nearCity: 'Near Lucknow / Sultanpur Bypass',
    speedKmh: 68,
    distanceRemainingKm: 285,
    etaRemaining: '3h 20m',
    progressPercentage: 72,
    trafficCondition: 'Clear Highway'
  },
  waypoints: [
    { name: 'Delhi ISBT', state: 'Delhi', eta: '08:30 PM (Departed)', status: 'passed', distanceFromStartKm: 0, coordinates: { x: 15, y: 30 } },
    { name: 'Agra Toll Plaza', state: 'UP', eta: '11:45 PM (Passed)', status: 'passed', distanceFromStartKm: 240, coordinates: { x: 35, y: 45 } },
    { name: 'Kanpur Bypass', state: 'UP', eta: '02:30 AM (Passed)', status: 'passed', distanceFromStartKm: 490, coordinates: { x: 55, y: 55 } },
    { name: 'Lucknow Ring Hub', state: 'UP', eta: '04:10 AM (Passed)', status: 'passed', distanceFromStartKm: 580, coordinates: { x: 68, y: 60 } },
    { name: 'Current (Near Sultanpur)', state: 'UP', eta: 'Live (68 km/h)', status: 'current', distanceFromStartKm: 760, coordinates: { x: 76, y: 68 } },
    { name: 'Buxar Checkpoint', state: 'Bihar', eta: '05:40 AM', status: 'upcoming', distanceFromStartKm: 920, coordinates: { x: 88, y: 78 } },
    { name: 'Patna Terminal (Bairiya)', state: 'Bihar', eta: '06:45 AM', status: 'upcoming', distanceFromStartKm: 1045, coordinates: { x: 100, y: 85 } }
  ],
  timeline: [
    { id: '1', title: 'Booking Confirmed & Digital Bay Reserved', time: '08:12 PM', location: 'BusLink 24 App', status: 'completed', description: 'Smart locker bay BL-Bay-04 reserved on Swift Travels Bus DL-01-AB-2024' },
    { id: '2', title: 'Parcel Handed Over & Security Tagged', time: '08:20 PM', location: 'ISBT Kashmere Gate Gate #3', status: 'completed', description: 'Agent verified tamper-evident security barcode #BL24-99104' },
    { id: '3', title: 'Parcel Stowed in Secured Bay', time: '08:25 PM', location: 'Bus Luggage Compartment A-2', status: 'completed', description: 'Cargo sensor confirmed 2.0 kg payload logged' },
    { id: '4', title: 'Bus Departed Delhi Hub', time: '08:30 PM', location: 'Delhi ISBT Kashmere Gate', status: 'completed', description: 'On-schedule departure via Yamuna Expressway' },
    { id: '5', title: 'Currently In Transit', time: '03:25 AM (Live)', location: 'Purvanchal Highway, Near Lucknow Corridor', status: 'current', description: 'Smooth moving at 68 km/h • 285 km remaining to Patna' },
    { id: '6', title: 'Arrival at Patna Bus Terminal', time: 'Est. 06:45 AM', location: 'Patna Bus Terminal (Bairiya)', status: 'upcoming', description: 'Bus will dock at Bay 12 for parcel unload' },
    { id: '7', title: 'Ready for Collection', time: 'Est. 06:50 AM', location: 'BusLink 24 Station Desk Patna', status: 'upcoming', description: 'Receiver receives SMS notification with OTP prompt' },
    { id: '8', title: 'Delivered via OTP Verification', time: 'Pending Receiver', location: 'Patna Bus Terminal', status: 'upcoming', description: 'Receiver presents OTP 482917 or scans Parcel QR code' }
  ],
  deliveryRecipient: {
    name: 'Rahul Sharma',
    phone: '+91 98123 45678'
  }
};

export const MOCK_RECENT_DELIVERIES = [
  {
    parcelId: 'BL24-DEL-PAT-10234',
    route: 'Delhi ➔ Patna',
    date: 'Today, 8:12 PM',
    status: 'In Transit',
    category: 'Documents',
    weight: '2.0 kg',
    price: 299,
    busOperator: 'Swift Travels',
    eta: '3h 20m'
  },
  {
    parcelId: 'BL24-DEL-LKO-10221',
    route: 'Delhi ➔ Lucknow',
    date: 'Yesterday, Aug 29',
    status: 'Delivered',
    category: 'Electronics',
    weight: '1.5 kg',
    price: 249,
    busOperator: 'North India Express',
    eta: 'Completed (8h 40m)'
  },
  {
    parcelId: 'BL24-JAI-DEL-10204',
    route: 'Jaipur ➔ Delhi',
    date: 'Aug 26, 2024',
    status: 'Delivered',
    category: 'Clothing',
    weight: '4.2 kg',
    price: 199,
    busOperator: 'Royal Star Sleeper',
    eta: 'Completed (5h 15m)'
  },
  {
    parcelId: 'BL24-MUM-PUN-09941',
    route: 'Mumbai ➔ Pune',
    date: 'Aug 24, 2024',
    status: 'Delivered',
    category: 'Small Package',
    weight: '3.0 kg',
    price: 149,
    busOperator: 'CityRide Luxury',
    eta: 'Completed (3h 30m)'
  },
  {
    parcelId: 'BL24-BLR-CHN-09882',
    route: 'Bangalore ➔ Chennai',
    date: 'Aug 21, 2024',
    status: 'Delivered',
    category: 'Documents',
    weight: '0.8 kg',
    price: 189,
    busOperator: 'RoadLink Express',
    eta: 'Completed (6h 10m)'
  }
];

export const MOCK_ADMIN_STATS: AdminFleetStat = {
  totalParcels: 1284,
  activeDeliveries: 87,
  partnerBuses: 246,
  connectedCities: 42,
  avgEtaHours: 11.4,
  onTimeRate: 98.4,
  carbonReductionTons: 14.8
};

export const MOCK_ADMIN_CHARTS = {
  deliveriesOverTime: [
    { time: 'Day 1', deliveries: 94, revenue: 26320 },
    { time: 'Day 2', deliveries: 128, revenue: 35840 },
    { time: 'Day 3', deliveries: 165, revenue: 47850 },
    { time: 'Day 4', deliveries: 210, revenue: 60900 },
    { time: 'Day 5', deliveries: 245, revenue: 71050 },
    { time: 'Day 6', deliveries: 312, revenue: 90480 },
    { time: 'Day 7', deliveries: 382, revenue: 110780 }
  ],
  popularRoutes: [
    { route: 'Delhi ➔ Patna', count: 412, capacityAvg: '82%' },
    { route: 'Delhi ➔ Lucknow', count: 328, capacityAvg: '76%' },
    { route: 'Delhi ➔ Jaipur', count: 284, capacityAvg: '68%' },
    { route: 'Mumbai ➔ Pune', count: 240, capacityAvg: '89%' },
    { route: 'Bangalore ➔ Chennai', count: 195, capacityAvg: '74%' }
  ],
  categories: [
    { name: 'Documents', value: 480, color: '#e11d48' },
    { name: 'Electronics', value: 340, color: '#3b82f6' },
    { name: 'Clothing', value: 260, color: '#10b981' },
    { name: 'Small Package', value: 134, color: '#f59e0b' },
    { name: 'Food/Perishables', value: 70, color: '#8b5cf6' }
  ],
  busCapacityFleet: [
    { busName: 'Swift Travels (DL-01-AB-2024)', route: 'Delhi ➔ Patna', capacity: 100, used: 62, available: 38, pct: 62 },
    { busName: 'North India Express (UP-32-NX-8821)', route: 'Delhi ➔ Patna', capacity: 100, used: 68, available: 32, pct: 68 },
    { busName: 'Bihar Connect (BR-01-BC-5541)', route: 'Delhi ➔ Patna', capacity: 110, used: 85, available: 25, pct: 77 },
    { busName: 'ZingBus Prime (HR-26-ZB-9901)', route: 'Delhi ➔ Lucknow', capacity: 90, used: 40, available: 50, pct: 44 },
    { busName: 'Royal Star Sleeper (RJ-14-RS-4412)', route: 'Jaipur ➔ Delhi', capacity: 120, used: 92, available: 28, pct: 76 },
    { busName: 'CityRide Luxury (MH-04-CR-1102)', route: 'Mumbai ➔ Pune', capacity: 80, used: 71, available: 9, pct: 88 }
  ]
};
