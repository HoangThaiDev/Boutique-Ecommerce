// Import Modules
import React, { useState } from "react";

// Import File CSS
import classes from "./css/cartItems.module.css";

// Import Icons
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

// Import Components
import { Link, useNavigate } from "react-router-dom";

export default function CartItems() {
  // Create + use array DUMMY
  const DUMMY_HEADER_CART = [
    { id: "hd1", label: "IMAGE", className: "image" },
    { id: "hd2", label: "PRODUCT", className: "product" },
    { id: "hd3", label: "PRICE", className: "price" },
    { id: "hd4", label: "QUANTITY", className: "quantity" },
    { id: "hd5", label: "TOTAL", className: "total" },
    { id: "hd6", label: "ACTION", className: "action" },
  ];

  // Create + use Hooks
  const navigate = useNavigate();

  // Create + use States
  const [quantityItem, setQuantityItem] = useState(1);

  // Create + use event handles
  const changeQuantityHandle = (e, option) => {
    switch (option) {
      case "input":
        const valueInput = e.target.value;
        setQuantityItem(valueInput);
        break;
      case "increase":
        if (quantityItem < 20) {
          setQuantityItem((prev) => Number(prev) + 1);
        }
        break;
      case "decrease":
        if (quantityItem > 1) {
          setQuantityItem((prev) => Number(prev) - 1);
        }
        break;
      default:
        setQuantityItem(1);
        break;
    }
  };

  const backToShopHandle = () => {
    navigate("/shop");
  };

  const goToCheckoutHandle = () => {
    navigate("/checkout");
  };

  return (
    <div className={classes["cart-items"]}>
      <div className={classes["cart-items-container"]}>
        {/* JSX: Cart Items Header */}
        <div className={classes["cart-items-header"]}>
          {DUMMY_HEADER_CART.map((item) => (
            <div
              key={item.id}
              className={`${classes["bg-title"]} ${classes[item.className]}`}
            >
              <h4>{item.label}</h4>
            </div>
          ))}
        </div>

        {/* JSX: Cart Items Section */}
        <div className={classes["cart-items-section"]}>
          <div className={`${classes["bg-content"]} ${classes["image"]}`}>
            <img
              className={classes["image-item"]}
              src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg"
              alt=""
              loading="lazy"
            />
          </div>

          <div className={`${classes["bg-content"]} ${classes["product"]}`}>
            <p>Apple iPhone 11 64GB</p>
          </div>
          <div className={`${classes["bg-content"]} ${classes["price"]}`}>
            <span className={classes["value"]}>10.999.000</span>
            <span className={classes["unit"]}>VND</span>
          </div>
          <div className={`${classes["bg-content"]} ${classes["quantity"]}`}>
            <IoMdArrowDropleft
              className={`${classes["icon-quantity"]} ${classes["icon-decrease"]}`}
              onClick={() => changeQuantityHandle(null, "decrease")}
            />
            <input
              className={classes["input-quantity"]}
              type="number"
              value={quantityItem}
              onChange={(e) => changeQuantityHandle(e, "input")}
            />
            <IoMdArrowDropright
              className={`${classes["icon-quantity"]} ${classes["icon-increase"]}`}
              onClick={() => changeQuantityHandle(null, "increase")}
            />
          </div>
          <div className={`${classes["bg-content"]} ${classes["total"]}`}>
            <span className={classes["value"]}>10.999.000</span>
            <span className={classes["unit"]}>VND</span>
          </div>
          <div className={`${classes["bg-content"]} ${classes["action"]}`}>
            <RiDeleteBin6Line className={classes["icon-delete"]} />
          </div>
        </div>
        <div className={classes["cart-items-section"]}>
          <div className={`${classes["bg-content"]} ${classes["image"]}`}>
            <img
              className={classes["image-item"]}
              src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg"
              alt=""
              loading="lazy"
            />
          </div>

          <div className={`${classes["bg-content"]} ${classes["product"]}`}>
            <p>Apple iPhone 11 64GB</p>
          </div>
          <div className={`${classes["bg-content"]} ${classes["price"]}`}>
            <span className={classes["value"]}>10.999.000</span>
            <span className={classes["unit"]}>VND</span>
          </div>
          <div className={`${classes["bg-content"]} ${classes["quantity"]}`}>
            <IoMdArrowDropleft
              className={`${classes["icon-quantity"]} ${classes["icon-decrease"]}`}
              onClick={() => changeQuantityHandle(null, "decrease")}
            />
            <input
              className={classes["input-quantity"]}
              type="number"
              value={quantityItem}
              onChange={(e) => changeQuantityHandle(e, "input")}
            />
            <IoMdArrowDropright
              className={`${classes["icon-quantity"]} ${classes["icon-increase"]}`}
              onClick={() => changeQuantityHandle(null, "increase")}
            />
          </div>
          <div className={`${classes["bg-content"]} ${classes["total"]}`}>
            <span className={classes["value"]}>10.999.000</span>
            <span className={classes["unit"]}>VND</span>
          </div>
          <div className={`${classes["bg-content"]} ${classes["action"]}`}>
            <RiDeleteBin6Line className={classes["icon-delete"]} />
          </div>
        </div>
        {/* JSX: Cart Items Footer */}
        <div className={classes["cart-items-footer"]}>
          <div
            className={classes["footer-action-shop"]}
            onClick={backToShopHandle}
          >
            <FaLongArrowAltLeft
              className={`${classes["icon-arrow"]} ${classes["icon-prev"]}`}
            />
            <p>Continue shopping</p>
          </div>
          <div
            className={classes["footer-action-checkout"]}
            onClick={goToCheckoutHandle}
          >
            <p>Proceed to checkout</p>
            <FaLongArrowAltRight
              className={`${classes["icon-arrow"]} ${classes["icon-next"]}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
