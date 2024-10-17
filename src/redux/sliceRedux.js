// Import Moduels
import { createSlice, current } from "@reduxjs/toolkit";

// Create initialState
const initialSideBarMenu = { isShow: false };
const initialPopupProduct = { isShow: false, product: null };
const initialUser = {
  isLoggedIn: false,
  accessToken: "",
  cart: { items: [], totalPrice: "0" },
};
const initialSidebarShop = { isShow: false };

// Create Slice
const sidebarShopSlice = createSlice({
  name: "sidebar-shop",
  initialState: initialSidebarShop,
  reducers: {
    show(state) {
      return { ...state, isShow: true };
    },
    hide(state) {
      return { ...state, isShow: false };
    },
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    save(state, action) {
      const { payload } = action;

      return {
        ...state,
        isLoggedIn: payload.isLoggedIn,
        accessToken: payload.accessToken,
        cart: payload.cart,
      };
    },

    addToCart(state, action) {
      let newCartItems = [];
      const valueProduct = action.payload;

      // Lấy giá trị cart hiện tại
      const { items: cartItems } = current(state.cart);

      const totalPriceItem = valueProduct.price * valueProduct.quantity;

      // Check if product was existed in items of card or not
      const findIndexProduct = cartItems.findIndex(
        (item) => item.itemId === valueProduct.productId
      );

      if (findIndexProduct === -1) {
        const updateProduct = {
          itemId: valueProduct.productId,
          quantity: valueProduct.quantity,
          totalPriceItem: totalPriceItem.toString(),
        };

        newCartItems = [...cartItems, updateProduct];
      }

      if (findIndexProduct !== -1) {
        const updatedProduct = {
          ...cartItems[findIndexProduct], // Clone the current product
          quantity:
            cartItems[findIndexProduct].quantity + valueProduct.quantity, // Update the quantity
          totalPriceItem:
            parseInt(cartItems[findIndexProduct].totalPriceItem) +
            totalPriceItem,
        };

        // Create a new array with the updated product
        newCartItems = [...cartItems];
        newCartItems[findIndexProduct] = updatedProduct;
      }

      // Update the state with the new array
      state.cart.items = newCartItems;
      state.cart.totalPrice = newCartItems
        .reduce(
          (acculator, currentValue) =>
            acculator + parseInt(currentValue.totalPriceItem),
          0
        )
        .toString();
    },

    logout(state) {
      return {
        ...state,
        isLoggedIn: false,
        accessToken: "",
        cart: { items: [], totalPrice: "0" },
      };
    },

    updateAccessToken(state, action) {
      const { payload } = action;
      return { ...state, accessToken: payload.accessToken };
    },
  },
});

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

export { sidebarMenuSlice, popupProductSlice, userSlice, sidebarShopSlice };
