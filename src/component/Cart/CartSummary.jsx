// Import Modules
import React, { useRef } from "react";
import { useSelector } from "react-redux";

// Import File CSS
import classes from "./css/cartSummary.module.css";

// Import Icons
import { FaGift } from "react-icons/fa6";

export default function CartSummary() {
  // Create + use Hooks
  const couponRef = useRef("");

  // Create + use States
  const { cart } = useSelector((state) => state.user);

  // Create + use event handles
  const applyCouponHandle = () => {
    const valueCoupon = couponRef.current.value;
    if (valueCoupon.length === 0) {
      alert("You need input coupon to use!");
    }
  };

  return (
    <div className={classes["cart-summary"]}>
      <div className={classes["cart-summary-container"]}>
        <h2 className={classes["cart-summary-title"]}>CART TOTAL</h2>

        <div className={classes["form-summary"]}>
          <div className={classes["cart-sub-total"]}>
            <span className={classes["cart-sub-total-label"]}>SUBTOTAL</span>
            <span className={classes["cart-sub-total-value"]}>
              {cart.totalPrice} VND
            </span>
          </div>

          <div className={classes["cart-total"]}>
            <span className={classes["cart-total-label"]}>TOTAL</span>
            <span className={classes["cart-total-value"]}>
              {cart.totalPrice} VND
            </span>
          </div>

          <div className={classes["cart-total-coupon"]}>
            <input
              type="text"
              className={classes["cart-total-input"]}
              placeholder="Enter your coupon"
              ref={couponRef}
            />
            <button
              type="submit"
              className={classes["btn-add-coupon"]}
              onClick={applyCouponHandle}
            >
              <FaGift className={classes["icon-gift"]} /> Apply coupon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
