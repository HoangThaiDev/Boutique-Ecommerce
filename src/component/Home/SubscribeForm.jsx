// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/subscribeForm.module.css";

export default function SubscribeForm() {
  return (
    <div className={classes["subscribe"]}>
      <div className={classes["subscribe-container"]}>
        <div className={classes["subscribe-row"]}>
          <div
            className={`${classes["subscribe-col"]} ${classes["subscribe-title"]}`}
          >
            <h3>LET'S BE FRIEND!</h3>
            <p>If you don't have time, work efficiently.</p>
          </div>
          <div
            className={`${classes["subscribe-col"]} ${classes["subscribe-form"]}`}
          >
            <div className={classes["form-input"]}>
              <input
                className={classes["input-email"]}
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email address"
              />
              <button className={classes["btn-subscribe"]}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
