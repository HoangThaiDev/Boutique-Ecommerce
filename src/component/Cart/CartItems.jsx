// Import Modules
import React from "react";
import { actionUser } from "../../redux/actionRedux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import APIServer from "../../API/customAPI";

// Import File CSS
import classes from "./css/cartItems.module.css";

// Import Icons
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

// Import Components
import Toastify from "../../UI/Toastify";

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
  const dispatch = useDispatch();

  // Create + use States
  const { cart, totalPrice } = useSelector((state) => state.user);

  // Create + use event handles
  const deleteItemHandle = async (itemId) => {
    try {
      const res = await APIServer.cart.deleteItem(itemId);
      const { cart, totalPrice } = res.data;

      if (res.status === 200) {
        dispatch(actionUser.deleteItemCart({ cart, totalPrice }));
        toast.success("Delete Product Success!", {
          position: "top-right",
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          className: "toast-cart-success",
        });
      }
    } catch (error) {
      const { data } = error.response;
      toast.error(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "toast-cart-error",
      });
    }
  };

  const changeQuantityHandle = (e, option, itemId) => {
    // Find item in items
    const findIndexItem = cart.items.findIndex((item) => item._id === itemId);

    switch (option) {
      case "input":
        const valueInput = e.target.value;
        dispatch(
          actionUser.updateCart({
            qty: valueInput,
            option: "input",
            itemIndex: findIndexItem,
          })
        );
        break;
      case "increase":
        if (cart.items[findIndexItem].quantity < 20) {
          dispatch(
            actionUser.updateCart({
              qty: 1,
              option: "increase",
              itemIndex: findIndexItem,
            })
          );
        }
        break;
      case "decrease":
        if (cart.items[findIndexItem].quantity > 1) {
          dispatch(
            actionUser.updateCart({
              qty: 1,
              option: "decrease",
              itemIndex: findIndexItem,
            })
          );
        }
        break;
      default:
        alert("Error with action!");
        break;
    }
  };

  const goShopHandle = () => {
    navigate("/shop");
  };

  const goCheckoutHandle = async () => {
    try {
      const res = await APIServer.cart.updateCart({ cart, totalPrice });
      if (res.status === 200) {
        navigate("/checkout");
      }
    } catch (error) {
      const { data } = error.response;
      alert(data.message);
    }
  };

  return (
    <div className={classes["cart-items"]}>
      <Toastify
        bodyClassName="toast-body-cart"
        position="top-right"
        className="toast-cart-container"
      />
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

        {cart.items.length === 0 && (
          <h2 className={classes["message-cart-client"]}>
            Your shopping cart is currently empty!
          </h2>
        )}

        {/* JSX: Cart Items Section */}
        {cart.items.length > 0 && (
          <>
            {cart.items.map((item) => (
              <div className={classes["cart-items-section"]} key={item._id}>
                <div className={`${classes["bg-content"]} ${classes["image"]}`}>
                  <img
                    className={classes["image-item"]}
                    src={item.itemId.images[0]}
                    alt={item.itemId.images[0]}
                    loading="lazy"
                  />
                </div>

                <div
                  className={`${classes["bg-content"]} ${classes["product"]}`}
                >
                  <p>{item.itemId.name}</p>
                </div>
                <div className={`${classes["bg-content"]} ${classes["price"]}`}>
                  <span className={classes["value"]}>{item.itemId.price}</span>
                  <span className={classes["unit"]}>VND</span>
                </div>
                <div
                  className={`${classes["bg-content"]} ${classes["quantity"]}`}
                >
                  <IoMdArrowDropleft
                    className={`${classes["icon-quantity"]} ${classes["icon-decrease"]}`}
                    onClick={() =>
                      changeQuantityHandle(null, "decrease", item._id)
                    }
                  />
                  <input
                    className={classes["input-quantity"]}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => changeQuantityHandle(e, "input", item._id)}
                  />
                  <IoMdArrowDropright
                    className={`${classes["icon-quantity"]} ${classes["icon-increase"]}`}
                    onClick={() =>
                      changeQuantityHandle(null, "increase", item._id)
                    }
                  />
                </div>
                <div className={`${classes["bg-content"]} ${classes["total"]}`}>
                  <span className={classes["value"]}>
                    {item.totalPriceItem}
                  </span>
                  <span className={classes["unit"]}>VND</span>
                </div>
                <div
                  className={`${classes["bg-content"]} ${classes["action"]}`}
                >
                  <RiDeleteBin6Line
                    className={classes["icon-delete"]}
                    onClick={() => deleteItemHandle(item._id)}
                  />
                </div>
              </div>
            ))}
            {/* JSX: Cart Items Footer */}
            <div className={classes["cart-items-footer"]}>
              <div
                className={classes["footer-action-shop"]}
                onClick={goShopHandle}
              >
                <FaLongArrowAltLeft
                  className={`${classes["icon-arrow"]} ${classes["icon-prev"]}`}
                />
                <p>Continue shopping</p>
              </div>
              <div
                className={classes["footer-action-checkout"]}
                onClick={goCheckoutHandle}
              >
                <p>Proceed to checkout</p>
                <FaLongArrowAltRight
                  className={`${classes["icon-arrow"]} ${classes["icon-next"]}`}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
