// Import Modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import APIServer from "../../API/customAPI";

// Import File CSS
import classes from "./css/layout.module.css";

// Import Components
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";
import { actionUser } from "../../redux/actionRedux";

export default function Layout() {
  // Create + use States
  const { isLoggedIn } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  // Create + use Hooks
  const dispatch = useDispatch();

  // Side Effects
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await APIServer.cart.getCart();

        if (res.status === 200) {
          const cart = res.data;

          dispatch(actionUser.getCart(cart));
          setIsLoading(true);
        }
      } catch (error) {
        const { data } = error.response;
        alert(data.message);
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn]);

  return (
    <div className={classes["cart"]}>
      <div className={classes["cart-container"]}>
        {!isLoading && !isLoggedIn && (
          <div className={classes["message-error-box"]}>
            <h2>You need login account to view your cart!</h2>
            <Link to="/login">Go to loggin</Link>
          </div>
        )}

        {isLoading && isLoggedIn && (
          <>
            <div className={classes["cart-title"]}>SHOPPING CART</div>
            <div className={classes["cart-row"]}>
              <div
                className={`${classes["cart-col"]} ${classes["cart-col-items"]}`}
              >
                <CartItems />
              </div>
              <div
                className={`${classes["cart-col"]} ${classes["cart-col-summary"]}`}
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
