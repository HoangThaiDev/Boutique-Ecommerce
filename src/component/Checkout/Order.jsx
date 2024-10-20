// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/order.module.css";

export default function Order() {
  return (
    <div className={classes["order"]}>
      <div className={classes["order-container"]}>
        <h2 className={classes["order-title"]}>CART TOTAL</h2>

        <div className={classes["order-flex"]}>
          <div className={classes["order-item"]}>
            <span className={classes["order-item-name"]}>SUBTOTAL</span>
            <span className={classes["order-item-price"]}>19.779.000 VND</span>
            <span className={classes["order-item-quantity"]}>x 2</span>
          </div>
          <div className={classes["order-item"]}>
            <span className={classes["order-item-name"]}>SUBTOTAL</span>
            <span className={classes["order-item-price"]}>19.779.000 VND</span>
            <span className={classes["order-item-quantity"]}>x 2</span>
          </div>
        </div>
        <div className={classes["order-total"]}>
          <span className={classes["order-total-label"]}>TOTAL</span>
          <span className={classes["order-total-value"]}>19.779.000 VND</span>
        </div>
      </div>
    </div>
  );
}
