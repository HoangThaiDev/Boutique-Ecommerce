// Import Modules
import React, { useMemo, useState } from "react";

// Import File CSS
import classes from "./css/info.module.css";

// Import Icons
import { MdOutlineArrowLeft } from "react-icons/md";
import { MdOutlineArrowRight } from "react-icons/md";

export default function Info({ product }) {
  // Create + use states
  const [quantityProduct, setQuantityProduct] = useState(0);

  // Create + use Hooks
  const modifiedPrice = useMemo(() => {
    let VNMoney = new Intl.NumberFormat("vn-VN", {
      style: "currency",
      currency: "VND",
    });

    let formattedPrice = VNMoney.format(product.price)
      .replace(/,/g, ".")
      .replace("₫", "");
    return formattedPrice;
  }, []);

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

  return (
    <div className={classes["info"]}>
      <div className={classes["info-container"]}>
        <div className={classes["info-flex"]}>
          <h2 className={classes["info-name"]}>{product.name}</h2>
          <p className={classes["info-price"]}>{modifiedPrice} VND</p>
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
              <button className={classes["btn-buy-product"]} type="button">
                Buy Now
              </button>
              <button className={classes["btn-add-cart"]} type="button">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
