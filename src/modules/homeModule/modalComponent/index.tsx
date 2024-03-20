import CustomTable from "@/component/molecules/CustomeTable";
import SelectDropdown from "@/component/molecules/selectDropdown";
import { getSizeVariants } from "@/services/thunks/tableApis";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getSplit } from "@/utils";
import { Box, Button, Pagination } from "@mui/material";
import React, { useState } from "react";

interface IProps {
  currPdId: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const ModalComponent = (props: IProps) => {
  const { currPdId } = props;
  const [allCheckBox, setAllCheckBox] = useState<any>({});
  const [selectedChannels, setselectedChannels] = useState<any>({});
  const { styleVariants } = useAppSelector((state) => state.gateway);
  const { sizeVariants } = useAppSelector((state) => state.gateway);
  const { data: productState } = useAppSelector((state) => state.gateway);
  const [currStyleId, setCurrStyleId] = useState<string>();
  const { channelMasters } = useAppSelector((state) => state.gateway);
  const dispatch = useAppDispatch();

  const selectDataList = styleVariants.map((item: any, index: number) => ({
    label: `${item.colourDesc}`,
    value: `${item.id}`,
  }));

  const theadArr = Object.keys(sizeVariants?.[0] || {});

  const handleRowClick = (row: any, index: number) => {
    const newCheckBox = { ...allCheckBox };
    if (newCheckBox[index]) {
      newCheckBox[index] = null;
    } else {
      newCheckBox[index] = true;
    }
    setAllCheckBox(newCheckBox);
  };

  const handleOnChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setCurrStyleId(value);
    dispatch(getSizeVariants({ stylevairiantId: value }));
  };

  const handlePagination = (pageNumber: number) => {
    // dispatch(fetchTableData({ pageNumber, searchTerm: search }));
  };

  const handleSubmit = () => {
    // console.log(sizeVariants);
    const styleData = styleVariants.find(
      (item: any) => +item.id === Number(currStyleId)
    );
    const pdData = productState.products.find(
      (item: any) => +item.id === +currPdId
    );

    // const loop1 = Object.keys(selectedChannels).map((selectedInd) => {
    //   const myData = selectedChannels[selectedInd].value.map((item: string) => {
    //     const { value2 } = getSplit(item);
    //     return value2;
    //   });
    //   return myData;
    // });

    // console.log(loop1);

    // const selectedCMData = channelMasters.filter((item: any) => {
    //   return loop1.includes(`${item.id}`);
    // });
    // console.log(selectedCMData);

    const finalData: any = {
      productid: pdData.id,
      productcode: pdData.code,
      stylevariantid: styleData.id,
      stylecode: styleData.stylecode,
      // channelmasterid: 3,
      // channelid: "ss",
      // channelname: "SS.com",
      isactive: true,
    };

    // console.log(selectedChannels);

    // Object.keys(selectedChannels).forEach((selectedInd) => {
    //   const sizeData = sizeVariants[selectedInd];
    //   // console.log(sizeVariants);
    //   finalData.sizevariantid = sizeData.id;
    //   finalData.sizecode = sizeData.sizeCode;

    //   console.log(finalData);
    // });
    // console.log(selectedChannels);
    // const finalDate = selectedChannels.map((item: string) => {
    //   const { value1, value2 } = getSplit(item);
    //   console.log(value1, value2);
    //   return {};
    // });
    // alert(JSON.stringify(selectedChannels));
  };

  return (
    <Box sx={{ ...style }}>
      <SelectDropdown
        handleOnChange={handleOnChange}
        label="Select StyleVariants"
        data={selectDataList}
      />
      <div style={{ position: "relative", overflowY: "scroll" }}>
        {sizeVariants.length ? (
          <>
            <CustomTable
              {...{
                theadArr,
                allCheckBox,
                isMultiSelects: true,
                handleRowClick,
                tbodyArr: sizeVariants,
                setselectedChannels,
                selectedChannels,
              }}
            />
            <div
              style={{
                marginTop: "1rem",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Pagination
                onChange={(_, page) => handlePagination(page)}
                sx={{
                  "& .MuiPagination-ul li:nth-child(8)": { display: "none" },
                }}
                variant="outlined"
              />
              <Button
                onClick={() => handleSubmit()}
                style={{
                  padding: "0.3rem 3rem",
                }}
                variant="contained"
              >
                Submit
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </Box>
  );
};

export default ModalComponent;
