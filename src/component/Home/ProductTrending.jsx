// Import Modules
import React, { useContext, useEffect } from "react";
import { APIContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionPopupProduct } from "../../redux/actionRedux";
import APIServer from "../../API/customAPI";

// Import File CSS
import classes from "./css/productTrending.module.css";

// Import Icons
import { IoSearch } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";

export default function ProductTrending() {
  // Create + use Hooks
  const { products } = useContext(APIContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sliceProducts = products.slice(0, 8);

  // Side Effect
  useEffect(() => {
    const checkWidthDevice = () => {
      if (window.innerWidth < 1500) {
        dispatch(actionPopupProduct.hide());
      }
    };

    window.addEventListener("resize", checkWidthDevice);

    return () => {
      window.removeEventListener("resize", checkWidthDevice);
    };
  }, []);

  // Create + use event handles
  const showPopupProductHandle = (productItem) => {
    if (window.innerWidth > 1500) {
      dispatch(actionPopupProduct.show(productItem));
    }
  };

  const showProductDetailHandle = async (productId) => {
    try {
      const res = await APIServer.shop.getProductDetail(productId);

      const productDetail = res.data;

      // Modify Product
      const pathProductName = productDetail.name
        .replace(/\s*-\s*/g, "-")
        .replace(/\s+/g, "-");

      navigate(`/product/${pathProductName}`, {
        state: { productDetail },
      });
    } catch (error) {
      const { data } = error.response;
      alert(data.message);
    }
  };

  return (
    <div className={classes["products-trending"]}>
      <div className={classes["products-trending-container"]}>
        <div className={classes["products-trending-header"]}>
          <p>MADE THE HARD WAY</p>
          <h3>TOP TRENDING PRODUCTS</h3>
        </div>

        <div className={classes["products-flex"]}>
          {sliceProducts.map((product) => (
            <div key={product._id} className={classes["item-product"]}>
              <div className={classes["item-product-actions"]}>
                <IoSearch
                  className={`${classes["icon"]} ${classes["icon-search"]}`}
                  onClick={() => showProductDetailHandle(product._id)}
                />
                <BsBagCheck
                  className={`${classes["icon"]} ${classes["icon-bag"]}`}
                />
                <BsCartPlus
                  className={`${classes["icon"]} ${classes["icon-cart"]}`}
                />
              </div>
              <div
                className={classes["item-product-image"]}
                onClick={() => showPopupProductHandle(product)}
              >
                <img
                  src={product.images[0]}
                  alt={product.images[0]}
                  loading="lazy"
                />
              </div>
              <div className={classes["item-product-info"]}>
                <p className={classes["info-name"]}>{product.name}</p>
                <p className={classes["info-price"]}>{product.price} VND</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
