// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/cartSummary.module.css";

// Import Icons
import { FaGift } from "react-icons/fa6";

export default function CartSummary() {
  return (
    <div className={classes["cart-summary"]}>
      <div className={classes["cart-summary-container"]}>
        <h2 className={classes["cart-summary-title"]}>CART TOTAL</h2>

        <form className={classes["form-summary"]}>
          <div className={classes["cart-sub-total"]}>
            <span className={classes["cart-sub-total-label"]}>SUBTOTAL</span>
            <span className={classes["cart-sub-total-value"]}>
              19.779.000 VND
            </span>
          </div>

          <div className={classes["cart-total"]}>
            <span className={classes["cart-total-label"]}>TOTAL</span>
            <span className={classes["cart-total-value"]}>19.779.000 VND</span>
          </div>

          <div className={classes["cart-total-coupon"]}>
            <input
              type="text"
              className={classes["cart-total-input"]}
              placeholder="Enter your coupon"
            />
            <button type="submit" className={classes["btn-add-coupon"]}>
              <FaGift className={classes["icon-gift"]} /> Apply coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
