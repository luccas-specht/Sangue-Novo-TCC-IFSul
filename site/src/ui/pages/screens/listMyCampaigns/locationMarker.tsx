import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

export const LocationMarker = () => {
  const [position, setPosition] = useState<any>(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e: any) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return (
    !!position && (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  );
};
