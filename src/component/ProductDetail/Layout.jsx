// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/layout.module.css";

// Import Components
import Info from "./Info";
import Images from "./Images";
import Description from "./Description";
import RelatedProduct from "./RelatedProduct";

export default function Layout({ product }) {
  return (
    <div className={classes["product-detail"]}>
      <div className={classes["product-detail-container"]}>
        <div className={classes["row"]}>
          <div className={`${classes["col"]} ${classes["col-images"]}`}>
            <Images images={product.images} />
          </div>
          <div className={`${classes["col"]} ${classes["col-info"]}`}>
            <Info product={product} />
          </div>
          <div className={`${classes["col"]} ${classes["col-desc"]}`}>
            <Description longDesc={product.long_desc} />
          </div>
          <div
            className={`${classes["col"]} ${classes["col-related-product"]}`}
          >
            <RelatedProduct product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
