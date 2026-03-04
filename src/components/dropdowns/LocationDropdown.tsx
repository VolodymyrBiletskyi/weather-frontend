import type { Coords } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState, useEffect } from "react";
import { useGetGeocode } from "@/hooks/useGetGeocode";

type LocationDropdownProps = {
  setCoords: (coords: Coords) => void;
};

export default function LocationDropdown({ setCoords }: LocationDropdownProps) {
  const [location, setLocation] = useState("Berlin");
  const { data } = useGetGeocode(location);
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
      <SelectContent position="popper" className="z-1002">
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
