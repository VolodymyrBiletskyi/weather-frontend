import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import { AdditionalInfo } from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { Suspense, useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import MapLegend from "./components/MapLegend";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import DailySkeleton from "./components/skeletons/DailySkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import AdditionalInfoSkeleton from "./components/skeletons/AdditionalInfoSkeleton";
import SidePanel from "./components/SidePanel";
import Hamburger from "./assets/hamburger.svg?react";

function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 52, lon: 16 });
  const [mapType, setMapType] = useState("clouds_new");
  const [location, setLocation] = useState("Berlin");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  const onMapClick = (lat: number, lon: number) => {
    console.log("map-click", lat, lon);
    setCoords({ lat, lon });
    setLocation("custom");
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          <div className="flex gap-4">
            <h1 className="text-2xl font-semibold">Location:</h1>
            <LocationDropdown
              coords={coords}
              setCoords={setCoords}
              location={location}
              setLocation={setLocation}
            />
          </div>
          <div className="flex gap-4">
            <h1 className="text-2xl font-semibold">Map Type:</h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
          <button onClick={() => setIsSidePanelOpen(true)}>
            <Hamburger className="size-8 invert ml-auto"></Hamburger>
          </button>
        </div>
        <div className="relative">
          <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
          <MapLegend mapType={mapType} />
        </div>
        <Suspense fallback={<CurrentSkeleton />}>
          <CurrentWeather coords={coords} />
        </Suspense>
        <Suspense fallback={<HourlySkeleton />}>
          <HourlyForecast coords={coords} />
        </Suspense>
        <Suspense fallback={<DailySkeleton />}>
          <DailyForecast coords={coords} />
        </Suspense>
        <Suspense fallback={<AdditionalInfoSkeleton />}>
          <AdditionalInfo coords={coords} />
        </Suspense>
      </div>
      <SidePanel
        coords={coords}
        isSidePanelOpen={isSidePanelOpen}
        setIsSidePanelOpen={setIsSidePanelOpen}
      />
    </>
  );
}

export default App;
