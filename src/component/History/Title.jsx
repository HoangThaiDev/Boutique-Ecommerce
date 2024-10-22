// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/title.module.css";

export default function Title() {
  // Create + use DUMMY Array
  const DUMMY_HEADER_CART = [
    { id: "hd1", label: "ID ORDER", className: "order-id" },
    { id: "hd2", label: "ID USER", className: "user-id" },
    { id: "hd3", label: "NAME", className: "name" },
    { id: "hd4", label: "PHONE", className: "phone" },
    { id: "hd5", label: "ADDRESS", className: "address" },
    { id: "hd6", label: "TOTAL", className: "total" },
    { id: "hd7", label: "DELIVERY", className: "delivery" },
    { id: "hd8", label: "STATUS", className: "status" },
    { id: "hd9", label: "DETAIL", className: "detail" },
  ];

  return (
    <div className={classes["title-flex"]}>
      {DUMMY_HEADER_CART.map((item) => (
        <div
          key={item.id}
          className={`${classes["bg-title"]} ${classes[item.className]}`}
        >
          <h4>{item.label}</h4>
        </div>
      ))}
    </div>
  );
}
