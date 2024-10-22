// Import Moduels
import { createSlice, current } from "@reduxjs/toolkit";
import convertMoney from "../helper/convertMoney";

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
    logout(state) {
      return {
        ...state,
        isLoggedIn: false,
        accessToken: "",
        cart: { items: [], totalPrice: "0" },
      };
    },

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

      //  Get current value of cart
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

    updateAccessToken(state, action) {
      const { payload } = action;
      return { ...state, accessToken: payload.accessToken };
    },

    getCart(state, action) {
      const { payload } = action;

      return {
        ...state,
        cart: { items: payload.items, totalPrice: payload.totalPrice },
      };
    },

    updateCart(state, action) {
      const { qty, option, itemIndex } = action.payload;
      const { items } = current(state.cart);

      // Clone state to update
      let newItems = [...items];
      const cloneItem = { ...items[itemIndex] };

      // Check options of client choose
      if (option === "input") {
        cloneItem.quantity = parseInt(qty);
      }

      if (option === "increase") {
        cloneItem.quantity += parseInt(qty);
      }

      if (option === "decrease") {
        cloneItem.quantity -= parseInt(qty);
      }

      // Re-assign to clone value
      cloneItem.totalPriceItem =
        parseInt(cloneItem.itemId.price.replace(/\./g, "")) *
        cloneItem.quantity;
      cloneItem.totalPriceItem = convertMoney(cloneItem.totalPriceItem);
      newItems[itemIndex] = cloneItem;

      // Update state
      const totalPriceCart = newItems.reduce(
        (acculator, currentValue) =>
          acculator + parseInt(currentValue.totalPriceItem.replace(/\./g, "")),
        0
      );

      state.cart.items = newItems;
      state.cart.totalPrice = convertMoney(totalPriceCart);
    },

    deleteItemCart(state, action) {
      const { cart, totalPrice } = action.payload;

      return {
        ...state,
        cart: {
          items: cart,
          totalPrice: totalPrice,
        },
      };
    },
    clearCart(state) {
      return { ...state, cart: { items: [], totalPrice: "0" } };
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
