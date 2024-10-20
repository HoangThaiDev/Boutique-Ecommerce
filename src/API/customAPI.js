// Import Modules
import axiosIntance from "../axios/customAxios";

const APIServer = {
  cart: {
    getCart: () => {
      return axiosIntance.get("cart/");
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
};

export default APIServer;
