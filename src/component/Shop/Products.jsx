// Import Modules
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Import File CSS
import classes from "./css/products.module.css";
import "./css/pagination.css";

// Import Icons
import { IoIosCloseCircle } from "react-icons/io";

// Import Components
import { Pagination } from "antd";
import SidebarShop from "../../UI/SidebarShop";

export default function Products({ products }) {
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

  // Create + use Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const pageCurrent = location.search.split("page=")[1];

  // Create + use States
  const [nameProduct, setNameProduct] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);

  // Side Effects
  useEffect(() => {
    // Check when starting go page Shop
    if (nameProduct.length === 0) {
      setSearchProducts(products.data);
    }
  }, [products]);

  // Create + use event handles
  const searchProductHandle = (e) => {
    const valueSearch = e.target.value;
    setNameProduct(valueSearch);

    // Check if the search input is empty
    if (valueSearch === "") {
      setSearchProducts(products.data); // Reset to all products if search is empty
    } else {
      // Filter products by search
      const filteredProducts = products.data.filter((p) =>
        p.name.includes(valueSearch)
      );
      setSearchProducts(filteredProducts);
    }
  };

  const clearInputSearchHandle = () => {
    setNameProduct("");
    setSearchProducts(products.data);
  };

  const viewProductHandle = (product) => {
    const pathProductName = product.name
      .replace(/\s*-\s*/g, "-")
      .replace(/\s+/g, "-");

    navigate(`../product/${pathProductName}`, {
      state: { productDetail: product },
    });
  };

  const filterProductByOptionHandle = (e) => {
    const valueOption = e.target.value;

    if (location.search === "") {
      navigate(`?category=all&option=${valueOption}`);
      return false;
    }

    if (location.search !== "") {
      let newPathSearch = location.search;

      if (newPathSearch.includes("&option=")) {
        newPathSearch = newPathSearch.slice(0, newPathSearch.indexOf("&"));
      }
      navigate(`${newPathSearch}&option=${valueOption}`);
    }
  };

  const showProductByPageHandle = (page, pageSize) => {
    let newPathSearch = location.search;

    if (location.search === "") {
      navigate(`?category=all&page=${page}`);
      return false;
    }

    if (newPathSearch.includes("&page=")) {
      newPathSearch = newPathSearch.slice(0, newPathSearch.indexOf("&"));
    }
    navigate(`${newPathSearch}&page=${page}`);
  };

  return (
    <div className={classes["products"]}>
      <div className={classes["products-container"]}>
        <SidebarShop
          onSearchProduct={searchProductHandle}
          onFilterProductByOption={filterProductByOptionHandle}
        />
        <div className={classes["products-header"]}>
          <div className={classes["form-input-name"]}>
            <input
              className={classes["input"]}
              type="text"
              placeholder="Enter Search Here!"
              name="name"
              id="name"
              value={nameProduct}
              onChange={searchProductHandle}
            />
            {nameProduct.length > 0 && (
              <IoIosCloseCircle
                className={classes["icon-close"]}
                onClick={clearInputSearchHandle}
              />
            )}
          </div>
          <div className={classes["select-container"]}>
            <select
              className={classes["form-select"]}
              onChange={filterProductByOptionHandle}
            >
              {DUMMY_OPTIONS.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={classes["products-section"]}>
          <div className={classes["products-flex"]}>
            {searchProducts.map((p) => (
              <div key={p._id} className={classes["item-product"]}>
                <div
                  className={classes["item-product-image"]}
                  onClick={() => viewProductHandle(p)}
                >
                  <img src={p.images[0]} alt={p.images[0]} loading="lazy" />
                </div>
                <div className={classes["item-product-info"]}>
                  <p className={classes["info-name"]}>{p.name}</p>
                  <p className={classes["info-price"]}>{p.price} VND</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Pagination
          className="pagination"
          defaultCurrent={pageCurrent ? pageCurrent : 1}
          pageSize={8}
          total={products.totalProducts}
          onChange={showProductByPageHandle}
        />
      </div>
    </div>
  );
}
