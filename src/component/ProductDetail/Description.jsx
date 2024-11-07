// Import Modules
import React, { useState, useEffect } from "react";

// Import File CSS
import classes from "./css/description.module.css";

export default function Description({ longDesc }) {
  // Create + use Hooks
  const DUMMY_DESC_PRODUCT = longDesc.split(";");

  return (
    <div className={classes["description"]}>
      <p className={classes["title"]}>DESCRIPTION</p>
      <h3>PRODUCT DESCRIPTION</h3>
      <p className={classes["label"]}>ĐẶC ĐIỂM NỔI BẬT</p>
      <div className={classes["content-flex"]}>
        {DUMMY_DESC_PRODUCT.map((item, index) => (
          <p key={index} className={classes["content"]}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
