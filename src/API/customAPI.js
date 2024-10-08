// Import Modules
import axiosIntance from "../axios/customAxios";

const APIServer = {
  shop: {
    getProduct: () => {
      return axiosIntance.get("shop/product");
    },
  },
};

export default APIServer;
