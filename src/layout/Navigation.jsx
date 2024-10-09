// Import Module
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionSidebarMenu } from "../redux/actionRedux";

// Import File CSS
import classes from "./css/navigation.module.css";

// Import Components
import { NavLink, Link } from "react-router-dom";

// Import Icons
import { FaOpencart } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { HiOutlineMenu } from "react-icons/hi";

export default function Navigation() {
  // Create + use Hooks
  const dispatch = useDispatch();

  // Create + use event handles
  const showSidebarMenuHandle = () => {
    dispatch(actionSidebarMenu.show());
  };

  return (
    <div className={classes["navigate"]}>
      <div className={classes["navigate-container"]}>
        <div className={classes["row"]}>
          <div className={`${classes["col"]} ${classes["col-left"]}`}>
            <HiOutlineMenu
              className={`${classes["icon"]} ${classes["icon-menu-nav"]} `}
              onClick={showSidebarMenuHandle}
            />
            <ul className={classes["list-items"]}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? `${classes["link-item"]} ${classes["link-item-active"]}`
                      : classes["link-item"]
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive
                      ? `${classes["link-item"]} ${classes["link-item-active"]}`
                      : classes["link-item"]
                  }
                >
                  Shop
                </NavLink>
              </li>
            </ul>
          </div>
          <div className={`${classes["col"]} ${classes["col-center"]}`}>
            <div className={classes["box-logo"]}>
              <Link to="/">BOUTIQUE</Link>
            </div>
          </div>
          <div className={`${classes["col"]} ${classes["col-right"]}`}>
            <ul className={classes["list-items"]}>
              <li>
                <span className={classes["cart-quantity"]}>0</span>
                <FaOpencart
                  className={`${classes["icon"]} ${classes["icon-cart"]}`}
                />
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? `${classes["link-item"]} ${classes["link-item-active"]}`
                      : classes["link-item"]
                  }
                >
                  Cart
                </NavLink>
              </li>
              <li>
                <LuUser2
                  className={`${classes["icon"]} ${classes["icon-user"]}`}
                />
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? `${classes["link-item"]} ${classes["link-item-active"]}`
                      : classes["link-item"]
                  }
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
