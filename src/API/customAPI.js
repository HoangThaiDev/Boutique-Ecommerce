// Import Modules
import axiosIntance from "../axios/customAxios";

const APIServer = {
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
