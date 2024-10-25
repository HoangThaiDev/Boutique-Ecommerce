// Import Modules
import {
  sidebarMenuSlice,
  popupProductSlice,
  userSlice,
  sidebarShopSlice,
  menuUserDropdownSlice,
} from "./sliceRedux";

const actionSidebarMenu = sidebarMenuSlice.actions;
const actionPopupProduct = popupProductSlice.actions;
const actionUser = userSlice.actions;
const actionSidebarShop = sidebarShopSlice.actions;
const actionMenuUserDropdown = menuUserDropdownSlice.actions;

export {
  actionSidebarMenu,
  actionPopupProduct,
  actionUser,
  actionSidebarShop,
  actionMenuUserDropdown,
};
