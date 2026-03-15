export type AirQualityLevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";

export type AirPollutant =
  | "SO2"
  | "NO2"
  | "PM10"
  | "PM2_5"
  | "O3"
  | "CO"
  | "NH3"
  | "NO";

export interface PollutantRange {
  min: number;
  max: number;
}

export type AirPollutionRanges = Record<
  AirPollutant,
  Record<AirQualityLevel, PollutantRange>
>;

export const airPollutionRanges: AirPollutionRanges = {
  SO2: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 80 },
    Moderate: { min: 80, max: 250 },
    Poor: { min: 250, max: 350 },
    "Very Poor": { min: 350, max: Infinity },
  },
  NO2: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: Infinity },
  },
  PM10: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 50 },
    Moderate: { min: 50, max: 100 },
    Poor: { min: 100, max: 200 },
    "Very Poor": { min: 200, max: Infinity },
  },
  PM2_5: {
    Good: { min: 0, max: 10 },
    Fair: { min: 10, max: 25 },
    Moderate: { min: 25, max: 50 },
    Poor: { min: 50, max: 75 },
    "Very Poor": { min: 75, max: Infinity },
  },
  O3: {
    Good: { min: 0, max: 60 },
    Fair: { min: 60, max: 100 },
    Moderate: { min: 100, max: 140 },
    Poor: { min: 140, max: 180 },
    "Very Poor": { min: 180, max: Infinity },
  },
  CO: {
    Good: { min: 0, max: 4400 },
    Fair: { min: 4400, max: 9400 },
    Moderate: { min: 9400, max: 12400 },
    Poor: { min: 12400, max: 15400 },
    "Very Poor": { min: 15400, max: Infinity },
  },
  NH3: {
    Good: { min: 0.1, max: 200 },
    Fair: { min: 0.1, max: 200 },
    Moderate: { min: 0.1, max: 200 },
    Poor: { min: 0.1, max: 200 },
    "Very Poor": { min: 0.1, max: 200 },
  },
  NO: {
    Good: { min: 0.1, max: 100 },
    Fair: { min: 0.1, max: 100 },
    Moderate: { min: 0.1, max: 100 },
    Poor: { min: 0.1, max: 100 },
    "Very Poor": { min: 0.1, max: 100 },
  },
};

export const airPollutantNames: Record<AirPollutant, string> = {
  SO2: "Sulfur Dioxide",
  NO2: "Nitrogen Dioxide",
  PM10: "Particulate Matter 10µm",
  PM2_5: "Particulate Matter 2.5µm",
  O3: "Ozone",
  CO: "Carbon Monoxide",
  NH3: "Ammonia",
  NO: "Nitrogen Monoxide",
};