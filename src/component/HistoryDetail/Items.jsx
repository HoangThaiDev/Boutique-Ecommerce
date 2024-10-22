// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/items.module.css";

export default function Items({ items }) {
  console.log(items);

  // Create + use array DUMMY
  const DUMMY_HEADER_CART = [
    { id: "hd1", label: "ID PRODUCT", className: "product-id" },
    { id: "hd2", label: "IMAGE", className: "image" },
    { id: "hd3", label: "NAME", className: "name" },
    { id: "hd4", label: "PRICE", className: "price" },
    { id: "hd5", label: "QUANTITY", className: "quantity" },
  ];
  return (
    <div className={classes["order"]}>
      <div className={classes["order-container"]}>
        <div className={classes["order-header"]}>
          {DUMMY_HEADER_CART.map((item) => (
            <div
              key={item.id}
              className={`${classes["bg-title"]} ${classes[item.className]}`}
            >
              <h4>{item.label}</h4>
            </div>
          ))}
        </div>
        <div className={classes["order-main"]}>
          {items.map((item) => (
            <div className={classes["order-item"]} key={item._id}>
              <div className={`${classes["bg-content"]} ${classes["item-id"]}`}>
                <p>{item.itemId._id}</p>
              </div>
              <div className={`${classes["bg-content"]} ${classes["image"]}`}>
                <img
                  className={classes["image-item"]}
                  src={item.itemId.images[0]}
                  alt={item.itemId.images[0]}
                  loading="lazy"
                />
              </div>
              <div className={`${classes["bg-content"]} ${classes["name"]}`}>
                <p>{item.itemId.name}</p>
              </div>
              <div className={`${classes["bg-content"]} ${classes["price"]}`}>
                <p>{item.totalPriceItem} VND</p>
              </div>
              <div
                className={`${classes["bg-content"]} ${classes["quantity"]}`}
              >
                <p>{item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
