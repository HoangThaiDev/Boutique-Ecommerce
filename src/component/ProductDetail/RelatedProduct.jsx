// Import Modules
import React, { useContext, useMemo } from "react";
import { APIContext } from "../../context/StoreContext";

// Import File CSS
import classes from "./css/relatedProduct.module.css";
import { useNavigate } from "react-router-dom";

export default function RelatedProduct({ product }) {
  // Create + use Hooks
  const { products } = useContext(APIContext);
  const navigate = useNavigate();

  // Filtered products same category & different current product
  const filteredProducts = useMemo(() => {
    return products.filter(
      (item) => item.category === product.category && item._id !== product._id
    );
  }, [product]);

  // Create + use event handles
  const viewProductHandle = (product) => {
    const pathProductName = product.name
      .replace(/\s*-\s*/g, "-")
      .replace(/\s+/g, "-");

    navigate(`../product/${pathProductName}`, {
      state: { productDetail: product },
    });
  };

  return (
    <div className={classes["related-product"]}>
      <div className={classes["related-product-container"]}>
        <h3>RELATED PRODUCTS</h3>

        <div className={classes["products-flex"]}>
          {filteredProducts.map((p) => (
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
    </div>
  );
}
