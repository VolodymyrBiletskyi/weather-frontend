import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Coords } from "../types";

type MapProps = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
};

export default function Map({ coords, onMapClick }: MapProps) {
  const { lat, lon } = coords;
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      style={{ height: "500px", width: "700" }}
    >
      <MapClick onMapClick={onMapClick} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
}

function MapClick({
  onMapClick,
}: {
  onMapClick: (lat: number, lon: number) => void;
}) {
  const map = useMap();

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    map.panTo([lat, lng]);
    onMapClick(lat, lng);
  });
  return null;
}
