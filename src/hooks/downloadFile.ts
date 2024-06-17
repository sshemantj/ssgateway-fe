import { useState } from "react";
import { axiosPrivate } from "@/services/client";

interface IProps {
  urlString: string;
  fileName: string;
  params?: any;
}

const useDownloadFile = () => {
  const [loading, setLoading] = useState(false);

  const downloadFile = async ({ urlString, fileName, params }: IProps) => {
    try {
      setLoading(true);
      const response = await axiosPrivate.get(urlString, {
        responseType: "blob",
        params,
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      setLoading(false);
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      setLoading(false);
    }
  };

  return {
    loading,
    downloadFile,
  };
};

export default useDownloadFile;
