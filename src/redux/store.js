// Import Modules
import { configureStore } from "@reduxjs/toolkit";
import { sidebarMenuSlice, popupProductSlice, userSlice } from "./sliceRedux";

const store = configureStore({
  reducer: {
    sidebarMenu: sidebarMenuSlice.reducer,
    popupProduct: popupProductSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
