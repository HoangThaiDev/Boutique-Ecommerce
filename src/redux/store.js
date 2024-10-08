// Import Modules
import { configureStore } from "@reduxjs/toolkit";
import { sidebarMenuSlice, popupProductSlice } from "./sliceRedux";

const store = configureStore({
  reducer: {
    sidebarMenu: sidebarMenuSlice.reducer,
    popupProduct: popupProductSlice.reducer,
  },
});

export default store;
