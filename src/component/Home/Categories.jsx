// Import Modules
import React from "react";
import { useNavigate } from "react-router-dom";

// Import File CSS
import classes from "./css/categories.module.css";

// Import images
import bannerIphone from "../../assets/images/product_1.png";
import bannerMac from "../../assets/images/product_2.png";
import bannerIpad from "../../assets/images/product_3.png";
import bannerWatch from "../../assets/images/product_4.png";
import bannerAirPod from "../../assets/images/product_5.png";

export default function Categories() {
  // Create DUMMY_DATA
  const DUMMY_CATEGORIES = [
    {
      id: "category_1",
      category: "iphone",
      banner: bannerIphone,
      className: "banner-iphone",
    },
    {
      id: "category_2",
      category: "mac",
      banner: bannerMac,
      className: "banner-mac",
    },
    {
      id: "category_3",
      category: "ipad",
      banner: bannerIpad,
      className: "banner-ipad",
    },
    {
      id: "category_4",
      category: "watch",
      banner: bannerWatch,
      className: "banner-watch",
    },
    {
      id: "category_5",
      category: "airpod",
      banner: bannerAirPod,
      className: "banner-airpod",
    },
  ];

  // Create + use Hooks
  const navigate = useNavigate();

  // Create + use event handles
  const navigateShopHandle = (categoryId) => {
    navigate(`./shop?category=${categoryId}`);
  };

  return (
    <div className={classes["category"]}>
      <div className={classes["category-container"]}>
        <div className={classes["category-header"]}>
          <p>CAREFULLY CREATED COLLECTIONS</p>
          <h2>BROWSE OUT CATEGORIES</h2>
        </div>

        <div className={classes["category-main"]}>
          {DUMMY_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className={classes["image-item"]}
              onClick={() => navigateShopHandle(category.category)}
            >
              <img
                className={classes[category.className]}
                src={category.banner}
                alt={category.banner}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
