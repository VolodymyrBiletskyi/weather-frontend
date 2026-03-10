import { WeatherSchema } from "@/schemas/WeatherSchema";
import { useSuspenseQuery } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_API_KEY;

export  const UseGetWeather = ({lat, lon}:{lat:number, lon:number}) => {
  return useSuspenseQuery ({queryKey:["get-weather", lat,lon], queryFn: async ()=>{
    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`);
    if(!res.ok){
      throw new Error(`OpenWeather error:${res.status}`); 
    }
  const data = await res.json()
  console.log(data)
  return WeatherSchema.parse(data);
  }})
}

