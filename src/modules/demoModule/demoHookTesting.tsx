import useCurrentLocation from "@/hooks/useLocation";
import { isWithinProvidedRadius } from "@/utils/location";
import React, { useEffect, useState } from "react";

const DemoHookTesting = () => {
  const currLocation = useCurrentLocation();
  const [isWithinRadius, setIsWithinRadius] = useState<boolean | null>(null);

  const handleStoreQrcodeScan = () => {
    try {
      const newLocation = {
        latitude: 19.176755323457076,
        longitude: 72.83375854373317,
      };

      const checkArr = [
        currLocation.latitude,
        currLocation.longitude,
        newLocation.latitude,
        newLocation.longitude,
      ];

      if (!checkArr.includes(null)) {
        const finalObject = {
          currLocation,
          storeLocation: {
            latitude: parseFloat(newLocation.latitude as unknown as string),
            longitude: parseFloat(newLocation.longitude as unknown as string),
          },
          distanceToCalculate: 200,
        };

        const isGoodToGo = isWithinProvidedRadius(finalObject);
        setIsWithinRadius(isGoodToGo);
      }
      //   else {
      //     alert("Scan store Qr-code to get location!");
      //   }
    } catch (error: any) {
      alert(`Error ${error.message}`);
    }
  };

  useEffect(() => {
    handleStoreQrcodeScan();
  }, [currLocation]);

  //   console.log(isWithinRadius);

  return (
    <div>
      DemoHookTesting
      <h2>isWithinRadius: {`${isWithinRadius}`}</h2>
    </div>
  );
};

export default DemoHookTesting;
