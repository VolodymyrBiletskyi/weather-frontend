import clsx from "clsx";

type WeatherIconProps = {
  src: string;
  className?: string;
};

export default function WeatherIcon({ src, className }: WeatherIconProps) {
  return (
    <img
      className={clsx("size-8", className)}
      src={`https://openweathermap.org/payload/api/media/file/${src}.png`}
      alt="Weather Icon"
    />
  );
}
