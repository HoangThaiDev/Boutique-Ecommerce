// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/menuUserDb.module.css";

// Import Components
import { useLocation, useNavigate } from "react-router-dom";

export default function MenuUserDd({ isShowMenuDb }) {
  // Create + use Hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Create + use event handles
  const goPageHistoryHandle = (page) => {
    if (location.pathname.length > 0) {
      navigate(`../${page}`);
    } else {
      navigate(page);
    }
  };

  return (
    <div
      className={
        isShowMenuDb
          ? `${classes["menu-user-dropdown"]} ${classes["active"]}`
          : classes["menu-user-dropdown"]
      }
    >
      <div className={classes["menu-user-dropdown-container"]}>
        <ul className={classes["list-link"]}>
          <li className={classes["item-link"]}>
            <a onClick={() => goPageHandle("setting-account")}>
              Setting Account
            </a>
          </li>
          <li className={classes["item-link"]}>
            <a onClick={() => goPageHistoryHandle("history")}>History</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
