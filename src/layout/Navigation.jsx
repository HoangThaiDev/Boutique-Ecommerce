// Import Module
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const navRef = useRef();
  const dispatch = useDispatch();
  const { isLoggedIn, cart } = useSelector((state) => state.user);

  // Side Effect
  useEffect(() => {
    const scrollNav = () => {
      window.scrollY > 100
        ? navRef.current.classList.add(classes["scroll"])
        : navRef.current.classList.remove(classes["scroll"]);
    };

    window.addEventListener("scroll", scrollNav);

    return () => {
      window.removeEventListener("scroll", scrollNav);
    };
  }, []);

  // Create + use event handles
  const showSidebarMenuHandle = () => {
    dispatch(actionSidebarMenu.show());
  };

  return (
    <div className={classes["navigate"]} ref={navRef}>
      <div className={classes["navigate-container"]}>
        <div className={classes["row"]}>
          {/* JSX:----------------- Col Left -------------------*/}
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

          {/* JSX:----------------- Col Center -------------------*/}
          <div className={`${classes["col"]} ${classes["col-center"]}`}>
            <div className={classes["box-logo"]}>
              <Link to="/">BOUTIQUE</Link>
            </div>
          </div>

          {/* JSX:----------------- Col Right -------------------*/}
          <div className={`${classes["col"]} ${classes["col-right"]}`}>
            <ul className={classes["list-items"]}>
              <li>
                {isLoggedIn && (
                  <span className={classes["cart-quantity"]}>
                    {cart.length}
                  </span>
                )}
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
                {isLoggedIn ? (
                  <NavLink
                    to="/setting-user"
                    className={({ isActive }) =>
                      isActive
                        ? `${classes["link-item"]} ${classes["link-item-active"]}`
                        : classes["link-item"]
                    }
                  >
                    User
                  </NavLink>
                ) : (
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
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
