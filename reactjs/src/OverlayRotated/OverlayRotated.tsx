import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "500px",
};

const center = {
  lat: -6.5263895,
  lng: 106.797796,
};

// Bounds of the image
const bounds = {
  north: -6.52632,
  south: -6.52644,
  east: 106.79785,
  west: 106.79775,
};

const RotatedOverlay: React.FC<{
  map: google.maps.Map;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  image: string;
  rotation: number;
}> = ({ map, bounds, image, rotation }) => {
  const overlayRef = useRef<any>(null);

  useEffect(() => {
    if (!map) return;

    class CustomOverlay extends window.google.maps.OverlayView {
      rotation: number;
      image: string;
      bounds: {
        north: number;
        south: number;
        east: number;
        west: number;
      };
      div?: HTMLDivElement;
      constructor(
        bounds: { north: number; south: number; east: number; west: number },
        image: string,
        rotation: number
      ) {
        super();
        this.bounds = bounds;
        this.image = image;
        this.rotation = rotation;
      }

      onAdd() {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.transform = `rotate(${this.rotation}deg)`; // Apply rotation
        div.style.transformOrigin = "center";
        div.innerHTML = `<img src="${this.image}" style="width:100%; height:100%;" />`;
        this.div = div;

        const panes = this.getPanes();
        panes?.overlayLayer.appendChild(div);
      }

      draw() {
        const overlayProjection = this.getProjection();
        const sw = overlayProjection.fromLatLngToDivPixel(
          new window.google.maps.LatLng(this.bounds.south, this.bounds.west)
        );
        const ne = overlayProjection.fromLatLngToDivPixel(
          new window.google.maps.LatLng(this.bounds.north, this.bounds.east)
        );

        if (this.div) {
          this.div.style.left = `${sw?.x}px`;
          this.div.style.top = `${ne?.y}px`;
          this.div.style.width = `${(ne?.x ?? 0) - (sw?.x ?? 0)}px`;
          this.div.style.height = `${(sw?.y ?? 0) - (ne?.y ?? 0)}px`;
        }
      }

      onRemove() {
        if (this.div) {
          this.div.parentNode?.removeChild(this.div);
          this.div = undefined;
        }
      }
    }
    const overlay = new CustomOverlay(bounds, image, rotation);
    overlay.setMap(map);

    overlayRef.current = overlay;

    return () => {
      if (overlayRef.current) {
        overlayRef.current.setMap(null);
        overlayRef.current = null;
      }
    };
  }, [map, bounds, image, rotation]);

  return null;
};

const OverlayRotated = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY, // Replace with your API key
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={20}
      onLoad={onLoad}
    >
      {map !== null ? (
        <RotatedOverlay
          map={map}
          bounds={bounds}
          image="https://via.placeholder.com/300" // Replace with your image URL
          rotation={45} // Rotation angle in degrees
        />
      ) : null}
    </GoogleMap>
  ) : (
    <p>Loading...</p>
  );
};

export default OverlayRotated;
