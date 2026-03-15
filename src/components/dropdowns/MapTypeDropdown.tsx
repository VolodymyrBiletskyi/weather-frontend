import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { Dispatch, SetStateAction } from "react";

type MapDropdownProps = {
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
};

export default function MapTypeDropdown({
  mapType,
  setMapType,
}: MapDropdownProps) {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="w-full xs: w-[180px]">
        <SelectValue placeholder="Map layer" />
      </SelectTrigger>
      <SelectContent position="popper" className="z-1001">
        <SelectGroup>
          {mapTypes.map((city) => (
            <SelectItem key={city} value={city} className="capitalize">
              {city.split("_")[0]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const mapTypes = [
  "clouds_new",
  "precipitation_new",
  "pressure_new",
  "wind_new",
  "temp_new",
];
