// Import Modules
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Import File CSS
import "./css/navbar.css";

// Import Component
import { Menu } from "antd";

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

export default function Navbar() {
  // Create + use Hooks
  const navigate = useNavigate();
  const location = useLocation();

  const valueCategoryFromPath = useMemo(() => {
    return location.search.split("=")[1];
  }, [location]);

  // Create + use States
  const [pathSelected, setPathSelected] = useState(valueCategoryFromPath);

  // Create + use event Handles
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
    <>
      <h3 className="navbar-title">CATEGORIES</h3>
      <Menu
        className="menu-shop"
        onClick={chooseTypeHander}
        defaultSelectedKeys={["apple"]}
        defaultOpenKeys={["apple", "iphone_mac", "wireless", "others"]}
        mode="inline"
        selectedKeys={pathSelected}
        items={items}
      />
    </>
  );
}
