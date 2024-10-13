// Import Modules
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionSidebarMenu } from "../redux/actionRedux";

// Import File CSS
import classes from "./css/sidebarMenu.module.css";

// Import Icons
import { IoClose } from "react-icons/io5";
import { FaOpencart } from "react-icons/fa";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

// Import Components
import { NavLink, useLocation } from "react-router-dom";
import Overlay from "./Overlay";

function Sidebar({ isShowSidebarMenu, onCloseSidebarMenu, isLoggin }) {
  return (
    <div
      className={
        isShowSidebarMenu
          ? `${classes["sidebar-menu"]} ${classes["sidebar-menu-active"]}`
          : classes["sidebar-menu"]
      }
    >
      <div className={classes["sidebar-menu-container"]}>
        <div className={classes["sidebar-header"]}>
          <h2>BOUTIQUE</h2>
          <IoClose
            className={`${classes["icon"]} ${classes["icon-close"]}`}
            onClick={onCloseSidebarMenu}
          />
        </div>
        <div className={classes["sidebar-main"]}>
          <ul className={classes["list-items"]}>
            <li>
              <AiOutlineHome
                className={`${classes["icon"]} ${classes["icon-home"]}`}
              />
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
              <RiShoppingBasket2Line
                className={`${classes["icon"]} ${classes["icon-shop"]}`}
              />
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
            <li>
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
            {isLoggin && (
              <li>
                <BiLogOut
                  className={`${classes["icon"]} ${classes["icon-logout"]}`}
                />
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `${classes["link-item"]} ${classes["link-item-active"]}`
                      : classes["link-item"]
                  }
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function SidebarMenu() {
  // Create + use Hooks
  const dispatch = useDispatch();
  const location = useLocation();
  const { isShow: isShowSidebarMenu } = useSelector(
    (state) => state.sidebarMenu
  );
  const { isLoggin } = useSelector((state) => state.user);

  // Side Effect
  useEffect(() => {
    dispatch(actionSidebarMenu.hide());
  }, [location]);

  // Create + use event handles
  const closeSidebarMenuHandle = () => {
    dispatch(actionSidebarMenu.hide());
  };

  return (
    <>
      {createPortal(
        <Overlay isShow={isShowSidebarMenu} onClose={closeSidebarMenuHandle} />,
        document.getElementById("overlay")
      )}
      <Sidebar
        isLoggin={isLoggin}
        isShowSidebarMenu={isShowSidebarMenu}
        onCloseSidebarMenu={closeSidebarMenuHandle}
      />
    </>
  );
}
