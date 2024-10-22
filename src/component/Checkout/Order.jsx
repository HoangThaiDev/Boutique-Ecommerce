// Import Modules
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Import File CSS
import classes from "./css/order.module.css";
import APIServer from "../../API/customAPI";

export default function Order() {
  // Create + use States
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.user);

  // Side Effects
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await APIServer.cart.getCart();

        if (res.status === 200) {
          const cart = res.data;
          setCart(cart);
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
    <div className={classes["order"]}>
      <div className={classes["order-container"]}>
        <h2 className={classes["order-title"]}>CART TOTAL</h2>

        {isLoading && (
          <>
            <div className={classes["order-flex"]}>
              {cart.items.map((item) => (
                <div key={item._id} className={classes["order-item"]}>
                  <span className={classes["order-item-name"]}>
                    {item.itemId.name}
                  </span>
                  <span className={classes["order-item-price"]}>
                    {item.totalPriceItem} VND
                  </span>
                  <span className={classes["order-item-quantity"]}>
                    x {item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className={classes["order-total"]}>
              <span className={classes["order-total-label"]}>TOTAL</span>
              <span className={classes["order-total-value"]}>
                {cart.totalPrice} VND
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
