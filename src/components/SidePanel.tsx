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
import {
  airPollutantNames,
  airPollutionRanges,
  type AirPollutant,
} from "./utils/AirPollution";
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
        "fixed top-0 right-0 h-screen w-(--sidebar-width) shadow-md bg-sidebar z-1001 py-8 px-4 overflow-y-scroll transition-transform duration-300 lg:translate-x-0!",
        isSidePanelOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <button onClick={() => setIsSidePanelOpen(false)}>
        <Chevron className="size-8 invert -ml-2 lg:hidden"></Chevron>
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
                        {airPollutantNames[key.toUpperCase() as AirPollutant]}
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
                  key={quality}
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
