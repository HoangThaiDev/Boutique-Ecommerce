// Import Modules
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import APIServer from "../../API/customAPI";

// Import File CSS
import classes from "./css/info.module.css";

// Import Icons
import { MdOutlineArrowLeft } from "react-icons/md";
import { MdOutlineArrowRight } from "react-icons/md";
import { actionUser } from "../../redux/actionRedux";

export default function Info({ product }) {
  // Create + use Hooks
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Create + use states
  const [quantityProduct, setQuantityProduct] = useState(1);

  // Create + use event handles
  const changeCountQuantityHandler = (e, option) => {
    switch (option) {
      case "i":
        if (quantityProduct < 20) {
          setQuantityProduct((prevState) => prevState + 1);
        } else {
          alert("Max quantity of product is 20!");
        }
        break;
      case "d":
        if (quantityProduct > 1) {
          setQuantityProduct((prevState) => prevState - 1);
        }
        break;
      case "input":
        const amount = Number(e.target.value);
        setQuantityProduct(amount);
        break;
      default:
        alert("Error! Please check again choose quantity! ");
        break;
    }
  };

  const checkValidate = () => {
    if (!user.isLoggedIn) {
      alert("You need login to buy product!");
      return false;
    }

    if (quantityProduct === 0) {
      alert("You need choose quantity of product!");
      return false;
    }

    if (quantityProduct > 20) {
      alert("You can only purchase a maximum of 20 products per order!");
      return false;
    }

    // Calculator price product
    const convertPrice = parseInt(product.price.replace(/\./g, ""));

    const updateProduct = {
      productId: product._id,
      price: convertPrice,
      quantity: quantityProduct,
    };

    return updateProduct;
  };

  const changeCartHandle = async (action) => {
    const valueProduct = checkValidate();

    if (valueProduct) {
      try {
        const res = await APIServer.shop.postAddToCart(valueProduct);

        if (res.status === 200) {
          dispatch(actionUser.addToCart(valueProduct));
          if (action === "buy") {
            alert("Buy product success!");
            return navigate("../cart");
          }

          if (action === "add") {
            return alert("Add to cart success!");
          }
        }
      } catch (error) {
        const { data } = error.response;
        alert(data.message);
      }
    }
  };

  return (
    <div className={classes["info"]}>
      <div className={classes["info-container"]}>
        <div className={classes["info-flex"]}>
          <h2 className={classes["info-name"]}>{product.name}</h2>
          <p className={classes["info-price"]}>{product.price} VND</p>
          <p className={classes["info-desc"]}>{product.short_desc}</p>
          <div className={classes["info-type"]}>
            <p className={classes["category"]}>
              CATEGORY: <span>{product.category}</span>
            </p>
            <span className={classes["border"]}>/</span>
            <p className={classes["quantity"]}>
              QUANTITY: <span>{product.quantity}</span>
            </p>
          </div>
          <div className={classes["info-footer"]}>
            <div className={classes["form-quantity"]}>
              <p>QUANTITY</p>
              <div className={classes["quantity-item"]}>
                <MdOutlineArrowLeft
                  className={`${classes["icon"]} ${classes["icon-decrease"]}`}
                  onClick={(e) => changeCountQuantityHandler(e, "d")}
                />
                <input
                  type="number"
                  value={quantityProduct}
                  onChange={(e) => changeCountQuantityHandler(e, "input")}
                />
                <MdOutlineArrowRight
                  className={`${classes["icon"]} ${classes["icon-increase"]}`}
                  onClick={(e) => changeCountQuantityHandler(e, "i")}
                />
              </div>
            </div>
            <div className={classes["btn-actions"]}>
              <button
                className={classes["btn-buy-product"]}
                type="button"
                onClick={() => changeCartHandle("buy")}
              >
                Buy Now
              </button>
              <button
                className={classes["btn-add-cart"]}
                type="button"
                onClick={() => changeCartHandle("add")}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
