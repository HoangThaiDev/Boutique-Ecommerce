// Import Moduels
import { createSlice } from "@reduxjs/toolkit";

// Create initialState
const initialSideBarMenu = { isShow: false };
const initialPopupProduct = { isShow: false, product: null };

// Create Slice
const sidebarMenuSlice = createSlice({
  name: "sidebar",
  initialState: initialSideBarMenu,
  reducers: {
    show(state) {
      return { ...state, isShow: true };
    },
    hide(state) {
      return { ...state, isShow: false };
    },
  },
});

const popupProductSlice = createSlice({
  name: "popupProduct",
  initialState: initialPopupProduct,
  reducers: {
    show(state, action) {
      const { payload } = action;

      return { ...state, isShow: true, product: payload };
    },
    hide(state) {
      return { ...state, isShow: false, product: {} };
    },
  },
});

export { sidebarMenuSlice, popupProductSlice };
