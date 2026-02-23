import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./Api";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import { AdditionalInfo } from "./components/cards/AdditionalInfo";

function App() {
  const { isLoading, error } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 16 }),
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <div className="flex flex-col gap-8">
      <CurrentWeather />
      <HourlyForecast />
      <DailyForecast />
      <AdditionalInfo />
    </div>
  );
}

export default App;
