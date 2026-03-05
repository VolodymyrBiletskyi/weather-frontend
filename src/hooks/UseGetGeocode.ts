import { GeocodeSchema } from "@/schemas/GeocodeSchema";
import { useQuery } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_API_KEY;

export const useGetGeocode = (location:string,options?:{enabled:boolean}) => {
  return useQuery ({queryKey:["get-geocode", location],enabled:options?.enabled ?? true, queryFn: async ()=>{
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`);
    if(!res.ok){
      throw new Error(`OpenWeather error:${res.status}`); 
    }
  const data = await res.json()
  console.log(data)
  return GeocodeSchema.parse(data);
  console.log(data)
  }})
}