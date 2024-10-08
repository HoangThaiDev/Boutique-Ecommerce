// Import Modules
import React from "react";

// Import File CSS
import classes from "./css/serviceFeatures.module.css";

export default function ServiceFeatures() {
  // Create + use DUMMY_DATA
  const DUMMY_SERVICES = [
    { id: "sv1", name: "FREE SHIPPING", value: "Free shipping worldwide" },
    { id: "sv2", name: "24 x 7 SERVICE", value: "Free shipping worldwide" },
    { id: "sv3", name: "FESTIVAL OFFER", value: "Free shipping worldwide" },
  ];

  return (
    <div className={classes["service-features"]}>
      <div className={classes["service-features-container"]}>
        <div className={classes["service-features-row"]}>
          {DUMMY_SERVICES.map((service) => (
            <div key={service.id} className={classes["service-features-col"]}>
              <h3 className={classes["service-item-name"]}>{service.name}</h3>
              <p className={classes["service-item-value"]}>{service.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
