import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import tableJson from "@/jsons/getProducts.json";
import styleVariantsJson from "@/jsons/getStyleVariants.json";
import sizeVariantsJson from "@/jsons/getSizeVariants.json";
import channelMastersJson from "@/jsons/getChannelMaster.json";
import userChannelMappings from "@/jsons/GetUserChannelMappings.json";
import {
  fetchTableData,
  getChannelMasters,
  getSizeVariants,
  getStyleVariants,
  getUserChannelMappings,
} from "@/services/thunks/tableApis";

export type IProducts =
  | ""
  | "mappedProducts"
  | "aprovedProducts"
  | "unAprovedProducts";

type IGatewaySlice = {
  status: "loading" | "succeeded" | "failed";
  data: any;
  styleVariants: any;
  sizeVariants: any;
  channelMasters: any;
  userChannelMappings: any;
  selectedChannel: string;
  pdType: IProducts;
  error: string;
};

const initialState = {
  // data: tableJson,
  // styleVariants: styleVariantsJson,
  // sizeVariants: sizeVariantsJson,
  // channelMasters: channelMastersJson,
  // userChannelMappings: userChannelMappings,
  data: { products: [] },
  styleVariants: [],
  sizeVariants: [],
  channelMasters: [],
  userChannelMappings: [],
  selectedChannel: "",
  pdType: "",
  error: "",
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
      state.data = { products: [] };
    },
    changePdType: (state, action: PayloadAction<IProducts>) => {
      state.pdType = action.payload;
    },
    setChannelMapping: (state, action: PayloadAction<string>) => {
      state.selectedChannel = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // fetchTableData
      .addCase(fetchTableData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // fetch style variants
      .addCase(getStyleVariants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStyleVariants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.styleVariants = action.payload;
      })
      .addCase(getStyleVariants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // fetch size variants
      .addCase(getSizeVariants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSizeVariants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sizeVariants = action.payload;
      })
      .addCase(getSizeVariants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // fetch channel master
      .addCase(getChannelMasters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getChannelMasters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.channelMasters = action.payload;
      })
      .addCase(getChannelMasters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      // fetch channel master
      .addCase(getUserChannelMappings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserChannelMappings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userChannelMappings = action.payload;
      })
      .addCase(getUserChannelMappings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      });
  },
});

export const {
  resetSizeAndStyleVariants,
  resetHomeTableData,
  changePdType,
  setChannelMapping,
} = gatewaySlice.actions;
export default gatewaySlice.reducer;
