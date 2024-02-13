import { isWithin100MeterRadius } from "@/utils/location";
import React, { useState, useEffect } from "react";

interface ICurrLocation {
  latitude: number | null;
  longitude: number | null;
}

const App = () => {
  const [currLocation, setCurrLocation] = useState<ICurrLocation>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState<string>("");

  const successHandler = (position: any) => {
    setCurrLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  const errorHandler = (error: any) => {
    setError(error.message);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  const storeLocation = {
    latitude: 19.173221920182982,
    longitude: 72.83588411131674,
  };

  const isWithinRadius = isWithin100MeterRadius({
    currLocation: currLocation,
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
        <p>{error || "Getting location..."}</p>
      )}
    </div>
  );
};

export default App;
