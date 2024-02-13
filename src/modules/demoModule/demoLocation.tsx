import useCurrentLocation from "@/hooks/useLocation";
import { isWithinProvidedRadius } from "@/utils/location";
import React from "react";

const App = () => {
  const currLocation = useCurrentLocation();

  const storeLocation = {
    latitude: 19.173221920182982,
    longitude: 72.83588411131674,
  };

  const isWithinRadius = isWithinProvidedRadius({
    currLocation,
    storeLocation,
    distanceToCalculate: 500,
  });

  return (
    <div>
      {currLocation.latitude && currLocation.longitude ? (
        <div>
          <p>Latitude: {currLocation.latitude}</p>
          <p>Longitude: {currLocation.longitude}</p>
          <p>Is location within 100m radius: {isWithinRadius ? "Yes" : "No"}</p>
        </div>
      ) : (
        <p>{currLocation.error || "Getting location..."}</p>
      )}
    </div>
  );
};

export default App;
