// Import Modules
import React from "react";
import { useNavigate } from "react-router-dom";

// Import File CSS
import classes from "./css/items.module.css";

// Import Icons
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Items({ checkouts }) {
  // Create + use Hooks
  const navigate = useNavigate();

  // Create + use event handles
  const viewCheckoutDetailHandle = (checkout) => {
    navigate(`${checkout._id}`, { state: checkout });
  };

  return (
    <div className={classes["checkout-flex"]}>
      {checkouts.map((checkout) => (
        <div key={checkout._id} className={classes["item-checkout"]}>
          <div className={`${classes["bg-content"]} ${classes["order-id"]}`}>
            <p>{checkout._id}</p>
          </div>
          <div className={`${classes["bg-content"]} ${classes["user-id"]}`}>
            <p>{checkout.user}</p>
          </div>
          <div className={`${classes["bg-content"]} ${classes["name"]}`}>
            <p>{checkout.info_client.fullname}</p>
          </div>
          <div className={`${classes["bg-content"]} ${classes["phone"]}`}>
            <p>{checkout.info_client.phone}</p>
          </div>
          <div className={`${classes["bg-content"]} ${classes["address"]}`}>
            <p>{checkout.info_client.address}</p>
          </div>
          <div className={`${classes["bg-content"]} ${classes["total"]}`}>
            <p>{checkout.cart.totalPrice} VND</p>
          </div>
          <div className={`${classes["bg-content"]} ${classes["delivery"]}`}>
            <p>{checkout.state.delivery}</p>
          </div>
          <div className={`${classes["bg-content"]} ${classes["status"]}`}>
            <p>{checkout.state.status}</p>
          </div>
          <div className={`${classes["bg-content"]} ${classes["detail"]}`}>
            <button
              type="button"
              className={classes["btn-view-checkout"]}
              onClick={() => viewCheckoutDetailHandle(checkout)}
            >
              View
              <FaLongArrowAltRight className={classes["icon-arrow-view"]} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
