// Import Modules
import { configureStore } from "@reduxjs/toolkit";
import {
  sidebarMenuSlice,
  popupProductSlice,
  userSlice,
  sidebarShopSlice,
  menuUserDropdownSlice,
} from "./sliceRedux";

const store = configureStore({
  reducer: {
    sidebarMenu: sidebarMenuSlice.reducer,
    popupProduct: popupProductSlice.reducer,
    user: userSlice.reducer,
    sidebarShop: sidebarShopSlice.reducer,
    menuUserDd: menuUserDropdownSlice.reducer,
  },
});

export default store;
