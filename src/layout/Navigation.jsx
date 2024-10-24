// Import Module
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionSidebarMenu, actionUser } from "../redux/actionRedux";
import APIServer from "../API/customAPI";

// Import File CSS
import classes from "./css/navigation.module.css";

// Import Components
import { NavLink, Link } from "react-router-dom";

// Import Icons
import { FaOpencart } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { HiOutlineMenu } from "react-icons/hi";
import MenuUserDd from "./MenuUserDd";

export default function Navigation() {
  // Create + use Hooks
  const navRef = useRef();
  const dispatch = useDispatch();
  const firstRenderFlag = useRef(true);
  const numberQuantityRef = useRef();

  // Create + use states
  const { isLoggedIn, cart } = useSelector((state) => state.user);
  const [isShowMenuDb, setIsShowMenuDb] = useState(false);

  // Side Effect
  // ---- Side Effect: Scroll Nav
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

  // ---- Side Effect: Animation when cart change by buy or add to cart
  useEffect(() => {
    // Check if first access in browser => return false

    if (isLoggedIn && firstRenderFlag.current) {
      firstRenderFlag.current = false;
      return;
    }

    if (firstRenderFlag && numberQuantityRef.current) {
      numberQuantityRef.current.classList.add(classes["update"]);

      const timer = setTimeout(() => {
        numberQuantityRef.current.classList.remove(classes["update"]);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [cart.items]);

  // Create + use event handles
  const showMenuUserDbHandle = (e) => {
    e.preventDefault();
    setIsShowMenuDb(!isShowMenuDb);
  };

  const showSidebarMenuHandle = () => {
    dispatch(actionSidebarMenu.show());
  };

  const logoutHandle = async () => {
    try {
      const res = await APIServer.user.getLogout();
      const { message } = res.data;

      if (res.status === 200) {
        alert(message);
        return dispatch(actionUser.logout());
      }
    } catch (error) {
      console.log(error);
    }
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
                  <span
                    className={classes["cart-quantity"]}
                    ref={numberQuantityRef}
                  >
                    {cart.items.length}
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
                  <>
                    <NavLink
                      to="/user"
                      className={({ isActive }) =>
                        isActive
                          ? `${classes["link-item"]} ${classes["link-item-active"]}`
                          : classes["link-item"]
                      }
                      onClick={showMenuUserDbHandle}
                    >
                      User
                    </NavLink>
                    <button
                      type="button"
                      className={classes["btn-logout"]}
                      onClick={logoutHandle}
                    >
                      Logout
                    </button>
                    <MenuUserDd isShowMenuDb={isShowMenuDb} />
                  </>
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
