// Import Modules
import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionSidebarShop } from "../redux/actionRedux";

// Import File CSS
import classes from "./css/sidebarShop.module.css";
import "./css/menu.css";

// Import Icons
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

// Import Components
import Overlay from "./Overlay";
import { Menu } from "antd";

// Create + use options
const DUMMY_OPTIONS = [
  {
    id: "op1",
    name: "Default Sorting",
    value: "default",
  },
  {
    id: "op2",
    name: "Increase ↑",
    value: "increase",
  },
  {
    id: "op3",
    name: "Decrease ↓",
    value: "decrease",
  },
  {
    id: "op4",
    name: "A → Z",
    value: "A - Z",
  },
  {
    id: "op5",
    name: "Z → A",
    value: "Z - A",
  },
];

// Crete + use navbar Category from Ant-design
function getItem(label, key, children) {
  return {
    key,
    children,
    label,
  };
}

const items = [
  getItem("APPLE", "apple", [
    getItem("ALL", "all", null),
    getItem("IPHONE & MAC", "iphone_mac", [
      getItem("Iphone", "iphone", null),
      getItem("Ipad", "ipad", null),
      getItem("Macbook", "macbook", null),
    ]),
    getItem("WIRELESS", "wireless", [
      getItem("Airpod", "airpod", null),
      getItem("Watch", "watchs", null),
    ]),
    getItem("OTHER", "others", [
      getItem("Mouse", "mouse", null),
      getItem("Keyboard", "keyboard", null),
      getItem("Other", "other", null),
    ]),
  ]),
];

const Sidebar = ({
  isShowSidebarShop,
  onCloseSidebarShop,
  dispatch,
  onSearchProduct,
  onFilterProductByOption,
}) => {
  // Create + use Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const valueCategoryFromPath = useMemo(() => {
    return location.search.split("=")[1];
  }, [location]);

  // Create + use States
  const [searchProducts, setSearchProducts] = useState([]);
  const [nameProduct, setNameProduct] = useState("");
  const [pathSelected, setPathSelected] = useState(valueCategoryFromPath);

  // Create + use event handles
  const chooseTypeHander = (e) => {
    // Check if choose category === setPathSelected => category = all
    if (e.key === pathSelected) {
      setPathSelected("");
      navigate(``);
    }

    if (e.key !== pathSelected) {
      setPathSelected(e.key);
      navigate(`?category=${e.key}`);
    }
  };

  return (
    <div
      className={
        isShowSidebarShop
          ? `${classes["sidebar-shop"]} ${classes["sidebar-shop-active"]}`
          : classes["sidebar-shop"]
      }
    >
      <div className={classes["sidebar-shop-container"]}>
        <div className={classes["sidebar-shop-header"]}>
          <h2>CATEGORIES</h2>
          <IoClose
            className={`${classes["icon"]} ${classes["icon-close"]}`}
            onClick={onCloseSidebarShop}
          />
        </div>

        <div className={classes["sidebar-shop-form"]}>
          <div className={classes["form-input-name"]}>
            <input
              className={classes["input"]}
              type="text"
              placeholder="Enter Search Here!"
              name="name"
              id="name"
              // value={nameProduct}
              onChange={onSearchProduct}
            />
            {nameProduct.length > 0 && (
              <IoIosCloseCircle
                className={classes["icon-close-input"]}
                // onClick={clearInputSearchHandle}
              />
            )}
          </div>
          <div className={classes["select-container"]}>
            <select
              className={classes["form-select"]}
              onChange={onFilterProductByOption}
            >
              {DUMMY_OPTIONS.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <Menu
            className="menu-sidebar-shop"
            onClick={chooseTypeHander}
            defaultSelectedKeys={["apple"]}
            defaultOpenKeys={["apple", "iphone_mac", "wireless", "others"]}
            mode="inline"
            selectedKeys={pathSelected}
            items={items}
          />
        </div>
      </div>
    </div>
  );
};

export default function SidebarShop({
  onSearchProduct,
  onFilterProductByOption,
}) {
  // Create + use Hooks
  const dispatch = useDispatch();
  const location = useLocation();
  const { isShow: isShowSidebarShop } = useSelector(
    (state) => state.sidebarShop
  );

  // Side Effect
  useEffect(() => {
    dispatch(actionSidebarShop.hide());
  }, [location]);

  // Create + use event handles
  const closeSidebarShopHandle = () => {
    dispatch(actionSidebarShop.hide());
  };

  return (
    <>
      {createPortal(
        <Overlay isShow={isShowSidebarShop} onClose={closeSidebarShopHandle} />,
        document.getElementById("overlay")
      )}
      <Sidebar
        dispatch={dispatch}
        isShowSidebarShop={isShowSidebarShop}
        onCloseSidebarShop={closeSidebarShopHandle}
        onSearchProduct={onSearchProduct}
        onFilterProductByOption={onFilterProductByOption}
      />
    </>
  );
}
