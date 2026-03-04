import type { Coords } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect } from "react";
import { useGetGeocode } from "@/hooks/UseGetGeocode";

type LocationDropdownProps = {
  setCoords: (coords: Coords) => void;
  coords: Coords;

  location: string;
  setLocation: (value: string) => void;
};

export default function LocationDropdown({
  setCoords,
  location,
  setLocation,
}: LocationDropdownProps) {
  const { data } = useGetGeocode(location, { enabled: location !== "custom" });
  console.log("hook location", data);

  useEffect(() => {
    if (!data?.[0]) return;

    setCoords({
      lat: data[0].lat,
      lon: data[0].lon,
    });
  }, [data]);

  return (
    <Select value={location} onValueChange={setLocation}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select city" />
      </SelectTrigger>
      <SelectContent position="popper" className="z-1001">
        {location === "custom" && (
          <SelectGroup>
            <SelectItem value="custom"> Custom</SelectItem>
          </SelectGroup>
        )}

        <SelectGroup>
          {locations.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const locations = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Dubai",
  "Singapore",
  "Sydney",
  "Berlin",
  "Toronto",
  "Los Angeles",
  "Donetsk",
];
