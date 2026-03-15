import Card from "./Card";
import { UseGetWeather } from "../../hooks/UseGetWeather";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type HourlyForecastProps = {
  coords: Coords;
};

export default function HourlyForecast({ coords }: HourlyForecastProps) {
  const { data, error } = UseGetWeather({
    lat: coords.lat,
    lon: coords.lon,
  });
  if (error) return <div>Error...</div>;

  return (
    <Card
      title="Hourly Forecast"
      childrenClassname="flex gap-6 overflow-x-scroll"
    >
      {data?.hourly.map((hour) => (
        <div
          key={hour.dt}
          className="flex flex-col 2xl:justify-between gap-2 items-center p-2  "
        >
          <p className="whitespace-nowrap 2xl:scale-110">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <WeatherIcon className="2xl:size-10" src={hour.weather[0].icon} />
          <p className=" 2xl:scale-110">{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </Card>
  );
}
