import { useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const geo = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [106.79835319519044, -6.2206173349704255],
            [106.79820299148561, -6.214836512725231],
            [106.80708646774293, -6.21289533676417],
            [106.81169986724854, -6.219785412436631],
            [106.80479049682619, -6.224606278568463],
            [106.8031167984009, -6.222430494905031],
            [106.79835319519044, -6.2206173349704255],
          ],
        ],
      },
    },
  ],
};

const mapContainerStyle = {
  width: "100vh",
  height: "500px",
  backgroundColor: "red",
};

const DataLayers: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    mapInstance.data.addGeoJson(geo);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={{ lat: -6.2206173349704255, lng: 106.79835319519044 }}
      zoom={15}
      onLoad={onLoad} // Save map instance when it's loaded
    />
  ) : (
    <></>
  );
};

export default DataLayers;
