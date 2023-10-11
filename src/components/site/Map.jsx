import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";

export default function Map() {
  const [markers, setMarkers] = useState([
    { lat: 24.774265, lng: 46.738586, name: "place 1" },
    { lat: 22.704265, lng: 42.038586, name: "place 2" },
    { lat: 27.704265, lng: 42.038586, name: "place 3" },
  ]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBc_apivYfmai_4HI10_VfoWt6LGer-YKs", // Replace with your Google Maps API key
    // libraries: ["places"], // Include the Places library
  });

  // useEffect(() => {
  //   if (isLoaded) {
  //     const placesService = new window.google.maps.places.PlacesService(
  //       document.createElement("div")
  //     );

  //     const getPlaceName = async (marker) => {
  //       try {
  //         const response = await new Promise((resolve, reject) => {
  //           placesService.geocode(
  //             {
  //               location: marker,
  //             },
  //             (results, status) => {
  //               if (status === window.google.maps.GeocoderStatus.OK) {
  //                 resolve(results[0]);
  //               } else {
  //                 reject(status);
  //               }
  //             }
  //           );
  //         });

  //         return response.formatted_address;
  //       } catch (error) {
  //         console.error("Error fetching place name:", error);
  //         return "Unknown Place"; // Fallback in case of an error
  //       }
  //     };

  //     if (selectedMarker) {
  //       getPlaceName(selectedMarker).then((placeName) => {
  //         setSelectedMarker({ ...selectedMarker, name: placeName });
  //       });
  //     }
  //   }
  // }, [isLoaded, selectedMarker]);

  return (
    <>
      <Box sx={{ height: 600, width: "100%" }}>
        {isLoaded && !loadError && (
          <Box width="100%" height="100%">
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "100%",
              }}
              center={
                markers.length > 0
                  ? markers[0]
                  : { lat: 24.774265, lng: 46.738586 }
              }
              zoom={5.5}
            >
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={marker}
                  onClick={() => setSelectedMarker(marker)}
                />
              ))}
              {selectedMarker && (
                <InfoWindow
                  position={selectedMarker}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div>
                    <h2>{selectedMarker.name || "Loading..."}</h2>
                  </div>
                </InfoWindow>
              )}
              {markers.length > 1 && (
                <Polyline
                  path={markers}
                  options={{
                    strokeColor: "#000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                  }}
                />
              )}
            </GoogleMap>
          </Box>
        )}
        {loadError && <div>Error loading Google Maps API</div>}
      </Box>
    </>
  );
}
