import React, { useEffect, useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { meterRadiusArr } from "@/constants/locationConstants";
import useWithinRadius from "@/hooks/useWithinRadius";

const defaultStoreLocation = {
  latitude: 19.176755323457076,
  longitude: 72.83375854373317,
};

const App = () => {
  const [newLocation, setNewLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>(defaultStoreLocation);

  const [distance, setDistance] = useState<number>(100);

  const { isWithinRadius, currLocation, setStoreDetailsSetup } =
    useWithinRadius();

  useEffect(() => {
    handleCheckDistance();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = +event.target.value;
    setDistance(value);
    handleCheckDistance(value);
  };

  const handleCheckDistance = (distanceToCalculate: number = 100) => {
    if (newLocation.latitude && newLocation.longitude) {
      setStoreDetailsSetup({
        storeLocation: newLocation,
        distanceToCalculate,
      });
    } else {
      alert("Enter currect latitude and longitude!");
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
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div style={{ minWidth: "262px" }}>
          {currLocation.latitude && currLocation.longitude ? (
            <div>
              <p>Your Current Latitude: {currLocation.latitude}</p>
              <p>Your Current Longitude: {currLocation.longitude}</p>
            </div>
          ) : (
            <p style={{ color: "red" }}>
              {currLocation.error || "Getting location..."}
            </p>
          )}
        </div>
        <div style={{ minWidth: "262px" }}>
          {newLocation.latitude && newLocation.longitude ? (
            <div>
              <p>Provided Latitude: {newLocation.latitude}</p>
              <p>Provided Longitude: {newLocation.longitude}</p>
              <p style={{ marginTop: "1rem", fontWeight: 600 }}>
                Is location within {distance}m radius:{" "}
                <span style={{ textDecoration: "underline" }}>
                  {isWithinRadius ? "Yes" : "No"}
                </span>
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
