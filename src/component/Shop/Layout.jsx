// Import Modules
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import APIServer from "../../API/customAPI";
import { useDispatch, useSelector } from "react-redux";
import { actionSidebarShop } from "../../redux/actionRedux";

// Import File CSS
import classes from "./css/layout.module.css";

// Import Components
import Navbar from "./Navbar";
import Products from "./Products";

// Import Icons
import { CgMenuRight } from "react-icons/cg";

export default function Layout() {
  // Create + use Hooks
  const location = useLocation();
  const dispatch = useDispatch();

  // Create + use state
  const [products, setProducts] = useState({
    data: [],
    totalProducts: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { isShow: isShowSidebarShop } = useSelector(
    (state) => state.sidebarShop
  );

  // Side Effect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await APIServer.shop.getProductsByQuery(location.search);
        const { products, totalProducts } = res.data;
        console.log(products);

        setProducts({ data: products, totalProducts: totalProducts });
        setIsLoading(true);
      } catch (error) {
        const { data } = error.response;
        alert(data.message);
      }
    };

    fetchProducts();
  }, [location.search]);

  // Create + use event handles
  const showSidebarShopHandle = () => {
    dispatch(actionSidebarShop.show());
  };

  return (
    <div className={classes["shop"]}>
      <div className={classes["shop-container"]}>
        {!isShowSidebarShop && (
          <CgMenuRight
            className={classes["icon-menu-shop"]}
            onClick={showSidebarShopHandle}
          />
        )}
        <div className={classes["shop-row"]}>
          <div className={`${classes["shop-col"]} ${classes["col-navbar"]}`}>
            <Navbar />
          </div>
          <div className={`${classes["shop-col"]} ${classes["col-products"]}`}>
            {isLoading && <Products products={products} />}
          </div>
        </div>
      </div>
    </div>
  );
}
