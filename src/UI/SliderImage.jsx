// Import Modules
import React from "react";
import Slider from "react-slick";

// Import File CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/sliderImage.css";

function CustomSlide(props) {
  const { index, img, totalImage, ...otherProps } = props;

  return (
    <div {...otherProps} className="image-item">
      <img src={img} alt={img} loading="lazy" />
    </div>
  );
}

export default function SliderImage({ images }) {
  // Create + use setting of Slider
  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <CustomSlide
            index={index}
            key={index}
            img={img}
            totalImage={images.length}
          />
        ))}
      </Slider>
    </div>
  );
}
