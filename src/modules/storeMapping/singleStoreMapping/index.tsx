import DoubleVariantCardForStoreMap from "@/component/atoms/cards/doubleVariantCardForStoreMap";
import { IApprovedPdTypesForStoreMap } from "@/interfaces/product";
import { fetchTableDataForStoreMap } from "@/services/thunks/tableApis";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeSubPdType } from "@/store/slices/gatewaySlice";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import styles from "../../dashboardModule/customtable.module.scss";
import MappedStoreModule from "./mappedStoreModule";
import UnMappedStoreMap from "./unMappedStoreModule";
// import MappedModule from "../../dashboardModule/mappedModule";
// import UnMappedModule from "../../dashboardModule/unMappedModule";

const SinglStoreMapping = () => {
  const dispatch = useAppDispatch();
  const { pdType, selectedChannel, subPdType } = useAppSelector(
    (state) => state.gateway
  );

  const [productType, setProductType] = useState<string>("");
  const [value, setValue] = useState(IApprovedPdTypesForStoreMap.UN_MAPPED);
  const isUnmappedScreen = value === IApprovedPdTypesForStoreMap.UN_MAPPED;
  const isMappedScreen = value === IApprovedPdTypesForStoreMap.MAPPED;

  const handleChange = (_: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
    setProductType(newValue);
    dispatch(changeSubPdType(newValue));
    dispatch(
      fetchTableDataForStoreMap({ channelid: selectedChannel, type: newValue })
    ).catch((error) => console.log(error));
  };

  return (
    <div className={styles.customTableWrapper}>
      <div className={styles.btnWrapper}>
        <Grid container>
          {/* <Grid item sm={12} md={4}>
            {!isUnapprovedScreen && isMappedScreen ? (
              <Box className={styles.catlogSelect}>
                <CatlogDropdown {...{ handleCatlogSelect, selectedCatlog }} />
              </Box>
            ) : null}
          </Grid> */}
          <Grid item sm={12} md={4} marginX={"auto"}>
            {/* {!isUnapprovedScreen ? ( */}
            <DoubleVariantCardForStoreMap
              handleChange={handleChange}
              color="primary"
              value={value}
            />
            {/* ) : null} */}
          </Grid>
        </Grid>
      </div>
      <div className={styles.tableWrapper}>
        {isUnmappedScreen ? <UnMappedStoreMap /> : null}
        {isMappedScreen ? <MappedStoreModule /> : null}
      </div>
      <Toaster />
    </div>
  );
};
export default SinglStoreMapping;
