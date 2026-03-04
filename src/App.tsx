import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import { AdditionalInfo } from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";

function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 52, lon: 16 });

  const onMapClick = (lat: number, lon: number) => {
    console.log("map-click", lat, lon);
    setCoords({ lat, lon });
  };

  return (
    <div className="flex flex-col gap-8">
      <LocationDropdown setCoords={setCoords} />
      <Map coords={coords} onMapClick={onMapClick} />
      <CurrentWeather coords={coords} />
      <HourlyForecast coords={coords} />
      <DailyForecast coords={coords} />
      <AdditionalInfo coords={coords} />
    </div>
  );
}

export default App;
