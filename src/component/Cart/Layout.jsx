// Import Modules
import React from "react";
import { useSelector } from "react-redux";

// Import File CSS
import classes from "./css/layout.module.css";

// Import Components
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";

export default function Layout() {
  // Create + use States
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <div className={classes["cart"]}>
      <div className={classes["cart-container"]}>
        {!isLoggedIn && (
          <div className={classes["message-error-box"]}>
            <h2>You need login account to view your cart!</h2>
            <Link to="/login">Go to loggin</Link>
          </div>
        )}

        {isLoggedIn && (
          <>
            <div className={classes["cart-title"]}>SHOPPING CART</div>
            <div className={classes["cart-row"]}>
              <div
                className={`${classes["cart-col"]} ${classes["cart-col-items"]}`}
              >
                <CartItems />
              </div>
              <div
                className={`${classes["shop-col"]} ${classes["cart-col-summary"]}`}
              >
                <CartSummary />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
