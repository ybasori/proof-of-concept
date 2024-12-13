import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useCallback } from "react";

const mapContainerStyle = {
  width: "100vh",
  height: "500px",
  backgroundColor: "red",
};

const center = {
  lat: 37.7749, // Center latitude
  lng: -122.4194, // Center longitude
};

const imageUrl =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/talkeetna.png"; // Image URL

function Overlay() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY, // Replace with your API key
  });

  const bounds = {
    north: 37.7799, // Northern latitude
    south: 37.7699, // Southern latitude
    east: -122.4094, // Eastern longitude
    west: -122.4294, // Western longitude
  };
  const onLoad = useCallback((map: google.maps.Map) => {
    const overlay = new window.google.maps.GroundOverlay(imageUrl, bounds);
    overlay.setMap(map); // Attach the overlay to the map
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={14} // Adjust the zoom level
      onLoad={onLoad} // Listen for zoom changes
    ></GoogleMap>
  ) : (
    <p>Loading...</p>
  );
}

export default Overlay;
