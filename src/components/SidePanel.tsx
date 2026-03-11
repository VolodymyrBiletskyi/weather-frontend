import { UseGetAirPollution } from "@/hooks/UseGetAirPollution";
import type { Coords } from "@/types";
import Card from "./cards/Card";
import { Slider } from "./ui/slider";
import { Suspense, type Dispatch, type SetStateAction } from "react";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Information from "../assets/info.svg?react";
import Chevron from "../assets/chevronLeft.svg?react";
import { SidePanelSkeleton } from "./skeletons/SidePanelSkeleton";
type SidePanelProps = {
  coords: Coords;
  isSidePanelOpen: boolean;
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SidePanel(props: SidePanelProps) {
  const { isSidePanelOpen, setIsSidePanelOpen } = props;
  return (
    <div
      className={clsx(
        "fixed top-0 right-0 h-screen w-80 shadow-md bg-sidebar z-1001 py-8 px-4 overflow-y-scroll transition-transform duration-300",
        isSidePanelOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <button onClick={() => setIsSidePanelOpen(false)}>
        <Chevron className="size-8 invert -ml-2"></Chevron>
      </button>
      <Suspense fallback={<SidePanelSkeleton />}>
        <AirPollution {...props} />
      </Suspense>
    </div>
  );
}

function AirPollution({ coords }: SidePanelProps) {
  const { data } = UseGetAirPollution({
    lat: coords.lat,
    lon: coords.lon,
  });

  return (
    <div className=" flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Air Pollution</h1>
      <h1 className="text-5xl font-semibold">{data.list[0].main.aqi}</h1>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">AQI</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Information className="size-4 invert max-w-xs" />
            </TooltipTrigger>
            <TooltipContent className="z-2000">
              <p>
                Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 =
                Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.{" "}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {Object.entries(data.list[0].components).map(([key, value]) => {
        const pollutant =
          airPollutionRanges[
            key.toUpperCase() as keyof typeof airPollutionRanges
          ];
        const max = Math.max(pollutant["Very Poor"].min, value);
        const currentLevel = (() => {
          for (const [level, range] of Object.entries(pollutant)) {
            if (value >= range.min && value <= range.max) return level;
          }
        })();
        const qualityColor = (() => {
          switch (currentLevel) {
            case "Good":
              return "bg-green-500";
            case "Fair":
              return "bg-yellow-500";
            case "Moderate":
              return "bg-orange-500";
            case "Poor":
              return "bg-red-500";
            case "Very Poor":
              return "bg-purple-500";
            default:
              return "bg-zinc-500";
          }
        })();
        return (
          <Card
            key={key}
            childrenClassname="flex flex-col gap-3"
            className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold capitalize">{key}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Information className="size-4 invert max-w-xs" />
                    </TooltipTrigger>
                    <TooltipContent className="z-2000">
                      <p>
                        Concentration of{" "}
                        {AirPollutantNames[key.toUpperCase() as AirPollutant]}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-lg font-semibold ">{value}</span>
            </div>
            <Slider min={0} max={max} value={[value]} disabled />
            <div className="flex justify-between text-xs">
              <p>0</p>
              <p>{max}</p>
            </div>
            <div className="flex justify-between">
              {Object.keys(pollutant).map((quality) => (
                <span
                  className={clsx(
                    "px-2 py-1 rounded-md text-xs font-medium",
                    quality === currentLevel
                      ? qualityColor
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {quality}
                </span>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

type AirQualityLevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";

type AirPollutant =
  | "SO2"
  | "NO2"
  | "PM10"
  | "PM2_5"
  | "O3"
  | "CO"
  | "NH3"
  | "NO";

interface PollutantRange {
  min: number;
  max: number;
}

type AirPollutionRanges = Record<
  AirPollutant,
  Record<AirQualityLevel, PollutantRange>
>;

const airPollutionRanges: AirPollutionRanges = {
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
const AirPollutantNames: Record<AirPollutant, string> = {
  SO2: "Sulfur Dioxide",
  NO2: "Nitrogen Dioxide",
  PM10: "Particulate Matter 10µm",
  PM2_5: "Particulate Matter 2.5µm",
  O3: "Ozone",
  CO: "Carbon Monoxide",
  NH3: "Ammonia",
  NO: "Nitrogen Monoxide",
};
