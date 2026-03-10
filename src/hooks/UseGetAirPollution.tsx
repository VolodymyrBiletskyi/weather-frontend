import { AirPollutionSchema } from "@/schemas/AIrPollutionSchema";
import { useSuspenseQuery } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_API_KEY;

export const UseGetAirPollution = ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  return useSuspenseQuery({
    queryKey: ["coords", lat, lon],
    queryFn: async () => {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
      );
      if (!res.ok) {
        throw new Error(`OpenWeather error:${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      return AirPollutionSchema.parse(data);
    },
  });
};
