import { UseGetWeather } from "../../hooks/UseGetWeather";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type CurrentWeatherProps = {
  coords: Coords;
};

export default function CurrentWeather({ coords }: CurrentWeatherProps) {
  const { data, error } = UseGetWeather({
    lat: coords.lat,
    lon: coords.lon,
  });
  console.log(error);

  if (error) return <div>Error...</div>;

  return (
    <Card
      title="Current weather"
      childrenClassname="flex flex-col items-center gap-6 2xl:justify-between"
      className="md:pb-13"
    >
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-6xl font-semibold text-center">
          {Math.round(data?.current.temp ?? 0)}°C
        </h2>
        <WeatherIcon
          src={data?.current.weather[0].icon ?? ""}
          className="size-14"
        />
        <h3 className="capitalize text-xl">
          {data?.current.weather[0].description}
        </h3>
      </div>
      <div className="flex flex-col pag-2">
        <p className="text-xl text-center">Local Time:</p>
        <h3 className="text-4xl font-semibold">
          {new Intl.DateTimeFormat("en-PL", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: data?.timezone,
          }).format(new Date(data?.current.dt ?? 0 * 1000))}
        </h3>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Feels like</p>
          <p>{Math.round(data?.current.feels_like ?? 0)}°C</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Humidity</p>
          <p>{data?.current.humidity}%</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Wind</p>
          <p>{data?.current.wind_speed} kmh</p>
        </div>
      </div>
    </Card>
  );
}
