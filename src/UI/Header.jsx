// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/header.module.css";

export default function Header({ title, path }) {
  return (
    <div className={classes["header"]}>
      <div className={classes["header-container"]}>
        <h2 className={classes["title"]}>{title}</h2>
        <p className={classes["content"]}>{path}</p>
      </div>
    </div>
  );
}
