// Import Modules
import { useSelector, useDispatch } from "react-redux";
import { actionPopupProduct } from "../redux/actionRedux";
import { createPortal } from "react-dom";

// Import File CSS
import classes from "./css/popupProduct.module.css";

// Import Components
import Overlay from "./Overlay";

// Import Icons
import { CgClose } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";

const Product = ({ isShowPopupProduct, onClosePopupProduct, product }) => {
  return (
    <>
      {isShowPopupProduct && (
        <div className={classes["product"]}>
          <div className={classes["product-container"]}>
            <div className={classes["product-info"]}>
              <CgClose
                className={classes["icon-close"]}
                onClick={onClosePopupProduct}
              />
              <div className={classes["info-image"]}>
                <img
                  src={product.images[0]}
                  alt={product.images[0]}
                  loading="lazy"
                />
              </div>

              <div className={classes["info-detail"]}>
                <h1 className={classes["info-detail-name"]}>{product.name}</h1>
                <p className={classes["info-detail-price"]}>
                  Price: {product.price} VNĐ
                </p>
                <p className={classes["info-detail-short-desc"]}>
                  {product.short_desc}
                </p>
                <button type="button" className={classes["btn-view-detail"]}>
                  <FaShoppingCart className={classes["icon-cart"]} />
                  View Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function PopupProduct() {
  // Create + use Hooks
  const dispatch = useDispatch();
  const { isShow: isShowPopupProduct, product } = useSelector(
    (state) => state.popupProduct
  );

  // Create + use event handles
  const closePopupProductHandle = () => {
    dispatch(actionPopupProduct.hide());
  };

  return (
    <>
      {createPortal(
        <Overlay
          isShow={isShowPopupProduct}
          onClose={closePopupProductHandle}
        />,
        document.getElementById("overlay")
      )}
      <Product
        isShowPopupProduct={isShowPopupProduct}
        onClosePopupProduct={closePopupProductHandle}
        product={product}
      />
    </>
  );
}
