// Import Modules
import {
  sidebarMenuSlice,
  popupProductSlice,
  userSlice,
  sidebarShopSlice,
} from "./sliceRedux";

const actionSidebarMenu = sidebarMenuSlice.actions;
const actionPopupProduct = popupProductSlice.actions;
const actionUser = userSlice.actions;
const actionSidebarShop = sidebarShopSlice.actions;

export { actionSidebarMenu, actionPopupProduct, actionUser, actionSidebarShop };
