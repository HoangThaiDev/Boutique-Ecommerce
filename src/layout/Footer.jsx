// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/footer.module.css";

export default function Footer() {
  return (
    <div className={classes["footer"]}>
      <div className={classes["footer-container"]}>
        <div className={classes["footer-row"]}>
          <div className={classes["footer-col"]}>
            <h3>CUSTOMMER SERVICES</h3>
            <ul className={classes["list-link"]}>
              <li className={classes["item-link"]}>Help & Contact Us</li>
              <li className={classes["item-link"]}>Returns & Refunds</li>
              <li className={classes["item-link"]}>Online Stores</li>
              <li className={classes["item-link"]}>Terms & Conditions</li>
            </ul>
          </div>
          <div className={classes["footer-col"]}>
            <h3>COMPANY</h3>
            <ul className={classes["list-link"]}>
              <li className={classes["item-link"]}>What we do</li>
              <li className={classes["item-link"]}>Available Services</li>
              <li className={classes["item-link"]}>Latest Posts</li>
              <li className={classes["item-link"]}>FAQs</li>
            </ul>
          </div>
          <div className={classes["footer-col"]}>
            <h3>SOCIAL MEDIA</h3>
            <ul className={classes["list-link"]}>
              <li className={classes["item-link"]}>Twitter</li>
              <li className={classes["item-link"]}>Instagram</li>
              <li className={classes["item-link"]}>Facebook</li>
              <li className={classes["item-link"]}>Pinterest</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
