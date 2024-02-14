import { useState, useEffect } from "react";
import useCurrentLocation from "./useLocation";
import { isWithinProvidedRadius } from "@/utils/location";

interface IUseWithinRadius {
  distanceToCalculate: number;
  storeLocation: {
    latitude: number | null;
    longitude: number | null;
  };
}

const useWithinRadius = () => {
  const [isWithinRadius, setIsWithinRadius] = useState<boolean | null>(null);
  const [storeDetailsSetup, setStoreDetailsSetup] = useState<IUseWithinRadius>({
    storeLocation: { latitude: null, longitude: null },
    distanceToCalculate: 100,
  });

  const currLocation = useCurrentLocation();

  useEffect(() => {
    const { storeLocation } = storeDetailsSetup;
    const checkArr = [
      currLocation.latitude,
      currLocation.longitude,
      storeLocation.latitude,
      storeLocation.longitude,
    ];

    if (!checkArr.includes(null)) {
      const finalObject = {
        currLocation,
        storeLocation: {
          latitude: parseFloat(storeLocation.latitude as unknown as string),
          longitude: parseFloat(storeLocation.longitude as unknown as string),
        },
        distanceToCalculate: storeDetailsSetup.distanceToCalculate,
      };

      const isGoodToGo = isWithinProvidedRadius(finalObject);
      setIsWithinRadius(isGoodToGo);
    }
  }, [storeDetailsSetup]);

  return {
    isWithinRadius,
    currLocation,
    setStoreDetailsSetup,
  };
};

export default useWithinRadius;
