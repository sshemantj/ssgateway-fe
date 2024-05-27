import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import tableJson from "@/jsons/getProducts.json";
import styleVariantsJson from "@/jsons/getStyleVariants.json";
import sizeVariantsJson from "@/jsons/getSizeVariants.json";
import channelMastersJson from "@/jsons/getChannelMaster.json";
import userChannelMappings from "@/jsons/GetUserChannelMappings.json";
import getApprovedUnmappedSizeVariants from "@/jsons/getApprovedUnmappedSizeVariants.json";
import {
  fetchTableData,
  getChannelMasters,
  getSizeVariants,
  getStyleVariants,
  getUserChannelMappings,
} from "@/services/thunks/tableApis";
import { IApprovedPdTypes, IProductsTypes } from "@/interfaces/product";
import { IFileManagementSubRoutes } from "@/constants/allRoutes";

export type IProducts =
  | ""
  | IApprovedPdTypes
  | IProductsTypes
  | IFileManagementSubRoutes.VIEW_PENDING_APROVAL;

type IGatewaySlice = {
  status: "loading" | "succeeded" | "failed";
  data: any;
  styleVariants: any;
  sizeVariants: any;
  channelMasters: any;
  userChannelMappings: any;
  selectedChannel: string;
  pdType: IProducts;
  subPdType: IApprovedPdTypes | "";
  error: string;
  isLoading: boolean;
};

const initialState = {
  // data: getApprovedUnmappedSizeVariants || tableJson,
  // styleVariants: styleVariantsJson,
  // sizeVariants: sizeVariantsJson,
  // userChannelMappings: userChannelMappings,
  // channelMasters: channelMastersJson,
  //
  data: { sizevariantData: [] },
  styleVariants: [],
  sizeVariants: [],
  userChannelMappings: [],
  channelMasters: [],
  //
  selectedChannel: "",
  pdType: "",
  subPdType: IApprovedPdTypes.UN_MAPPED,
  error: "",
  isLoading: false,
} as IGatewaySlice;

export const gatewaySlice = createSlice({
  name: "gateway",
  initialState,
  reducers: {
    resetSizeAndStyleVariants: (state) => {
      state.styleVariants = [];
      state.sizeVariants = [];
    },
    resetHomeTableData: (state) => {
      state.data = { sizevariantData: [] };
    },
    changePdType: (state, action: PayloadAction<IProducts>) => {
      state.pdType = action.payload;
    },
    changeSubPdType: (state, action: PayloadAction<IApprovedPdTypes>) => {
      state.subPdType = action.payload;
    },
    setChannelMapping: (state, action: PayloadAction<string>) => {
      state.selectedChannel = action.payload;
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // fetchTableData
      .addCase(fetchTableData.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload || initialState.data;
        state.isLoading = false;
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
        // throw new Error(action.error.message);
      })
      // fetch style variants
      .addCase(getStyleVariants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStyleVariants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.styleVariants = action.payload;
        state.isLoading = false;
      })
      .addCase(getStyleVariants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
        // throw new Error(action.error.message);
      })
      // fetch size variants
      .addCase(getSizeVariants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSizeVariants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sizeVariants = action.payload;
        state.isLoading = false;
      })
      .addCase(getSizeVariants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
        // throw new Error(action.error.message);
      })
      // fetch channel master
      .addCase(getChannelMasters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getChannelMasters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.channelMasters = action.payload;
        state.isLoading = false;
      })
      .addCase(getChannelMasters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
        // throw new Error(action.error.message);
      })
      // fetch channel master
      .addCase(getUserChannelMappings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserChannelMappings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userChannelMappings = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserChannelMappings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
        // throw new Error(action.error.message);
      });
  },
});

export const {
  resetSizeAndStyleVariants,
  resetHomeTableData,
  changePdType,
  setChannelMapping,
  setLoader,
  changeSubPdType,
} = gatewaySlice.actions;
export default gatewaySlice.reducer;
