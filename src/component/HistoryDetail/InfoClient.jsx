// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/infoClient.module.css";

export default function InfoClient({ userId, totalCart, infoClient }) {
  return (
    <div className={classes["info-client"]}>
      <div className={classes["info-client-container"]}>
        <h2>INFORMATION ORDER</h2>
        <ul className={classes["info-client-detail"]}>
          <li className={classes["info-id"]}>
            <p>ID User: {userId}</p>
          </li>
          <li className={classes["info-name"]}>
            <p>Full Name: {infoClient.fullname}</p>
          </li>
          <li className={classes["info-phone"]}>
            <p>Phone: {infoClient.phone}</p>
          </li>
          <li className={classes["info-addres"]}>
            <p>Address: {infoClient.address}</p>
          </li>
          <li className={classes["info-total"]}>
            <p>Total: {totalCart} VND</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
