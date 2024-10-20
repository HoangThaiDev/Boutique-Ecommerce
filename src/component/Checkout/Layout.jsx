// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/layout.module.css";

// Import Components
import FormClient from "./FormClient";
import Order from "./Order";

export default function Layout() {
  return (
    <div className={classes["checkout"]}>
      <div className={classes["checkout-container"]}>
        <div className={classes["checkout-title"]}>BILLING DETAILS</div>
        <div className={classes["checkout-row"]}>
          <div
            className={`${classes["checkout-col"]} ${classes["checkout-col-form"]}`}
          >
            <FormClient />
          </div>
          <div
            className={`${classes["checkout-col"]} ${classes["checkout-col-order"]}`}
          >
            <Order />
          </div>
        </div>
      </div>
    </div>
  );
}
