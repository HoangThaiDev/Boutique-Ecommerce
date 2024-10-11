// Import Modules
import { sidebarMenuSlice, popupProductSlice, userSlice } from "./sliceRedux";

const actionSidebarMenu = sidebarMenuSlice.actions;
const actionPopupProduct = popupProductSlice.actions;
const actionUser = userSlice.actions;

export { actionSidebarMenu, actionPopupProduct, actionUser };
