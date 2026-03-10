import Card from "./Card";
import { UseGetWeather } from "../../hooks/UseGetWeather";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";
type DailyForecastProps = {
  coords: Coords;
};

export default function DailyForecast({ coords }: DailyForecastProps) {
  const { data, error } = UseGetWeather({
    lat: coords.lat,
    lon: coords.lon,
  });

  if (error) return <div>Error...</div>;
  return (
    <Card title="Daily Forecast" childrenClassname="flex flex-col gap-4">
      {data?.daily.map((day) => (
        <div key={day.dt} className="flex justify-between">
          <p className="w-9">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
              weekday: "short",
            })}
          </p>
          <WeatherIcon src={day.weather[0].icon} />
          <p className="w-12">{Math.round(day.temp.day)}°C</p>
          <p className="w-12 text-grey-500/75">{Math.round(day.temp.min)}°C</p>
          <p className="w-12 text-grey-500/75">{Math.round(day.temp.max)}°C</p>
        </div>
      ))}
    </Card>
  );
}
