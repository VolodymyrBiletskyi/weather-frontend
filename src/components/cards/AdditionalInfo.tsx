import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../Api";

export function AdditionalInfo() {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 16 }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <Card
      title="Additional Weather Info"
      childrenClassname="flex flex-col gap-8 "
    >
      Additional Info
      {rows.map(({ label, value }) => (
        <div className="flex justify-between" key={value}>
          <span>{label}</span>
          <span>
            <FormatComponent value={value} number={data.current[value]} />
          </span>
        </div>
      ))}
    </Card>
  );
}

function FormatComponent({ value, number }: { value: string; number: number }) {
  if (value === "sunrise" || value === "sunset")
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return number;
}

const rows = [
  {
    label: "Cloudiness (%)",
    value: "clouds",
  },
  {
    label: "Sunrise",
    value: "sunrise",
  },
  {
    label: "Sunset",
    value: "sunset",
  },
  {
    label: "UV Index",
    value: "uvi",
  },
  {
    label: "Pressure (hPa)",
    value: "pressure",
  },
  {
    label: "Wind Direction (°)",
    value: "wind_deg",
  },
] as const;
