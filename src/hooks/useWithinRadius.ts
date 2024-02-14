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
interface IOverRide {
  latitude: number;
  longitude: number;
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

    console.log({ checkArr });

    if (!checkArr.includes(null)) {
      const isGoodToGo = isWithinProvidedRadius({
        currLocation,
        storeLocation: storeLocation as IOverRide,
        distanceToCalculate: storeDetailsSetup.distanceToCalculate,
      });
      setIsWithinRadius(isGoodToGo);
    }
  }, [storeDetailsSetup]);

  return [isWithinRadius, setStoreDetailsSetup];
};

export default useWithinRadius;
