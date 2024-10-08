// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/header.module.css";

// Import Image
import bannerImage from "../../assets/images/banner1.jpg";

// Import Components
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={classes["header"]}>
      <div className={classes["header-container"]}>
        <img
          className={classes["banner-image"]}
          src={bannerImage}
          alt={bannerImage}
        />
        <div className={classes["header-main"]}>
          <p>NEW INSPIRATION 2020</p>
          <h2>20% OFF ON NEW SEASON</h2>
          <Link to="/shop">Browse collections</Link>
        </div>
      </div>
    </div>
  );
}
