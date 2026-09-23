/** 2018 IECC Table C405.3.2(1) — building area method (W/ft²) */
export const LPD_BUILDING: { type: string; wsf: number }[] = [
  { type: "Automotive facility", wsf: 0.8 },
  { type: "Convention center", wsf: 1.01 },
  { type: "Courthouse", wsf: 1.01 },
  { type: "Dining: bar lounge/leisure", wsf: 1.01 },
  { type: "Dining: cafeteria/fast food", wsf: 0.9 },
  { type: "Dining: family", wsf: 0.95 },
  { type: "Dormitory", wsf: 0.57 },
  { type: "Exercise center", wsf: 0.84 },
  { type: "Fire station", wsf: 0.67 },
  { type: "Gymnasium", wsf: 0.94 },
  { type: "Health care clinic", wsf: 0.9 },
  { type: "Hospital", wsf: 1.05 },
  { type: "Hotel/Motel", wsf: 0.88 },
  { type: "Library", wsf: 1.19 },
  { type: "Manufacturing facility", wsf: 1.17 },
  { type: "Motion picture theater", wsf: 0.76 },
  { type: "Multifamily", wsf: 0.51 },
  { type: "Museum", wsf: 1.02 },
  { type: "Office", wsf: 0.79 },
  { type: "Parking garage", wsf: 0.21 },
  { type: "Penitentiary", wsf: 0.81 },
  { type: "Performing arts theater", wsf: 1.18 },
  { type: "Police station", wsf: 0.87 },
  { type: "Post office", wsf: 0.87 },
  { type: "Religious building", wsf: 1.0 },
  { type: "Retail", wsf: 1.06 },
  { type: "School/university", wsf: 0.81 },
  { type: "Sports arena", wsf: 0.87 },
  { type: "Town hall", wsf: 0.89 },
  { type: "Transportation", wsf: 0.7 },
  { type: "Warehouse", wsf: 0.48 },
  { type: "Workshop", wsf: 1.14 },
];

/** 2018 IECC Table C405.3.2(2) — common space types (W/ft²) */
export const LPD_SPACE: { type: string; wsf: number }[] = [
  { type: "Audience seating area", wsf: 0.63 },
  { type: "Banking activity area", wsf: 1.01 },
  { type: "Classroom / lecture / training", wsf: 1.24 },
  { type: "Conference / meeting / multipurpose", wsf: 1.23 },
  { type: "Corridor / transition", wsf: 0.66 },
  { type: "Courtroom", wsf: 1.72 },
  { type: "Dining area", wsf: 0.65 },
  { type: "Electrical / mechanical", wsf: 0.43 },
  { type: "Food preparation", wsf: 1.21 },
  { type: "Guest room", wsf: 0.91 },
  { type: "Laboratory", wsf: 1.81 },
  { type: "Laundry / washing area", wsf: 0.6 },
  { type: "Lobby", wsf: 0.9 },
  { type: "Locker room", wsf: 0.75 },
  { type: "Lounge / breakroom", wsf: 0.73 },
  { type: "Office — enclosed", wsf: 1.11 },
  { type: "Office — open plan", wsf: 0.98 },
  { type: "Restroom", wsf: 0.98 },
  { type: "Sales area", wsf: 1.22 },
  { type: "Stairway", wsf: 0.69 },
  { type: "Storage", wsf: 0.63 },
  { type: "Workshop", wsf: 1.59 },
  { type: "Parking area, interior", wsf: 0.19 },
  { type: "Gymnasium / fitness center", wsf: 0.72 },
  { type: "Library", wsf: 1.06 },
  { type: "Patient room", wsf: 0.62 },
  { type: "Exam / treatment", wsf: 1.66 },
  { type: "Nurse station", wsf: 1.17 },
  { type: "Pharmacy", wsf: 1.68 },
  { type: "Retail dressing room", wsf: 0.71 },
  { type: "Warehouse — fine material", wsf: 1.19 },
  { type: "Warehouse — medium/bulky", wsf: 0.51 },
  { type: "Computer room", wsf: 1.71 },
  { type: "Copy / print room", wsf: 0.72 },
  { type: "Loading dock, interior", wsf: 0.47 },
  { type: "Museum restoration", wsf: 1.02 },
  { type: "Emergency vehicle garage", wsf: 0.56 },
  { type: "Confinement cells", wsf: 0.81 },
];

export type LightingZone = 0 | 1 | 2 | 3 | 4;

export const LIGHTING_ZONES: { id: LightingZone; label: string }[] = [
  { id: 0, label: "LZ0 Undeveloped" },
  { id: 1, label: "LZ1 Parks / rural" },
  { id: 2, label: "LZ2 Residential" },
  { id: 3, label: "LZ3 Commercial" },
  { id: 4, label: "LZ4 High activity" },
];

/** 2018 IECC Table C405.4.2(2) tradable surfaces — W/ft² or W/lf */
export const LPD_EXTERIOR: {
  surface: string;
  unit: "W/ft²" | "W/lf";
  values: Record<LightingZone, number | null>;
}[] = [
  {
    surface: "Uncovered parking areas",
    unit: "W/ft²",
    values: { 0: null, 1: 0.04, 2: 0.06, 3: 0.1, 4: 0.13 },
  },
  {
    surface: "Parking garage, interior",
    unit: "W/ft²",
    values: { 0: 0.14, 1: 0.14, 2: 0.14, 3: 0.14, 4: 0.14 },
  },
  {
    surface: "Walkways less than 10 ft wide",
    unit: "W/lf",
    values: { 0: null, 1: 0.7, 2: 0.7, 3: 0.8, 4: 1.0 },
  },
  {
    surface: "Walkways 10 ft wide or greater / plazas",
    unit: "W/ft²",
    values: { 0: null, 1: 0.14, 2: 0.14, 3: 0.16, 4: 0.2 },
  },
  {
    surface: "Stairways",
    unit: "W/ft²",
    values: { 0: null, 1: 0.75, 2: 1.0, 3: 1.0, 4: 1.0 },
  },
  {
    surface: "Pedestrian tunnels",
    unit: "W/ft²",
    values: { 0: 0.14, 1: 0.14, 2: 0.14, 3: 0.14, 4: 0.14 },
  },
  {
    surface: "Landscaping",
    unit: "W/ft²",
    values: { 0: null, 1: 0.04, 2: 0.05, 3: 0.05, 4: 0.05 },
  },
  {
    surface: "Entry canopies",
    unit: "W/ft²",
    values: { 0: null, 1: 0.25, 2: 0.25, 3: 0.4, 4: 0.4 },
  },
  {
    surface: "Loading areas for law enforcement / emergency",
    unit: "W/ft²",
    values: { 0: null, 1: 0.5, 2: 0.5, 3: 0.5, 4: 0.5 },
  },
];

export const LPD_EXTERIOR_BASE: Record<LightingZone, number> = {
  0: 0,
  1: 350,
  2: 400,
  3: 500,
  4: 900,
};
