// Import Modules
import React, { createContext, useEffect, useState } from "react";
import APIServer from "../API/customAPI";

// Create Context (Hook)
const APIContext = createContext();

export default function ContextProvider({ children }) {
  // Create + use States
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // Get API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await APIServer.shop.getProduct();

        if (res.statusText === "OK") {
          const products = res.data;

          // Update Product: Convert Price => Money
          const modifiedProducts = products.map((product) => {
            let VNMoney = new Intl.NumberFormat("vn-VN", {
              style: "currency",
              currency: "VND",
            });

            let formattedPrice = VNMoney.format(product.price)
              .replace(/,/g, ".")
              .replace("₫", "");

            return {
              ...product,
              price: formattedPrice,
            };
          });

          setProducts(modifiedProducts);
          setIsLoading(true);
        }
      } catch (error) {
        console.log("API Context Error:", error);
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, []);
  return (
    <>
      {isLoading && (
        <APIContext.Provider value={{ products: products }}>
          {children}
        </APIContext.Provider>
      )}
    </>
  );
}

export { APIContext };
