import Card from "./Card";
import { useGetWeather } from "../../hooks/UseGetWeather";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type HourlyForecastProps = {
  coords: Coords;
};

export default function HourlyForecast({ coords }: HourlyForecastProps) {
  const { data, isLoading, error } = useGetWeather({
    lat: coords.lat,
    lon: coords.lon,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <Card
      title="Hourly Forecast"
      childrenClassname="flex gap-6 overflow-x-scroll"
    >
      {data?.hourly.map((hour) => (
        <div className="flex flex-col gap-2 items-center p-2  ">
          <p className="whitespace-nowrap">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <WeatherIcon src={hour.weather[0].icon} />
          <p>{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </Card>
  );
}
