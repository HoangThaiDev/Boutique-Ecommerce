// Import Modules
import React, { useEffect, useState } from "react";

// Import File CSS
import classes from "./css/images.module.css";

// Import Components
import SliderImage from "../../UI/SliderImage";

export default function Images({ images }) {
  // Create + use Hooks
  const [imageActive, setImageActive] = useState("");
  const [showSliderImages, setShowSliderImages] = useState(false);

  // Side Effects
  useEffect(() => {
    setImageActive(images[0]);
  }, [images]);

  useEffect(() => {
    const checkWidthDevice = () => {
      window.innerWidth < 765
        ? setShowSliderImages(true)
        : setShowSliderImages(false);
    };

    window.addEventListener("resize", checkWidthDevice);

    return () => {
      window.removeEventListener("resize", checkWidthDevice);
    };
  }, []);

  // Create + use event Handles
  const changeImageActive = (imgPath) => {
    setImageActive(imgPath);
  };

  return (
    <>
      {showSliderImages && <SliderImage images={images} />}
      {!showSliderImages && (
        <div className={classes["image-flex"]}>
          <div className={classes["image-list"]}>
            {images.map((img, index) => (
              <img
                className={classes["image-item"]}
                key={index}
                src={img}
                alt={img}
                loading="lazy"
                onClick={() => changeImageActive(img)}
              />
            ))}
          </div>
          <div className={classes["image-active"]}>
            <img src={imageActive} alt={imageActive} loading="lazy" />
          </div>
        </div>
      )}
    </>
  );
}
