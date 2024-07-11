import { IFileManagementSubRoutes } from "@/constants/allRoutes";
import {
  IApprovedPdTypes,
  IApprovedPdTypesForStoreMap,
  IProductsTypes,
} from "@/interfaces/product";
import {
  fetchTableData,
  fetchTableDataForStoreMap,
  getChannelMasters,
  getSizeVariants,
  getStyleVariants,
  getUserChannelMappings,
  getUserStoreMappings,
} from "@/services/thunks/tableApis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IProducts =
  | ""
  | IApprovedPdTypes
  | IProductsTypes
  | IFileManagementSubRoutes.VIEW_PENDING_APROVAL
  | IApprovedPdTypesForStoreMap;

export type IProductsForStoreMap = "" | IApprovedPdTypesForStoreMap;

type IGatewaySlice = {
  status?: "loading" | "succeeded" | "failed";
  data: any;
  styleVariants: any;
  sizeVariants: any;
  channelMasters: any;
  userChannelMappings: any;
  userStoreMappings: any;

  selectedChannel: string;
  selectedChannelForStorMap: string;
  pdType: IProducts;
  pdTypeForStore: string;

  subPdType: IApprovedPdTypes | "";
  error: string;
  isLoading: boolean;
  mappedProducts: any;
  aprovedProducts: any;
  unAprovedProducts: any;
  "view-pending-approval": any;
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
  userStoreMappings: [],
  channelMasters: [],
  //
  selectedChannel: "",
  selectedChannelForStorMap: "",

  pdType: "",
  pdTypeForStore: "",
  subPdType: IApprovedPdTypes.UN_MAPPED,
  error: "",
  isLoading: false,
  unAprovedProducts: [],
  mappedProducts: [],
  aprovedProducts: [],
  "view-pending-approval": [],
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
    changePdTypeForStoreMap: (state, action: PayloadAction<IProducts>) => {
      state.pdTypeForStore = action.payload;
    },
    changeSubPdType: (state, action: PayloadAction<IApprovedPdTypes>) => {
      state.subPdType = action.payload;
    },
    setChannelMapping: (state, action: PayloadAction<string>) => {
      state.selectedChannel = action.payload;
    },
    setStoreMapping: (state, action: PayloadAction<string>) => {
      state.selectedChannelForStorMap = action.payload;
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
        /* @ts-ignore */
        state[action.payload.type] = action.payload.data || initialState.data;
        state.isLoading = false;
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
        // throw new Error(action.error.message);
      })
      // fetchTableData For Store Map
      .addCase(fetchTableDataForStoreMap.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(fetchTableDataForStoreMap.fulfilled, (state, action) => {
        state.status = "succeeded";
        /* @ts-ignore */
        state[action.payload.type] = action.payload.data || initialState.data;
        state.isLoading = false;
      })
      .addCase(fetchTableDataForStoreMap.rejected, (state, action) => {
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
      })
      // fetch store master
      .addCase(getUserStoreMappings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserStoreMappings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userStoreMappings = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserStoreMappings.rejected, (state, action) => {
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
  changePdTypeForStoreMap,
  setChannelMapping,
  setStoreMapping,
  setLoader,
  changeSubPdType,
} = gatewaySlice.actions;
export default gatewaySlice.reducer;
