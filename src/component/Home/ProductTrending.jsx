// Import Modules
import React, { useContext, useEffect } from "react";
import { APIContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionPopupProduct } from "../../redux/actionRedux";

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

  const modifiedProducts = products
    .map((product) => {
      let VNMoney = new Intl.NumberFormat("vn-VN", {
        style: "currency",
        currency: "VND",
      });

      let formattedPrice = VNMoney.format(product.price)
        .replace(/,/g, ".")
        .replace("₫", "");

      return {
        ...product,
        price: formattedPrice,
      };
    })
    .slice(0, 8);

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

  return (
    <div className={classes["products-trending"]}>
      <div className={classes["products-trending-container"]}>
        <div className={classes["products-trending-header"]}>
          <p>MADE THE HARD WAY</p>
          <h3>TOP TRENDING PRODUCTS</h3>
        </div>

        <div className={classes["products-flex"]}>
          {modifiedProducts.map((product) => (
            <div key={product._id} className={classes["item-product"]}>
              <div className={classes["item-product-actions"]}>
                <IoSearch
                  className={`${classes["icon"]} ${classes["icon-search"]}`}
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
