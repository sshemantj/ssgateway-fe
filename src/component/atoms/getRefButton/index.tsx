import React, { MutableRefObject } from "react";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

interface IGetRefButton {
  ref: MutableRefObject<HTMLElement | null>;
}

const GetRefButton = ({ ref }: IGetRefButton) => {
  const callApi = async (data: string) => {
    try {
      const newData = data.replaceAll('"', "'");
      const response = await fetch(
        "https://htmldocapi.vercel.app/api/htmlDoc/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: newData }),
        }
      );
      if (response.ok) {
        toast.success("success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnClick = async () => {
    const data = ref.current?.outerHTML;
    await callApi(`${data}`);
  };
  return (
    <div>
      <Button variant="contained" onClick={() => handleOnClick()}>
        get data
      </Button>
      <ToastContainer />
    </div>
  );
};

export default GetRefButton;
