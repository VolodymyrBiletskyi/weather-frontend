import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../Api";
import Sunrise from "/src/assets/sunrise.svg?react";
import Cloud from "/src/assets/cloud.svg?react";
import Sunset from "/src/assets/sunset.svg?react";
import Wind from "/src/assets/wind.svg?react";
import Uv from "/src/assets/uv.svg?react";
import Pressure from "/src/assets/pressure.svg?react";
import UpArrow from "/src/assets/up-arrow.svg?react";
import type { Coords } from "../../types";

type AdditionalInfoProps = {
  coords: Coords;
};

export function AdditionalInfo({ coords }: AdditionalInfoProps) {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <Card
      title="Additional Weather Info"
      childrenClassname="flex flex-col gap-8 "
    >
      Additional Info
      {rows.map(({ label, value, Icon }) => (
        <div className="flex justify-between" key={value}>
          <div className="flex gap-4">
            <span className="text-gray-500">{label}</span>
            <Icon className="size-8 invert" />
          </div>
          <span>
            <FormatComponent value={value} number={data.current[value]} />
          </span>
        </div>
      ))}
    </Card>
  );
}

function FormatComponent({ value, number }: { value: string; number: number }) {
  if (value === "sunrise" || value === "sunset")
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  if (value === "wind_deg")
    return (
      <UpArrow
        className="size-8 invert"
        style={{ transform: `rotate(${number}deg)` }}
      />
    );
  return number;
}

const rows = [
  {
    label: "Sunrise",
    value: "sunrise",
    Icon: Sunrise,
  },
  {
    label: "Sunset",
    value: "sunset",
    Icon: Sunset,
  },

  {
    label: "Cloudiness (%)",
    value: "clouds",
    Icon: Cloud,
  },

  {
    label: "UV Index",
    value: "uvi",
    Icon: Uv,
  },
  {
    label: "Pressure (hPa)",
    value: "pressure",
    Icon: Pressure,
  },
  {
    label: "Wind Direction (°)",
    value: "wind_deg",
    Icon: Wind,
  },
] as const;
