import React, { SetStateAction, useEffect } from "react";
import useCurrentLocation from "@/hooks/useLocation";
import { isWithinProvidedRadius } from "@/utils/location";

interface IGetLocation {
  setIsWithinRadius: React.Dispatch<SetStateAction<boolean | null>>;
  distanceToCalculate: number;
  storeLocation: {
    latitude: number | null;
    longitude: number | null;
  };
}

const GetLocationDetails = ({
  setIsWithinRadius,
  storeLocation,
  distanceToCalculate,
}: IGetLocation) => {
  const currLocation = useCurrentLocation();

  const handleStoreQrcodeScan = () => {
    try {
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
          distanceToCalculate: distanceToCalculate,
        };

        const isGoodToGo = isWithinProvidedRadius(finalObject);
        setIsWithinRadius(isGoodToGo);
      }
    } catch (error: any) {
      alert(`Error ${error.message}`);
    }
  };

  useEffect(() => {
    handleStoreQrcodeScan();
  }, [currLocation, distanceToCalculate, setIsWithinRadius, storeLocation]);

  return null;
};

export default GetLocationDetails;
