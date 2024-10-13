// Import Modules
import React, { useState, useEffect } from "react";

// Import File CSS
import classes from "./css/description.module.css";

export default function Description({ longDesc }) {
  // Create + use Hooks
  const [listDesc, setListDesc] = useState([]);

  useEffect(() => {
    if (longDesc.includes("•")) {
      setListDesc(longDesc.split("•"));
    } else {
      setListDesc(longDesc.split("-"));
    }
  }, [longDesc]);

  return (
    <div className={classes["description"]}>
      <p className={classes["title"]}>DESCRIPTION</p>
      <h3>PRODUCT DESCRIPTION</h3>
      <div className={classes["content-flex"]}>
        {listDesc.map((item, index) => (
          <p key={index} className={classes["content"]}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
