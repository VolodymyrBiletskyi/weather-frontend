import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../Api";
import WeatherIcon from "../WeatherIcon";

export default function DailyForecast() {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 16 }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  return (
    <Card title="Daily Forecast" childrenClassname="flex flex-col gap-4">
      {data.daily.map((day) => (
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
