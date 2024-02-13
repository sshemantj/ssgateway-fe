interface ILocation {
  storeLocation: {
    latitude: number;
    longitude: number;
  };
  currLocation: {
    latitude: number | null;
    longitude: number | null;
  };
  distanceToCalculate: number;
}

const isWithinProvidedRadius = ({
  storeLocation,
  currLocation,
  distanceToCalculate = 100,
}: ILocation): boolean => {
  if (!currLocation.latitude || !currLocation.longitude) {
    return false;
  }

  const earthRadius = 6371000; // Earth's radius in meters
  const latDiff =
    (storeLocation.latitude - currLocation.latitude) * (Math.PI / 180);
  const lonDiff =
    (storeLocation.longitude - currLocation.longitude) * (Math.PI / 180);
  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(currLocation.latitude * (Math.PI / 180)) *
      Math.cos(storeLocation.latitude * (Math.PI / 180)) *
      Math.sin(lonDiff / 2) *
      Math.sin(lonDiff / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance <= distanceToCalculate;
};

const getCoordinatesFromGoogleMapLink = (googleMapLink: string) => {
  const match = googleMapLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match && match.length >= 3) {
    const latitude = parseFloat(match[1]);
    const longitude = parseFloat(match[2]);
    return { latitude, longitude };
  } else {
    console.log("Invalid or unsupported Google Maps link format");
    return { latitude: null, longitude: null };
  }
};

export { isWithinProvidedRadius, getCoordinatesFromGoogleMapLink };
