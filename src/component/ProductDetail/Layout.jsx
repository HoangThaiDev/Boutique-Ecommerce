// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/layout.module.css";

// Import Components
import Info from "./Info";
import Images from "./Images";
import Description from "./Description";
import RelatedProduct from "./RelatedProduct";

export default function Layout() {
  return (
    <div className={classes["product-detail-layout"]}>
      <div className={classes["product-detail-container"]}></div>
    </div>
  );
}
