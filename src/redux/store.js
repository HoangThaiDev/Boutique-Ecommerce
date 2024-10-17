// Import Modules
import { configureStore } from "@reduxjs/toolkit";
import {
  sidebarMenuSlice,
  popupProductSlice,
  userSlice,
  sidebarShopSlice,
} from "./sliceRedux";

const store = configureStore({
  reducer: {
    sidebarMenu: sidebarMenuSlice.reducer,
    popupProduct: popupProductSlice.reducer,
    user: userSlice.reducer,
    sidebarShop: sidebarShopSlice.reducer,
  },
});

export default store;
