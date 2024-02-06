import React, { useState } from "react";
// import BarcodeScannerComponent from "react-qr-barcode-scanner";
import styles from "./customBarcode.module.scss";
import { Button } from "@mui/material";

const CustomBarcodeScanner = () => {
  const [data, setData] = useState("No Data");
  const [torchOn, setTorchOn] = useState(false);
  const [stream, setStream] = useState(true);
  const [count, setCount] = useState(0);

  const handleOnUpdate = (err: any, result: any) => {
    if (result) {
      setCount((prev) => ++prev);
      setData(result.text);
      setStream(false);
    } else {
      setData("Not Found");
    }
  };

  return (
    <div
      style={{
        // height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2>Count: {count}</h2>
      <div className={styles.barcode_parent}>
        {/* <BarcodeScannerComponent
          width={400}
          height={300}
          torch={torchOn}
          onUpdate={handleOnUpdate}
          stopStream={stream}
        /> */}
      </div>
      <h1>{data}</h1>
      <Button variant="text" onClick={() => setTorchOn(!torchOn)}>
        Switch Torch {torchOn ? "Off" : "On"}
      </Button>
    </div>
  );
};

export default CustomBarcodeScanner;
