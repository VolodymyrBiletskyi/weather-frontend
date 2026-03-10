import Card from "./Card";
import { UseGetWeather } from "../../hooks/UseGetWeather";
import Sunrise from "../../assets/sunrise.svg?react";
import Cloud from "../../assets/cloud.svg?react";
import Sunset from "../../assets/sunset.svg?react";
import Wind from "../../assets/wind.svg?react";
import Uv from "../../assets/uv.svg?react";
import Pressure from "../../assets/pressure.svg?react";
import UpArrow from "../../assets/up-arrow.svg?react";
import type { Coords } from "../../types";

type AdditionalInfoProps = {
  coords: Coords;
};

export function AdditionalInfo({ coords }: AdditionalInfoProps) {
  const { data, error } = UseGetWeather({
    lat: coords.lat,
    lon: coords.lon,
  });

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
            <FormatComponent value={value} number={data?.current[value] ?? 0} />
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
