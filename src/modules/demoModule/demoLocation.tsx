import useCurrentLocation from "@/hooks/useLocation";
import {
  getCoordinatesFromGoogleMapLink,
  isWithinProvidedRadius,
} from "@/utils/location";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const meterRadiusArr = [
  { name: "100m", value: 100 },
  { name: "200m", value: 200 },
  { name: "300m", value: 300 },
  { name: "400m", value: 400 },
  { name: "500m", value: 500 },
];

const App = () => {
  const currLocation = useCurrentLocation();
  const [gmapUrl, setGmapUrl] = useState<string>("");
  const [newLocation, setNewLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });
  const [isWithinRadius, setIsWithinRadius] = useState<boolean>(false);

  const [distance, setDistance] = useState<string>("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setDistance(value);
    handleCheckDistance(+value);
  };

  useEffect(() => {
    const storeLocation = {
      latitude: 19.173221920182982,
      longitude: 72.83588411131674,
    };

    const result = isWithinProvidedRadius({
      currLocation,
      storeLocation,
      distanceToCalculate: 100,
    });

    setIsWithinRadius(result);
  }, []);

  const handleCheckDistance = (distanceToCalculate: number = 100) => {
    // const providedUrlCoOrdinates = getCoordinatesFromGoogleMapLink(gmapUrl);
    // console.log(providedUrlCoOrdinates);

    if (newLocation.latitude && newLocation.longitude) {
      //   setNewLocation(providedUrlCoOrdinates);
      const result = isWithinProvidedRadius({
        currLocation,
        storeLocation: newLocation as {
          latitude: number;
          longitude: number;
        },
        distanceToCalculate,
      });

      setIsWithinRadius(result);
    } else {
      alert("longitude and latitude is not currect");
    }
  };

  return (
    <div>
      <div
        style={{
          marginTop: "0rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* <TextField
          inputProps={{
            style: {
              width: "280px",
              height: "0.4rem",
            },
          }}
          placeholder="Enter google map url to get co-ordinates..."
          value={gmapUrl}
          onChange={(e) => setGmapUrl(e.target.value)}
        /> */}
        <p>Enter manually longitude and latitude</p>
        <TextField
          inputProps={{
            style: {
              width: "280px",
              height: "0.4rem",
            },
          }}
          placeholder="Enter latitude manually..."
          value={newLocation.latitude}
          onChange={(e) =>
            setNewLocation((prev) => ({
              ...prev,
              latitude: e.target.value as unknown as number,
            }))
          }
        />
        <TextField
          inputProps={{
            style: {
              width: "280px",
              height: "0.4rem",
            },
          }}
          placeholder="Enter longitude manually..."
          value={newLocation.longitude}
          onChange={(e) =>
            setNewLocation((prev) => ({
              ...prev,
              longitude: e.target.value as unknown as number,
            }))
          }
        />

        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            helperText="select your dinstance in meters"
            value={distance}
            onChange={(e) => handleChange(e)}
          >
            {meterRadiusArr.map(({ name, value }, index) => (
              <MenuItem key={index} value={value}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <Button onClick={() => handleCheckDistance()} variant="contained">
          Check Distance
        </Button>
      </div>
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          alignItems: "center",
          //   justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div style={{ minWidth: "262px" }}>
          {currLocation.latitude && currLocation.longitude ? (
            <div>
              <p>Your Current Latitude: {currLocation.latitude}</p>
              <p>Your Current Longitude: {currLocation.longitude}</p>
              {/* <p>Is location within 100m radius: {isWithinRadius ? "Yes" : "No"}</p> */}
            </div>
          ) : (
            <p>{currLocation.error || "Getting location..."}</p>
          )}
        </div>
        <div style={{ minWidth: "262px" }}>
          {newLocation.latitude && newLocation.longitude ? (
            <div>
              <p>Provided Latitude: {newLocation.latitude}</p>
              <p>Provided Longitude: {newLocation.longitude}</p>
              <p style={{ marginTop: "1rem" }}>
                Is location within {distance}m radius:{" "}
                {isWithinRadius ? "Yes" : "No"}
              </p>
            </div>
          ) : (
            <p style={{ margin: "0 1rem" }}>
              Enter latitude and longitude to compare location...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
