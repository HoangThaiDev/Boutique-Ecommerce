// Import Modules
import axiosIntance from "../axios/customAxios";

const APIServer = {
  shop: {
    getProduct: () => {
      return axiosIntance.get("shop/products");
    },
    getProductDetail: (productId) => {
      return axiosIntance.get(`shop/product/${productId}`);
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
  },
};

export default APIServer;
