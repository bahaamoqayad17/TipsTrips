import { useState } from "react";
import Box from "@mui/material/Box";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

export default function Map() {
  const [marker, setMarker] = useState({ lat: 24.774265, lng: 46.738586 });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBc_apivYfmai_4HI10_VfoWt6LGer-YKs",
  });

  const handleMapClick = (event) => {
    const { latLng } = event;
    const newMarker = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    };
    setMarker(newMarker);
  };

  return (
    <>
      <Box sx={{ height: 600, width: "100%" }}>
        {isLoaded && (
          <Box width="100%" height="100%">
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "100%",
              }}
              center={{ lat: 24.774265, lng: 46.738586 }}
              zoom={5.5}
              onClick={handleMapClick}
            >
              <Marker position={{ lat: marker.lat, lng: marker.lng }} />
            </GoogleMap>
          </Box>
        )}
      </Box>
    </>
  );
}
