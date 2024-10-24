// Import Modules
import React from "react";
import { useLocation } from "react-router-dom";

// Import File CSS
import classes from "./css/layout.module.css";

// Import Components
import InfoClient from "./InfoClient";
import Items from "./Items";

export default function Layout() {
  // Create + use Hooks
  const { state: data } = useLocation();

  return (
    <div className={classes["checkout-detail"]}>
      <div className={classes["checkout-detail-container"]}>
        <div className={classes["checkout-detail-row"]}>
          <div className={classes["checkout-detail-col"]}>
            <InfoClient
              userId={data.user}
              totalCart={data.cart.totalPrice}
              infoClient={data.info_client}
            />
          </div>
          <div className={classes["checkout-detail-col"]}>
            <Items items={data.cart.items} />
          </div>
        </div>
      </div>
    </div>
  );
}
