// Import Modules
import axiosIntance from "../axios/customAxios";

const APIServer = {
  checkout: {
    createCheckout: (formValues) => {
      return axiosIntance.post("checkout/create", formValues);
    },
    getCheckout: () => {
      return axiosIntance.get("checkout");
    },
  },
  cart: {
    getCart: () => {
      return axiosIntance.get("cart");
    },
    deleteItem: (itemId) => {
      return axiosIntance.post("cart/delete-item", { itemId });
    },
    updateCart: (data) => {
      return axiosIntance.post("cart/update", { data });
    },
  },
  shop: {
    getProducts: () => {
      return axiosIntance.get(`shop/products`);
    },
    getProductsByQuery: (query) => {
      if (!query) {
        query = "?category=all";
      }

      return axiosIntance.get(`shop/products/query${query}`);
    },
    getProductDetail: (productId) => {
      return axiosIntance.get(`shop/product/${productId}`);
    },

    postAddToCart: (valueProduct) => {
      return axiosIntance.post("shop/products/add-to-cart", {
        valueProduct,
      });
    },
  },
  user: {
    postSignUpUser: (formValues) => {
      return axiosIntance.post("user/sign-up", formValues);
    },
    postLoginUser: (formValues) => {
      return axiosIntance.post("user/login", formValues);
    },
    getUser: () => {
      return axiosIntance.get("user");
    },
    getLogout: () => {
      return axiosIntance.get("user/logout");
    },
  },
  chatRoom: {
    create: (accessToken) => {
      return axiosIntance.post("chatRoom/create", { accessToken });
    },
    get: (roomID) => {
      return axiosIntance.get(`chatRoom/room/${roomID}`);
    },
  },
  message: {
    get: (roomID) => {
      return axiosIntance.get(`message/get/${roomID}`);
    },
    send: (roomID, valueMessage) => {
      return axiosIntance.post(`message/send/${roomID}`, {
        sender: "client",
        valueMessage,
      });
    },
  },
  session: {
    // get: (roomID) => {
    //   return axiosIntance.get(`session/room/${roomID}`);
    // },
  },
};

export default APIServer;
