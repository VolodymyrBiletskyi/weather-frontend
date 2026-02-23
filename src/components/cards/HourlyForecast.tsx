import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../Api";
import WeatherIcon from "../WeatherIcon";

export default function HourlyForecast() {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 16 }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <Card
      title="Hourly Forecast"
      childrenClassname="flex gap-6 overflow-x-scroll"
    >
      {data.hourly.map((hour) => (
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
